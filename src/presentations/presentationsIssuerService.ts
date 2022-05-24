import assert from "assert";
import { v4 as uuid } from "uuid";
import { createQrCode, signMessage } from "../messages/messagesService";

import { getDidDocument } from "../resolvers/mattrResolver";
import { RequestContext } from "../types";
import { createPresentationMessageRequest } from "./presentationsMessageRequestService";


export const issuePresentation = async (did: string, type: string, ctx: RequestContext) => {
  const { ngrokUrl } = ctx;
  const challenge = uuid();
  const didDocument = await getDidDocument(did, ctx);
  const didUrl = didDocument?.authentication[0];
  assert(didUrl, "Cannot resolve presentation request signing DIDUrl");
  const callbackUrl = `${ngrokUrl}/api/presentations/callback`;
  const templateId = getTemplateId(type);
  const { request } = await createPresentationMessageRequest({ challenge, did, templateId, callbackUrl }, ctx);
  console.log("Created DIDAuth presentation request:", request);
  const signedRequest = await signMessage({ payload: request, didUrl }, ctx);
  console.log("Signed DIDAuth presentation request:", signedRequest);
  const result = await createQrCode(signedRequest, ctx);
  return { ...result, jws: signedRequest, challenge };
}

function getTemplateId(type: string): string {
  var id;
  switch (type) {
    case "didauth":
      id = "f40ce1ea-6c19-4822-a1f4-f57a28220140";
      break;
    case "vaccine":
      id = "33026663-5521-4f8b-8149-2d2d04d6b236";
      break;
    default:
      id = "";
      break;
  }
  return id;
}
