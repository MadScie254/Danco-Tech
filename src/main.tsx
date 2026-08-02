import { StrictMode } from "react";
import type { JSX, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

const AppThemeProvider = ThemeProvider as (props: {
  children: ReactNode;
  attribute: "data-theme";
  defaultTheme: string;
  enableSystem: boolean;
}) => JSX.Element;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <App />
    </AppThemeProvider>
  </StrictMode>,
);
