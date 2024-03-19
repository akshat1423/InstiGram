import { atom } from 'recoil';

export const searchAtom = atom({
    key: "searchAtom",
    default: [{
        userId:1,
        userName:'fwww',
        gradYear:2027,
        department:'CSE'
    },
    {
        userId:4,
        userName:'getg',
        gradYear:2021,
        department:'ME'
    },
    {
        userId:2,
        userName:'getg',
        gradYear:2021,
        department:'ME'
    },
    {
        userId:3,
        userName:'getg',
        gradYear:2021,
        department:'ME'
    },
    {
        userId:15,
        userName:'getg',
        gradYear:2021,
        department:'ME'
    },
    {
        userId:6,
        userName:'getg',
        gradYear:2021,
        department:'ME'
    }]
})