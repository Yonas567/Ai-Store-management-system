export const dynamic = "force-dynamic";


import { Grid, Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components
import SalesOverview from "@/views/dashboard/SalesOverview";
import YearlyBreakup from "@/views/dashboard/YearlyBreakup";
import RecentTransactions from "@/views/dashboard/RecentTransactions";
import ProductPerformance from "@/views/dashboard/ProductPerformance";
import Blog from "@/views/dashboard/Blog";
import MonthlyEarnings from "@/views/dashboard/MonthlyEarnings";

const Dashboard = () => {
  return (
    <PageContainer
      title="Store Management Dashboard"
      description="Manage your store operations, inventory, sales, and customers from one place"
    >
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <SalesOverview />
          </Grid>
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
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <RecentTransactions />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <ProductPerformance />
          </Grid>
          <Grid size={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
