import { RequestContext } from "../types";

export interface KeyManager {
  (did: string, ctx: RequestContext): Promise<string>
}

export interface PublicKey {
  id: string
  type: string
  controller: string
  publicKeyBase58: string
}
