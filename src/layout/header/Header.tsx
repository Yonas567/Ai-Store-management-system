"use client";
import React from "react";
import {
  Box,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import Link from "next/link";
// components
import Profile from "./Profile";
import {
  IconBellRinging,
  IconMenu,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useTheme } from "@/utils/ThemeContext";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const { mode, toggleColorMode } = useTheme();

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const ToolbarWrapper = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: theme.spacing(2),
    left: "285px", // Sidebar width
    right: theme.spacing(2),
    zIndex: 1100,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      left: 0,
      right: 0,
      top: 0,
    },
  }));

  const ToolbarContent = styled(Box)(({ theme }) => ({
    maxWidth: "1200px",
    width: "100%",
    borderRadius: "10px",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 1px 3px rgba(0, 0, 0, 0.05)"
        : "0px 1px 3px rgba(0, 0, 0, 0.3)",
    backgroundColor: theme.palette.background.paper,
    backdropFilter: "blur(4px)",
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: "70px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      borderRadius: 0,
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    padding: "0 !important",
  }));

  return (
    <ToolbarWrapper>
      <ToolbarContent>
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                // xs: "inline",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="toggle theme"
            color="inherit"
            onClick={toggleColorMode}
            sx={{ ml: 1 }}
          >
            {mode === "light" ? (
              <IconMoon size="21" stroke="1.5" />
            ) : (
              <IconSun size="21" stroke="1.5" />
            )}
          </IconButton>
          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            {/* <Button
              variant="contained"
              component={Link}
              href="/authentication/login"
              disableElevation
              color="primary"
            >
              Login
            </Button> */}
            <Profile />
          </Stack>
        </ToolbarStyled>
      </ToolbarContent>
    </ToolbarWrapper>
  );
};

export default Header;
