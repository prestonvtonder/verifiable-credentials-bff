import assert from "assert";
import dotenv from "dotenv";
import express from "express";
import got from "got";
import ngrok from "ngrok";

import { credentialRouter } from "./credentials/credentialRouter";
import { messagesRouter } from "./messages/messagesRouter";
import { presentationsRouter } from "./presentations/presentationsRouter";
import { RequestContext } from "./types";

// Launch the Express server
(async function bootstrap() {
  // Load environment variables
  dotenv.config();

  // Obtain the Access Token
  const token = process.argv[2];
  assert(token, "Access token is missing - include a valid JWT as an argument");

  const port = process.env.PORT || "3000";
  const tenant = process.env.TENANT;
  const bundleId = process.env.WALLET_BUNDLE_ID;

  assert(tenant, "Environment variable 'TENANT=<Tenant domain>' is required");

  const context: RequestContext = {
    tenant,
    bundleId: bundleId || "global.mattr.wallet",
    // Public tunnel for the HTTP requests, required for presentation callbacks
    ngrokUrl: process.env.NGROK_URL || (await ngrok.connect(parseInt(port))),
    // HTTP client for MATTR platform
    api: got.extend({
      headers: { Authorization: `Bearer ${token}` },
      prefixUrl: `https://${tenant}`,
    }),
  };

  const app = express();

  app.use((req, _, next) => {
    req.context = context;
    next();
  });

  app.use("/credentials", credentialRouter);
  app.use("/presentations", presentationsRouter);
  app.use("/messages", messagesRouter);

  app.listen(port, () => {
    console.log(`Sample App Started`);
    console.log(`Local:        http://localhost:${port}`);
    console.log(`Ngrok tunnel: ${context.ngrokUrl}`);
  });
})().catch(err => {
  console.error("Failed to launch server", err);
  process.exit(1);
});
