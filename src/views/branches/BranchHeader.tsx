import { Button, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface BranchHeaderProps {
  onAddClick: () => void;
}

const BranchHeader = ({ onAddClick }: BranchHeaderProps) => {
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
      <Typography variant="h4">Branches</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} stroke={1.5} />}
        onClick={onAddClick}
      >
        Add Branch
      </Button>
    </div>
  );
};

export default BranchHeader;


