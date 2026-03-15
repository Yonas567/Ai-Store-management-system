"use client";
import { Box, Paper, Typography } from "@mui/material";
import {
  IconCreditCard,
  IconHandOff,
  IconPackage,
  IconBox,
} from "@tabler/icons-react";

const AdjustmentStat = () => {
  // Sample statistics data
  const stats = {
    creditsFromOthers: 18500, // Amount owed to us (entry adjustments)
    lentToOthers: 12400, // Amount we've lent (outgoing adjustments)
    creditsFromOthersQuantity: 45, // Quantity of items in credits from others
    lentToOthersQuantity: 32, // Quantity of items lent to others
  };

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {/* Credits from Others */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          flex: "1 1 calc(25% - 18px)",
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          borderLeft: "4px solid",
          borderLeftColor: "success.main",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            elevation: 4,
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "success.light",
            color: "success.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 56,
            height: 56,
          }}
        >
          <IconCreditCard size={28} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            ${stats.creditsFromOthers.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Credits from Others
          </Typography>
        </Box>
      </Paper>

      {/* Lent to Others */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          flex: "1 1 calc(25% - 18px)",
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          borderLeft: "4px solid",
          borderLeftColor: "warning.main",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            elevation: 4,
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "warning.light",
            color: "warning.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 56,
            height: 56,
          }}
        >
          <IconHandOff size={28} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            ${stats.lentToOthers.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Lent to Others
          </Typography>
        </Box>
      </Paper>

      {/* Credits from Others - Quantity */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          flex: "1 1 calc(25% - 18px)",
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          borderLeft: "4px solid",
          borderLeftColor: "success.main",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            elevation: 4,
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "success.light",
            color: "success.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 56,
            height: 56,
          }}
        >
          <IconPackage size={28} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            {stats.creditsFromOthersQuantity}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Credits Items (Qty)
          </Typography>
        </Box>
      </Paper>

      {/* Lent to Others - Quantity */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          flex: "1 1 calc(25% - 18px)",
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          borderLeft: "4px solid",
          borderLeftColor: "warning.main",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            elevation: 4,
            transform: "translateY(-2px)",
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "warning.light",
            color: "warning.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 56,
            height: 56,
          }}
        >
          <IconBox size={28} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            {stats.lentToOthersQuantity}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Lent Items (Qty)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdjustmentStat;
