import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';
// modules
import { ThemeModule } from '../../../@theme/theme.module';
import { DatamanageService } from '../../../service/datamanage.service';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  target_fish: string = "クロダイ";
  target_count: number = 2;
  tournament_name: string ="定例会";
  
  target_fishs: string[] = [
    "クロダイ",
    "シーバス",
    "グレ",
    "青物",
    "サワラ",
    "タチウオ",
    "マダイ",
    "コブダイ",
    "イシダイ",
    "メバル",
    "アジ",
    "コウイカ",
    "マダコ",
    "マゴチ",
    "ガシラ",
    "ヒラメ",
    "カレイ",
    "アイナメ",
    "アカエイ",
    "ボラ"
  ];

  constructor(private fb: FormBuilder, private datamanage: DatamanageService) {
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  set_tournament(value: string){
    this.tournament_name = value;
  }

  register_tournament(){
    const userdata = localStorage.getItem("user");
    if(userdata != null){
      const login_user = JSON.parse(userdata);
      this.datamanage.setStore(this.tournament_name, this.target_count, this.target_fish, login_user.uid);
    }
  }

  get_test_tournament(){

    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;

    //     console.log(user);
    //     localStorage.setItem("user",JSON.stringify(user));
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });

  }

  get_read(){
    const userdata = localStorage.getItem("user");
    if(userdata != null){
      console.log(JSON.parse(userdata));
    }
    else{
      console.log("no login");
    }
  }



  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
