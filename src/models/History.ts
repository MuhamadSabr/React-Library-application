
export class History{
    constructor(
        public id:number,
        public userEmail:string,
        public checkedOutDate:string,
        public returnedDate:string,
        public title:string,
        public author:string,
        public description:string,
        public image:string
        ){};
}