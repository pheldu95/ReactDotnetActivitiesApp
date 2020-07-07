export interface IActivity {
    //interfaces usually start with an I. ie IActivity
    //interface is only used for type checking. it's not the same as a class
    id: string;
    title: string;
    description: string;
    category: string;
    daye: Date;
    city: string;
    venue: string;
}