import { atom } from "recoil";

export const followersAtom = atom({
    key: "followersAtom",
    default: [
            {
                 userId:1,
                 userName:'gaurav',
                 profileImage:null
            },
            {
                userId:3,
                userName:'gaurav',
                profileImage:null
           },
           {
                userId:9,
                userName:'gaurav',
                profileImage:null
       }
        ]
    })