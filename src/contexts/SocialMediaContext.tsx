// src/contexts/SocialMediaContext.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { linkService } from "../services/linkService";
import { detectSocialNetwork } from "../utils/socialUtils";
import type { UserLinkResponse } from "../types/links.types";

// ═══════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════

export interface SocialLink {
  id: string;
  networkId: string;
  url: string;
}

interface SocialMediaContextType {
  socialLinks: SocialLink[];
  isLoadingSocial: boolean;
  refreshSocialLinks: () => Promise<void>;
  addSocialLink: (url: string, typeId: number) => Promise<void>;
  updateSocialLink: (id: string, url: string, typeId: number) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
}

// ═══════════════════════════════════════════════════════════
// CONTEXTO
// ═══════════════════════════════════════════════════════════

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════

export const SocialMediaProvider = ({ children }: { children: ReactNode }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(false);
  const isLoadedRef = useRef(false);
  const isFetchingRef = useRef(false);

  // Transformar resposta da API
  const transformToSocialLink = useCallback((link: UserLinkResponse): SocialLink | null => {
    const socialConfig = detectSocialNetwork(link.url);
    if (!socialConfig) return null;

    return {
      id: link.linkId,
      networkId: socialConfig.id,
      url: link.url,
    };
  }, []);

  // Buscar redes sociais
  const fetchSocialLinks = useCallback(async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoadingSocial(true);

    try {
      const response = await linkService.getUserLinks();

      const socials = response.links
        .map(transformToSocialLink)
        .filter((item): item is SocialLink => item !== null);

      setSocialLinks(socials);
      isLoadedRef.current = true;
    } catch (err) {
      console.error("[SocialMediaContext] Erro ao carregar:", err);
      throw err;
    } finally {
      setIsLoadingSocial(false);
      isFetchingRef.current = false;
    }
  }, [transformToSocialLink]);

  // Refresh (sempre busca)
  const refreshSocialLinks = useCallback(async () => {
    await fetchSocialLinks();
  }, [fetchSocialLinks]);

  // Adicionar
  const addSocialLink = useCallback(async (url: string, typeId: number) => {
    await linkService.addLink(url, typeId);
    await fetchSocialLinks();
  }, [fetchSocialLinks]);

  // Atualizar
  const updateSocialLink = useCallback(async (id: string, url: string, typeId: number) => {
    await linkService.updateLink(id, url, typeId);
    
    const socialConfig = detectSocialNetwork(url);
    if (socialConfig) {
      setSocialLinks((prev) =>
        prev.map((link) =>
          link.id === id ? { ...link, url, networkId: socialConfig.id } : link
        )
      );
    }
  }, []);

  // Deletar
  const deleteSocialLink = useCallback(async (id: string) => {
    await linkService.deleteLink(id);
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const value: SocialMediaContextType = {
    socialLinks,
    isLoadingSocial,
    refreshSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
  };

  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════

export const useSocialMedia = (): SocialMediaContextType => {
  const context = useContext(SocialMediaContext);

  if (!context) {
    throw new Error("useSocialMedia deve ser usado dentro de um SocialMediaProvider");
  }

  return context;
};