import { atom } from "recoil";

export const followersAtom = atom({
    key: "followersAtom",
    default: [
            {
                 userId:1,
                 userName:'gaurav'
            },
            {
                userId:3,
                userName:'gaurav'
           },
           {
                userId:9,
                userName:'gaurav'
       }
        ]
    })