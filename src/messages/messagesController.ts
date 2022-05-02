import assert from "assert";
import { NextFunction, Request, Response } from "express";

import { shortenedUrls } from "../credentials/credentialIssuerService";
import { sendMessage } from "./messagesService";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { context } = req;
    console.log("Send async message", req.body);
    const { subject, message } = req.body;
    assert(subject, "Subject DID is required");
    assert(message, "Encrypted JWM format DIDComm message is required");
    res.send(await sendMessage(subject, message, context));
  } catch (err: any) {
    console.error("Failed to send async message", err, err?.response?.body);
    next(err);
  }
}

export function get(req: Request, res: Response, next: NextFunction) {
  const { code } = req.params;
  const found = shortenedUrls.get(code);
  if (found && found.payload) {
    console.log("Resolved shorten URL with JWE payload:", found);
    return res.json(found.payload);
  }
  if (found) {
    console.log("Resolved shorten URL:", found);
    return res.redirect(found.url);
  }
  next(`No shorten URL found with code: ${code}`);
}
