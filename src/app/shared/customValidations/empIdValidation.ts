import { AbstractControl, ValidationErrors } from "@angular/forms";


export class empIdValidator{
    public static empId(control : AbstractControl) : ValidationErrors | null{
        let val = control.value;
        if(val){
            let regexp = /^[A-Z]\d{3}/;
           

            let isValid = regexp.test(val);

            if(isValid){
                return null
            }else{
                return{
                    inValidEmpId : `Employee Id should be start with 1 capital letter and end with 3 number`
                }
            }
        }
     else{
        return null
     }   
    }
}