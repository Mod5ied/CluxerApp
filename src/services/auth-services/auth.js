import { collection, doc, addDoc, getDocs, updateDoc, query, where, getDoc } from "firebase/firestore";
import { execFetchBonus, fetchProfit, fetchWalletData } from "../user-services/account";
import { getCurrentDate } from "../user-services/deposits";
import { db } from "../db_config";
import { fetchApprovedWithdrawal, fetchPendingWithdrawal } from "../user-services/withdrawals";

export async function isAuthenticated() {
  const userRecord = localStorage.getItem("userRecord");
  !!userRecord
}

// async function getUserByUsernameAndPass(username, password) {
//   const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
//   const querySnapshot = await getDocs(q);
//   if (!querySnapshot.empty) {
//     return querySnapshot.docs[0].data();
//   } else {
//     console.log('No user found!');
//     return null;
//   }
// }

async function execGenReferrals({ email, ref_name }) {
  try {
    const referral = {
      created: getCurrentDate(),
      email,
      name: ref_name,
      status: "false"
    }
    await addDoc(collection(db, "referrals"), referral) ?? true
  } catch (error) {
    console.error("gen-referral err: ", error)
  }
}

export async function execSignUp({ country, email, fullname, username, mobile, password, ref_name }) {
  try {
    const user = { country, email, fullname, username, mobile, password, is_admin: false, ref_name };
    await addDoc(collection(db, "users"), user);
    await execGenReferrals({ email, ref_name })
    return { message: "User successfully registered!", user };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function execSignUpStaff({ email, username, firstname, mobile, password }) {
  try {
    const admin = { email, username, firstname, mobile, password, is_admin: true }
    await addDoc(collection(db, "admin"), admin);

    return { message: "Admin successfully registered!", admin };
  } catch (error) {
    console.error("staff signup err:", error)
    throw error
  }
}

export async function execSignIn(details) {
  const { username, password } = details;
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());

    const databaseUserRecord = users.find((user) => user.username === username && user.password === password);
    if (databaseUserRecord) {
      localStorage.setItem("userRecord", JSON.stringify(databaseUserRecord));
      localStorage.setItem("userRecords", JSON.stringify(users));
      await fetchWalletData(databaseUserRecord.email);
      await fetchProfit(databaseUserRecord.userName);
      await execFetchBonus(databaseUserRecord.userName);
      return true;
    } else {
      return await execSignInStaff(details);
    }
  } catch (error) {
    console.error(`Signin Error: ${error}`);
    return false;
  }
}

export async function execSignInStaff(details) {
  const { username, password } = details;
  try {
    const q = query(collection(db, "admin"));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());

    const databaseUserRecord = users.find((user) => user.username === username && user.password === password);
    if (databaseUserRecord) {
      localStorage.setItem("userRecord", JSON.stringify(databaseUserRecord));
      localStorage.setItem("userRecords", JSON.stringify(users));
      await fetchProfit();
      await execFetchBonus();
      await fetchWalletData();
      await fetchEntityCount();
      await fetchPendingWithdrawal();
      await fetchApprovedWithdrawal();
      return true;
    }
  } catch (error) {
    console.error(`Signin Error: ${error}`);
    return false;
  }
}

export const execFetchUsers = async () => {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error(`Fetch-users error: ${error}`);
    throw error;
  }
}

export function execSignOut() {
  // Remove the user record from local storage
  localStorage.removeItem("userRecords");
  localStorage.removeItem("userRecord");
  localStorage.removeItem("userWallet");
  localStorage.removeItem("userProfits");
  localStorage.removeItem("userBonus");
  localStorage.removeItem("entityCount");
  localStorage.removeItem("approvedWithdrawal");
  localStorage.removeItem("pendingWithdrawal");
}

export async function updateUser(fullname, mobile, country, city, address, zip_code, email) {
  try {
    // Create a new user object
    const user = { fullname, mobile, country, city, address, zip_code, email };
    const userRef = doc(db, "users", email);
    await updateDoc(userRef, user);

    return { message: "User successfully updated!" };
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

export async function updatePassword(email, newPassword) {
  try {
    const userRef = doc(db, "users", email);

    // Update the password field in the document
    await updateDoc(userRef, {
      password: newPassword,
    });

    return { message: "Password successfully updated!" };
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error; // Re-throw the error to allow callers to handle it
  }
}

export async function fetchEntityCount() {
  try {
    const adminQuerySnapshot = await getDocs(collection(db, "admin"));
    const adminCount = adminQuerySnapshot.size;

    const usersQuerySnapshot = await getDocs(collection(db, "users"));
    const usersCount = usersQuerySnapshot.size;

    const entityCount = { admin: adminCount, clients: usersCount };
    localStorage.setItem("entityCount", JSON.stringify(entityCount));
    return true;
  } catch (error) {
    console.error("Error fetching entity count: ", error);
    throw error;
  }
}