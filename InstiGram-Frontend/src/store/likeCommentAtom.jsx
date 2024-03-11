import {atom} from 'recoil'

export const commentAtom = atom({
    key: 'commentAtom',
    default: [],
    
})
export const likeAtom=atom({
    key:'likeAtom',
    default:false,
})
export const commentCountAtom=atom({
    key:'commentCountAtom',
    default:0,
})
export const likeCountAtom=atom({
    key:'likeCountAtom',
    default:0,
})

export const showCommentBoxAtom=atom({
    key:'showCommentBoxAtom',
    default:false,
})
export const showCommentIconAtom=atom({
    key:'showCommentIconAtom',
    default:true,
})


