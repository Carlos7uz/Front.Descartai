import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoaderComponent } from '../../components/loader/loader.component';
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
    LoaderComponent,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
  // Injeção de dependência moderna com inject()
  private chatService = inject(ChatService);

  // Gerenciamento de estado reativo com Signals
  messages = signal<Message[]>([
    { id: 1, sender: 'ai', text: 'Bem-vindo! Ao DescartAI' },
    { id: 2, sender: 'ai', text: 'Descreva o objeto que deseja jogar fora.' },
  ]);
  isLoading = signal<boolean>(false);

  // Função chamada pelo evento (send) do app-chat-input
  handleSendMessage(userText: string): void {
    // Adiciona a mensagem do usuário ao estado
    const newUserMessage: Message = { id: Date.now(), sender: 'user', text: userText };
    this.messages.update(currentMessages => [...currentMessages, newUserMessage]);

    this.isLoading.set(true);

    // Chama o serviço
    this.chatService.getAiResponse(userText).subscribe(aiText => {
      const newAiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        isHtml: true, // A resposta da IA pode conter HTML
      };

      this.messages.update(currentMessages => [...currentMessages, newAiMessage]);
      this.isLoading.set(false);
    });
  }
}
