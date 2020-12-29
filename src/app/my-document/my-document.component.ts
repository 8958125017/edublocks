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
  selector: 'app-my-document',
  templateUrl: './my-document.component.html',
  styleUrls: ['./my-document.component.scss']
})
export class MyDocumentComponent implements OnInit {
 @BlockUI() blockUI: NgBlockUI; 
   clearSetTimeout:any;
  pendingRequest:any;
  constructor(
       private data:ApiIntegrationService,
       private toastr: ToastrService,
       private fb: FormBuilder,
       private router:Router,
       public  constants:GlobalConstant, 
       public  loader: Ng4LoadingSpinnerService,
       private activatedRoute:ActivatedRoute,
       private messgage : MessageService
  	) { 
     this.getInformation();
  }

  ngOnInit() {
  }


res:any;
dashboardData:any=[];
emailId:any;
getInformation(){
  
  debugger
  clearTimeout(this.clearSetTimeout);
  this.blockUI.start('Loading...');
    this.pendingRequest=this.data.getdatadashbord().subscribe(res=>{
     debugger
      clearTimeout(this.clearSetTimeout);
      this.blockUI.stop();
     this.res=res;
     if(this.res.statusCode==200){
        this.dashboardData=this.res.result;
     } else{
       this.toastr.error(this.res.messgage); 
     }
   },error => {               
               this.blockUI.stop();          
               this.toastr.error('Not able to connect host, please try again');      
               })        
               this.clearSetTimeout = setTimeout(() => {
                    this.pendingRequest.unsubscribe();
                    this.blockUI.stop();
               },10000);
}
  sendEmail(){  	
  	 $('#shareModal').modal('hide');
  	if(this.emailId){  
  	debugger		
  	this.toastr.success('your request has been successfully sent');
    debugger
     this.data.shareEmail({Email:this.emailId}).subscribe(res=>{
       this.res=res;
       this.emailId='';
     })
  	}else{
  		this.toastr.error('please enter email id');
  	}
  }

  reqid:any;
  showData(item){
    debugger
    this.reqid=item;
     localStorage.setItem('uniqId',this.reqid);      
  }

  showpreview(item){
    debugger
    this.reqid=item;
     localStorage.setItem('uniqId',this.reqid); 
     this.router.navigate(['/studentInfo']) 
  }

}
