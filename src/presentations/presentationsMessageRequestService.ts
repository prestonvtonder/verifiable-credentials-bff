import { RequestContext } from "../types";
import { VerifiablePresentationMessageRequest, VerifiablePresentationMessageRequestService, VerifiablePresentationMessageResponse } from "./types";

export const createPresentationMessageRequest: VerifiablePresentationMessageRequestService = 
  async (presentationRequest: VerifiablePresentationMessageRequest, ctx: RequestContext) : Promise<VerifiablePresentationMessageResponse> => {
    return await ctx.api
      .post("v1/presentations/requests", {
        json: presentationRequest,
      })
      .json<VerifiablePresentationMessageResponse>();
  }
