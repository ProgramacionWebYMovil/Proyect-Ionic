export interface Comment {
    owner:string,
    idComment:string,
    idMeme:number,
    content:string,
    like:Array<string>,
    dislike:Array<string>,
    date:number,
    imageOwner:string
}