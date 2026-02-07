// contexts/ProfileContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

interface SimpleProfileResponse {
  profileImageUrl: string | null;
  url: string;
  name: string;
}

interface ProfileContextData {
  profileData: SimpleProfileResponse | null;
  isLoadingProfile: boolean;
  profileImageError: boolean;
  setProfileImageError: (val: boolean) => void;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<SimpleProfileResponse | null>(
    null
  );
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  // useCallback para estabilizar a referência da função
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoadingProfile(true);
      const response = await api.get<SimpleProfileResponse>("/user/profile");
      setProfileData(response.data);
      setProfileImageError(false);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setProfileData(null);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Só busca se ainda não tem dados carregados
      if (!profileData) {
        fetchProfile();
      }
    } else {
      // Usuário deslogou → limpa tudo
      setProfileData(null);
      setProfileImageError(false);
    }
  }, [user]); // ← depende apenas do user

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        isLoadingProfile,
        profileImageError,
        setProfileImageError,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useProfile deve ser usado dentro de um ProfileProvider");
  }

  return context;
};