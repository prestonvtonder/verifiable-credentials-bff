import { VerifiableCredentialRequestFactory } from "./types";

export const createVaccineRequest: VerifiableCredentialRequestFactory = () => {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.org"
    ],
    subjectId: "did:key:z6MkfFKS7R76qRmGcjuDfQuCRxi9tJzTqvbCYfAPoF4kBy4a",
    type: [
      "VerifiableCredential",
      "VaccineCertificate"
    ],
    claims: {
      givenName: "Elliot",
      familyName: "Smith",
      nationality: {
        name: "South Africa"
      },
      drug: {
        name: "COVID-19 Vaccine",
        manufacturer: {
          name: "Pfizer Incorporated"
        },
        identifier: "FJ3456",
        administrationRoute: "Intramuscular",
        dosageForm: "Injection",
        drugClass: {
          name: "Vaccine"
        }
      }
    },
    issuer: {
      id: "did:key:z6Mkg56eqRqaW1wfiiiCcbwJgbLTLV99Z7pFdWrKkkBTPp88",
      name: "South African Department of Health"
    },
    persist: false,
    revocable: false,
  };
}
