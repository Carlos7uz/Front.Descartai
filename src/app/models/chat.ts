export type MessageSender = 'user' | 'ai';

export interface Message {
  id: number; // Sempre bom ter um ID para o trackBy
  sender: MessageSender;
  text: string;
  isHtml?: boolean;
}
