
export class AddBook{
    constructor(
        public title:string,
        public author:string,
        public description:string,
        public copies:number,
        public category:string,
        public image?:string|ArrayBuffer|null
    ){}
}
