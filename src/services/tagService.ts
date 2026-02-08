// src/services/tagService.ts

import api from './api';
import type { UserTagsResponse, UserTagsRequest } from '../types/tags.types';

class TagService {
  // Cache de requisições em andamento
  private pendingRequests = new Map<string, Promise<any>>();
  
  // Controle de debounce para updates
  private updateDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private lastUpdateRequest: number[] | null = null;
  
  /**
   * ✅ Buscar tags do usuário logado
   * Previne requisições duplicadas - retorna a Promise existente se já estiver em andamento
   */
  async getUserTags(): Promise<UserTagsResponse> {
    const cacheKey = 'getUserTags';
    
    // Se já existe uma requisição em andamento, retorna ela
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    // Cria nova requisição
    const request = api
      .get<UserTagsResponse>('/user/tags')
      .then(response => {
        this.pendingRequests.delete(cacheKey);
        return response.data;
      })
      .catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });

    // Armazena no cache
    this.pendingRequests.set(cacheKey, request);
    
    return request;
  }

  /**
   * ✅ Atualizar tags do usuário (adicionar/remover)
   * Com debounce de 500ms para agrupar múltiplas chamadas rápidas
   */
  async updateUserTags(
    tagsId: number[], 
    options: { debounce?: boolean; debounceMs?: number } = {}
  ): Promise<UserTagsResponse> {
    const { debounce = true, debounceMs = 500 } = options;

    // Se debounce está desabilitado, executa imediatamente
    if (!debounce) {
      return this.executeUpdate(tagsId);
    }

    // Limpa timer anterior
    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer);
    }

    this.lastUpdateRequest = tagsId;

    // Retorna uma Promise que será resolvida após o debounce
    return new Promise((resolve, reject) => {
      this.updateDebounceTimer = setTimeout(async () => {
        try {
          // Verifica se este ainda é o request mais recente
          if (this.lastUpdateRequest === tagsId) {
            const result = await this.executeUpdate(tagsId);
            resolve(result);
          }
        } catch (error) {
          reject(error);
        } finally {
          this.updateDebounceTimer = null;
        }
      }, debounceMs);
    });
  }

  /**
   * Executa a atualização (método privado)
   */
  private async executeUpdate(tagsId: number[]): Promise<UserTagsResponse> {
    const cacheKey = 'updateUserTags';
    
    // Previne múltiplas requisições simultâneas com os mesmos dados
    const requestKey = `${cacheKey}-${JSON.stringify(tagsId)}`;
    
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const request: UserTagsRequest = { tagsId };
    
    const promise = api
      .put<UserTagsResponse>('/user/tags', request)
      .then(response => {
        this.pendingRequests.delete(requestKey);
        return response.data;
      })
      .catch(error => {
        this.pendingRequests.delete(requestKey);
        throw error;
      });

    this.pendingRequests.set(requestKey, promise);
    
    return promise;
  }

  /**
   * Limpa timers e cache (útil para cleanup em componentes)
   */
  cleanup(): void {
    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer);
      this.updateDebounceTimer = null;
    }
    this.pendingRequests.clear();
    this.lastUpdateRequest = null;
  }
}

export const tagService = new TagService();
export default tagService;