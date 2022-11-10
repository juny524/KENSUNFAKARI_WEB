import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Timestamp, doc, setDoc, updateDoc, arrayUnion, getDocFromCache, query, where } from "firebase/firestore";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DatamanageService {

  constructor(private router: Router) { }


  async setStore(name: String, target_count: number, target_fish: String, google_user_id: String){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "tournament"), {
        name: name,
        target_count: target_count,
        target_fish: target_fish,
        google_user_id: google_user_id,
        createdate: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRef.id);
      this.router.navigateByUrl('/pages/layout/list');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getStore(){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "tournament"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(`${doc.get("name")}`);
      console.log(`${doc.get("target_count")}`);
      console.log(`${doc.get("target_fish")}`);
      
    });
  }

  async getTournamentList(google_user: string): Promise<{ id: string, name: string }[]> {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const citiesRef = collection(db, "tournament");
    const q = query(citiesRef, where("google_user_id", "==", google_user));
    const querySnapshot = await getDocs(q);
    let ret: { id: string, name: string }[] = new Array();
    querySnapshot.forEach((doc) => {
      ret.push({
        id: doc.id,
        name: doc.get("name")
      });
    });
    console.log(JSON.stringify(ret));
    return ret;
  }

  async getDataList(): Promise<{ id: string, name: string }[]> {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    let ret: { id: string, name: string }[] = new Array();
    const querySnapshot = await getDocs(collection(db, "tournament"));
    querySnapshot.forEach((doc) => {
      ret.push({
        id: doc.id,
        name: doc.get("name")
      });
    });
    console.log(JSON.stringify(ret));
    return ret;
  }

  async testStore(){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const washingtonRef = doc(db, "tournament", "one");

    // Atomically add a new region to the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   arrayExample: arrayUnion({
    //     a: 4,
    //     ba: "gaerger"
    //   })
    // });

    const docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      dateExample: Timestamp.fromDate(new Date()),
      arrayExample: [5, true, "hello"],
      nullExample: null,
      objectExample: {
          a: 5,
          b: {
              nested: "foo"
          }
      }
    };
    await addDoc(collection(db, "tournament"), docData);
  }

  async readTournament(id: string){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const docRef = doc(db, "tournament", id);
    try {
      const doc = await getDocFromCache(docRef);
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }



}
