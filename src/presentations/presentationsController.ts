import assert from "assert";

import { NextFunction, Request, Response } from "express";
import { issuePresentation } from "./presentationsIssuerService";
import { ParsedPresentationResult, PresentationRef } from "./types";


const receivedPresentations = new Map<PresentationRef, ParsedPresentationResult>();

export async function createPresentation(req: Request, res: Response, next: NextFunction) {
  try {
    const messagingDid = req.query.did as string !== undefined ? req.query.did as string : "did:key:z6Mkg56eqRqaW1wfiiiCcbwJgbLTLV99Z7pFdWrKkkBTPp88";
    const type = req.query.type as string;
    console.log("Preparing DIDAuth presentation request for", messagingDid);
    assert(messagingDid, "Presentation request messaging DID is required");
    const data = await issuePresentation(messagingDid, type, req.context);
    res.send({ ...data });
  } catch (err: any) {
    console.error("Failed to create DIDAuth request", err, err?.response?.body);
    next(err);
  }
}

export async function didAuthCallback(req: Request, res: Response) {
  console.log("Received DIDAuth Presentation", req.body);
  const { challengeId, verified, holder } = req.body;
  assert(challengeId, "Invalid DIDAuth response, expected challengeId");
  if (!verified || !holder) {
    console.error("DIDAuth request failed");
  } else {
    receivedPresentations.set(challengeId, { subjectDid: holder });
  }
  res.sendStatus(200);
}

export async function getPresentation(req: Request, res: Response) {
  const { id } = req.params;
  res.send({ data: receivedPresentations.get(id) });
}

export async function getStatus(req: Request, res: Response) {
  console.log("Received presentations:", receivedPresentations.size);
  if (receivedPresentations.size !== 0) {
    res.sendStatus(200);
    receivedPresentations.clear();
  } else {
    res.sendStatus(404);
  }
}
