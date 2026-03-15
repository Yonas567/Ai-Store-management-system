import { Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface StockEntriesHeaderProps {
  onAddClick: () => void;
}

const StockEntriesHeader = ({ onAddClick }: StockEntriesHeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "24px",
      }}
    >
      <Typography variant="h4">Stock Entries</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} stroke={1.5} />}
        onClick={onAddClick}
      >
        Add Stock Entry
      </Button>
    </div>
  );
};

export default StockEntriesHeader;
