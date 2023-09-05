import { collection, addDoc } from "firebase/firestore";
import { getCurrentDate } from "./withdrawals";
import { db } from "../db_config";
import { ulid } from "ulid";

// export async function depositToWallet(amount, currency) {
//   const user = JSON.parse(localStorage.getItem("userRecord"));
//   try {
//     const data = {
//       created: getCurrentDate(),
//       email: user.email,
//       amount,
//       currency,
//       transact_id: ulid()
//     };

//     await addDoc(collection(db, "deposits"), data);
//     return { message: "Wallet deposit saved!", saved: true };
//   } catch (error) {
//     console.error("Error saving to wallet: ", error);
//     throw error;
//   }
// }