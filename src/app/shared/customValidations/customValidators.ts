import { AbstractControl, ValidationErrors } from "@angular/forms";



export class NoSpaceValidator{
public static noSpace(control : AbstractControl):ValidationErrors | null{
  let val = control.value as string;

  if(!val){
    return null
  }
  if(val.includes(' ')){
    return{
        noSpaceValidation : 'No space allowed in username!!!'
    }
  }else{
    return null
  }
    }
}