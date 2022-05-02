import express from "express";
import { create, get } from "./messagesController";

export const messagesRouter = express.Router();

/**
 * Endpoint that sends async message to the subject's inbox.
 *
 * https://learn.mattr.global/api-reference/v1.0.1#operation/sendMessage
 */
messagesRouter.post("/", express.json({ limit: "2mb" }), async (req, res, next) => create(req, res, next));

/**
 * Endpoint that resolves a shorten URL.
 */
messagesRouter.get("/:code", async (req, res, next) => get(req, res, next));
