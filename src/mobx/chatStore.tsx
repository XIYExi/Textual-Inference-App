import {makeAutoObservable} from "mobx";


export interface IUploadItem {
    id: string;
    title: string;
}

interface IChatStore {
    name: string;
    openAddon: boolean;
    uploadList: IUploadItem[];
    addUploadList: any;
    removeUploadList: any;
    changeOpenAddon: any;
}

class ChatStore implements IChatStore {
    name:string = 'chat';
    openAddon:boolean = false;
    uploadList:IUploadItem[] = [
        {
            id: '1',
            title: 'hello'
        }
    ];


    constructor() {
        makeAutoObservable(this);
    }

    changeOpenAddon() {
        this.openAddon = !this.openAddon;
    }

    addUploadList() {

        let title = '这是一个基于机器阅读理解的问答AI模型，希望不要超出边界';
        // 为了让文本再一行显示这里在上传后就进行判断，如果标题超出12个字符那么后面的内容就裁掉，用...替代
        // rn中没有text-overflow，所以需要手动实现
        if (title.length > 12){
            let str = title.substring(0, 13);
            title = str + '...';
        }

        this.uploadList.push({
            id: '111x',
            title: title,
        })
    }

    removeUploadList(id:string){
        this.uploadList = this.uploadList.filter(item => item.id !== id)
    }


}


export type {IChatStore};


export default ChatStore;
