import { VerifiableCredentialRequestFactory } from "./types";

import { createVaccineRequest } from "./vaccineCredentialRequestFactory";
import { createBoardingPassRequest } from "./boardingPassCredentialRequestFactory";

export const credentialRequestFactories = new Map<string, VerifiableCredentialRequestFactory>([
  ["VaccineCertificate", createVaccineRequest],
  ["BoardingPassCredential", createBoardingPassRequest]
]);
