import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../db_config";
import { ulid } from 'ulid';

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

export async function requestWithdrawal(amount, wallet_type, wallet_name, wallet_address) {
  const user = JSON.parse(localStorage.getItem("userRecord"));
  try {
    const withdrawal = {
      username: user.username,
      pending: true,
      amount,
      wallet_type,
      wallet_name,
      wallet_address,
      created: getCurrentDate(),
      transact_id: generateTransactId(),
    };

    // Save the withdrawal object to the "withdrawals" collection
    await addDoc(collection(db, "withdrawal"), withdrawal);
    return { message: "Withdrawal successfully saved!" };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function approveWithdrawal(username) {
  try {
    // Fetch the withdrawal document from the "withdrawals" collection
    const querySnapshot = await getDocs(
      query(collection(db, "withdrawal"), where("username", "==", username))
    );

    // Check if a matching document exists
    if (!querySnapshot.empty) {
      const withdrawalDoc = querySnapshot.docs[0];
      const withdrawalData = withdrawalDoc.data();

      // Remove the "pending" field and add the "approved" field with a value of true
      const updatedWithdrawalData = {
        ...withdrawalData,
        approved: true,
      };

      // Save the updated withdrawal document to the "approvedWithdraw" collection
      await addDoc(collection(db, "approvedWithdraw"), updatedWithdrawalData);

      // Update the original withdrawal document in the "withdrawals" collection
      await updateDoc(doc(db, "withdrawal", withdrawalDoc.id), {
        approved: true,
      });

      return { message: "Withdrawal approved and saved!" };
    } else {
      throw new Error("No matching withdrawal record found!");
    }
  } catch (error) {
    console.error("Error approving withdrawal: ", error);
    throw error;
  }
}

export async function fetchPendingWithdrawal() {
  try {
    const querySnapshot = await getDocs(collection(db, "withdrawal"));
    const pendingWithdrawal = querySnapshot.docs.map((doc) => doc.data());

    localStorage.setItem("pendingWithdraw", JSON.stringify(pendingWithdrawal));
  } catch (error) {
    console.error("Error fetching pending withdrawal: ", error);
    throw error;
  }
}

export async function fetchApprovedWithdrawal() { 
  try {
    const querySnapshot = await getDocs(collection(db, "approvedWithdraw"));
    const approvedWithdrawal = querySnapshot.docs.map((doc) => doc.data());

    localStorage.setItem("approvedWithdraw", JSON.stringify(approvedWithdrawal));
  } catch (error) {
    console.error("Error fetching approved withdrawal: ", error);
    throw error;
  }
}