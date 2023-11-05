import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  // audience: process.env.APP_API,
  // issuerBaseURL: process.env.AUTH_DOMAIN,
  //   tokenSigningAlg:"RS256",
  //   audience: "http://localhost:8000",
  audience: "https://real-state-e55r.vercel.app",
  issuerBaseURL: "https://deepgivan.us.auth0.com",
  //   tokenSigningAlg: "RS256",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
