import { RequestContext } from "../types";

import { credentialRequestFactories } from "./credentialRequestFactories";
import { VerifiableCredentialResponse } from "./types";


export const requestCredential = async (type: string, ctx: RequestContext) => {
  const { api } = ctx;

  const factory = credentialRequestFactories.get(type);
  const request = factory?.();

  console.log("Creating verifiable credential: ", request);

  const credentialResponse: VerifiableCredentialResponse = await api.post("v1/credentials", { json: request }).json();

  console.log("Created verifiable credential: ", credentialResponse);

  return credentialResponse.credential;
}
