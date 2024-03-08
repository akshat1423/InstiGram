import { atom } from 'recoil';

export const validAtom = atom({
    key: "validAtom",
    default: {
        username: true,
        roll: true,
        password: true
    }
})