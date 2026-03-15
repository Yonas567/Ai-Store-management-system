"use client";
import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const theme = useTheme();

  // Use defaultMatches to prevent hydration mismatch - assume desktop during SSR
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar with theme-aware colors
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[300] : "#eff2f7",
      borderRadius: "15px",
    },
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                boxSizing: "border-box",
                ...scrollbarStyles,
                width: sidebarWidth,
                backgroundColor: theme.palette.background.paper,
                borderRight: `1px solid ${theme.palette.divider}`,
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            boxShadow: (theme) => theme.shadows[8],
            ...scrollbarStyles,
            backgroundColor: theme.palette.background.paper,
          },
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar Items */}
        {/* ------------------------------------------- */}
        <SidebarItems />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
    </Drawer>
  );
};

export default MSidebar;
