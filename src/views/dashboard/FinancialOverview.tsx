"use client";
import { Box, Paper, Typography } from "@mui/material";
import {
  IconCurrencyDollar,
  IconArrowUp,
  IconArrowDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import DashboardCard from "@/components/shared/DashboardCard";

const FinancialOverview = () => {
  const stats = {
    totalRevenue: 45000,
    totalExpenses: 28000,
    netProfit: 17000,
    profitMargin: 37.8,
  };

  return (
    <DashboardCard title="Financial Overview">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              <IconArrowUp size={24} />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h5" fontWeight={700} color="success.main">
                ${stats.totalRevenue.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              <IconArrowDown size={24} />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography variant="h5" fontWeight={700} color="error.main">
                ${stats.totalExpenses.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              <IconCurrencyDollar size={24} />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Net Profit
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                ${stats.netProfit.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconTrendingUp size={18} color="success" />
              <Typography variant="h6" color="success.main">
                {stats.profitMargin}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Profit Margin
            </Typography>
          </Box>
        </Paper>
      </Box>
    </DashboardCard>
  );
};

export default FinancialOverview;


