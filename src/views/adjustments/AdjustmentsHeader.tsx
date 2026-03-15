import { Typography } from "@mui/material";

const AdjustmentsHeader = () => {
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
      <Typography variant="h4">Payment Adjustments</Typography>
    </div>
  );
};

export default AdjustmentsHeader;
