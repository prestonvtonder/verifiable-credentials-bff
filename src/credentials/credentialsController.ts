import assert from "assert";
import { NextFunction, Request, Response } from "express";

import { issueCredential } from "./credentialIssuerService";
import { requestCredential } from "./credentialRequestService";

export async function createCredential(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Issue direct credential offer", req.body);
    const { context } = req;
    const { type } = req.body;
    const credential = await requestCredential(type, context);
    const issueOffer = await issueCredential(credential, context);
    res.send(issueOffer);
  } catch (err: any) {
    console.error("Failed to create credential offer", err, err?.response?.body);
    next(err);
  }
}
