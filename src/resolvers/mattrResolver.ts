import { RequestContext } from "../types"
import { DidDocument, DidDocumentResponse, Resolver } from "./types"


export const getDidDocument: Resolver = async (did: string, ctx: RequestContext) : Promise<DidDocument> => {
  const res = await ctx.api.get(`v1/dids/${did}`).json<DidDocumentResponse>();
  return res.didDocument;
}
