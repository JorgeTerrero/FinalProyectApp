export class User {

    constructor(
    public id_?: string,
    public username?: string,
    public email?: string,
    public passwordHalt?: string,
    public passwordSalt?: string,
    public role?:string,
    public token?:string,
    public status?: boolean
    ) {}

}
