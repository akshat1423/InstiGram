import { atom } from 'recoil';

export const imageAtom = atom({
    key: "imageAtom",
    default: "../assets/blank-profile-picture.png",
})