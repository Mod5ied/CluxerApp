import { collection, addDoc, updateDoc, doc, getDocs, where, deleteDoc, query } from "firebase/firestore";
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

    // Save the withdrawal object to the "withdrawal" collection
    await addDoc(collection(db, "withdrawal"), withdrawal);

    // Fetch all docs that match 'username' from the collection and save to localstroage
    await fetchPendingWithdrawal(user.username);

    return true;
  } catch (err) {
    console.log('error requesting-withdrawal', err);
  }
}

export async function approveWithdrawal(username) {
  try {
    // Fetch the withdrawal document from the "withdrawal" collection
    const querySnapshot = await getDocs(
      query(collection(db, "withdrawal"), where("username", "==", username))
    );

    // Check if a matching document exists
    if (!querySnapshot.empty) {
      const withdrawalDoc = querySnapshot.docs[0];
      const withdrawalData = withdrawalDoc.data();

      const updatedWithdrawalData = {
        ...withdrawalData,
        approved: true,
        pending: false
      };

      await addDoc(collection(db, "approvedWithdraw"), updatedWithdrawalData);
      await deleteDoc(doc(db, "withdrawal", withdrawalDoc.id));
      await Promise.all([fetchApprovedWithdrawal(username), fetchPendingWithdrawal(username)]);

      return { message: "Withdrawal approved and saved!" };
    } else {
      throw new Error("No matching withdrawal record found!");
    }
  } catch (error) {
    console.error("Error approving withdrawal: ", error);
    throw error;
  }
}

export async function deleteWithdrawal(username) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "withdrawal"), where("username", "==", username))
    );

    // Check if a matching document exists
    if (!querySnapshot.empty) {
      const withdrawalDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, "withdrawal", withdrawalDoc.id));

      return { message: "Withdrawal deleted successfully!" };
    } else {
      throw new Error("No matching withdrawal record found!");
    }
  } catch (error) {
    console.error("Error deleting withdrawal: ", error);
    throw error;
  }
}

export async function fetchPendingWithdrawal(username) {
  try {
    if (username) {
      const querySnapshot = await getDocs(
        query(collection(db, "withdrawal"), where("username", "==", username))
      );
      const pendingWithdrawal = querySnapshot.docs.map((doc) => doc.data());

      localStorage.setItem("pendingWithdraw", JSON.stringify(pendingWithdrawal));
    } else {
      const querySnapshot = await getDocs(collection(db, "withdrawal"));
      const pendingWithdrawal = querySnapshot.docs.map((doc) => doc.data());

      localStorage.setItem("pendingWithdraw", JSON.stringify(pendingWithdrawal));
      return pendingWithdrawal;
    }
  } catch (error) {
    console.error("Error fetching pending withdrawal: ", error);
    throw error;
  }
}

export async function fetchApprovedWithdrawal(username) {
  try {
    if (username) {
      const querySnapshot = await getDocs(
        query(collection(db, "approvedWithdraw"), where("username", "==", username))
      );
      const approvedWithdrawal = querySnapshot.docs.map((doc) => doc.data());

      localStorage.setItem("approvedWithdraw", JSON.stringify(approvedWithdrawal));
    } else {
      const querySnapshot = await getDocs(collection(db, "approvedWithdraw"));
      const approvedWithdrawal = querySnapshot.docs.map((doc) => doc.data());

      localStorage.setItem("approvedWithdraw", JSON.stringify(approvedWithdrawal));
    }
  } catch (error) {
    console.error("Error fetching approved withdrawal: ", error);
    throw error;
  }
}