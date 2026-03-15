import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { IconCheck } from "@tabler/icons-react";

interface FilterState {
  productName: string;
  category: string;
}

interface StockAlertData {
  id: number;
  productName: string;
  category: string;
  lowStockThreshold: number;
  inStockThreshold: number;
}

interface StockAlertsListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onThresholdChange?: (id: number, field: string, value: number) => void;
  onSave?: (data: StockAlertData) => Promise<void>;
  data?: StockAlertData[];
  savedItems?: Set<number>;
}

const StockAlertsList = ({
  filters,
  onFilterChange,
  onThresholdChange,
  onSave,
  data,
  savedItems = new Set(),
}: StockAlertsListProps) => {
  // Sample data for the table (fallback if data prop not provided)
  const defaultData: StockAlertData[] = [
    {
      id: 1,
      productName: "Product A",
      category: "Electronics",
      lowStockThreshold: 20,
      inStockThreshold: 50,
    },
    {
      id: 2,
      productName: "Product B",
      category: "Clothing",
      lowStockThreshold: 30,
      inStockThreshold: 100,
    },
    {
      id: 3,
      productName: "Product C",
      category: "Home & Garden",
      lowStockThreshold: 10,
      inStockThreshold: 25,
    },
    {
      id: 4,
      productName: "Product D",
      category: "Sports",
      lowStockThreshold: 25,
      inStockThreshold: 80,
    },
    {
      id: 5,
      productName: "Product E",
      category: "Books",
      lowStockThreshold: 50,
      inStockThreshold: 150,
    },
  ];

  const tableData = data || defaultData;

  const categories = [
    "All Categories",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Food & Beverages",
  ];

  const currentCategory = filters?.category || "All Categories";

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <div className="flex justify-between p-3 gap-4">
          <FormControl size="small" sx={{ flex: 1.2, maxWidth: 350 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={currentCategory}
              onChange={(e) => {
                if (filters && onFilterChange) {
                  onFilterChange({ ...filters, category: e.target.value });
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            size="small"
            placeholder="Product name"
            value={filters?.productName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, productName: e.target.value });
              }
            }}
            sx={{ flex: 1.5, minWidth: 300 }}
          />
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="stock alerts table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Product Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Low Stock Threshold
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  In Stock Threshold
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {row.productName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.lowStockThreshold}
                    onChange={(e) => {
                      if (onThresholdChange) {
                        onThresholdChange(
                          row.id,
                          "lowStockThreshold",
                          parseInt(e.target.value) || 0
                        );
                      }
                    }}
                    sx={{ width: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={row.inStockThreshold}
                    onChange={(e) => {
                      if (onThresholdChange) {
                        onThresholdChange(
                          row.id,
                          "inStockThreshold",
                          parseInt(e.target.value) || 0
                        );
                      }
                    }}
                    sx={{ width: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color={savedItems.has(row.id) ? "success" : "primary"}
                    onClick={async () => {
                      if (onSave) {
                        await onSave(row);
                      }
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: savedItems.has(row.id)
                          ? "success.light"
                          : "primary.light",
                      },
                    }}
                  >
                    <IconCheck size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default StockAlertsList;

