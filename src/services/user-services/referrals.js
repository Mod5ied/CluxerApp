import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getCurrentDate } from "./withdrawals";
import { db } from "../db_config";

export async function saveReferral(email, name, status) {
  try {
    const referral = {
      created: getCurrentDate(),
      email,
      name,
      amount: 5
    };

    await addDoc(collection(db, "referrals"), referral);
    return { message: "Referral successfully saved!" };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function execFetchAllReferrals(refererName) {
  try {
    const querySnapshot = await getDocs(collection(db, "referrals"));
    const refDocs = querySnapshot.docs.filter(doc => doc.data().name === refererName);
    const refData = refDocs.map(doc => doc.data());
    localStorage.setItem("referrals", JSON.stringify([refData]));
    return refData;
  } catch (error) {
    console.error("Error fetching referrals: ", error);
    throw error;
  }
}