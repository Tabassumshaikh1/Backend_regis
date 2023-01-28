import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserAuthService } from '../../ui-features/service/user-auth.service'
;

@Component({
  selector: 'ngx-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss']
})

export class RegisComponent implements OnInit{

  cat:''
  data:''
users:any
male="male";
female="female"
  userDetails:any
role=["user","executiveUser","fieldExecutiveUser"]
myForm=new FormGroup({
  firstName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$'),Validators.minLength(2),Validators.maxLength(20)]),
  lastName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$'),Validators.minLength(2),Validators.maxLength(20)]),
  email:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
  password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]),
  contactNumber:new FormControl('',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]),
  role: new FormControl('', [Validators.required]),
  pincode:new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}'),Validators.maxLength(6)]),
  city:new FormControl('',[Validators.required,Validators.pattern(('[a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+'))]),
  State:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+)')]),
  address:new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(100)]),
  gender:new FormControl(''),

  


  // otp:new FormControl('',[Validators.required,Validators.pattern('[0-9]{ ,6}')]),
})

constructor (private userServ:UserAuthService,private router:Router){}
ngOnInit(): void {
  this.userServ.Getalluser().subscribe((res: any) => {
    this.users = res
   
  })
   
}
get fdata(){
  return this.myForm.controls;
}
imagePath:any='';
errMsg:any=''
  
  upImage(event:any){
      if(event.target.files.length>0){
        this.imagePath = event.target.files[0];
      }
  }
  
  postData()
  {
    if(this.imagePath!=''){
      if(this.imagePath.type==="image/jpg" || this.imagePath.type==="image/jpeg"||this.imagePath.type==="image/png" ){
        let fdata = this.myForm.getRawValue()
        let formdata=new FormData()
        formdata.append("firstName",fdata.firstName)
        formdata.append("lastName",fdata.lastName)
        formdata.append("contactNumber",fdata.contactNumber)
        formdata.append("State",fdata.State)
        formdata.append("password",fdata.password)
        formdata.append("pincode",fdata.pincode)
        formdata.append("role",fdata.role)
        formdata.append("city",fdata.city)
        formdata.append("email",fdata.email)
        formdata.append("gender",fdata.gender)
        formdata.append("address",fdata.address)
        formdata.append("attach",this.imagePath)
        console.log("formdata is",formdata)
        this.userServ.postRegis(formdata).subscribe((res: any) => {
     
          console.log("res1:" + res.uid)
        
          if (res.err == 0) {
            setInterval(() => {
     this.router.navigate(['pages/ui-features/otp-page']).then(() => {
                this.userServ.setData(res.uid);
              })
            })
          }
          if (res.err == 1) {
            Swal.fire(`${res.msg}`,'','warning');
          }
        })
      }


    }
    else{
      this.errMsg="Only support jpeg png and jpg format"
    }
    


    
   

}
}
