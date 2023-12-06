import {makeAutoObservable} from "mobx";

interface IUserStore {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    address: string;

    settingId: string;
    language: string;
    mode: string;

    storeUser: (param: any) => void;
    storeSetting: (param: any) => void;
    changeSettingMode: (param:string) => void;
    changeSettingLanguage:(para:string) => void;
}

class UserStore implements IUserStore {
    id = '';
    name = '';
    email = '';
    password = '';
    avatar = '';
    address = '';

    settingId = '';
    language = '';
    mode = '';

    constructor() {
        makeAutoObservable(this);
    }

    storeUser(user: IUserStore & {[key:string]:any}) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.avatar = user.avatar;
        this.address = user.address;
    }

    storeSetting({settingId, language, mode}: {[key:string]: string}) {
        this.settingId = settingId;
        this.language = language;
        this.mode = mode;
    }

    changeSettingMode(mode:string) {
        this.mode = mode;
    }

    changeSettingLanguage(language:string) {
        this.language = language;
    }

}

export type {IUserStore};

export default UserStore;

