// src/services/tagService.ts

import api from './api';
import type { UserTagsResponse, UserTagsRequest } from '../types/tags.types';

class TagService {
  
  // ✅ Buscar tags do usuário logado
  async getUserTags(): Promise<UserTagsResponse> {
    const response = await api.get<UserTagsResponse>('/user/tags');
    return response.data;
  }

  // ✅ Atualizar tags do usuário (adicionar/remover)
  async updateUserTags(tagsId: number[]): Promise<UserTagsResponse> {
    const request: UserTagsRequest = { tagsId };
    const response = await api.put<UserTagsResponse>('/user/tags', request);
    return response.data;
  }
}

export const tagService = new TagService();
export default tagService;