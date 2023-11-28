import {createContext} from "react";
import HomeStore from "./homeStore";
import DatadashStore from "./datadashStore";
import ChatStore from "./chatStore";


// 封装store供ctx使用
export const stores = {
    homeStore: new HomeStore(),
    datadashStore: new DatadashStore(),
    chatStore: new ChatStore(),
}

export const useStore = createContext(stores);

