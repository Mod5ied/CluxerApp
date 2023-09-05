import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../db_config";
import { fetchWalletData } from "../user-services/account";
import { getCurrentDate } from "../user-services/deposits";

export async function isAuthenticated() {
  const userRecord = localStorage.getItem("userRecord");
  !!userRecord
}

async function getUserByUsernameAndPass(username, password) {
  const q = query(collection(db, "users"), where("userName", "==", username), where("password", "==", password));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    console.log('No user found!');
    return null;
  }
}

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

export async function execSignUp({ country, email, fullname, mobile, password, is_admin, ref_name }) {
  try {
    const user = { country, email, fullname, mobile, password, is_admin, ref_name };
    await addDoc(collection(db, "users"), user);
    await execGenReferrals({ email, ref_name })
    return { message: "User successfully registered!", user };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function execSignUpStaff({ country, email, fullname, mobile, password, is_admin }) {
  try {
    const admin = { country, email, fullname, mobile, password, is_admin }
    await addDoc(collection(db, "admin"), admin);
  } catch (error) {
    console.error("staff signup err:", error)
  }
}

export async function execSignIn(details) {
  const { username, password } = details;
  try {
    let userRecord = localStorage.getItem("userRecord");

    if (userRecord) {
      userRecord = JSON.parse(userRecord);
      // Check if the username and password match
      await fetchWalletData(userRecord.email)
      if (
        userRecord.userName === username &&
        userRecord.password === password
      ) {
        return true;
      }
    } else {
      const databaseUserRecord = await getUserByUsernameAndPass(
        username,
        password
      );
      // If a user record was found in the database, save it to localStorage
      if (databaseUserRecord && databaseUserRecord.password === password) {
        localStorage.setItem("userRecord", JSON.stringify(databaseUserRecord));

        await fetchWalletData(databaseUserRecord.email)
        return true;
      }
    }
    return false;
  } catch (error) {
    // Handle errors here
    console.error(`Error: ${error}`);
    return false;
  }
}

export function execSignOut() {
  // Remove the user record from local storage
  localStorage.removeItem("userRecord");
  localStorage.removeItem("userWallet");
}

export async function updateUser(
  fullname,
  mobile,
  country,
  city,
  address,
  zip_code,
  email
) {
  try {
    // Create a new user object
    const user = {
      fullname,
      mobile,
      country,
      city,
      address,
      zip_code,
      email,
    };
    const userRef = doc(db, "users", email);

    // Update the user object in the "users" collection
    await updateDoc(userRef, user);

    return { message: "User successfully updated!" };
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Re-throw the error to allow callers to handle it
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