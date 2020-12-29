import { Component, OnInit } from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;
import { MessageService } from '../messageservice.service';

@Component({
  selector: 'app-upload-student-info',
  templateUrl: './upload-student-info.component.html',
  styleUrls: ['./upload-student-info.component.scss']
})

export class UploadStudentInfoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  clearSetTimeout: any;
  pendingRequest: any;
  public isSignupValidFormSubmitted = null;
  bodyRes: any;
  response: any;
  instituteDetails:any;
  chaninAddress:any;
  public isFileUploaded = null;
  fileName:any;


  constructor(
    
    private data: ApiIntegrationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    public constants: GlobalConstant,
    public loader: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute,
    private messgage: MessageService
  ) { 
    debugger;
    this.instituteDetails = localStorage.getItem('instituteDetails'); 
    this.chaninAddress = JSON.parse(this.instituteDetails).data.chain_address;
   
  }

  singleUpload: boolean = true;
  bulkUpload: boolean = false;
  public studentForm: FormGroup;


  studentInfo(value) {
    if (value == "singleUpload") {
      this.singleUpload = true;
      this.bulkUpload = false;
    }
    else {
      this.singleUpload = false;
      this.bulkUpload = true;
    }
  }
file:any;
 fileUpload(event){
   debugger
    let reader = new FileReader();
    this.file = event.target.files[0];  
   if(!this.file){
       this.fileName = this.file.name;
      this.toastr.error('Please Upload Doc File');
      return false;
    }
}

uploadStudentFormInit(){
    this.studentForm = this.fb.group({
      docPurpose: new FormControl('', [Validators.required]),
      docData: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required]),
      studentRollNumber: new FormControl('', [Validators.required]),
     });
  }
  postData:any;
 //-----------------Student Form start here--------------------//
  student() {
    debugger
    if (this.studentForm.value.docPurpose == '') {
      this.toastr.error('Please enter Doc Purpose name');
      return false;
    } else if (this.studentForm.value.blockAddress == '') {
      this.toastr.error('Please enter Block Address');
      return false;
    } else if (this.studentForm.value.docData == '') {
      this.toastr.error('Please enter Doc Data');
      return false;
    } else if (this.studentForm.value.studentName == '') {
      this.toastr.error('Please enter Student Name');
      return false;
    }

    else if (this.studentForm.value.studentRollNumber == '') {
      this.toastr.error('Please enter Student Roll Number');
      return false;
    }

    else if (this.studentForm.valid) {
      // let postData = {
      //       "docporse": this.studentForm.value.docPurpose,
      //       "docdata": this.studentForm.value.docData,
      //       "studentphone": this.studentForm.value.studentNumber,
      //       "stud_roll_no": this.studentForm.value.studentRollNumber,
      //       "doc":this.fileName,
      //       "chain_address":this.chaninAddress,
      //      }
           this.postData = new FormData(); 
           this.postData.append('doc', this.file , this.fileName);
           this.postData.append('docporse', this.studentForm.value.docPurpose);
           this.postData.append('docdata',this.studentForm.value.docData);
           this.postData.append('studentName', this.studentForm.value.studentName)
           this.postData.append('stud_roll_no', this.studentForm.value.studentRollNumber);
           // this.postData.append('chain_address', this.chaninAddress);
           
     clearTimeout(this.clearSetTimeout);
     debugger
       this.blockUI.start();
      this.data.uploadStudent(this.postData).subscribe((data) => {
        debugger
        clearTimeout(this.clearSetTimeout);
         this.blockUI.stop();
         this.isSignupValidFormSubmitted = false;
        if (data['statusCode'] == 200) {
            debugger
            this.toastr.success(data['message']);
            this.studentForm.reset();
            this.router.navigate(['/dashboard']);
          }
        else {
          this.toastr.error(data['message']);
        }
         
      }, error => {
        this.blockUI.stop();
        clearTimeout(this.clearSetTimeout);
        this.toastr.error('Not able to connect host, please try again');
      })
      this.clearSetTimeout = setTimeout(() => {
        this.pendingRequest.unsubscribe();
        this.blockUI.stop();
      }, 30000);
      }else{
         this.isSignupValidFormSubmitted = false;
         this.toastr.error('something went wrong');
    }

  }


  ngOnInit() {
    this.uploadStudentFormInit();
  }

}
