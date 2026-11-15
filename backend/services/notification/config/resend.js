import dotenv from "dotenv";
import { Resend } from "resend";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../.env", import.meta.url));

dotenv.config({ path: envPath });

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing from notification/.env");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// console.log("Resend API key loaded:", Boolean(process.env.RESEND_API_KEY));

export default resend;