import {StreamChat} from "stream-chat";

export const chatApiKey = '95yk9fe5a4gb';
export const chatApiSecret = 'abp7mrpj4hwgs4qdnez7p65nc2ythdgxr3dsy25w9db5s9hb4m65j5pkmpjcrb32';

// chatConfig.js
export const chatUserId = 'xiyexi';
// 2023.12.1 100000000000000分钟后过期
export const chatUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoieGl5ZXhpIiwiZXhwIjo2MDAwMDAxNzAxNTAyNTE0fQ.KwiINTlNWbpVd8b1PLOXkoPHI6STo5PvyoVa-Owb2_E';
export const chatUserName = 'xiyexi';


type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

export type StreamChatGenerics = {
    attachmentType: LocalAttachmentType;
    channelType: LocalChannelType;
    commandType: LocalCommandType;
    eventType: LocalEventType;
    messageType: LocalMessageType;
    reactionType: LocalReactionType;
    userType: LocalUserType;
};

export const chatClient = StreamChat.getInstance<StreamChatGenerics>(chatApiKey);




