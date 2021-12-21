import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "./common/theme";
import GlobalStyle from "./components/style/GlobalStyle";
import ResetStyle from "./components/style/ResetStyle";

export default function ThemeProvider({ children }) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
      <ResetStyle />
      <GlobalStyle />
    </StyledThemeProvider>
  );
}
