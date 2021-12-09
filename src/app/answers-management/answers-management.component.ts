import { Component, OnInit,Input } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '../shared/MessageType';
import { ResponseType } from '../shared/ResponseType';
@Component({
  selector: 'app-answers-management',
  templateUrl: './answers-management.component.html',
  styleUrls: ['./answers-management.component.css']
})

export class AnswersManagementComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  answers: any = {};
  previousResponses: any = [];
  @Input() childId: number;
   msgOpts: Array<string> = Object.keys(MessageType).filter(key => isNaN(+key));
   respOpts: Array<string> = Object.keys(ResponseType).filter(key => isNaN(+key));
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
    
  ) { 
  
  }
  @Input() answerDetails = { ansId : this.id, msgTxt:'', type: undefined, imageUrl:'',redirectUrl:'', responseType: undefined, response:''}

  ngOnInit() { 
    this.restApi.getParentComponentDetails(this.id).subscribe((data: {}) => {
      this.answers = data;
      
    })

    this.restApi.getAnsersForAParent(this.id).subscribe((data: {}) => {
      this.previousResponses = data;
      
    })

  }

  addAnswer(answerDetails) {
    this.restApi.addAnswer(this.answerDetails).subscribe((data: {}) => {
      this.router.navigate(['/parent-ans-list'])
    }) 
  }

  getChildAnswerDetails(childId){
    console.log(childId);
    this.restApi.getParentComponentDetails(childId).subscribe((data: {}) => {
      this.answers = data;
      this.answerDetails.ansId = childId;
      
    })
  }


}