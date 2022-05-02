import { RequestContext } from "../types";
import { MessageSendService } from "./types";


export const sendMessage: MessageSendService = async (subject: string, message: object, ctx: RequestContext) => {
  const { api } = ctx;

  const payload = { 
    to: subject, 
    message: message 
  };

  console.log("Sending message: ", payload);

  return await api.post("v1/messaging/send", { json: payload }).json();
};
