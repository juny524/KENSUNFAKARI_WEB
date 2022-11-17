import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Timestamp, doc, setDoc, updateDoc, arrayUnion, getDocFromCache, query, where, getDoc } from "firebase/firestore";
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

  async setMember(name: String, tournament_id: String){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "member"), {
        name: name,
        tournament_id: tournament_id,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  async setRecord(size: number, member_id: String, tournament_id: String){
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "record"), {
        size: size,
        member_id: member_id,
        tournament_id: tournament_id,
      });
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
    return ret;
  }

  async getMembers(tournament_id: string): Promise<{ id: string,name: string, tournament_id: string }[]> {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const citiesRef = collection(db, "member");
    const q = query(citiesRef, where("tournament_id", "==", tournament_id));
    const querySnapshot = await getDocs(q);
    let ret: { id: string, name: string, tournament_id: string }[] = new Array();
    querySnapshot.forEach((doc) => {
      ret.push({
        id: doc.id,
        name: doc.get("name"),
        tournament_id: doc.get("tournament_id")
      });
    });
    return ret;
  }

  async getRecord(tournament_id: string): Promise<{ member_id: string,size: number, tournament_id: string }[]> {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const citiesRef = collection(db, "record");
    const q = query(citiesRef, where("tournament_id", "==", tournament_id));
    const querySnapshot = await getDocs(q);
    let ret: { member_id: string,size: number, tournament_id: string }[] = new Array();
    querySnapshot.forEach((doc) => {
      ret.push({
        member_id: doc.get("member_id"),
        size: doc.get("size"),
        tournament_id: doc.get("tournament_id")
      });
    });
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

  async getTournament(tournament_id: string): Promise<{ name: string, target_count: number, target_fish: string }>{
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const docRef = doc(db, "tournament", tournament_id);
    const docSnap = await getDoc(docRef);
    const datas = docSnap.data();
    const ret = { name: datas.name, target_count: datas.target_count, target_fish: datas.target_fish };
    return ret;
  }



}
