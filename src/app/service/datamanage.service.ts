import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatamanageService {

  constructor() { }


  async setStore(name: String, target_count: number, taeget_fish: String){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "tournament"), {
        name: name,
        target_count: target_count,
        taeget_fish: taeget_fish
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



}
