import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { CustomerDetails } from './customer-details';
import { BrowserModule } from '@angular/platform-browser';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { Router } from '@angular/router';
//import { CustomerDetails } from './customer-details';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  access!:string;
  adminAccess!: string;
  static allcustomer: CustomerDetails[];
  insertUser(regiUser: CustomerDetails) {
    const body=JSON.stringify(regiUser);
    
    console.log(body);
    this.http.post("http://localhost:8088/addcustomer",regiUser).subscribe(data=>{console.log("Thank for registering\nYou can now head over to Login but card will be activated once the admin verifies your data."); this.router.navigateByUrl('/login')}, error=>{console.log(error); alert("Email and account number is already registered!!")});
  }
  
  public validatedUser(username:String, password:String){
    let user= new CustomerDetails();
    console.log("value of username and password is "+username,password);
   this.http.get<CustomerDetails>("http://localhost:8088/validate?username="+username+"&password="+password).subscribe(data=>{
if(data===null){
  alert("Account does not exist")
  }

  console.log("user object is "+data);
  console.log("user object is "+data.customeraccno);
  user.bankname=data.bankname;
  user.carddetails=data.carddetails;
  user.cardtype=data.cardtype;
   user.customeraccno=data.customeraccno;
   user.customeraddress=data.customeraddress;
   user.customerdob=data.customerdob;
   user.customeremail=data.customeremail;
   user.customerid=data.customerid;
   user.customername=data.customername;
   user.customerorderlist=data.customerorderlist;
   user.ifsccode=data.ifsccode
   sessionStorage.setItem('verifiedUser',JSON.stringify(user))
   sessionStorage.setItem('verifiedCard',JSON.stringify(user.carddetails))
  }, error=>{console.log(error)});

  console.log(user);
   return user;
  }

  public afterTransaction(id:number){
    let user= new CustomerDetails();
   this.http.get<CustomerDetails>("http://localhost:8088/afterUserById/"+id).subscribe(data=>{
if(data===null){
  alert("Account does not exist")
  }
  user.bankname=data.bankname;
  user.carddetails=data.carddetails;
  user.cardtype=data.cardtype;
   user.customeraccno=data.customeraccno;
   user.customeraddress=data.customeraddress;
   user.customerdob=data.customerdob;
   user.customeremail=data.customeremail;
   user.customerid=data.customerid;
   user.customername=data.customername;
   user.customerorderlist=data.customerorderlist;
   user.ifsccode=data.ifsccode
   sessionStorage.setItem('verifiedUser',JSON.stringify(user))
   sessionStorage.setItem('verifiedCard',JSON.stringify(user.carddetails))
  }, error=>{console.log(error)});

  console.log(user);
   return user;
  }

  public validateAdmin(username:String, password:String){
    this.http.get<Boolean>("http://localhost:8088/validateAdmin?username="+username+"&password="+password).subscribe(data=>{this.getAllCustomer(); this.adminAccess=JSON.stringify(data)
                                                                                                                              sessionStorage.setItem("adminAccess",JSON.stringify(this.adminAccess))},error=>{alert("Incorrect Credentials")})
  }

  public validateUserEmail(email: String){
    this.http.get<Boolean>("http://localhost:8088/validateUser/"+email).subscribe(data=>{this.access=JSON.stringify(data);
                                                                                              if(this.access=="true"){
                                                                                                alert("Username and password is sent to registered mail address");
                                                                                              }
                                                                                              else{
                                                                                                alert("Incorrent email address, please enter correct emai address or click register if you are new user");
                                                                                              }
                                                                                            });
  }
  private url ="http://localhost:8088";
  constructor(private http:HttpClient, private router:Router) { }

  getAllCustomer(){
    return this.http.get<CustomerDetails[]>(this.url+"/getAllUser").subscribe(data=>{AdminLoginComponent.allcustomer=data; CustomerDetailsService.allcustomer=data;sessionStorage.setItem("allCustomers",JSON.stringify(data)),console.log(sessionStorage.getItem("allCustomers"))});
  }
}
