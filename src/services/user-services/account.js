import { getDocs, updateDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../db_config";
import { userData } from "../state/state";

export async function updatePassword(email, newPassword) {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userDoc = querySnapshot.docs.find(doc => doc.data().email === email);
        if (userDoc) {
            const userRef = doc(db, 'users', userDoc.id);
            const resp = await updateDoc(userRef, {
                password: newPassword
            });
            if (resp) {
                return { message: 'update success', saved: true };
            }
        } else {
            return { message: 'user not found', saved: false };
        }
    } catch (error) {
        console.error("update err:", error);
        return { message: 'update failed', saved: false, error };
    }
}

export async function updateProfile({ fullname, phone, country, city, zip, address, email }) {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userDoc = querySnapshot.docs.find(doc => doc.data().email === email);
        if (userDoc) {
            const userRef = doc(db, 'users', userDoc.id);
            const resp = await updateDoc(userRef, {
                fullname,
                phone,
                country,
                city,
                zip,
                address,
                email
            });
            if (resp) {
                return { message: 'update success', saved: true };
            }
        }
    } catch (error) {
        console.error("password update err: ", error);
        return { message: 'update failed', saved: false, error };
    }
}

export async function updatePin(email, pin) {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userDoc = querySnapshot.docs.find(doc => doc.data().email === email);
        if (userDoc) {
            const userRef = doc(db, 'users', userDoc.id);
            const resp = await updateDoc(userRef, {
                pin: pin
            });
            if (resp) {
                return { message: 'update success', saved: true };
            }
        }
    } catch (error) {
        console.error("pin update err: ", error);
    }
}

export const fetchWalletData = async (email) => {
    try {
        if (!email) {
            const querySnapshot = await getDocs(collection(db, 'deposits'));
            const walletData = querySnapshot.docs.map((doc) => doc.data());
            localStorage.setItem("userWallet", JSON.stringify(walletData));
            return walletData;
        } else {
            const querySnapshot = await getDocs(collection(db, 'deposits'));
            const depositDoc = querySnapshot.docs.find((doc) => doc.data().email === email);
            if (depositDoc) {
                const walletData = depositDoc.data();
                localStorage.setItem("userWallet", JSON.stringify(walletData));
                return walletData;
            } else {
                return null; // or handle the case when the document is not found
            }
        }
    } catch (error) {
        console.error("fetchWalletData error: ", error);
        throw error; // or handle the error accordingly
    }
}

export const fetchWalletDataAdmin = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'deposits'));
        const walletData = querySnapshot.docs.map(doc => doc.data());
        localStorage.setItem("userWallets", JSON.stringify(walletData));
        return walletData;
    } catch (error) {
        console.error("fetchWalletData error: ", error);
        throw error;
    }
}

export const fetchProfit = async (username) => {
    try {
      if (!username) {
        const querySnapshot = await getDocs(collection(db, 'profits'));
        const profitsData = querySnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("userProfits", JSON.stringify(profitsData));
        return profitsData;
      } else {
        const querySnapshot = await getDocs(collection(db, 'profits'));
        const profitsDoc = querySnapshot.docs.find((doc) => doc.data().username === username);
        if (profitsDoc) {
          const profitsData = profitsDoc.data();
          localStorage.setItem("userProfits", JSON.stringify(profitsData));
          return profitsData;
        } else {
          return null; // or handle the case when the document is not found
        }
      }
    } catch (error) {
      console.error("fetchProfit error: ", error);
      throw error;
    }
  }

export const execAddProfit = async ({ username, amount }) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'profits'));
        const profitDoc = querySnapshot.docs.find(doc => doc.data().username === username);
        if (profitDoc) {
            const profitRef = doc(db, 'profits', profitDoc.id);
            const resp = await updateDoc(profitRef, {
                amount: amount
            });
            if (resp) {
                return { message: 'update success', saved: true };
            }
        } else {
            const newProfitRef = doc(collection(db, 'profits'));
            const resp = await setDoc(newProfitRef, {
                username: username,
                amount: amount
            });
            if (resp) {
                return { message: 'create success', saved: true };
            }
        }
    } catch (error) {
        console.error("addProfit error:", error);
        return { message: 'update failed', saved: false, error };
    }
}

export const execFetchBonus = async (username) => {
    try {
      if (!username) {
        const querySnapshot = await getDocs(collection(db, 'bonus'));
        const bonusData = querySnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("userBonus", JSON.stringify(bonusData));
        return bonusData;
      } else {
        const querySnapshot = await getDocs(collection(db, 'bonus'));
        const bonusDoc = querySnapshot.docs.find((doc) => doc.data().username === username);
        if (bonusDoc) {
          const bonusData = bonusDoc.data();
          localStorage.setItem("userBonus", JSON.stringify(bonusData));
          return bonusData;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("fetchBonus error:", error);
      throw { message: 'fetch-bonus failed', saved: false, error };
    }
  }

export const execAddToBonus = async ({ username, amount }) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'bonus'));
        const bonusDoc = querySnapshot.docs.find(doc => doc.data().username === username);
        if (bonusDoc) {
            const bonusRef = doc(db, 'bonus', bonusDoc.id);
            const resp = await updateDoc(bonusRef, {
                amount: amount
            });
            if (resp) {
                return { message: 'add-bonus success', saved: true };
            }
        } else {
            const newBonusRef = doc(collection(db, 'bonus'));
            const resp = await setDoc(newBonusRef, {
                username: username,
                amount: amount
            });
            if (resp) {
                return { message: 'add-bonus success', saved: true };
            }
        }
    } catch (error) {
        console.error("addBonus error:", error);
        return { message: 'update failed', saved: false, error };
    }
}

export const execReduceFund = async ({ username, fundtype, amount }) => {
    try {
        const querySnapshot = await getDocs(collection(db, fundtype));
        const fundDoc = querySnapshot.docs.find(doc => doc.data().username === username);
        if (fundDoc) {
            const fundRef = doc(db, fundtype, fundDoc.id);
            const resp = await updateDoc(fundRef, {
                amount: amount
            });
            if (resp) {
                return { message: 'reduce-fund success', saved: true };
            }
        } else {
            const newFundRef = doc(collection(db, fundtype));
            const resp = await setDoc(newFundRef, {
                username: username,
                amount: amount
            });
            if (resp) {
                return { message: 'reduce-fund success', saved: true };
            }
        }
    } catch (error) {
        console.error("reduceFund error:", error);
        return { message: 'update failed', saved: false, error };
    }
}
