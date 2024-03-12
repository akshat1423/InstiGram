import { atom } from 'recoil';

export const feedAtom=atom({
    key:"feedAtom",
    default:[
        {
            _id: 20,
            key: 1,
            auth: "string",
            likes: [{
                
                likeAuth: "string",
            },{
                
                likeAuth: "string",
            },{
                
                likeAuth: "string",
            }
        ],
            comments: [{
                commentId: 1,
                commentAuth: 'string',
                commentContent: 'string',
    
            },{
                commentId: 1,
                commentAuth: 'string',
                commentContent: 'string',
    
            },{
                commentId: 1,
                commentAuth: 'string',
                commentContent: 'string',
    
            }],
            content: 'Lol',
    
        },{
            _id: 21,
            key: 2,
            auth: 'DEF',
            likes: [{}, {}, {}],
            comments: [
                {
                    commentId: 1,
                    commentAuth: 'string',
                    commentContent: 'string',
    
                }
            ],
            content: 'string',
        }
    ]
})

