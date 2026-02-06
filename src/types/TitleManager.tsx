import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "Home",
  "/login": "Login",
  "/register": "Cadastro",
  "/validate-email": "Validar Email",
  "/plans": "Planos",
  "/ranking": "Ranking",

  "/dashboard": "Dashboard",
  "/dashboard/start": "Início",
  "/dashboard/settings": "Configurações",
  "/dashboard/tags": "Tags",
  "/dashboard/logs": "Logs",
  "/dashboard/links": "Links",
  "/dashboard/socialmedia": "Social",
  "/dashboard/assets": "Assets",
  "/dashboard/inventory": "Inventário",
  "/dashboard/customization": "Personalização",
};

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = titles[location.pathname] || "App";
    document.title = `VXO | ${pageTitle}`;
  }, [location.pathname]);

  return null;
}
