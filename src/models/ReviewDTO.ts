
export class ReviewDTO{

    constructor(
        public rating:number,
        public bookId:number,
        public description?:string
        ){}
}
