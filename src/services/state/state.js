import { atom, useRecoilState } from 'recoil';

export const adminState = atom({
    key: 'adminsState',
    default: {
        client: false,
        dashboard: true,
        depositPending: false,
        depositApproved: false,
        withdrawnPending: false,
        withdrawnApproved: false,
        usersClient: false,
        usersStaff: false,
        reduceFunds: false,
        addBonus: false,
        addProfit: false,
        addStaff: false,
        fundDeposit: false,
        paymentMethod: false,
        viewPayment: false
    }
})

export const usersState = atom({
    key: 'userState',
    default: {
        dashboard: true,
        depositPage: false,
        withdrawPage: false,
        investPage: false,
        supportPage: false,
        accountPage: false,
        securityPage: false,
        referralsPage: false
    }
})

export const userData = atom({
    key: 'userData',
    default: {
        userWallet: {}
    }
})

export function useToggleState(atom) {
    const [state, setState] = useRecoilState(atom);
    const toggleState = (key) => {
        const newState = Object.keys(state).reduce((acc, currKey) => {
            acc[currKey] = currKey === key;
            return acc;
        }, {});

        setState(newState);
    };
    return toggleState;
}