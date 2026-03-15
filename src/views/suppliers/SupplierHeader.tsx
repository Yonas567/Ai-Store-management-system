import { Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface SupplierHeaderProps {
  onAddClick: () => void;
}

const SupplierHeader = ({ onAddClick }: SupplierHeaderProps) => {
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
      <Typography variant="h4">Suppliers</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} stroke={1.5} />}
        onClick={onAddClick}
      >
        Add Supplier
      </Button>
    </div>
  );
};

export default SupplierHeader;


