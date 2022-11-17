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
  ranking: any;
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
        result.then(tournament=>{
          console.log(tournament);
          this.tournament_name = tournament.name;
          this.target_fish = tournament.target_fish;
          this.target_count = tournament.target_count;

          
          const members = this.datamanage.getMembers(this.myParam);
          members.then(e=>{
            this.users = e;
            interface Dict {
              [key: string]: string;
            }
            let memberary: Dict = {};
            e.forEach((doc) => {
              memberary[doc.id] = doc.name;
            } );
            const record = this.datamanage.getRecord(this.myParam);
            record.then(record_datas=>{
              var rank = [];
              let i:number = 0;
              e.forEach((doc) => {
                console.log(memberary[doc.id]);
                var data: Array<number> = [];
                record_datas.forEach((record_data) => {
                  if(doc.id == record_data.member_id){
                    data.push(record_data.size);
                  }
                });
                data.sort(function(first, second){
                  if (first > second){
                    return -1;
                  }else if (first < second){
                    return 1;
                  }else{
                    return 0;
                  }
                });
                data.length = tournament.target_count;
                var kekka: number = 0;
                let data_dis: string = "";
                for (let i = 0; i < tournament.target_count; i++){
                  if(data[i]){
                    kekka += data[i];
                    data_dis = data_dis + data[i] + ", ";
                  }
                }
                var rankdata = {};
                rankdata["user_name"] = memberary[doc.id];
                rankdata["sum"] = kekka;
                rankdata["size"] = data;
                rankdata["size_dis"] = data_dis;
                rankdata["display"] = memberary[doc.id] + "　　　　合計: " + kekka + "　　　　詳細: " + data_dis;
                rank[i] = rankdata;
                
                // console.log(kekka);
                // console.log(data);
                i++;
              });

              rank.sort((a, b) => b.sum - a.sum);
              i = 0;
              rank.forEach((r) => {
                rank[i]["display"] = (i + 1) + "位　" + rank[i]["display"]

                i++;
              })
              console.log(rank);
              this.ranking = rank;
            });
          });
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
