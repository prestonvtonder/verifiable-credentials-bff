import { RequestContext } from "../types";

export interface KeyManager {
  (did: string, ctx: RequestContext): Promise<string>
}
