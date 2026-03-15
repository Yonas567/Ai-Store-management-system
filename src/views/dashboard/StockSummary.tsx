"use client";
import { Box, Paper, Typography } from "@mui/material";
import {
  IconPackage,
  IconAlertCircle,
  IconArrowDown,
  IconArrowUp,
} from "@tabler/icons-react";
import DashboardCard from "@/components/shared/DashboardCard";

const StockSummary = () => {
  const stats = {
    totalProducts: 245,
    totalStockValue: 125000,
    lowStockItems: 12,
    outOfStock: 3,
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          flex: "1 1 calc(25% - 12px)",
          minWidth: 200,
          borderLeft: "4px solid",
          borderLeftColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "primary.light",
              color: "primary.contrastText",
            }}
          >
            <IconPackage size={24} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {stats.totalProducts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Products
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          flex: "1 1 calc(25% - 12px)",
          minWidth: 200,
          borderLeft: "4px solid",
          borderLeftColor: "success.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "success.light",
              color: "success.contrastText",
            }}
          >
            <IconArrowDown size={24} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              ${stats.totalStockValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock Value
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          flex: "1 1 calc(25% - 12px)",
          minWidth: 200,
          borderLeft: "4px solid",
          borderLeftColor: "warning.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "warning.light",
              color: "warning.contrastText",
            }}
          >
            <IconAlertCircle size={24} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {stats.lowStockItems}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Low Stock Items
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          flex: "1 1 calc(25% - 12px)",
          minWidth: 200,
          borderLeft: "4px solid",
          borderLeftColor: "error.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "error.light",
              color: "error.contrastText",
            }}
          >
            <IconArrowUp size={24} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {stats.outOfStock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Out of Stock
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StockSummary;


