import { atom } from 'recoil';

export const detailsAtom = atom({
    key: 'detailsAtom',
    default: {
        userId: 4,
        username: 'username',
        name: 'Vaibhav Singh',
        bio: "lorem impsum iw",
        isFollowing: false,
        posts: '0',
        followers: '0',
        following: '0',
        degree: 'B.Tech',
        department: 'cs',
        gradYear: '2027'
    }
})