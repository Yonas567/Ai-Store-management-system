import { Typography } from "@mui/material";

interface StockAlertsHeaderProps {}

const StockAlertsHeader = ({}: StockAlertsHeaderProps) => {
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
      <Typography variant="h4">Stock Alerts Determination</Typography>
    </div>
  );
};

export default StockAlertsHeader;


