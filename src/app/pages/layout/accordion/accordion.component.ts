import { Component, ViewChild, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterEvent, Router } from '@angular/router';
import { DatamanageService } from '../../../service/datamanage.service';
import { Options } from 'ngx-qrcode-styling';
import {
  NgxQrcodeStylingComponent,
  NgxQrcodeStylingService,
} from 'ngx-qrcode-styling';

@Component({
  selector: 'ngx-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class AccordionComponent {

  myParam: any;

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
          data: "/pages/layout/accordion?id=" + params.id,
          margin: 5
        };
        this.config = tournament_qr;

        const result = this.datamanage.readTournament(this.myParam);
        result.then(e=>{
          console.log(e);
        });
      }
    );
  }

}
