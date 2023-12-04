import {makeAutoObservable} from "mobx";

interface IForgetStore {
    email: string;
}

class ForgetStore implements IForgetStore {
    email = '';

    constructor() {
        makeAutoObservable(this);
    }

    changeEmail(email:string) {
        this.email = email
    }
}

export type {IForgetStore};

export default ForgetStore;
