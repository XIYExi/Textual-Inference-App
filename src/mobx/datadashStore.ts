import {makeAutoObservable} from "mobx";

interface IDatadashStore {
    name: string;
}

class DatadashStore implements IDatadashStore {
    name = 'datadash';

    constructor() {
        makeAutoObservable(this);
    }

    changeName(name:string){
        this.name = name;
    }
}

export type {IDatadashStore};


export default DatadashStore;
