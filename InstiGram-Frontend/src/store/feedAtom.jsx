import { atom } from 'recoil';

export const feedAtom=atom({
    key:"feedAtom",
    default:[
        {
            _id: 20,
            auth: "string",
            profileImage: null,
            likes: [{
                auth:'hello'
            },
            {
                auth:'guara'
            }],
            comments:[
                {
                    commentId: 1,
                    commentAuth:'guarav',
                    commentContent:'helo'
                },
                {
                    commentId: 2,
                    commentAuth:'gaurav',
                    commentContent:'halo'
                }
            ],
            caption: 'Lol',
            postImage: null,
    
        },
        {
            _id: 21,
            auth: 'DEF',
            profileImage: null,
            likes: [{}],
            comments: [{
                commentId: 4,
                    commentAuth:'guarav',
                    commentContent:'helo'
            }],
            caption: 'string',
            postImage: null,
        }
    ]
})

