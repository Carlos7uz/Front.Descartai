import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Usar ReactiveFormsModule é uma boa prática
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  // Emite o texto da mensagem quando o usuário a envia
  @Output() send = new EventEmitter<string>();

  // Usamos Reactive Forms mesmo para um único campo para escalabilidade e robustez.
  messageControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  sendMessage(): void {
    if (this.messageControl.valid) {
      const message = this.messageControl.value;
      this.send.emit(message);
      this.messageControl.reset();
    }
  }
}
