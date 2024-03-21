import { atom } from "recoil";

export const followingAtom = atom({
    key: "followingAtom",
    default: [
            {
                 userId:5,
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