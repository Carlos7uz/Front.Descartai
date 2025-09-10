// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Mock da resposta da API do seu colega
  getAiResponse(userMessage: string): Observable<string> {
    const normalizedMessage = userMessage.toLowerCase().trim();
    let aiTextResponse = '';

    if (normalizedMessage.includes('lata')) {
      aiTextResponse = 'Lata de refrigerante deve ser descartada na <strong>lixeira amarela</strong>, destinada a metais.';
    } else if (normalizedMessage.includes('papel')) {
      aiTextResponse = 'Papel deve ser descartado na <strong>lixeira azul</strong>.';
    } else {
      aiTextResponse = 'Desculpe, não tenho informações sobre como descartar isso.';
    }

    // Simula a latência da rede e retorna um Observable com a resposta
    return of(aiTextResponse).pipe(delay(1200));
  }
}
