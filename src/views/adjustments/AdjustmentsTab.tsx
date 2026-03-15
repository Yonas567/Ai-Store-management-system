"use client";
import { Box, Button, ButtonGroup } from "@mui/material";

interface AdjustmentsTabProps {
  activeTabValue: number;
  onTabChange: (value: number) => void;
}

const AdjustmentsTab = ({
  activeTabValue,
  onTabChange,
}: AdjustmentsTabProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <ButtonGroup fullWidth variant="outlined">
        <Button
          variant={activeTabValue === 0 ? "contained" : "outlined"}
          onClick={() => onTabChange(0)}
          sx={{
            flex: 1,
            py: 1.5,
            fontWeight: activeTabValue === 0 ? 600 : 400,
          }}
        >
          Stock Entry Adjustments
        </Button>
        <Button
          variant={activeTabValue === 1 ? "contained" : "outlined"}
          onClick={() => onTabChange(1)}
          sx={{
            flex: 1,
            py: 1.5,
            fontWeight: activeTabValue === 1 ? 600 : 400,
          }}
        >
          Stock Outgoing Adjustments
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default AdjustmentsTab;
