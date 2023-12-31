import { getDocs, updateDoc, doc, setDoc, collection, getDoc, query, where } from "firebase/firestore";
import { userData } from "../state/state";
import { db } from "../db_config";

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
            return {};
        } else {
            const querySnapshot = await getDocs(collection(db, 'profits'));
            const profitsDocs = querySnapshot.docs.filter((doc) => doc.data().username === username);
            const profitsData = profitsDocs.map((doc) => doc.data());
            localStorage.setItem("userProfits", JSON.stringify(profitsData));
            console.log("reached here");
            return true;
        }
    } catch (error) {
        console.error("fetchProfit error: ", error);
        throw error;
    }
}

export const execAddProfit = async ({ username, amount }) => {
    try {
        const newProfitRef = doc(collection(db, 'profits'));
        const resp = await setDoc(newProfitRef, {
            username: username,
            amount: amount
        });
        if (resp) {
            return { message: 'create success', saved: true };
        }
    } catch (error) {
        console.error("addProfit error:", error);
        return { message: 'update failed', saved: false, error };
    }
}

export const execFetchBonus = async (username) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'bonus'));
        const bonusDocs = querySnapshot.docs.filter((doc) => doc.data().username === username);
        const bonusData = bonusDocs.map((doc) => doc.data());
        localStorage.setItem("bonus", JSON.stringify(bonusData));
        return bonusData;
    } catch (error) {
        console.error("fetchBonus error:", error);
        throw { message: 'fetch-bonus failed', saved: false, error };
    }
}

export const execAddToBonus = async ({ username, amount }) => {
    try {
        // Create a new document reference in the 'bonus' collection
        const newBonusRef = doc(collection(db, 'bonus'));

        // Set the data for the new document
        const resp = await setDoc(newBonusRef, {
            username: username,
            amount: amount
        });

        if (resp) {
            return { message: 'create success', saved: true };
        }
    } catch (error) {
        console.error("addBonus error:", error);
        return { message: 'update failed', saved: false, error };
    }
}

export const execReduceFund = async ({ username, wallet_type, amount }) => {
    const approvedDepo = JSON.parse(localStorage.getItem("approvedDeposit"));
    const rawWalletSum = approvedDepo.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);

    const approvedWithdr = JSON.parse(localStorage.getItem("approvedWithdraw"));
    const rawCollectSum = approvedWithdr.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);

    const investments = JSON.parse(localStorage.getItem("investments"));
    const rawInvestmentsSum = investments?.reduce((total, doc) => total + (parseInt(doc.deposit) || 0), 0);

    const reducedFunds = JSON.parse(localStorage.getItem("reducedFunds"));

    // Filter the 'reducedFunds' array to only include documents with 'wallet_type' of 'deposits'
    const depositDocs = reducedFunds.filter((doc) => doc?.wallet_type === "deposits");

    // Use the 'reduce' method to sum the 'amount' property of the filtered documents
    const reducedFundsSum = depositDocs.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);
    let liabilities = rawCollectSum + reducedFundsSum;
    let assets = rawWalletSum + rawInvestmentsSum

    // let pureWalletResult = assets - liabilities;

    // if (amount > pureWalletResult) {
    //     console.log({liabilities});
    //     console.log({assets});
    //     console.log({pureWalletResult});
    //     return false
    // } else {
    try {
        const newFundRef = doc(collection(db, 'funds'));
        const resp = await setDoc(newFundRef, {
            username: username,
            amount: amount,
            wallet_type: wallet_type
        });
        if (resp) return true;
    } catch (error) {
        console.error("reduceFund error:", error);
        return { message: 'update failed', saved: false, error };
    }
    // }

}

/* Below are methods to fetch information for the dashboard metric cards. */
export async function execEntityCount() {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const adminSnapshot = await getDocs(collection(db, 'admin'));
        const usersCount = usersSnapshot.size;
        const adminCount = adminSnapshot.size;
        const entityCount = { clients: usersCount, admin: adminCount };
        localStorage.setItem("entityCount", JSON.stringify(entityCount));
        return true;
    } catch (error) {
        console.error("entity-count error:", error);
        return { message: 'entity-count failed', error };
    }
}

export async function execApprovedFundsEstimate() {
    try {
        const withdrawSnapshot = await getDocs(collection(db, 'approvedWithdraw'));
        const depositSnapshot = await getDocs(collection(db, 'approvedDeposit'));
        let withdrawSum = 0;
        let depositSum = 0;

        withdrawSnapshot.forEach(doc => {
            const data = doc.data();
            withdrawSum += parseInt(data.amount);
        });

        depositSnapshot.forEach(doc => {
            const data = doc.data();
            depositSum += parseInt(data.amount);
        });

        const approvedEstimate = { approvedWithdraw: withdrawSum, approvedDeposit: depositSum };
        localStorage.setItem("approvedEstimate", JSON.stringify(approvedEstimate));
        return true;
    } catch (error) {
        console.error("approved-estimate error:", error);
        return { message: 'approved-estimate failed', error };
    }
}

export async function execPendingFundsEstimate() {
    try {
        const pendingWithdrawSnapshot = await getDocs(collection(db, 'withdrawal'));
        const pendingDepositSnapshot = await getDocs(collection(db, 'deposits'));
        let pendingWithdrawSum = 0;
        let pendingDepositSum = 0;

        pendingWithdrawSnapshot.forEach(doc => {
            const data = doc.data();
            pendingWithdrawSum += parseInt(data.amount);
        });

        pendingDepositSnapshot.forEach(doc => {
            const data = doc.data();
            pendingDepositSum += parseInt(data.amount);
        });

        const pendingEstimate = { pendingWithdraw: pendingWithdrawSum, pendingDeposit: pendingDepositSum };
        localStorage.setItem("pendingEstimate", JSON.stringify(pendingEstimate));
        return true;
    } catch (error) {
        console.error("pending-estimate error:", error);
        return { message: 'pending-estimate failed', error };
    }
}