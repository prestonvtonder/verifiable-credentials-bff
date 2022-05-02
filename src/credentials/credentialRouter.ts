import express from "express";

import { createCredential } from "./credentialsController";


export const credentialRouter = express.Router()

/**
 * Endpoint that issues a verifiable credential to the subject with the given
 * claims, and encode it in an encrypted JWM message.
 *
 * https://learn.mattr.global/api-reference/v1.0.1#operation/createCredential
 */
credentialRouter.post("/", express.json(), async (req, res, next) => createCredential(req, res, next));
