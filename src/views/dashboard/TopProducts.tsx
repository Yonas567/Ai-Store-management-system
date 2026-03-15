"use client";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";

const topProducts = [
  {
    id: 1,
    name: "Paint Can Blue",
    category: "Paint",
    sales: 1250,
    revenue: 31250,
    stock: 450,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Paint Brush Set",
    category: "Tools",
    sales: 890,
    revenue: 17800,
    stock: 320,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Roller Brush",
    category: "Tools",
    sales: 650,
    revenue: 16250,
    stock: 180,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Paint Can Red",
    category: "Paint",
    sales: 420,
    revenue: 10500,
    stock: 95,
    status: "Low Stock",
  },
];

const TopProducts = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <DashboardCard title="Top Products">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table
          aria-label="top products table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Category
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Sales (Qty)
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Revenue
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Stock
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {product.sales}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    ${product.revenue.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {product.stock}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                    }}
                    size="small"
                    label={product.status}
                    color={getStatusColor(product.status) as any}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default TopProducts;


