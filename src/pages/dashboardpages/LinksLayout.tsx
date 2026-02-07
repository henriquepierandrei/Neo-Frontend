import { Outlet } from "react-router-dom";
import { LinksProvider } from "../../contexts/LinksContext";

const LinksLayout = () => (
  <LinksProvider>
    <Outlet />
  </LinksProvider>
);

export default LinksLayout;