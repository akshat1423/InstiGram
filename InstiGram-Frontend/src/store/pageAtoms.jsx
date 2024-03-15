import { atom } from "recoil";

export const profileAtom = atom({
    key: "profileAtom",
    default: false,
})

export const createAtom = atom({
    key: "createAtom",
    default: false,
})

export const calendarAtom = atom({
    key: "calendarAtom",
    default: false
})