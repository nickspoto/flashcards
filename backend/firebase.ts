import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "dotenv";
import { cert } from "firebase-admin/app";

config();
const private_key_id = process.env.PRIVATE_KEY_ID;
let private_key = process.env.PRIVATE_KEY;
private_key = private_key?.replace(/\\n/g, "\n");

const serviceAccount = {
  type: "service_account",
  project_id: "flashcards-23354",
  private_key_id: private_key_id,
  private_key: private_key,
  client_email:
    "firebase-adminsdk-bpfjj@flashcards-23354.iam.gserviceaccount.com",
  client_id: "107989908061278848146",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bpfjj%40flashcards-23354.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();
export { db };
