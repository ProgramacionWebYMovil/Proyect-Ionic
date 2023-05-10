import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { error, log } from 'console';
import { getDocs } from 'firebase/firestore';
import { Meme } from '../intefaces/meme';

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

    
}
