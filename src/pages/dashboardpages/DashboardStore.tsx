import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Award,
  Frame,
  Sparkles,
  Package,
  ChevronRight,
  Star,
  Check,
  Loader2,
  RefreshCw,
  ShoppingCart,
  Eye,
  Filter,
  Search,
  Coins,
  AlertCircle,
  X,
  Lock,
  Crown,
  Zap,
  Gift,
  Tag,
  ImageIcon,
  Video,
  FileCode,
} from "lucide-react";
import React from "react";

// ═══════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════

type StoreItemType = "badge" | "frame" | "effect" | "bundle";
type ItemRarity = "common" | "rare" | "epic" | "legendary";

interface StoreItem {
  id: string;
  name: string;
  description: string;
  type: StoreItemType;
  rarity: ItemRarity;
  price: number;
  svgContent?: string;
  svgUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  preview?: string;
  isOwned: boolean;
  isEquipped: boolean;
  isFavorite: boolean;
  isLimited: boolean;
  discount?: number;
  bundleItems?: string[];
  expiresAt?: string;
  unlockLevel?: number;
}

interface UserInventory {
  coins: number;
  items: StoreItem[];
}

// ═══════════════════════════════════════════════════════════
// DADOS MOCK - SVGs corrigidos (brancos e sem tamanho fixo)
// ═══════════════════════════════════════════════════════════

const MOCK_ITEMS: StoreItem[] = [
  // Insígnias (SVG)
  {
    id: "badge_1",
    name: "Verificado",
    description: "Mostre que você é verificado na plataforma",
    type: "badge",
    rarity: "rare",
    price: 500,
    svgContent: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z" fill="white"/>
      </svg>
    `,
    isOwned: true,
    isEquipped: true,
    isFavorite: true,
    isLimited: false,
  },
  {
    id: "badge_2",
    name: "Premium",
    description: "Insígnia exclusiva para membros premium",
    type: "badge",
    rarity: "epic",
    price: 1200,
    svgContent: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9873,5.73973 C13.5921,5.39577 14,4.74552 14,4 C14,2.89543 13.1046,2 12,2 C10.8954,2 10,2.89543 10,4 C10,4.7472 10.4097,5.39869 11.0168,5.74205 L11.0078,5.76034 C10.3521,7.12693 9.44232,9.08475 8.03664,9.81975 C6.88336,10.4228 5.22628,10.1194 3.99634,9.8944 C3.94215,9.11525 3.29293,8.5 2.5,8.5 C1.67157,8.5 1,9.17157 1,10 C1,10.7347 1.52815,11.346 2.22548,11.4749 L5.17264,19.0836 C5.62005,20.2387 6.7314,21 7.97011,21 L16.0299,21 C17.2686,21 18.3799,20.2387 18.8274,19.0836 L21.7745,11.4749 C22.4718,11.346 23,10.7347 23,10 C23,9.17157 22.3284,8.5 21.5,8.5 C20.7223,8.5 20.0828,9.09186 20.0074,9.84973 C18.7483,10.013 17.1251,10.2213 15.9634,9.61387 C14.5859,8.89364 13.6634,7.07077 12.9873,5.73973 Z" fill="white"/>
      </svg>
    `,
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: true,
    expiresAt: "2024-12-31",
  },
  {
    id: "badge_3",
    name: "Perigoso",
    description: "Para os primeiros usuários mais perigosos da plataforma",
    type: "badge",
    rarity: "legendary",
    price: 0,
    svgContent: `
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M443.008,373.463l-49.543-49.543c10.335-20.911,15.901-44.123,15.901-67.919c0-24.378-5.728-47.44-15.893-67.927 l49.535-49.535c18.248,7.292,39.607,3.377,54.247-11.263c19.661-19.659,19.661-51.65,0.001-71.31 c-6.788-6.787-15.151-11.381-24.194-13.475c-2.094-9.042-6.687-17.406-13.474-24.193c-19.662-19.659-51.651-19.659-71.31,0 c-14.641,14.639-18.556,35.995-11.263,54.248l-48.405,48.405c-21.623-11.67-46.348-18.303-72.595-18.303 s-50.972,6.632-72.595,18.303l-48.406-48.406c7.294-18.251,3.378-39.607-11.262-54.248c-19.661-19.661-51.651-19.662-71.31,0 c-6.787,6.787-11.381,15.151-13.475,24.193c-9.041,2.094-17.407,6.689-24.193,13.475C5.245,65.49,0,78.153,0,91.621 c0,13.468,5.245,26.132,14.769,35.655c14.639,14.639,35.995,18.554,54.248,11.263l49.535,49.535 c-10.164,20.486-15.892,43.549-15.892,67.927c0,23.796,5.565,47.008,15.899,67.919l-49.543,49.543 c-18.254-7.295-39.608-3.378-54.248,11.262C5.245,394.249,0,406.911,0,420.381c0,13.47,5.245,26.132,14.77,35.656 c6.787,6.788,15.151,11.381,24.193,13.475c2.094,9.042,6.689,17.407,13.475,24.193c9.83,9.831,22.743,14.745,35.655,14.745 s25.825-4.915,35.656-14.746c14.641-14.641,18.556-35.995,11.262-54.248l15.428-15.427l0.653,1.02 c1.006,1.571,19.323,29.44,57.938,43.569v-74.553h33.393v82c4.364,0.406,8.89,0.628,13.59,0.628c4.734,0,9.292-0.226,13.687-0.638 v-81.991h33.393v74.517c38.549-14.141,56.835-41.965,57.84-43.533l0.653-1.02l15.427,15.429 c-7.293,18.251-3.377,39.607,11.263,54.247c9.831,9.832,22.741,14.747,35.655,14.746c12.912-0.001,25.826-4.917,35.657-14.746 c6.787-6.787,11.38-15.15,13.474-24.193c9.042-2.094,17.407-6.689,24.192-13.475c19.661-19.661,19.661-51.651,0-71.31 C482.614,370.084,461.259,366.168,443.008,373.463z M204.825,272.153c-15.539,0-28.135-12.597-28.135-28.136 c0-15.539,12.597-28.135,28.135-28.135c15.539,0,28.135,12.597,28.135,28.135C232.961,259.556,220.364,272.153,204.825,272.153z M236.444,323.101l19.568-33.895l19.569,33.895H236.444z M307.199,272.153c-15.539,0-28.135-12.597-28.135-28.136 c0-15.539,12.597-28.135,28.135-28.135c15.539,0,28.135,12.597,28.135,28.135C335.333,259.556,322.738,272.153,307.199,272.153z" fill="white"/>
      </svg>
    `,
    isOwned: true,
    isEquipped: false,
    isFavorite: true,
    isLimited: true,
    unlockLevel: 1,
  },
  {
    id: "badge_4",
    name: "Amor",
    description: "Insígnia para os mais apaixonados",
    type: "badge",
    rarity: "rare",
    price: 800,
    svgContent: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" fill="white"/>
      </svg>
    `,
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: false,
  },
  {
    id: "badge_5",
    name: "Apoiador",
    description: "Insígnia para os apoiadores da plataforma",
    type: "badge",
    rarity: "rare",
    price: 800,
    svgContent: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="white" opacity="0.9"/>
        <path d="M12.5,11h-1a.5.5,0,0,1,0-1H14a1,1,0,0,0,0-2H13a1,1,0,0,0-2,0v.05A2.5,2.5,0,0,0,11.5,13h1a.5.5,0,0,1,0,1H10a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0V16A2.5,2.5,0,0,0,12.5,11Z" fill="rgba(0,0,0,0.7)"/>
      </svg>
    `,
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: false,
  },
  {
    id: "badge_6",
    name: "Estrela",
    description: "Brilhe como uma estrela na comunidade",
    type: "badge",
    rarity: "epic",
    price: 1500,
    svgContent: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
      </svg>
    `,
    isOwned: false,
    isEquipped: false,
    isFavorite: true,
    isLimited: false,
  },

  // Molduras (Imagens)
  {
    id: "frame_1",
    name: "Moldura Dourada",
    description: "Moldura elegante em tom dourado",
    type: "frame",
    rarity: "rare",
    price: 800,
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop",
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: false,
  },
  {
    id: "frame_2",
    name: "Moldura Neon",
    description: "Moldura com efeito neon vibrante",
    type: "frame",
    rarity: "epic",
    price: 1500,
    imageUrl:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    isOwned: true,
    isEquipped: true,
    isFavorite: false,
    isLimited: false,
  },
  {
    id: "frame_3",
    name: "Moldura Cristal",
    description: "Moldura translúcida com brilho cristalino",
    type: "frame",
    rarity: "legendary",
    price: 2500,
    imageUrl:
      "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=400&h=400&fit=crop",
    isOwned: false,
    isEquipped: false,
    isFavorite: true,
    isLimited: true,
    discount: 15,
  },

  // Efeitos (Vídeos)
  {
    id: "effect_1",
    name: "Partículas Mágicas",
    description: "Efeito de partículas flutuantes ao redor do perfil",
    type: "effect",
    rarity: "epic",
    price: 2000,
    videoUrl:
      "https://cdn.pixabay.com/video/2022/05/31/118900-716339716_tiny.mp4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg",
    isOwned: false,
    isEquipped: false,
    isFavorite: true,
    isLimited: false,
  },
  {
    id: "effect_2",
    name: "Aura Divina",
    description: "Aura brilhante que envolve seu perfil",
    type: "effect",
    rarity: "legendary",
    price: 5000,
    videoUrl:
      "https://cdn.pixabay.com/video/2021/08/03/84762-583621827_tiny.mp4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: true,
    discount: 30,
  },
  {
    id: "effect_3",
    name: "Chamas Místicas",
    description: "Chamas etéreas dançando ao redor",
    type: "effect",
    rarity: "epic",
    price: 1800,
    videoUrl:
      "https://cdn.pixabay.com/video/2022/11/28/141257-777837229_tiny.mp4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2017/08/03/13/30/fire-2575558_1280.jpg",
    isOwned: true,
    isEquipped: false,
    isFavorite: false,
    isLimited: false,
  },

  // Pacotes
  {
    id: "bundle_1",
    name: "Pacote Iniciante",
    description: "Pacote completo para começar com estilo",
    type: "bundle",
    rarity: "common",
    price: 2500,
    imageUrl:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
    isOwned: false,
    isEquipped: false,
    isFavorite: false,
    isLimited: false,
    bundleItems: ["badge_1", "frame_1"],
    discount: 20,
  },
  {
    id: "bundle_2",
    name: "Pacote Premium",
    description: "Tudo que você precisa para se destacar",
    type: "bundle",
    rarity: "legendary",
    price: 7500,
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop",
    isOwned: false,
    isEquipped: false,
    isFavorite: true,
    isLimited: true,
    bundleItems: ["badge_2", "frame_2", "effect_1"],
    discount: 40,
    expiresAt: "2024-12-31",
  },
];

const MOCK_USER_COINS = 3500;

// ═══════════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════════

const getRarityColor = (rarity: ItemRarity): string => {
  const colors = {
    common: "#9CA3AF",
    rare: "#3B82F6",
    epic: "#A855F7",
    legendary: "#F59E0B",
  };
  return colors[rarity];
};

const getRarityGlow = (rarity: ItemRarity): string => {
  const glows = {
    common: "0 0 20px rgba(156, 163, 175, 0.5), 0 0 40px rgba(156, 163, 175, 0.3)",
    rare: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
    epic: "0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)",
    legendary: "0 0 25px rgba(245, 158, 11, 0.7), 0 0 50px rgba(245, 158, 11, 0.5), 0 0 75px rgba(245, 158, 11, 0.3)",
  };
  return glows[rarity];
};

const getRarityLabel = (rarity: ItemRarity): string => {
  const labels = {
    common: "Comum",
    rare: "Raro",
    epic: "Épico",
    legendary: "Lendário",
  };
  return labels[rarity];
};

const getTypeIcon = (type: StoreItemType) => {
  const icons = {
    badge: Award,
    frame: Frame,
    effect: Sparkles,
    bundle: Package,
  };
  return icons[type];
};

const getTypeLabel = (type: StoreItemType): string => {
  const labels = {
    badge: "Insígnia",
    frame: "Moldura",
    effect: "Efeito",
    bundle: "Pacote",
  };
  return labels[type];
};

const calculateDiscount = (price: number, discount?: number): number => {
  if (!discount) return price;
  return Math.floor(price * (1 - discount / 100));
};

// ═══════════════════════════════════════════════════════════
// COMPONENTE: Preview de Mídia por Tipo com Brilho
// ═══════════════════════════════════════════════════════════

const ItemMediaPreview = ({
  item,
  size = "medium",
  showPlayButton = false,
}: {
  item: StoreItem;
  size?: "small" | "medium" | "large";
  showPlayButton?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tamanhos padronizados para melhor UX
  const sizeConfig = {
    small: {
      container: "w-16 h-16",
      svg: "w-10 h-10",
      icon: "w-8 h-8",
    },
    medium: {
      container: "w-full h-40",
      svg: "w-20 h-20",
      icon: "w-16 h-16",
    },
    large: {
      container: "w-full h-64",
      svg: "w-32 h-32",
      icon: "w-24 h-24",
    },
  };

  const config = sizeConfig[size];

  useEffect(() => {
    if (item.type === "effect" && videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {});
    }
  }, [item.type, videoError]);

  // Badge (SVG) - Com brilho
  if (item.type === "badge") {
    if (item.svgContent) {
      return (
        <div
          className={`${config.container} flex items-center justify-center p-4 relative`}
        >
          {/* Camada de brilho atrás do SVG */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              filter: `blur(20px)`,
              opacity: 0.6,
            }}
          >
            <div
              className={`${config.svg} rounded-full`}
              style={{
                backgroundColor: getRarityColor(item.rarity),
              }}
            />
          </div>
          
          {/* SVG principal com drop-shadow */}
          <div
            className={`${config.svg} relative z-10`}
            style={{
              filter: `drop-shadow(${getRarityGlow(item.rarity)})`,
            }}
            dangerouslySetInnerHTML={{ __html: item.svgContent }}
          />
        </div>
      );
    }

    if (item.svgUrl) {
      return (
        <div className={`${config.container} flex items-center justify-center p-4 relative`}>
          {/* Brilho de fundo */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ filter: "blur(20px)", opacity: 0.6 }}
          >
            <div
              className={`${config.svg} rounded-full`}
              style={{ backgroundColor: getRarityColor(item.rarity) }}
            />
          </div>
          
          <img
            src={item.svgUrl}
            alt={item.name}
            className={`${config.svg} object-contain relative z-10`}
            style={{
              filter: `drop-shadow(${getRarityGlow(item.rarity)}) brightness(100)`,
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    // Fallback para badge
    return (
      <div className={`${config.container} flex items-center justify-center relative`}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "blur(20px)", opacity: 0.5 }}
        >
          <div
            className={`${config.svg} rounded-full`}
            style={{ backgroundColor: getRarityColor(item.rarity) }}
          />
        </div>
        <FileCode
          className={`${config.icon} relative z-10`}
          style={{
            color: "white",
            filter: `drop-shadow(${getRarityGlow(item.rarity)})`,
          }}
        />
      </div>
    );
  }

  // Frame (Imagem)
  if (item.type === "frame") {
    if (item.imageUrl && !imageError) {
      return (
        <div className={`${config.container} relative overflow-hidden`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--color-text-muted)]" />
            </div>
          )}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        </div>
      );
    }

    return (
      <div
        className={`${config.container} flex items-center justify-center bg-[var(--color-surface)]`}
      >
        <ImageIcon className={`${config.icon} text-[var(--color-text-muted)]`} />
      </div>
    );
  }

  // Effect (Vídeo)
  if (item.type === "effect") {
    if (item.videoUrl && !videoError) {
      return (
        <div className={`${config.container} relative overflow-hidden bg-black`}>
          <video
            ref={videoRef}
            src={item.videoUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            poster={item.thumbnailUrl}
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setVideoError(true);
              setIsLoading(false);
            }}
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          )}

          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Video className="w-6 h-6 text-black" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`${config.container} flex items-center justify-center bg-black`}>
        <Video className={`${config.icon} text-white/50`} />
      </div>
    );
  }

  // Bundle (Imagem ou ícone)
  if (item.type === "bundle") {
    if (item.imageUrl && !imageError) {
      return (
        <div className={`${config.container} relative overflow-hidden`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--color-text-muted)]" />
            </div>
          )}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        </div>
      );
    }

    return (
      <div className={`${config.container} flex items-center justify-center relative`}>
        {/* Brilho para bundle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "blur(20px)", opacity: 0.5 }}
        >
          <div
            className={`${config.svg} rounded-full`}
            style={{ backgroundColor: getRarityColor(item.rarity) }}
          />
        </div>
        <Package
          className={`${config.icon} relative z-10`}
          style={{
            color: "white",
            filter: `drop-shadow(${getRarityGlow(item.rarity)})`,
          }}
        />
      </div>
    );
  }

  return null;
};

// ═══════════════════════════════════════════════════════════
// COMPONENTES BASE
// ═══════════════════════════════════════════════════════════

const StoreCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[var(--card-background-glass)] backdrop-blur-[var(--blur-amount)] border border-[var(--color-border)] rounded-[var(--border-radius-lg)] p-4 sm:p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 sm:mb-6">
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="p-2 sm:p-3 rounded-[var(--border-radius-md)] bg-[var(--color-primary)]/10 flex-shrink-0">
        <Icon size={20} className="sm:w-6 sm:h-6 text-[var(--color-primary)]" />
      </div>
      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-0.5 sm:mt-1">
          {description}
        </p>
      </div>
    </div>
    {action}
  </div>
);

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg bg-[var(--color-background)] backdrop-blur-[var(--blur-amount)] border border-[var(--color-border)] rounded-[var(--border-radius-xl)] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-background)] z-10">
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text)]">
                {title}
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            <div className="p-4 sm:p-6">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  count?: number;
}) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[var(--border-radius-md)] font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
      active
        ? "bg-[var(--color-primary)] text-white shadow-lg"
        : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={16} />
    <span>{label}</span>
    {count !== undefined && (
      <span
        className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
          active ? "bg-white/20" : "bg-[var(--color-background)]"
        }`}
      >
        {count}
      </span>
    )}
  </motion.button>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        className="h-64 bg-[var(--color-surface)] rounded-[var(--border-radius-lg)] border border-[var(--color-border)]"
      />
    ))}
  </div>
);

const EmptyState = ({ type }: { type: StoreItemType | "all" }) => {
  const messages = {
    all: {
      title: "Nenhum item disponível",
      description: "Não há itens disponíveis na loja no momento.",
    },
    badge: {
      title: "Nenhuma insígnia encontrada",
      description: "Não há insígnias disponíveis no momento.",
    },
    frame: {
      title: "Nenhuma moldura encontrada",
      description: "Não há molduras disponíveis no momento.",
    },
    effect: {
      title: "Nenhum efeito encontrado",
      description: "Não há efeitos disponíveis no momento.",
    },
    bundle: {
      title: "Nenhum pacote encontrado",
      description: "Não há pacotes disponíveis no momento.",
    },
  };

  const message = messages[type];
  const Icon = type === "all" ? Store : getTypeIcon(type as StoreItemType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 sm:py-16"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4">
        <Icon
          size={28}
          className="sm:w-8 sm:h-8 text-[var(--color-text-muted)]"
        />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-2">
        {message.title}
      </h3>
      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] text-center max-w-xs">
        {message.description}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════
// COMPONENTE: Item da Loja
// ═══════════════════════════════════════════════════════════

const StoreItemCard = ({
  item,
  userCoins,
  onPreview,
  onPurchase,
  onEquip,
  onFavorite,
  disabled,
}: {
  item: StoreItem;
  userCoins: number;
  onPreview: () => void;
  onPurchase: () => void;
  onEquip: () => void;
  onFavorite: () => void;
  disabled: boolean;
}) => {
  const TypeIcon = getTypeIcon(item.type);
  const rarityColor = getRarityColor(item.rarity);
  const finalPrice = calculateDiscount(item.price, item.discount);
  const canAfford = userCoins >= finalPrice;
  const isLocked = !!(item.unlockLevel && item.unlockLevel > 1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        group relative overflow-hidden
        bg-[var(--color-surface)] border-2 rounded-[var(--border-radius-lg)]
        hover:shadow-xl transition-all duration-300
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
      style={{
        borderColor: item.isEquipped ? rarityColor : "var(--color-border)",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Badges superiores */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2 z-10">
        <div className="flex flex-wrap gap-1">
          {item.isLimited && (
            <span className="px-2 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
              <Zap size={10} />
              LIMITADO
            </span>
          )}
          {item.discount && (
            <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
              <Tag size={10} />
              -{item.discount}%
            </span>
          )}
          {item.isOwned && (
            <span className="px-2 py-1 rounded-full bg-blue-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
              <Check size={10} />
              POSSUI
            </span>
          )}
        </div>

        <motion.button
          onClick={onFavorite}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${
            item.isFavorite
              ? "bg-yellow-500/90 text-white"
              : "bg-black/30 text-white/70 hover:text-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Star size={12} fill={item.isFavorite ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* Preview do Item */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${rarityColor}20, ${rarityColor}05)`,
        }}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock size={32} className="text-white/70 mx-auto mb-2" />
              <p className="text-white text-xs font-semibold">
                Nível {item.unlockLevel} necessário
              </p>
            </div>
          </div>
        )}

        <ItemMediaPreview
          item={item}
          size="medium"
          showPlayButton={item.type === "effect"}
        />

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Informações */}
      <div className="p-4 space-y-3">
        {/* Título e Raridade */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-1 flex-1">
              {item.name}
            </h3>
            <TypeIcon
              size={16}
              className="text-[var(--color-text-muted)] flex-shrink-0"
            />
          </div>
          <p
            className="text-[10px] font-bold uppercase tracking-wide"
            style={{ color: rarityColor }}
          >
            {getRarityLabel(item.rarity)}
          </p>
        </div>

        {/* Descrição */}
        <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>

        {/* Itens do pacote */}
        {item.type === "bundle" && item.bundleItems && (
          <div className="flex items-center gap-1 flex-wrap">
            <Gift size={12} className="text-[var(--color-primary)]" />
            <span className="text-[10px] text-[var(--color-text-muted)]">
              {item.bundleItems.length} itens inclusos
            </span>
          </div>
        )}

        {/* Preço e Ações */}
        <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
          {!item.isOwned ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-yellow-500" />
                  <div className="flex items-baseline gap-1">
                    {item.discount ? (
                      <>
                        <span className="text-xs text-[var(--color-text-muted)] line-through">
                          {item.price}
                        </span>
                        <span className="text-sm font-bold text-[var(--color-text)]">
                          {finalPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-[var(--color-text)]">
                        {item.price === 0 ? "Grátis" : finalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {!canAfford && item.price > 0 && (
                  <span className="text-[10px] text-red-400 font-medium">
                    Moedas insuficientes
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={onPreview}
                  disabled={disabled}
                  className="flex-1 px-3 py-2 rounded-[var(--border-radius-md)] bg-[var(--color-background)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye size={14} />
                  Ver
                </motion.button>

                <motion.button
                  onClick={onPurchase}
                  disabled={disabled || !canAfford || isLocked}
                  className={`
                    flex-1 px-3 py-2 rounded-[var(--border-radius-md)] text-xs font-medium
                    transition-all disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-1
                    ${
                      canAfford && !isLocked
                        ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                        : "bg-[var(--color-surface)] text-[var(--color-text-muted)]"
                    }
                  `}
                  whileHover={canAfford && !isLocked ? { scale: 1.02 } : {}}
                  whileTap={canAfford && !isLocked ? { scale: 0.98 } : {}}
                >
                  <ShoppingCart size={14} />
                  {isLocked ? "Bloqueado" : "Comprar"}
                </motion.button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                  <Check size={14} />
                  Você possui este item
                </span>
                {item.isEquipped && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold">
                    EQUIPADO
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={onPreview}
                  disabled={disabled}
                  className="flex-1 px-3 py-2 rounded-[var(--border-radius-md)] bg-[var(--color-background)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-xs font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye size={14} />
                  Preview
                </motion.button>

                <motion.button
                  onClick={onEquip}
                  disabled={disabled}
                  className={`
                    flex-1 px-3 py-2 rounded-[var(--border-radius-md)] text-xs font-medium
                    transition-all disabled:opacity-50 flex items-center justify-center gap-1
                    ${
                      item.isEquipped
                        ? "bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.isEquipped ? (
                    <>
                      <X size={14} />
                      Desequipar
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      Equipar
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data de expiração */}
      {item.expiresAt && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1 text-[10px] text-amber-400">
            <AlertCircle size={10} />
            <span>
              Expira em {new Date(item.expiresAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════

const DashboardStore = () => {
  // Estados
  const [items, setItems] = useState<StoreItem[]>(MOCK_ITEMS);
  const [userCoins, setUserCoins] = useState(MOCK_USER_COINS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [activeTab, setActiveTab] = useState<StoreItemType | "all">("all");
  const [filterOwned, setFilterOwned] = useState<"all" | "owned" | "not_owned">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Estados do Modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  // Carregar itens da loja
  const loadStoreItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItems(MOCK_ITEMS);
      setUserCoins(MOCK_USER_COINS);
    } catch (err: any) {
      console.error("Erro ao carregar itens:", err);
      setError("Erro ao carregar itens da loja. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoreItems();
  }, [loadStoreItems]);

  // Filtrar itens
  const filteredItems = items.filter((item) => {
    if (activeTab !== "all" && item.type !== activeTab) return false;
    if (filterOwned === "owned" && !item.isOwned) return false;
    if (filterOwned === "not_owned" && item.isOwned) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Contadores para os tabs
  const getCounts = () => {
    return {
      all: items.length,
      badge: items.filter((i) => i.type === "badge").length,
      frame: items.filter((i) => i.type === "frame").length,
      effect: items.filter((i) => i.type === "effect").length,
      bundle: items.filter((i) => i.type === "bundle").length,
    };
  };

  const counts = getCounts();

  // Handlers
  const handlePreview = (item: StoreItem) => {
    setSelectedItem(item);
    setIsPreviewModalOpen(true);
  };

  const handlePurchaseClick = (item: StoreItem) => {
    setSelectedItem(item);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchase = async () => {
    if (!selectedItem) return;

    setIsSubmitting(true);

    try {
      const finalPrice = calculateDiscount(
        selectedItem.price,
        selectedItem.discount
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserCoins((prev) => prev - finalPrice);
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, isOwned: true } : item
        )
      );

      setSuccessMessage(`${selectedItem.name} adquirido com sucesso!`);
      setIsPurchaseModalOpen(false);
      setSelectedItem(null);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      console.error("Erro ao comprar item:", err);
      setError("Erro ao comprar item. Tente novamente.");
      setIsPurchaseModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEquip = async (item: StoreItem) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setItems((prev) =>
        prev.map((i) => {
          if (i.type === item.type && i.id !== item.id && !item.isEquipped) {
            return { ...i, isEquipped: false };
          }
          if (i.id === item.id) {
            return { ...i, isEquipped: !i.isEquipped };
          }
          return i;
        })
      );

      setSuccessMessage(
        item.isEquipped
          ? `${item.name} desequipado!`
          : `${item.name} equipado com sucesso!`
      );

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      console.error("Erro ao equipar item:", err);
      setError("Erro ao equipar item. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFavorite = async (item: StoreItem) => {
    try {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, isFavorite: !i.isFavorite } : i
        )
      );
    } catch (err: any) {
      console.error("Erro ao favoritar item:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[var(--color-text-muted)] mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap pb-2"
        >
          <span>Dashboard</span>
          <ChevronRight
            size={12}
            className="sm:w-[14px] sm:h-[14px] flex-shrink-0"
          />
          <span className="text-[var(--color-text)]">Loja</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] flex items-center gap-2 sm:gap-3">
            <Store className="text-[var(--color-primary)] w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            Personalize seu perfil com itens exclusivos
          </h1>

          {/* Saldo de Moedas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--border-radius-lg)] bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
          >
            <Coins size={20} className="text-yellow-500" />
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                Suas Moedas
              </p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {userCoins.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Error & Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-[var(--border-radius-md)] bg-red-500/10 border border-red-500/30 flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-400 flex-1">{error}</span>
            <button
              onClick={() => setError(null)}
              className="p-1 rounded-full hover:bg-red-500/20 text-red-400"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-[var(--border-radius-md)] bg-green-500/10 border border-green-500/30 flex items-center gap-3"
          >
            <Check size={20} className="text-green-400 flex-shrink-0" />
            <span className="text-sm text-green-400 flex-1">
              {successMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Tabs */}
      <StoreCard className="mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-[var(--border-radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <TabButton
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              icon={Store}
              label="Todos"
              count={counts.all}
            />
            <TabButton
              active={activeTab === "badge"}
              onClick={() => setActiveTab("badge")}
              icon={Award}
              label="Insígnias"
              count={counts.badge}
            />
            <TabButton
              active={activeTab === "frame"}
              onClick={() => setActiveTab("frame")}
              icon={Frame}
              label="Molduras"
              count={counts.frame}
            />
            <TabButton
              active={activeTab === "effect"}
              onClick={() => setActiveTab("effect")}
              icon={Sparkles}
              label="Efeitos"
              count={counts.effect}
            />
            <TabButton
              active={activeTab === "bundle"}
              onClick={() => setActiveTab("bundle")}
              icon={Package}
              label="Pacotes"
              count={counts.bundle}
            />
          </div>

          {/* Ownership Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Filter size={14} />
              <span>Filtrar:</span>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setFilterOwned("all")}
                className={`px-3 py-1.5 rounded-[var(--border-radius-sm)] text-xs font-medium transition-all ${
                  filterOwned === "all"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Todos
              </motion.button>
              <motion.button
                onClick={() => setFilterOwned("owned")}
                className={`px-3 py-1.5 rounded-[var(--border-radius-sm)] text-xs font-medium transition-all ${
                  filterOwned === "owned"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meus Itens
              </motion.button>
              <motion.button
                onClick={() => setFilterOwned("not_owned")}
                className={`px-3 py-1.5 rounded-[var(--border-radius-sm)] text-xs font-medium transition-all ${
                  filterOwned === "not_owned"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Disponíveis
              </motion.button>
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)]">
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "item encontrado"
                  : "itens encontrados"}
              </span>
              <motion.button
                onClick={loadStoreItems}
                disabled={isLoading}
                className="p-2 rounded-[var(--border-radius-sm)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Recarregar itens"
              >
                <RefreshCw
                  size={14}
                  className={isLoading ? "animate-spin" : ""}
                />
              </motion.button>
            </div>
          )}
        </div>
      </StoreCard>

      {/* Items Grid */}
      <StoreCard>
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredItems.length === 0 ? (
          <EmptyState type={activeTab} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <StoreItemCard
                  key={item.id}
                  item={item}
                  userCoins={userCoins}
                  onPreview={() => handlePreview(item)}
                  onPurchase={() => handlePurchaseClick(item)}
                  onEquip={() => handleEquip(item)}
                  onFavorite={() => handleFavorite(item)}
                  disabled={isSubmitting}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </StoreCard>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MODAL: Preview do Item                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedItem(null);
        }}
        title="Preview do Item"
      >
        {selectedItem && (
          <div className="space-y-6">
            {/* Preview grande */}
            <div
              className="relative rounded-[var(--border-radius-lg)] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${getRarityColor(
                  selectedItem.rarity
                )}30, ${getRarityColor(selectedItem.rarity)}10)`,
              }}
            >
              <ItemMediaPreview
                item={selectedItem}
                size="large"
                showPlayButton={selectedItem.type === "effect"}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                {selectedItem.isLimited && (
                  <span className="px-3 py-1.5 rounded-full bg-red-500/90 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                    <Zap size={12} />
                    EDIÇÃO LIMITADA
                  </span>
                )}
                {selectedItem.isOwned && (
                  <span className="px-3 py-1.5 rounded-full bg-blue-500/90 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                    <Check size={12} />
                    VOCÊ POSSUI
                  </span>
                )}
                {selectedItem.isEquipped && (
                  <span className="px-3 py-1.5 rounded-full bg-green-500/90 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                    <Crown size={12} />
                    EQUIPADO
                  </span>
                )}
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    {selectedItem.name}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{
                      backgroundColor: `${getRarityColor(
                        selectedItem.rarity
                      )}20`,
                      color: getRarityColor(selectedItem.rarity),
                    }}
                  >
                    {getRarityLabel(selectedItem.rarity)}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {selectedItem.description}
                </p>
              </div>

              {/* Detalhes */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-[var(--border-radius-md)] bg-[var(--color-surface)]">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">
                    Tipo
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text)] flex items-center gap-1">
                    {React.createElement(getTypeIcon(selectedItem.type), {
                      size: 14,
                    })}
                    {getTypeLabel(selectedItem.type)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">
                    Preço
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text)] flex items-center gap-1">
                    <Coins size={14} className="text-yellow-500" />
                    {selectedItem.price === 0 ? (
                      "Grátis"
                    ) : selectedItem.discount ? (
                      <span className="flex items-center gap-2">
                        <span className="line-through text-[var(--color-text-muted)]">
                          {selectedItem.price}
                        </span>
                        <span className="text-green-400 font-bold">
                          {calculateDiscount(
                            selectedItem.price,
                            selectedItem.discount
                          )}
                        </span>
                      </span>
                    ) : (
                      selectedItem.price
                    )}
                  </p>
                </div>
                {selectedItem.type === "bundle" && selectedItem.bundleItems && (
                  <div className="col-span-2">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">
                      Itens Inclusos
                    </p>
                    <p className="text-sm font-medium text-[var(--color-text)] flex items-center gap-1">
                      <Gift size={14} />
                      {selectedItem.bundleItems.length} itens
                    </p>
                  </div>
                )}
                {selectedItem.expiresAt && (
                  <div className="col-span-2">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">
                      Disponível até
                    </p>
                    <p className="text-sm font-medium text-amber-400 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {new Date(selectedItem.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-4">
                {!selectedItem.isOwned ? (
                  <motion.button
                    onClick={() => {
                      setIsPreviewModalOpen(false);
                      handlePurchaseClick(selectedItem);
                    }}
                    disabled={
                      userCoins <
                      calculateDiscount(
                        selectedItem.price,
                        selectedItem.discount
                      )
                    }
                    className="flex-1 px-4 py-3 rounded-[var(--border-radius-md)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={18} />
                    Comprar Agora
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => {
                      handleEquip(selectedItem);
                      setIsPreviewModalOpen(false);
                    }}
                    className={`flex-1 px-4 py-3 rounded-[var(--border-radius-md)] font-medium transition-all flex items-center justify-center gap-2 ${
                      selectedItem.isEquipped
                        ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedItem.isEquipped ? (
                      <>
                        <X size={18} />
                        Desequipar
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        Equipar
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MODAL: Confirmar Compra                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          setSelectedItem(null);
        }}
        title="Confirmar Compra"
      >
        {selectedItem && (
          <div className="space-y-6">
            {/* Item preview pequeno */}
            <div className="flex items-center gap-4 p-4 rounded-[var(--border-radius-md)] bg-[var(--color-surface)]">
              <div
                className="rounded-[var(--border-radius-md)] overflow-hidden flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${getRarityColor(
                    selectedItem.rarity
                  )}30, ${getRarityColor(selectedItem.rarity)}10)`,
                }}
              >
                <ItemMediaPreview item={selectedItem} size="small" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-text)] truncate">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] truncate">
                  {selectedItem.description}
                </p>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: `${getRarityColor(
                      selectedItem.rarity
                    )}20`,
                    color: getRarityColor(selectedItem.rarity),
                  }}
                >
                  {getRarityLabel(selectedItem.rarity)}
                </span>
              </div>
            </div>

            {/* Resumo da compra */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-[var(--border-radius-sm)] bg-[var(--color-surface)]">
                <span className="text-sm text-[var(--color-text-muted)]">
                  Preço original
                </span>
                <span className="text-sm font-medium text-[var(--color-text)] flex items-center gap-1">
                  <Coins size={14} className="text-yellow-500" />
                  {selectedItem.price}
                </span>
              </div>

              {selectedItem.discount && (
                <div className="flex items-center justify-between p-3 rounded-[var(--border-radius-sm)] bg-green-500/10">
                  <span className="text-sm text-green-400 flex items-center gap-1">
                    <Tag size={14} />
                    Desconto ({selectedItem.discount}%)
                  </span>
                  <span className="text-sm font-medium text-green-400">
                    -
                    {selectedItem.price -
                      calculateDiscount(
                        selectedItem.price,
                        selectedItem.discount
                      )}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-[var(--border-radius-md)] bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/30">
                <span className="text-base font-semibold text-[var(--color-text)]">
                  Total a pagar
                </span>
                <span className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-1">
                  <Coins size={18} className="text-yellow-500" />
                  {calculateDiscount(
                    selectedItem.price,
                    selectedItem.discount
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-[var(--border-radius-sm)] bg-[var(--color-surface)]">
                <span className="text-sm text-[var(--color-text-muted)]">
                  Saldo atual
                </span>
                <span className="text-sm font-medium text-[var(--color-text)] flex items-center gap-1">
                  <Coins size={14} className="text-yellow-500" />
                  {userCoins}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-[var(--border-radius-sm)] bg-[var(--color-surface)]">
                <span className="text-sm text-[var(--color-text-muted)]">
                  Saldo após compra
                </span>
                <span
                  className={`text-sm font-bold flex items-center gap-1 ${
                    userCoins -
                      calculateDiscount(
                        selectedItem.price,
                        selectedItem.discount
                      ) <
                    0
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  <Coins size={14} className="text-yellow-500" />
                  {userCoins -
                    calculateDiscount(
                      selectedItem.price,
                      selectedItem.discount
                    )}
                </span>
              </div>
            </div>

            {/* Aviso se não tiver moedas suficientes */}
            {userCoins <
              calculateDiscount(
                selectedItem.price,
                selectedItem.discount
              ) && (
              <div className="flex items-start gap-3 p-4 rounded-[var(--border-radius-md)] bg-red-500/10 border border-red-500/30">
                <AlertCircle
                  size={20}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-red-400">
                    Moedas insuficientes
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Você precisa de mais{" "}
                    {calculateDiscount(
                      selectedItem.price,
                      selectedItem.discount
                    ) - userCoins}{" "}
                    moedas para comprar este item.
                  </p>
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <motion.button
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setSelectedItem(null);
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 rounded-[var(--border-radius-md)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] font-medium transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                onClick={handlePurchase}
                disabled={
                  isSubmitting ||
                  userCoins <
                    calculateDiscount(
                      selectedItem.price,
                      selectedItem.discount
                    )
                }
                className="flex-1 px-4 py-3 rounded-[var(--border-radius-md)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={
                  isSubmitting ||
                  userCoins <
                    calculateDiscount(
                      selectedItem.price,
                      selectedItem.discount
                    )
                    ? {}
                    : { scale: 1.02 }
                }
                whileTap={
                  isSubmitting ||
                  userCoins <
                    calculateDiscount(
                      selectedItem.price,
                      selectedItem.discount
                    )
                    ? {}
                    : { scale: 0.98 }
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Confirmar Compra
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardStore;