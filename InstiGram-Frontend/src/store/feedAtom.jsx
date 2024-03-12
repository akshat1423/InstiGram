import { atom } from 'recoil';

export const feedAtom=atom({
    key:"feedAtom",
    default:[{
        id: '',
        auth: '',
        image: '',
        detail: {
            likes: 5,
            comments: [
                {
                    commentAuth:'',
                    commentId:'',
                    comment:'',
                }
            ]
        }

    }],
})
const posts = {post:[
    {
        id: '',
        auth: '',
        image: '',
        detail: {
            likes: 5,
            comments: [
                {
                    commentAuth:'',
                    commentId:'',
                    comment:'',
                }
            ]
        }

    }
]}