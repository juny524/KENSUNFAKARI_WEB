import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatamanageService } from '../../../service/datamanage.service';

@Component({
  selector: 'ngx-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
})
export class AccordionComponent {

  myParam: any;

  constructor(private route: ActivatedRoute, private datamanage: DatamanageService){}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        console.log(params.id);
        this.myParam = params.id;
        const result = this.datamanage.readTournament(this.myParam);
        result.then(e=>{
          console.log(e);
        });
      }
    );
    
  }

}
