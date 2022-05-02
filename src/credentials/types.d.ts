import { RequestContext } from "../types";

export type Issuer = {
  id: string
  name: string
}

export interface VerifiableCredential {
  "@context": Array<string>;
  type: Array<string>;
  issuer: Issuer;
  issuanceDate: string;
  credentialStatus: any;
  credentialSubject: any;
  proof: any;
  name: string;
  description: string;
}

export interface VerifiableCredentialResponse {
  id: string;
  credential: VerifiableCredential;
  tag: string;
  credentialStatus: any;
  issuanceDate: string
}

export interface IVerifiableCredentialRequestService {
  request: (type: string) => Promise<VerifiableCredential>
}

export interface VerifiableCredentialRequest {
  "@context": Array<string>
  subjectId: string
  type: Array<string>
  claims: any
  issuer: Issuer
  persist: boolean
  tag?: string
  revocable: boolean
}

export interface VerifiableCredentialIssueResponse {
  jwe: any;
  qrCode: string;
  deepLink: string;
}

export type VaccineCredentialRequest = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.org"
  ],
  subjectId: "did:key:z6MkfFKS7R76qRmGcjuDfQuCRxi9tJzTqvbCYfAPoF4kBy4a";
  type: [
    "VerifiableCredential",
    "VaccineCredential"
  ];
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
  };
  issuer: {
    id: "did:key:z6Mkg56eqRqaW1wfiiiCcbwJgbLTLV99Z7pFdWrKkkBTPp88",
    name: "South African Department of Health"    
  };
  persist: false;
  revocable: false;
}

export interface VerifiableCredentialIssuerService {
  (credential: VerifiableCredential, ctx: RequestContext): Promise<VerifiableCredentialIssueResponse>
}

export interface VerifiableCredentialRequestService {
  (type: string): Promise<VerifiableCredential>
}

export interface VerifiableCredentialRequestFactory {
  (): VerifiableCredentialRequest
}
