import {makeAutoObservable} from "mobx";

// 封装chat页面中用户的基本信息
export type TChatUser = {
    id: string;
    name: string;
    avatar: string;
}
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
    changeSettingMode: (param: string) => void;
    getChannelUserMessage: () => TChatUser;
}

class UserStore implements IUserStore {
    id = '';
    name = '';
    email = '';
    password = '';
    avatar = 'https://s11.ax1x.com/2023/12/18/pi57r7D.png';
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

    getChannelUserMessage() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar
        }
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

