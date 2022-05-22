import { Got } from "got";

export type RequestContext = {
  tenant: string;
  bundleId: string;
  ngrokUrl: string;
  api: Got;
};

declare module "express-serve-static-core" {
  export interface Request {
    context: RequestContext;
  }
}

export type ShortenedItem = {
  url: string; 
  payload: string | undefined;
}

