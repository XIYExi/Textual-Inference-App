import {makeAutoObservable} from "mobx";

interface IUserStore {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    sex: string;
    occupation: string;

    settingId: string;
    mode: string;

    storeUser: (param: any) => void;
    storeSetting: (param: any) => void;
    changeSettingMode: (param:string) => void;
}

class UserStore implements IUserStore {
    id = '';
    name = '';
    email = '';
    password = '';
    avatar = '';
    address = '';
    sex = '';
    occupation = '';

    settingId = '';
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
        this.occupation = user.occupation;
        this.sex = user.sex;
    }

    storeSetting({settingId, mode}: {[key:string]: string}) {
        this.settingId = settingId;
        this.mode = mode;
    }

    changeSettingMode(mode:string) {
        this.mode = mode;
    }

}

export type {IUserStore};

export default UserStore;

