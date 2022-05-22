import express from "express";
import { createPresentation } from "./presentationsController";


export const presentationsRouter = express.Router()

/**
 * Endpoint that returns the prepared DIDAuth presentation request.
 *
 * https://learn.mattr.global/api-reference/v1.0.1#operation/createPresRequest
 */
presentationsRouter.post("/", express.json(), async (req, res, next) => createPresentation(req, res, next));
