import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { error, log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  async uploadDatabase(){
    const url = 'https://memes9.p.rapidapi.com/api/list?genre=memes&type=top';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '19b396da25msha8a9380da6ab8f1p158941jsndc6596edca6d',
		    'X-RapidAPI-Host': 'memes9.p.rapidapi.com'
	    }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const array = result.memes_list;
      console.log(array);
      for(let i=0; i<array.length; i++){
        await setDoc(doc(this.firestore,"Memes","Meme "+(i+1)),{
          ...array[i]
        }).catch(error => console.log(error))
      }
    } catch (error) {
      console.error(error);
    }
    }

    
}
