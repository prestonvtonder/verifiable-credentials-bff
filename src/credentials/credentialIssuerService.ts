import { v4 as uuid } from "uuid";

import { EncodedMessage } from "../messages/types";
import { VerifiableCredential, VerifiableCredentialIssuerService } from "./types";

import { getPrivateKey } from "../keys/keyManager";
import { RequestContext, ShortenedItem } from "../types";
import { encodeMessage } from "../messages/messagesService";


export const shortenedUrls = new Map<string, ShortenedItem>();

export const issueCredential: VerifiableCredentialIssuerService = async (credential: VerifiableCredential, ctx: RequestContext): Promise<EncodedMessage> => {
  const key = await getPrivateKey(credential.issuer.id, ctx);
  const credentialOffer = createDirectCredentialOfferPayload(key, credential, ctx.tenant);
  console.log("Encrypting message payload: ", credentialOffer);
  const encodedMessage = await encodeMessage(credentialOffer, ctx);
  console.log("Encrypted JWM message", encodedMessage.jwe);
  return encodedMessage;
}

function createDirectCredentialOfferPayload(key: string, credential: VerifiableCredential, tenant: string) {
  return  {
    senderDidUrl: key,
    recipientDidUrls: [ credential.credentialSubject.id ],
    payload: {
      id: uuid(),
      to: [ credential.credentialSubject.id ],
      from: credential.issuer.id,
      type: "https://mattr.global/schemas/verifiable-credential/offer/Direct",
      created_time: Date.now(),
      body: { 
        credentials: [ credential ],
        domain: tenant, 
      },
    },
  };
}
