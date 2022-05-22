import { RequestContext } from "../types"

export interface VerifiablePresentationMessage {
  id: string
  type: string
  from: string
  "created_time": number
  "expires_time": number
  "reply_url": string
  "reply_to": Array<string>
  body: any
}

export interface VerifiablePresentationMessageRequest {
  challenge: string
  did: string
  templateId: string
  callbackUrl: string
}

export interface VerifiablePresentationMessageResponse {
  id: string
  callbackUrl: string
  request: VerifiablePresentationMessage
}

export interface VerifiablePresentationMessageRequestService {
  (presentationRequest: VerifiablePresentationMessageRequest, ctx: RequestContext): Promise<VerifiablePresentationMessageResponse>
}
