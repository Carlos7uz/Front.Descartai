// src/app/services/chat.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly #http = inject(HttpClient)
  readonly #apiUrl = 'http://localhost:3000/chat';

  getAiResponse(userMessage: string): Observable<string> {
    const body = { prompt: userMessage };

    return this.#http.post<ApiResponse>(this.#apiUrl, body).pipe(
      map(response => response.response),
      catchError(error => {
        console.error('Erro na chamada da API do back-end', error);
        return of('Desculpa, não consegui me conectar ao servidor. tente novamente mais tarde.');
      })
    );
  }


  // Mock da resposta da API do seu colega
  getMockResponse(userMessage: string): Observable<string> {
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
