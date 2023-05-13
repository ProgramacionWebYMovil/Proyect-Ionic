import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { error, log } from 'console';
import { arrayRemove, arrayUnion, getDocs, updateDoc } from 'firebase/firestore';
import { Meme } from '../interfaces/meme';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



  constructor(private firestore:Firestore) { }


    async readMemes():Promise<Meme[]>{
      const result: Meme[] = []; 
      const querySnapshot = await getDocs(collection(this.firestore,"Memes"));
      querySnapshot.forEach((doc) => {
        result.push(doc.data() as Meme);
      })
      return result;
    }

    async getMemeById(id:number):Promise<Meme>{
      const docRef = doc(this.firestore,"Memes","Meme "+id);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as Meme;
    }

    async getMemeCommentsById(id:number):Promise<Comment[]>{
      const result : Comment[] = [];
      const querySnapshot = await getDocs(collection(this.firestore,"Memes","Meme "+id,"Comments"));
      querySnapshot.forEach((doc)=>{
        result.push(doc.data() as Comment);
      })
      return result;
    }

    async addComment(id: number, comment: Comment, uid:string): Promise<boolean>{
      const docRef = doc(this.firestore,"Memes","Meme "+id,"Comments",uid);
      await setDoc(docRef,{
        ...comment
      }).catch(error => {
        console.log(error);
        return false;
      });

      return true;
    }


    async addlikeToMemeByID(idMeme: number, idComment: string, currentUser: string):Promise<boolean> {
      const docRef = doc(this.firestore,"Memes","Meme "+idMeme,"Comments",idComment);
      await updateDoc(docRef,{
        like:arrayUnion(currentUser)
      });
      return true;
    }

    async getMemeCommentByID(idMeme:number,idComment:string):Promise<Comment>{
      const docRef = doc(this.firestore,"Memes","Meme "+idMeme,"Comments",idComment);
      const result = await getDoc(docRef);
      return result.data() as Comment;
    }

    async removelikeToMemeByID(idMeme: number, idComment: string, currentUser: string):Promise<boolean> {
      const docRef = doc(this.firestore,"Memes","Meme "+idMeme,"Comments",idComment);
      await updateDoc(docRef,{
        like:arrayRemove(currentUser)
      });
      return true;
    }

    async addDislikeToMemeByID(idMeme: number, idComment: string, currentUser: string):Promise<boolean> {
      const docRef = doc(this.firestore,"Memes","Meme "+idMeme,"Comments",idComment);
      await updateDoc(docRef,{
        dislike:arrayUnion(currentUser)
      });
      return true;
    }

    async removeDislikeToMemeByID(idMeme: number, idComment: string, currentUser: string):Promise<boolean> {
      const docRef = doc(this.firestore,"Memes","Meme "+idMeme,"Comments",idComment);
      await updateDoc(docRef,{
        dislike:arrayRemove(currentUser)
      });
      return true;
    }

    
}
