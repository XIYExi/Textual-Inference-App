import {makeAutoObservable} from "mobx";

interface IHomeStore {
    name: string;
}

class HomeStore implements IHomeStore {
    name = 'xiye';

    constructor() {
        makeAutoObservable(this);
    }

    changeName(name:string) {
        this.name = name
    }
}

export type {IHomeStore};

export default HomeStore;

