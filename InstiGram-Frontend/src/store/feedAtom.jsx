import { atom,selector } from 'recoil';

export const feedAtom=atom({
    key:"feedAtom",
    default:[
        // {
        //     _id: 20,
        //     key: 1,
        //     auth: "string",
        //     likes: [{
                
        //         likeAuth: "string",
        //     },{
                
        //         likeAuth: "string",
        //     },{
                
        //         likeAuth: "string",
        //     }
        // ],
        //     comments: [{
        //         commentId: 1,
        //         commentAuth: 'string',
        //         commentContent: 'string',
    
        //     },{
        //         commentId: 1,
        //         commentAuth: 'string',
        //         commentContent: 'string',
    
        //     },{
        //         commentId: 1,
        //         commentAuth: 'string',
        //         commentContent: 'string',
    
        //     }],
        //     content: 'Lol',
    
        // },
        {
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
        },
        {
            _id: 24,
            key: 3,
            auth: 'hello',
            likes: [{}, {}, {}],
            comments: [
                {
                    commentId: 2,
                    commentAuth: 'string',
                    commentContent: 'string',
    
                },
                {
                    commentId: 3,
                    commentAuth: 'string',
                    commentContent: 'string',
                }
            ],
            content: 'string',
        },
    ]
})

export const selectedPostId = atom({
    key: 'selectedPostId',
    default: null,
});

export const selectedPostSelector = selector({
    key: 'selectedPostSelector',
    get: ({ get }) => {
        const posts = get(feedAtom);
        const selectedId = get(selectedPostId);
        
        if (!selectedId) return null;

        return posts.find(post => post._id === selectedId);
    },
});