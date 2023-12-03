import {makeAutoObservable} from "mobx";

interface IUserStore {
    name: string;
}

class UserStore implements IUserStore {
    name = 'xiye';

    constructor() {
        makeAutoObservable(this);
    }

    changeName(name:string) {
        this.name = name
    }
}

export type {IUserStore};

export default UserStore;

