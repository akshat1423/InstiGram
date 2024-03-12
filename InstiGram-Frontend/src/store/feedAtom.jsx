import { atom } from 'recoil';

export const feedAtom=atom({
    key:"feedAtom",
    default:[
        {
            _id: 20,
            auth: "string",
            profileImage: null,
            likes: 2,
            comments: 2,
            caption: 'Lol',
    
        },{
            _id: 21,
            auth: 'DEF',
            profileImage: null,
            likes: 3,
            comments: 3,
            caption: 'string',
        }
    ]
})

