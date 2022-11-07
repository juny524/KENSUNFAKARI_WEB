import { Component } from '@angular/core';
import { fruits } from './fruits-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatamanageService } from '../../../service/datamanage.service';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  fruits = fruits;

  users: { id: string, name: string }[] = [];

  constructor(private fb: FormBuilder, private datamanage: DatamanageService) {
  }

  ngOnInit() {
      const datas = this.datamanage.getDataList();
      datas.then(e=>{
        this.users = e;
      });
  }
}
