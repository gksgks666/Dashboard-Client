import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useTypedSelector, useRemoveJwt } from "@/hooks";
import { RouterProvider } from "react-router-dom";
import { themeSettings } from "@/styles/theme";
import { Toaster } from "react-hot-toast";
import ErrorBoundaryWrapper from "@/components/Helper/ErrorBoundaryWrapper";
import SuspenseWrapper from "@/components/Helper/SuspenseWrapper";
import router from "@/router";

const App: React.FC = () => {
  const mode = useTypedSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  useRemoveJwt();

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundaryWrapper>
        <SuspenseWrapper>
          <CssBaseline />
          <RouterProvider router={router} />
        </SuspenseWrapper>
      </ErrorBoundaryWrapper>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
};

export default App;
