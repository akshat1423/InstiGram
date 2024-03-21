import { atom } from "recoil";

export const followingAtom = atom({
    key: "followingAtom",
    default: [
            {
                 userId:5,
                 userName:gaurav
            },
            {
                userId:3,
                userName:gaurav
           },
           {
                userId:9,
                userName:gaurav
       }
        ]
    })