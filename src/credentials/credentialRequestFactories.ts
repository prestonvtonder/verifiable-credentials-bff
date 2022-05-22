import { VerifiableCredentialRequestFactory } from "./types";

import { createRequest } from "./vaccineCredentialRequestFactory";

export const credentialRequestFactories = new Map<string, VerifiableCredentialRequestFactory>([
  ["VaccineCertificate", createRequest]
]);
