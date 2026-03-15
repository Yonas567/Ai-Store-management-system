"use client";
import React from "react";
import Menuitems from "./MenuItems";
import { Box, Typography, useTheme, styled, GlobalStyles } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";

const renderMenuItems = (items: any, pathDirect: any, theme: any) => {
  return items.map((item: any) => {
    const Icon = item.icon ? item.icon : IconPoint;
    const isSelected = pathDirect === item?.href;
    const isDark = theme.palette.mode === "dark";

    const itemIcon = (
      <Icon
        stroke={1.5}
        size="1.3rem"
        color={isSelected && isDark ? "#ffffff" : undefined}
      />
    );

    if (item.subheader) {
      // Display Subheader
      return <Menu subHeading={item.subheader} key={item.subheader} />;
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(item.children, pathDirect, theme)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href}
          borderRadius="8px"
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem>
      </Box>
    );
  });
};

const SidebarWrapper = styled(Box)(({ theme }) => {
  const sidebarBg = theme.palette.background.paper;

  return {
    height: "100%",
    backgroundColor: sidebarBg,
    "& > *": {
      backgroundColor: `${sidebarBg} !important`,
    },
    "& .MuiPaper-root": {
      backgroundColor: `${sidebarBg} !important`,
    },
    // Override react-mui-sidebar text colors - target all text elements
    "& a, & a:not(:hover), & a:not([class*='active'])": {
      color: `${theme.palette.text.primary} !important`,
    },
    "& span:not([class*='icon']):not([class*='badge'])": {
      color: `${theme.palette.text.primary} !important`,
    },
    "& p, & [class*='subheading'], & [class*='Subheader']": {
      color: `${theme.palette.text.secondary} !important`,
    },
    // Target menu item text specifically
    "& [class*='MenuItem'] a, & [class*='MenuItem'] span": {
      color: `${theme.palette.text.primary} !important`,
    },
    "& [class*='Submenu'] a, & [class*='Submenu'] span": {
      color: `${theme.palette.text.primary} !important`,
    },
    // Icons should use secondary color
    "& svg": {
      color: `${theme.palette.text.secondary} !important`,
    },
  };
});

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const theme = useTheme();

  return (
    <SidebarWrapper>
      <GlobalStyles
        styles={{
          ".MuiDrawer-paper a, .MuiDrawer-paper span": {
            color: `${theme.palette.text.primary} !important`,
          },
          ".MuiDrawer-paper p, .MuiDrawer-paper [class*='subheading'], .MuiDrawer-paper [class*='Subheader']":
            {
              color: `${theme.palette.text.secondary} !important`,
            },
          ".MuiDrawer-paper svg": {
            color: `${theme.palette.text.secondary} !important`,
          },
        }}
      />
      <Box
        sx={{
          height: "100%",
          backgroundColor: theme.palette.background.paper,
          "& > div": {
            backgroundColor: `${theme.palette.background.paper} !important`,
          },
          // Force text colors for menu items
          "& a": {
            color: `${theme.palette.text.primary} !important`,
          },
          "& span": {
            color: `${theme.palette.text.primary} !important`,
          },
          "& p": {
            color: `${theme.palette.text.secondary} !important`,
          },
          "& [class*='subheading'], & [class*='Subheader']": {
            color: `${theme.palette.text.secondary} !important`,
          },
        }}
      >
        <MUI_Sidebar
          width={"100%"}
          showProfile={false}
          themeColor={"#5D87FF"}
          themeSecondaryColor={"#49beff"}
        >
          {/* <Logo img="/images/logos/dark-logo.svg" component={Link} to="/">
          Modernize
        </Logo> */}
          <Box sx={{ textAlign: "center", pt: 3, pb: 2 }}>
            <Typography variant="h2" color="primary.main">
              Store MS
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Management System
            </Typography>
          </Box>

          {renderMenuItems(Menuitems, pathDirect, theme)}
          {/* <Box px={2}>
          <Upgrade />
        </Box> */}
        </MUI_Sidebar>
      </Box>
    </SidebarWrapper>
  );
};
export default SidebarItems;
