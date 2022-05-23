import { VerifiableCredentialRequestFactory } from "./types";

export const createBoardingPassRequest: VerifiableCredentialRequestFactory = () => {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.org"
    ],
    subjectId: "did:key:z6MkfFKS7R76qRmGcjuDfQuCRxi9tJzTqvbCYfAPoF4kBy4a",
    type: [
      "VerifiableCredential",
      "BoardingPassCredential"
    ],
    claims: {
      "@type": "CheckInAction",
      agent: {
        "@type": "Person",
        name: "Elliot Smith"
      },
      object: {
        "@type": "Flight",
        flightNumber: "BA431",
        departureGate: " A-192 ",
        provider: {
          "@type": "Airline",
          name: "British Airways",
          iataCode: "BA"
        },
        seller: {
          "@type": "OnlineStore",
          name: "Lightfoot Traveling",
          description: "Your premium source for first class traveling.",
        },
        departureAirport: {
          "@type": "Airport",
          name: "O. R. Tambo International Airport",
          iataCode: "JNB"
        },
        departureTime: "2022-05-23T19:20:00+02:00",
        arrivalAirport: {
          "@type": "Airport",
          name: "London Heathrow Airport",
          iataCode: "LHR"
        },
        arrivalTime: "2022-05-24T05:30:00+00:00"
      },
      instrument: {
        "@type": "WebApplication",
        url: "https://lightfoottraveling.com"
      }
    },
    issuer: {
      id: "did:key:z6Mkg56eqRqaW1wfiiiCcbwJgbLTLV99Z7pFdWrKkkBTPp88",
      name: "Lightfoot Traveling"
    },
    persist: false,
    revocable: false,
  };
}
