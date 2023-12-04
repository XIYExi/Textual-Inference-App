import {createContext} from "react";
import HomeStore from "./homeStore";
import DatadashStore from "./datadashStore";
import ChatStore from "./chatStore";
import UserStore from "./userStore";
import ForgetStore from "./forgetStore";


// 封装store供ctx使用
export const stores = {
    homeStore: new HomeStore(),
    datadashStore: new DatadashStore(),
    chatStore: new ChatStore(),
    userStore: new UserStore(),
    forgetStore: new ForgetStore(),
}

export const useStore = createContext(stores);

