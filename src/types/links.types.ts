export interface UserLinkResponse {
  linkId: string; // UUID
  url: string;
  hasLinkTyped: boolean;
  linkTypeId: number | null;
}

export interface UserLinksResponse {
  links: UserLinkResponse[];
}

// Interface local com dados adicionais extraídos
export interface UserLink {
  id: string;
  url: string;
  domain: string;
  favicon: string;
  hasLinkTyped: boolean;
  linkTypeId: number | null;
}