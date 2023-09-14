import { getDocs, query, collection, addDoc, deleteDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../db_config";
import { ulid } from 'ulid';

/** Used within the client's fund wallet section.  */
export async function fundWallet(amount, currency) {
  const user = JSON.parse(localStorage.getItem("userRecord"));
  try {
    const deposit = {
      transact_id: generateTransactId(),
      created: getCurrentDate(),
      fullname: user.fullname,
      username: user.username,
      mobile: user.mobile,
      email: user.email,
      pending: true,
      currency,
      amount
    };

    const data = await addDoc(collection(db, "deposits"), deposit);
    localStorage.setItem("userDeposits", JSON.stringify(data));
    return { message: "Deposit registered", saved: true };
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

export async function fetchDeposits() {
  try {
    const depositCollection = collection(db, "deposits");
    const approvedDepositCollection = collection(db, "approvedDeposit");
    const depositQuery = query(depositCollection);
    const approvedDepositQuery = query(approvedDepositCollection);
    const depositSnapshot = await getDocs(depositQuery);
    const approvedDepositSnapshot = await getDocs(approvedDepositQuery);

    const depositRecords = depositSnapshot.docs.map(doc => doc.data());
    const approvedDepositRecords = approvedDepositSnapshot.docs.map(doc => doc.data());

    localStorage.setItem("userDeposits", JSON.stringify(depositRecords));
    localStorage.setItem("approvedDeposits", JSON.stringify(approvedDepositRecords));

    return depositRecords;
  } catch (error) {
    console.error("Error fetching deposit records: ", error);
    throw error;
  }
}

export async function updateDeposit(email) {
  localStorage.removeItem("userDeposits");
  try {
    const querySnapshot = await getDocs(collection(db, 'deposits'));
    const depositDoc = querySnapshot.docs.find(doc => doc.data().email === email);
    if (depositDoc) {
      const depositRef = doc(db, 'deposits', depositDoc.id);
      const approvedDepositRef = doc(db, 'approvedDeposit', depositDoc.id);

      const depositData = depositDoc.data();
      depositData.pending = false;
      depositData.updatedAt = getCurrentDate();

      await setDoc(approvedDepositRef, depositData);
      await deleteDoc(depositRef);

      await fetchDeposits(); // Execute fetchDeposits function

      return { message: 'Deposit Approved', saved: true };
    } else {
      console.error('Deposit document not found');
      return { message: 'Deposit document not found', saved: false };
    }
  } catch (error) {
    console.error("Error updating deposit: ", error);
    throw error;
  }
}

export async function deleteDeposit(email) {
  localStorage.removeItem("userDeposits");
  try {
    const querySnapshot = await getDocs(collection(db, 'deposits'));
    const depositDoc = querySnapshot.docs.find(doc => doc.data().email === email);
    if (depositDoc) {
      const depositRef = doc(db, 'deposits', depositDoc.id);
      await deleteDoc(depositRef);
      await fetchDeposits(); // Execute fetchDeposits function
      return { message: 'Deposit deleted', saved: true };
    } else {
      console.error('Deposit document not found');
      return { message: 'Deposit document not found', saved: false };
    }
  } catch (error) {
    console.error("Error deleting deposit: ", error);
    throw error;
  }
}

/** Most possibly used within the admin "fund deposit section." */
export async function execFundDeposit(username, amount) {
  const user = JSON.parse(localStorage.getItem("userRecord"));
  try {
    const querySnapshot = await getDocs(collection(db, 'deposits'));
    const depositDoc = querySnapshot.docs.find(doc => doc.data().email === user.email);
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
}