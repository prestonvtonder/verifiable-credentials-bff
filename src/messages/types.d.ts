import { RequestContext } from "../types";


export interface MessageDetails {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface EncodedMessage {
  jwe: any;
  qrCode: string;
  deepLink: string;
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

export interface MessageSignService {
  (message: object, ctx: RequestContext): Promise<string>
}

export interface MessageEncodeService {
  (message: object, ctx: RequestContext): Promise<EncodedMessage>
}
