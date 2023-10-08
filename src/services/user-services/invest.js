import { getDocs, query, collection, addDoc, deleteDoc, updateDoc, doc, setDoc, where } from "firebase/firestore";
import { db } from "../db_config";
import { generateTransactId, getCurrentDate } from "./deposits";

export async function investAmount(amount) {
    //fetch users approved deposit amount
    const currentUser = JSON.parse(localStorage.getItem("userDeposits"));
    //compare it with the invest-amount, if valid, proceed to save to the DB & notify user.
    if (currentUser?.amount < amount) {
        return false;
    }
    else if (currentUser?.amount >= amount) {
        try {
            const querySnapshot = await getDocs(collection(db, 'approvedDeposits'));
            const depositDoc = querySnapshot.docs.find(doc => doc.data().email === currentUser.email);
            if (depositDoc) {
                const depositRef = doc(db, 'approvedDeposit', depositDoc.id);
                await updateDoc(depositRef, { amount });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error updating deposit: ", error);
            return false
        }
    }
    //else notify user of insufficient amount.
}

export async function execCreateInvestment({ deposit, percent, pack, wallet }) {
    const user = JSON.parse(localStorage.getItem('userRecord'));
    const data = { deposit, email: user.email, percentage: percent, plan: pack, profit: 0, started: getCurrentDate(), status: false, transact_id: generateTransactId() };
    if (deposit <= wallet) {
        // Save data to Firebase
        const docRef = await addDoc(collection(db, "investments"), data);
        localStorage.setItem("userDeposits", JSON.stringify(docRef));
        const investmentsSnapshot = await getDocs(collection(db, "investments"));
        const investments = investmentsSnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("investments", JSON.stringify(investments));
        return true;
    }
    throw new Error(false)
}



export async function execFetchInvestments(email) {
    try {
        const investmentCollection = collection(db, "investments");
        const investmentQuery = query(investmentCollection);
        const investmentSnapshot = await getDocs(investmentQuery);

        const investments = investmentSnapshot.docs.map(doc => doc.data());

        if (!email) {
            localStorage.setItem("investment", JSON.stringify([]))
        } else {
            const filteredInvest = investments.filter(i => i.email === email);
            if (filteredInvest.length === 0) {
                localStorage.setItem("investment", JSON.stringify([]));
            } else {
                localStorage.setItem("investment", JSON.stringify(investments));
            }
        }

        return false;
    } catch (error) {
        console.error("Error fetching investments: ", error);
        throw error;
    }
}

export async function fetchMethods() {
    try {
        const methodsCollection = collection(db, "method");
        const methodsQuery = query(methodsCollection);
        const methodsSnapshot = await getDocs(methodsQuery);

        const methods = methodsSnapshot.docs.map(doc => doc.data());
        localStorage.setItem("methods", JSON.stringify(methods));
    } catch (error) {
        console.error("Error fetching methods: ", error);
        throw error;
    }
}

export async function createMethod(coin, address) {
    try {
        const docRef = await addDoc(collection(db, "method"), { coin, address });
        return true;
    } catch (error) {
        console.error("Error creating method: ", error);
        return false;
    }
}