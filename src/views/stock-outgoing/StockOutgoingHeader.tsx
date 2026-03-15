import { Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface StockOutgoingHeaderProps {
  onAddClick: () => void;
}

const StockOutgoingHeader = ({ onAddClick }: StockOutgoingHeaderProps) => {
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
      <Typography variant="h4">Stock Outgoing</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} stroke={1.5} />}
        onClick={onAddClick}
      >
        Add Stock Outgoing
      </Button>
    </div>
  );
};

export default StockOutgoingHeader;
