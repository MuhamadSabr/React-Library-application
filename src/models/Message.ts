
export class Message {

    title:string;
    question:string;
    id?:number;
    userEmail?:string;
    adminEmail?:string;
    response?:string;
    closed?:boolean;

    constructor(title:string, question:string){
        this.title = title;
        this.question = question;
    }
}
