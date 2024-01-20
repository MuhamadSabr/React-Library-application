export class Book{

    id:number;
    title:string;
    author?:string;
    description?:string;
    copies?:number;
    copiesAvailable?:number;
    category?:string;
    image?:any;

    constructor(id:number, title:string, author?:string, description?:string, copies?:number, copiesAvailable?:number, category?:string, image?:any){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.image = image;
    }
}