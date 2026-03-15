import { Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface StockTransferHeaderProps {
  onAddClick: () => void;
}

const StockTransferHeader = ({ onAddClick }: StockTransferHeaderProps) => {
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
      <Typography variant="h4">Stock Transfer</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} stroke={1.5} />}
        onClick={onAddClick}
      >
        Create Transfer
      </Button>
    </div>
  );
};

export default StockTransferHeader;


