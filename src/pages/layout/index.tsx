import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "@/hooks";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useGetUserInfo } from "@/hooks";
import ErrorBoundaryWrapper from "@/components/Helper/ErrorBoundaryWrapper";
import SuspenseWrapper from "@/components/Helper/SuspenseWrapper";

const Layout: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userId = useTypedSelector((state) => state.user.userId);
  const { data } = useGetUserInfo(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        //user={data}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data}
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <ErrorBoundaryWrapper>
          <SuspenseWrapper>
            <Outlet />
          </SuspenseWrapper>
        </ErrorBoundaryWrapper>
      </Box>
    </Box>
  );
};

export default Layout;
