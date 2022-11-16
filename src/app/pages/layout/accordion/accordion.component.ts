import { Component, ViewChild, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterEvent, Router } from '@angular/router';
import { DatamanageService } from '../../../service/datamanage.service';
import { Options } from 'ngx-qrcode-styling';
import {
  NgxQrcodeStylingComponent,
  NgxQrcodeStylingService,
} from 'ngx-qrcode-styling';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class AccordionComponent {

  myParam: any;
  tournament_name: any;
  target_fish: any;
  target_count: any;
  kara: string;
  member_name_setting = '';
  member_id = '';
  fish_size = '';
  users: { id: string, name: string, tournament_id: string }[] = [];

  public config: Options = {
    width: 150,
    height: 150,
    data: "https://",
    margin: 5
  };

  constructor(private route: ActivatedRoute, private datamanage: DatamanageService, private testDI: NgxQrcodeStylingService){}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        console.log(params.id);
        this.myParam = params.id;
        // /pages/layout/accordion?id=

        const tournament_qr: Options = {
          width: 150,
          height: 150,
          data: "https://kensungakari.web.app/pages/layout/accordion?id=" + params.id,
          margin: 5
        };
        this.config = tournament_qr;

        const result = this.datamanage.getTournament(this.myParam);
        result.then(e=>{
          console.log(e);
          this.tournament_name = e.name;
          this.target_fish = e.target_fish;
          this.target_count = e.target_count;
        });

        
        const members = this.datamanage.getMembers(this.myParam);
        members.then(e=>{
          this.users = e;


        });
      }
    );

    
  }

  set_member(member_name: string){
    if(member_name){
      this.datamanage.setMember(member_name, this.myParam);
      this.member_name_setting = "";
    }
  }

  set_record(){
    const size = Number(this.fish_size);
    if(size){
      this.datamanage.setRecord(size, this.member_id, this.myParam);
      this.fish_size = "";
    }
    // size
    // this.member_id
    // myParam

  }

}
