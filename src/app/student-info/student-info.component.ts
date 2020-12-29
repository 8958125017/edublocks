import { Component, OnInit} from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute} from  '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;
import { MessageService } from '../messageservice.service';
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor( private data:ApiIntegrationService,
     private toastr: ToastrService,
     private fb: FormBuilder,
     private router:Router,
     public  constants:GlobalConstant, 
     public  loader: Ng4LoadingSpinnerService,
     private route:ActivatedRoute,
     private messgage : MessageService) { }
  reqId:any;
      instName:any;
      uniqId:any
      instiId:any;
      instDetails:any;
      accred_num:any
  ngOnInit() {
      this.uniqId = localStorage.getItem('uniqId')
    if(localStorage.getItem('instituteDetails')){
              this.instDetails=localStorage.getItem('instituteDetails'); 
              debugger             
               this.instName=JSON.parse(this.instDetails).data.insti_name;
               this.instiId=JSON.parse(this.instDetails).data._id
               this.accred_num=JSON.parse(this.instDetails).data.accred_num
               debugger
              // console.log("this.telename"+this.instDetails);
          }
   //  debugger
  	// this.route.params.subscribe(params => {
   //      this.reqId = params['reqid'];      
        this.getStudentInformation(this.uniqId);
   //    });
  }

res:any;
studentInfo:any;
  getStudentInformation(item){
    debugger
    alert
    let postData={
          "instid":item
        };
        debugger
    this.data.getStudentInfo(postData).subscribe(data => {
      debugger
      this.res=data;
      if(this.res.statusCode==200){
        this.studentInfo= this.res.result[0];
      }
      
    })
  }

}
