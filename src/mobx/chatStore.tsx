import {makeAutoObservable} from "mobx";


interface IChatStore {
    name: string;
    openAddon: boolean;
}

class ChatStore implements IChatStore {
    name = 'chat';
    openAddon = false;

    constructor() {
        makeAutoObservable(this);
    }

    changeOpenAddon() {
        this.openAddon = !this.openAddon;
    }


}


export type {IChatStore};


export default ChatStore;
