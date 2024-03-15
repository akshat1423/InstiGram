import { atom } from 'recoil';

export const imageAtom = atom({
    key: "imageAtom",
    default: 'https://placehold.co/200'
})