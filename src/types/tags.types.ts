export interface TagResponse {
  tagId: number;
  tagName: string;
}

export interface UserTagsResponse {
  tags: TagResponse[];
}

export interface UserTagsRequest {
  tagsId: number[];
}

// Tag local com dados adicionais (emoji, category)
export interface TagItem {
  id: number; // ID do banco de dados
  name: string;
  emoji: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}