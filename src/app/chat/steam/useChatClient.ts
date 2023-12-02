import { useEffect, useState } from 'react';
import { chatClient, chatUserId, chatUserName, chatUserToken} from './chatConfig';

const user = {
    id: chatUserId,
    name: chatUserName,
};

// export const chatClient = StreamChat.getInstance(chatApiKey, chatApiSecret);

export const useChatClient = () => {
    /*是否读取*/
    const [clientIsReady, setClientIsReady] = useState(false);

    useEffect(() => {
        const setupClient = async () => {
            try {
                const answer = await chatClient.connectUser(user, chatUserToken);
                console.log('useChatClient wait connect... : -> ', answer)

                setClientIsReady(true);

                // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
                // But in case you need the chat to load from offline storage first then you should render chat components
                // immediately after calling `connectUser()`.
                // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`An error occurred while connecting the user: ${error.message}`);
                }
            }
        };

        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        if (!chatClient.userID) {
            setupClient();
            // console.log(chatClient.userID)
        }
    }, []);

    return {
        clientIsReady,
    };
};
