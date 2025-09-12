import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Message } from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ChatMessageComponent,
    ChatInputComponent,
    // TODO
    // LoaderComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
  private chatService = inject(ChatService);

  messages = signal<Message[]>([
    { id: 1, sender: 'ai', text: 'Bem-vindo! Ao DescartAI' },
    { id: 2, sender: 'ai', text: 'Descreva o objeto que deseja jogar fora.' },
  ]);
  isLoading = signal<boolean>(false);

  handleSendMessage(userText: string): void {
    const newUserMessage: Message = { id: Date.now(), sender: 'user', text: userText };
    this.messages.update(currentMessages => [...currentMessages, newUserMessage]);

    this.isLoading.set(true);

    this.chatService.getAiResponse(userText).subscribe(aiText => {
      const newAiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        isHtml: true,
      };

      this.messages.update(currentMessages => [...currentMessages, newAiMessage]);
      this.isLoading.set(false);
    });
  }
}
