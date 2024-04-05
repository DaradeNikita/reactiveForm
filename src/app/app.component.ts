import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {CustomRegex } from './shared/const/validation';
import { NoSpaceValidator } from './shared/customValidations/customValidators';
import { empIdValidator } from './shared/customValidations/empIdValidation';
import { countries } from './shared/const/countries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'reactiveForms';

  reactiveForm! :FormGroup;
  genderArray : string[] = ['Male','Female','Others']
  countriesArray:Array<string> = countries;
  constructor(){

  }

  ngOnInit(): void {
    this.createReactiveForm();
    this.permeantAddress();
    this.form['password']
    .valueChanges
    .subscribe(changedVal =>{
      console.log(changedVal);
      if(this.form['password'].valid){
        this.form['confirmPassword'].enable()
      }else{
        this.form['confirmPassword'].disable()
      }
    })
  }

  createReactiveForm(){
   this.reactiveForm = new FormGroup({
    userName : new FormControl(null,
      [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      Validators.pattern(CustomRegex.username),
      NoSpaceValidator.noSpace]),
    email : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)]),
    empId : new FormControl(null,[Validators.required,empIdValidator.empId]),
    gender : new FormControl(null,[Validators.required]),
    skills : new FormArray([new FormControl (null)]),
    currentAddress : new FormGroup({
     country : new FormControl(null,[Validators.required]),
      state : new FormControl(null,[Validators.required]),
      city : new FormControl(null,[Validators.required]),
      zipCode : new FormControl(null,[Validators.required]),
    }),
   premanantAddress : new FormGroup({
      country : new FormControl(null,[Validators.required]),
       state : new FormControl(null,[Validators.required]),
       city : new FormControl(null,[Validators.required]),
       zipCode : new FormControl(null,[Validators.required]),
     }),
     checkAddress : new FormControl(false),
    password : new FormControl(null,[Validators.required, 
    Validators.pattern(CustomRegex.password)]),
    confirmPassword : new FormControl({value : null, disabled: true},[Validators.required]),
   })
  }
 get skillsFormArray(){
    return this.reactiveForm.get('skills')as FormArray
  }
  onSkillsAdd(){
  if(this.skillsFormArray.length < 5){
    let skillControl =  new FormControl(null);
    this.skillsFormArray.push(skillControl)
  }
  }
  onSkillsRemove(i : any){
    this.skillsFormArray.removeAt(i)

  }
  onReactiveFormSubmit(){

   if(this.reactiveForm.valid){
    // console.log(this.reactiveForm);
    // console.log(this.reactiveForm.value);
    this.reactiveForm.reset()
  }
   }

 

   get form(){
    return this.reactiveForm.controls 
   }

 
  permeantAddress(){
     this.form['checkAddress'].valueChanges
     .subscribe(res =>{
      console.log(res);
      if(res){
        this.form['premanantAddress'].patchValue(this.form['currentAddress'].value)
        this.form['premanantAddress'].disable()
      }else{
        this.form['premanantAddress'].reset()
        this.form['premanantAddress'].enable()
      }
      
     })
  }
}




