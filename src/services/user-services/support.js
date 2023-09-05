import { collection, addDoc } from "firebase/firestore";
import { getCurrentDate } from "./deposits";
import { db } from "../db_config";


export async function submitSupportTicket(subject, priority, details) {
  try {
    const supportTicket = { subject, priority, details, created: getCurrentDate() };
    await addDoc(collection(db, "support"), supportTicket);

    return { message: "Support ticket successfully created!", saved: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
