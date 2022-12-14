import { Component } from '@angular/core';
import { fruits } from './fruits-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatamanageService } from '../../../service/datamanage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  fruits = fruits;

  users: { id: string, name: string }[] = [];

  constructor(private fb: FormBuilder, private datamanage: DatamanageService, private router: Router) {
  }

  ngOnInit() {
    const userdata = localStorage.getItem("user");
    if(userdata != null){
      const login_user = JSON.parse(userdata);
      const datas = this.datamanage.getTournamentList(login_user.uid);
      datas.then(e=>{
        this.users = e;
      });
    }
  }
  
  testare(id: string){
    console.log(id);
  }

  navigate(id: string){
    this.router.navigateByUrl('pages/layout/accordion?id=' + id);
  }
}
