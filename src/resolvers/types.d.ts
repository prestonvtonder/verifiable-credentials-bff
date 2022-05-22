import { PublicKey } from "../keys/types"
import { RequestContext } from "../types";

export interface DidDocument {
  "@context": Array<string>
  id: string
  publicKey: Array<PublicKey>
  authentication: Array<string>
  assertionMethod: Array<string>
  capabilityDelegation: Array<string>
  capabilityInvocation: Array<string>
  keyAgreement: Array<PublicKey>
}

export interface DidDocumentResponse {
  didDocument: DidDocument
  registrationStatus: string
  localMetadata: any
}

export interface Resolver {
  (did: string, ctx: RequestContext): Promise<DidDocument>
}
