import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Message } from '../../models/chat';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  // Recebe o objeto da mensagem como entrada
  @Input({ required: true }) message!: Message;

  // HostBinding é uma prática limpa para adicionar classes ao elemento host
  // com base nas propriedades do componente.
  @HostBinding('class.user-message')
  get isUser(): boolean {
    return this.message.sender === 'user';
  }

  @HostBinding('class.ai-message')
  get isAi(): boolean {
    return this.message.sender === 'ai';
  }
}
