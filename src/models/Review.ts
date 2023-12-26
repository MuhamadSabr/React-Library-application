
export class Review {

    constructor(
        public id:number,
        public userEmail:string,
        public reviewDate:Date,
        public rating:number,
        public bookId:number,
        public reviewDescription?:string
    ){}

}
