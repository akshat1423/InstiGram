import { atom } from 'recoil';

export const detailsAtom = atom({
    key: 'detailsAtom',
    default: {
        userId: 4,
        username: 'username',
        name: 'Vaibhav Singh',
        bio: "lorem ipsum iw",
        posts: '0',
        followers: '0',
        following: '0',
        degree: 'B.Tech',
        department: 'CSE',
        gradYear: '2027'
    }
})
