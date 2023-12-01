// 用于提供chat channel 存储不同对话的上下文

import React, {ReactNode, useState} from 'react';

interface IAppContext {
    children?: ReactNode;
}


export const AppContext = React.createContext({
    channel: null,
    setChannel: (channel: any) => {},
    thread: null,
    setThread: (thread: any) => {},
});

export const AppProvider = (props: IAppContext) => {
    const {children} = props;
    const [channel, setChannel] = useState<any>();
    const [thread, setThread] = useState<any>();

    return <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => React.useContext(AppContext);
