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