import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Topbar from "../../partials/main-menu/Topbar";
import { tokens, useMode } from "../../theme";
import Footer from "../../partials/Footer";

/**
 * This component is a layout component used to render <DocumentDetailView /> 
 * and <CommentReflections /> components
 * @returns 
 */
const DocumentLayout = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const menuItemsText = [
    { id: 1, linkText: `${t("home")}`, to: "/" },
    { id: 2, linkText: `${t("about")}`, to: "/about" },
    { id: 3, linkText: `${t("help_center")}`, to: "/help" },
  ];

  return (
    <div>
      <main className="content">
        <Topbar menuItems={menuItemsText} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default DocumentLayout;
