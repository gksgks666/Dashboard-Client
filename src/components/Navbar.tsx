import { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  ChevronLeft,
} from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "@/rtk/features/globalSlice";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import Button from "@/components/Button/Button";
import { useUserLogout } from "@/hooks";
import { Dispatcher } from "@/types/Common";
import { UserList } from "@/types/API";

interface NavbarProps {
  user?: UserList;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatcher<boolean>;
  isNonMobile: boolean;
}

const Navbar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: NavbarProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { mutate: logout } = useUserLogout();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => logout();

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* 좌측 사이드바 */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "9px",
              gap: "3rem",
              p: "0.1rem 1.5rem",
            }}
          >
            <InputBase placeholder="Search ..." />
          </FlexBetween>
          {/* {!isNonMobile && isSidebarOpen ? (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <ChevronLeft />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
              </IconButton>
              <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search ..." />
              </FlexBetween>
            </>
          )} */}
        </FlexBetween>

        {/* 우측 사이드바 */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ frontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {/* <Box
                component="img"
                alt="profile"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {(user && user.name) || ""}
                </Typography>
                {/* <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography> */}
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Box>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
