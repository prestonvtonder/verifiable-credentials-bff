import assert from "assert";
import { v4 as uuid } from "uuid";

import { NextFunction, Request, Response } from "express";
import { issuePresentation } from "./presentationsIssuerService";


export async function createPresentation(req: Request, res: Response, next: NextFunction) {
  try {
    const { messagingDid, type } = req.body;
    console.log("Preparing DIDAuth presentation request for", messagingDid);
    assert(messagingDid, "Presentation request messaging DID is required");
    const data = await issuePresentation(messagingDid, type, req.context);
    res.send({ ...data });
  } catch (err: any) {
    console.error("Failed to create DIDAuth request", err, err?.response?.body);
    next(err);
  }
}
