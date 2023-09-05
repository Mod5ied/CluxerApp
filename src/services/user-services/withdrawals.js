import { collection, addDoc } from "firebase/firestore";
import { db } from "../db_config";
import { ulid } from 'ulid';

export function generateTransactId() {
  return ulid();
}

export function getCurrentDate() {
  const date = new Date();
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function requestWithdrawal(amount, wallet_type, wallet_name, wallet_address) {
    try {
      // Create a new withdrawal object
      const withdrawal = {
        amount,
        wallet_type,
        wallet_name,
        wallet_address,
        created: getCurrentDate(),
        transact_id: generateTransactId(),
      };
  
      // Save the withdrawal object to the "withdrawals" collection
      await addDoc(collection(db, "withdrawals"), withdrawal);
  
      return { message: "Withdrawal successfully saved!" };
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // Re-throw the error to allow callers to handle it
    }
  }