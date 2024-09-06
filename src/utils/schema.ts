export interface UserSchema {
  pk: number;
  id: string;
  name: string;
  password: string;
  messages: MessageSchema[];
  conversations: ConversationSchema[];
  privateConversation: ConversationSchema | null;
  relatedToCurrent: boolean;
  imgUrl: string;
}

export interface MessageSchema {
  id: string;
  body: string;
  createdAt: Date;
  authorId: string;
  conversationId: string;
  author: UserSchema;
  Conversation: ConversationSchema;
  ownMessage: boolean;
}

export interface ConversationSchema {
  id: string;
  title: string;
  messages: MessageSchema[];
  users: UserSchema[];
  type: ConversationType;
  conversationImg: string | null;
}

export enum ConversationType {
  PRIVATE = "PRIVATE",
  GROUP = "GROUP",
}
