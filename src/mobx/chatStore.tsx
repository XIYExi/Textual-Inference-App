import {makeAutoObservable} from "mobx";

export interface IUploadItem {
    /*id: key值 uuid*/
    id: string;

    /*title: 文档的标题*/
    title: string;

}

interface IChatStore {
    name: string;
    openAddon: boolean;
    uploadList: IUploadItem[];
    /*loading: 是否处于加载中，用于更新配置时锁定用户界面*/
    loading: boolean;
    addUploadList: any;
    removeUploadList: any;
    changeOpenAddon: any;
}


class ChatStore implements IChatStore {
    name:string = 'chat';
    openAddon:boolean = false;
    uploadList:IUploadItem[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    changeOpenAddon() {
        this.openAddon = !this.openAddon;

        // 在关闭后处理
        if (!this.openAddon && this.uploadList.length !== 0){

            new Promise((resolve, reject) => {
                // TODO 拉起loading按钮，并在此期间更新配置
                // 开启loading
                this.loading = true;

                setTimeout(() => {
                    console.log('模拟延迟操作...');
                    resolve(this.loading);
                }, 3000)
            })
                .then(res => {
                    console.log('结束推送', res);
                    this.loading = false;
                })
        }
    }

    addUploadList() {

        let title = '这是一个基于机器阅读理解的问答AI模型，希望不要超出边界';
        // 为了让文本再一行显示这里在上传后就进行判断，如果标题超出12个字符那么后面的内容就裁掉，用...替代
        // rn中没有text-overflow，所以需要手动实现
        if (title.length > 12){
            let str = title.substring(0, 13);
            title = str + '...';
        }

        // TODO 添加数据
        this.uploadList.push({
            id: '111x',
            title: title,
        } as IUploadItem)
    }

    removeUploadList(id:string){
        this.uploadList = this.uploadList.filter(item => item.id !== id)
    }

}


export type {IChatStore};


export default ChatStore;
