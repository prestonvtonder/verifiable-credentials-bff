import express from "express";

import { createPresentation, didAuthCallback, getPresentation, getStatus } from "./presentationsController";


export const presentationsRouter = express.Router()

/**
 * Endpoint that returns the prepared DIDAuth presentation request.
 *
 * https://learn.mattr.global/api-reference/v1.0.1#operation/createPresRequest
 */
presentationsRouter.get("/", express.json(), async (req, res, next) => createPresentation(req, res, next));

/**
 * Endpoint that receives the DIDAuth presentation response.
 */
presentationsRouter.post("/callback", express.json(), async (req, res) => didAuthCallback(req, res));

// /**
//  * Endpoint that returns the received presentation response.
//  *
//  * https://learn.mattr.global/tutorials/verify/using-callback/callback-intro
//  */
// presentationsRouter.get("/:id", async (req, res) => getPresentation(req, res));

/**
 * Endpoint that returns the received presentation response.
 *
 * https://learn.mattr.global/tutorials/verify/using-callback/callback-intro
 */
presentationsRouter.get("/status", async (req, res) => getStatus(req, res));
