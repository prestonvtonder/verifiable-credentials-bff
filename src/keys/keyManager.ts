import assert from "assert";

import { RequestContext } from "../types";
import { KeyManager } from "./types";

export const getPrivateKey: KeyManager = async (did: string, ctx: RequestContext): Promise<string> => {
  const { api } = ctx;
  console.log(`Retrieving private key for ${did}...`);
  const didResponse = await api.get(`v1/dids/${did}`).json<Record<string, any>>();
  const key: string = didResponse.localMetadata?.initialDidDocument?.keyAgreement[0]?.id;
  assert(key, "Unable to retrieve private key");
  return key;
}
