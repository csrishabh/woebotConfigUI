import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { MessageType } from '../shared/MessageType';
import { ResponseType } from '../shared/ResponseType';
@Component({
  selector: 'app-parent-options-creation',
  templateUrl: './parent-options-creation.component.html',
  styleUrls: ['./parent-options-creation.component.css']
})
export class ParentOptionsCreationComponent implements OnInit {

  @Input() parentDetails = {  msgTxt:'', type: '', responseType: ResponseType.CARD }
  msgOpts: Array<string> = Object.keys(MessageType).filter(key => isNaN(+key));
  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addAnswer(parentDetails) {
    this.restApi.addAnswer(this.parentDetails).subscribe((data: {}) => {
      this.router.navigate(['/parent-ans-list'])
    })
  }

}