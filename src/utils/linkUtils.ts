// src/utils/linkUtils.ts

/**
 * Extrai informações do domínio de uma URL
 */
export const extractDomainInfo = (url: string): { 
  domain: string; 
  displayName: string; 
  favicon: string;
  fullDomain: string;
} => {
  try {
    // Adiciona protocolo se não existir
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }
    
    const urlObj = new URL(normalizedUrl);
    const hostname = urlObj.hostname.replace('www.', '');
    
    // Nome para exibição (primeira parte do domínio capitalizada)
    const parts = hostname.split('.');
    const mainPart = parts[0];
    const displayName = mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
    
    return {
      domain: hostname,
      displayName,
      favicon: getFaviconUrl(hostname),
      fullDomain: hostname,
    };
  } catch {
    return {
      domain: url,
      displayName: url,
      favicon: getFaviconUrl(''),
      fullDomain: url,
    };
  }
};

/**
 * Retorna URL do favicon usando Google Favicon Service
 */
export const getFaviconUrl = (domain: string, size: number = 64): string => {
  if (!domain) {
    return `https://www.google.com/s2/favicons?domain=example.com&sz=${size}`;
  }
  
  // Serviços de favicon (em ordem de preferência)
  // 1. Google Favicon API (mais confiável)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  
  // Alternativas:
  // return `https://icon.horse/icon/${domain}`;
  // return `https://favicons.githubusercontent.com/${domain}`;
  // return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=${size}`;
};

/**
 * Valida se uma URL é válida
 */
export const isValidUrl = (url: string): boolean => {
  try {
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }
    new URL(normalizedUrl);
    return true;
  } catch {
    return false;
  }
};

/**
 * Normaliza URL adicionando protocolo se necessário
 */
export const normalizeUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

/**
 * Mapeamento de domínios conhecidos para nomes amigáveis
 */
const knownDomains: Record<string, { name: string; color: string }> = {
  'youtube.com': { name: 'YouTube', color: '#FF0000' },
  'youtu.be': { name: 'YouTube', color: '#FF0000' },
  'instagram.com': { name: 'Instagram', color: '#E4405F' },
  'twitter.com': { name: 'Twitter', color: '#1DA1F2' },
  'x.com': { name: 'X (Twitter)', color: '#000000' },
  'facebook.com': { name: 'Facebook', color: '#1877F2' },
  'tiktok.com': { name: 'TikTok', color: '#000000' },
  'linkedin.com': { name: 'LinkedIn', color: '#0A66C2' },
  'github.com': { name: 'GitHub', color: '#181717' },
  'discord.com': { name: 'Discord', color: '#5865F2' },
  'discord.gg': { name: 'Discord', color: '#5865F2' },
  'twitch.tv': { name: 'Twitch', color: '#9146FF' },
  'spotify.com': { name: 'Spotify', color: '#1DB954' },
  'open.spotify.com': { name: 'Spotify', color: '#1DB954' },
  'pinterest.com': { name: 'Pinterest', color: '#E60023' },
  'reddit.com': { name: 'Reddit', color: '#FF4500' },
  'medium.com': { name: 'Medium', color: '#000000' },
  'behance.net': { name: 'Behance', color: '#1769FF' },
  'dribbble.com': { name: 'Dribbble', color: '#EA4C89' },
  'figma.com': { name: 'Figma', color: '#F24E1E' },
  'notion.so': { name: 'Notion', color: '#000000' },
  'notion.site': { name: 'Notion', color: '#000000' },
  'paypal.com': { name: 'PayPal', color: '#00457C' },
  'paypal.me': { name: 'PayPal', color: '#00457C' },
  'patreon.com': { name: 'Patreon', color: '#FF424D' },
  'ko-fi.com': { name: 'Ko-fi', color: '#FF5E5B' },
  'buymeacoffee.com': { name: 'Buy Me a Coffee', color: '#FFDD00' },
  'amazon.com': { name: 'Amazon', color: '#FF9900' },
  'amazon.com.br': { name: 'Amazon', color: '#FF9900' },
  'aliexpress.com': { name: 'AliExpress', color: '#E62E04' },
  'shopee.com': { name: 'Shopee', color: '#EE4D2D' },
  'shopee.com.br': { name: 'Shopee', color: '#EE4D2D' },
  'mercadolivre.com.br': { name: 'Mercado Livre', color: '#FFE600' },
  'steam.com': { name: 'Steam', color: '#1B2838' },
  'steampowered.com': { name: 'Steam', color: '#1B2838' },
  'epicgames.com': { name: 'Epic Games', color: '#313131' },
  'whatsapp.com': { name: 'WhatsApp', color: '#25D366' },
  'wa.me': { name: 'WhatsApp', color: '#25D366' },
  'telegram.org': { name: 'Telegram', color: '#0088CC' },
  't.me': { name: 'Telegram', color: '#0088CC' },
};

/**
 * Obtém informações de domínio conhecido
 */
export const getKnownDomainInfo = (domain: string): { name: string; color: string } | null => {
  const lowerDomain = domain.toLowerCase();
  
  // Busca direta
  if (knownDomains[lowerDomain]) {
    return knownDomains[lowerDomain];
  }
  
  // Busca por subdomínio (ex: pt.aliexpress.com -> aliexpress.com)
  for (const [key, value] of Object.entries(knownDomains)) {
    if (lowerDomain.endsWith(key) || lowerDomain.includes(key.split('.')[0])) {
      return value;
    }
  }
  
  return null;
};