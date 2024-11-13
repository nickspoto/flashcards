import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../security_account.json";
import { cert } from "firebase-admin/app";

const app = admin.initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();
export { db };
