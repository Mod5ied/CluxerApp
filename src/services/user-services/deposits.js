import { getDocs, query, collection, addDoc, deleteDoc, updateDoc, doc, setDoc, where } from "firebase/firestore";
import { db } from "../db_config";

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
  return Math.random().toString(36).substring(2, 8);
}

export function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function fetchDeposits(email) {
  try {
    const depositCollection = collection(db, "deposits");
    const depositQuery = query(depositCollection);
    const depositSnapshot = await getDocs(depositQuery);

    const depositRecords = depositSnapshot.docs.map(doc => doc.data());

    if (!email) {
      localStorage.setItem("userDeposits", JSON.stringify(depositRecords));
    } else {
      const filteredDepositRecords = depositRecords.filter(record => record.email === email);
      if (filteredDepositRecords.length === 0) {
        localStorage.setItem("userDeposits", JSON.stringify([]));
      } else {
        localStorage.setItem("userDeposits", JSON.stringify(filteredDepositRecords));
      }
    }

    return true;
  } catch (error) {
    console.error("Error fetching deposit records: ", error);
    throw error;
  }
}
export async function fetchFundedDeposits(username) {
  try {
    const depositCollection = collection(db, "fundedDeposit");
    const depositQuery = query(depositCollection);
    const depositSnapshot = await getDocs(depositQuery);

    const depositRecords = depositSnapshot.docs.map(doc => doc.data());

    if (!username) {
      localStorage.setItem("fundedDeposit", JSON.stringify(depositRecords));
    } else {
      const filteredDepositRecords = depositRecords.filter(record => record.username === username);
      if (filteredDepositRecords.length === 0) {
        localStorage.setItem("fundedDeposit", JSON.stringify([]));
      } else {
        localStorage.setItem("fundedDeposit", JSON.stringify(filteredDepositRecords));
      }
    }

    return true;
  } catch (error) {
    console.error("Error fetching funded-deposit records: ", error);
    throw error;
  }
}

export async function execFetchInvestments(email) {
  console.log(email);
  try {
    // Fetch the investments data from Firebase
    let querySnapshot;
    if (email) {
      const query = query(collection(db, "investments"), where("email", "==", email));
      querySnapshot = await getDocs(query);
    } else {
      querySnapshot = await getDocs(collection(db, "investments"));
    }
    const investments = querySnapshot.docs.map((doc) => doc.data());

    // Save the fetched data to local storage as "investment"
    if (investments.length > 0) {
      localStorage.setItem("investment", JSON.stringify(investments));
      return investments;
    } else {
      localStorage.setItem("investment", JSON.stringify([]));
      return [];
    }
  } catch (error) {
    console.error("Error fetching investments: ", error);
    return [];
  }
}

export async function fetchApprovedDeposits(username) {
  try {
    const approvedDepoCollection = collection(db, "approvedDeposit");
    let approvedDepoQuery;

    if (username) {
      approvedDepoQuery = query(
        approvedDepoCollection,
        where("username", "==", username)
      );
    } else {
      approvedDepoQuery = query(approvedDepoCollection);
    }

    const approvedDepoSnapshot = await getDocs(approvedDepoQuery);
    const approvedDepoRecords = approvedDepoSnapshot.docs.map(
      (doc) => doc.data()
    );

    localStorage.setItem(
      "approvedDeposit",
      JSON.stringify(approvedDepoRecords)
    );

    return true;
  } catch (error) {
    console.error("Error fetching approved deposit: ", error);
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
  try {
    const depositData = {
      username: username,
      amount: amount
    };
    await addDoc(collection(db, 'fundedDeposit'), depositData);
    return { message: 'Deposit added', saved: true };
  } catch (error) {
    console.error("Error adding deposit: ", error);
    throw error;
  }
}

export async function execFetchReducedFunds(username) {
  try {
    const querySnapshot = await getDocs(collection(db, 'funds'));
    const reducedFundsDocs = querySnapshot.docs.filter(doc => doc.data().username === username);
    if (reducedFundsDocs.length > 0) {
      const reducedFundsData = reducedFundsDocs.map(doc => doc.data());
      localStorage.setItem("reducedFunds", JSON.stringify(reducedFundsData));
    } else {
      localStorage.setItem("reducedFunds", JSON.stringify([]));
    }
  } catch (error) {
    console.error("fetchReducedFunds error: ", error);
  }
}
