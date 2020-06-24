export class Container {
 
   constructor(
       public _id?: string,
       public type?: string,
       public payload?:number,
       public capacity?: number , 
       public lenght?:number ,
       public width?:number,
       public  height?:number,
       public status?: boolean 
   ) {}
}
