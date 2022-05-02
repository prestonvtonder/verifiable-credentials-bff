import { RequestContext } from "../types";


export interface MessageDetails {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface MessageSendResponse {
  code: string;
  message: string;
  details: Array<MessageDetails>;
}

export interface MessageSendService {
  (subject: string, message: object, ctx: RequestContext): Promise<MessageSendResponse>
}

export interface MessageGetService {
  (subject: string, message: object, ctx: RequestContext): Promise<MessageSendResponse>
}
