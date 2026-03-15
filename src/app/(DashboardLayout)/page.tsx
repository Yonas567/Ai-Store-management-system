export const dynamic = "force-dynamic";


import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import SalesOverview from "@/views/dashboard/SalesOverview";
import YearlyBreakup from "@/views/dashboard/YearlyBreakup";
import RecentTransactions from "@/views/dashboard/RecentTransactions";
import ProductPerformance from "@/views/dashboard/ProductPerformance";
import MonthlyEarnings from "@/views/dashboard/MonthlyEarnings";
import StockSummary from "@/views/dashboard/StockSummary";
import FinancialOverview from "@/views/dashboard/FinancialOverview";
import TopProducts from "@/views/dashboard/TopProducts";
import RecentStockMovements from "@/views/dashboard/RecentStockMovements";

const Dashboard = () => {
  return (
    <PageContainer
      title="Stock Management Dashboard"
      description="Overview of your stock operations, sales, inventory, and financial performance"
    >
      <Box>
        <Grid container spacing={3}>
          {/* Stock Summary Cards */}
          <Grid size={12}>
            <StockSummary />
          </Grid>

          {/* Sales Overview Chart */}
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <SalesOverview />
          </Grid>

          {/* Financial Overview */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <FinancialOverview />
          </Grid>

          {/* Yearly Breakup & Monthly Earnings */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <YearlyBreakup />
              </Grid>
              <Grid size={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Stock Movements */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <RecentStockMovements />
          </Grid>

          {/* Recent Transactions */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <RecentTransactions />
          </Grid>

          {/* Top Products */}
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <TopProducts />
          </Grid>

          {/* Product Performance */}
          <Grid size={12}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
