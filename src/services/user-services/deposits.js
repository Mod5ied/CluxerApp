import { getDocs, query, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../db_config";
import { ulid } from 'ulid';

export async function depositToWallet(amount, currency) {
  const user = JSON.parse(localStorage.getItem("userRecord"));
  try {
    const deposit = {
      transact_id: generateTransactId(),
      created: getCurrentDate(),
      email: user.email,
      currency,
      amount,
    };

    await addDoc(collection(db, "deposits"), deposit);
    return { message: "Wallet deposit saved!", saved: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export function generateTransactId() {
  return ulid();
}

export function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function fetchDepositRecords() {
  try {
    const depositCollection = collection(db, "deposits");
    const depositQuery = query(depositCollection);
    const depositSnapshot = await getDocs(depositQuery);

    const depositRecords = depositSnapshot.docs.map(doc => doc.data());
    return depositRecords;
  } catch (error) {
    console.error("Error fetching deposit records: ", error);
    throw error;
  }
}

export async function execFundDeposit(username, amount) {
  const user = JSON.parse(localStorage.getItem("userWallet"));
  try {
    try {
      const querySnapshot = await getDocs(collection(db, 'deposits'));
      const depositDoc = querySnapshot.docs.find(doc => doc.data().username === username);
      if (depositDoc) {
        const depositRef = doc(db, 'deposits', depositDoc.id);
        await updateDoc(depositRef, { amount });
        return { message: 'update success', saved: true };
      } else {
        console.error('Deposit document not found');
        return { message: 'Deposit document not found', saved: false };
      }
    } catch (error) {
      console.error("fetchDeposit error: ", error);
    }
    
  } catch (error) {
    console.error("fundDeposit err: ", error)
  }
}