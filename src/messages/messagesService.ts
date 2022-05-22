import { v4 as uuid } from "uuid";
import * as base64 from "@stablelib/base64";
import qrcode from "qrcode";

import { RequestContext, ShortenedItem } from "../types";
import { EncodedMessage, MessageEncodeService, MessageSendService, MessageSignService } from "./types";


export const shortenedUrls = new Map<string, ShortenedItem>();

export const sendMessage: MessageSendService = async (subject: string, message: object, ctx: RequestContext) => {
  const { api } = ctx;

  const payload = { 
    to: subject, 
    message: message 
  };

  console.log("Sending message: ", payload);

  return await api.post("v1/messaging/send", { json: payload }).json();
};

export const signMessage: MessageSignService = async (message: object, ctx: RequestContext): Promise<string> => {
  console.log("Signing message: ", message);
  return await ctx.api.post("v1/messaging/sign", { json: message }).json<string>();
}

export const encodeMessage: MessageEncodeService = async (message: object, ctx: RequestContext): Promise<EncodedMessage> => {
  console.log("Encrypting message payload: ", message);
  const { jwe } = await ctx.api.post("v1/messaging/encrypt", { json: message }).json();
  const qrCode = await createQrCode(jwe as object, ctx)
  return {
    jwe,
    ...qrCode
  };
}

export const createQrCode = async (data: string | object, ctx: RequestContext): Promise<any> => {
  const { bundleId } = ctx;

  const url = shortenUrl(data, ctx);
  const didcomm = `didcomm://${url}`;

  return {
    qrCode: await qrcode.toString(didcomm, { margin: 0, width: 250, type: "svg" }),
    deepLink: `${bundleId}://accept/${Buffer.from(didcomm).toString("base64")}`,
  };
}

function shortenUrl(data: string | object, ctx: RequestContext): string {
  const { tenant, ngrokUrl } = ctx;
  const code = uuid();

  const request = typeof data === "string" ? data : base64UrlEncode(JSON.stringify(data));

  if (typeof data === "object") {
    shortenedUrls.set(code, { url: `https://${tenant}`, payload: request });
  } else {
    shortenedUrls.set(code, { url: `https://${tenant}?request=${request}`, payload: undefined });
  }
  return `${ngrokUrl}/resolve/${code}`;
}

function base64UrlEncode(str: string): string {
  return base64.encodeURLSafe(Buffer.from(str));
} 