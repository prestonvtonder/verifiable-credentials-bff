import { v4 as uuid } from "uuid";
import * as base64 from "@stablelib/base64";
import qrcode from "qrcode";

import { VerifiableCredential, VerifiableCredentialIssueResponse, VerifiableCredentialIssuerService } from "./types";

import { getPrivateKey } from "../keys/keyManager";
import { RequestContext, ShortenedItem } from "../types";


export const shortenedUrls = new Map<string, ShortenedItem>();

export const issueCredential: VerifiableCredentialIssuerService = async (credential: VerifiableCredential, ctx: RequestContext): Promise<VerifiableCredentialIssueResponse> => {
  const { api } = ctx;

  const key = await getPrivateKey(credential.issuer.id, ctx);
  const credentialOffer = createDirectCredentialOfferPayload(key, credential, ctx.tenant);

  console.log("Encrypting message payload: ", credentialOffer);

  const { jwe } = await api.post("v1/messaging/encrypt", { json: credentialOffer }).json();
  console.log("Encrypted JWM message", jwe);

  const qrCodePayload = await createQrCodePayload(jwe, ctx);

  return {
    jwe,
    ...qrCodePayload,
  };
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

async function createQrCodePayload(data: string | object, ctx: RequestContext) {
  const { bundleId } = ctx;

  const url = shortenUrl(data, ctx);
  const didcomm = `didcomm://${url}`;

  return {
    qrCode: await qrcode.toString(didcomm, { margin: 0, width: 250, type: "svg" }),
    deepLink: `${bundleId}://accept/${Buffer.from(didcomm).toString("base64")}`,
  };
}

function shortenUrl(data: string | object, ctx: RequestContext): string {
  const { tenant, ngrokUrl } = ctx;
  const code = uuid();

  const request = typeof data === "string" ? data : base64UrlEncode(JSON.stringify(data));

  if (typeof data === "object") {
    shortenedUrls.set(code, { url: `https://${tenant}`, payload: request });
  } else {
    shortenedUrls.set(code, { url: `https://${tenant}?request=${request}`, payload: undefined });
  }
  return `${ngrokUrl}/resolve/${code}`;

}

function base64UrlEncode(str: string): string {
  return base64.encodeURLSafe(Buffer.from(str));
} 
