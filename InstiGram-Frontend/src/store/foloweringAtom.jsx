import { atom } from "recoil";

export const followeringAtom = atom({
    key: "followeringAtom",
    default: {
        followers:[
            {
                 userId:5,
                 userName:gaurav,
                 gradYear:2027,
                 department:CSE
            },
            {
                userId:3,
                userName:gaurav,
                gradYear:2027,
                department:CSE
           },
           {
            userId:9,
            userName:gaurav,
            gradYear:2027,
            department:CSE
       }
        ],
        following:[
            {
                userId:23,
                userName:gaurav,
                gradYear:2027,
                department:CSE
           },
           {
            userId:234,
            userName:gaurav,
            gradYear:2027,
            department:CSE
       }
        ]
    }
})