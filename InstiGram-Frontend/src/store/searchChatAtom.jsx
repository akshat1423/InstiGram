import { atom } from 'recoil';

export const searchChatAtom = atom({
    key: "searchAtom",
    default: [{
        userId:1,
        userName:'fwsaw',
        gradYear:2027,
        department:'CSE'
    },
    {
        userId:4,
        userName:'vaibhav',
        gradYear:2021,
        department:'ME'
    },
    {
        userId:2,
        userName:'singh',
        gradYear:2021,
        department:'ME'
    },
   ]
})