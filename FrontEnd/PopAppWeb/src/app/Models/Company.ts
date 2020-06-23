export class Company {
  constructor(
    public _id?:string,
    public name?: string,
    public code?: string,
    public adress?: string,
    public phone?:string,
    public status?: boolean
  ) {}
}
