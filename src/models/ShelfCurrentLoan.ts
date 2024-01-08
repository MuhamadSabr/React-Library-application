import { Book } from "./Book";

export class ShelfCurrentLoans{
    constructor(
        public book:Book,
        public daysLeft:number
        ){}
}
