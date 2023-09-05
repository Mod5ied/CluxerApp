import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getCurrentDate } from "./withdrawals";
import { db } from "../db_config";

export async function saveReferral(email, name, status) {
    try {
      const referral = {
        created: getCurrentDate(),
        email,
        name,
        status,
      };
  
      await addDoc(collection(db, "referrals"), referral);
      return { message: "Referral successfully saved!" };
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }