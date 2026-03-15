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
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

interface FilterState {
  category: string;
  productName: string;
  priceRange: string;
  warehouse: string;
  branch: string;
  stock: string;
  supplier: string;
  status: string;
  date: string;
  timeFrom: string;
  timeTo: string;
}

interface ProductListProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onProductClick?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
}

const getCategoryName = (
  cat: number[] | { id: number; name: string }[] | undefined,
  allCategories: Category[],
): string => {
  if (!cat || !Array.isArray(cat) || cat.length === 0) return "N/A";
  return cat
    .map((c) => {
      if (typeof c === "object" && "name" in c) return c.name;
      const found = allCategories.find((ac) => ac.id === c);
      return found ? found.name : String(c);
    })
    .join(", ");
};

const getSupplierName = (
  sup: string | number | { id: number; name: string } | undefined,
): string => {
  if (!sup) return "N/A";
  if (typeof sup === "object" && "name" in sup) return sup.name;
  return String(sup);
};

const ProductList = ({
  products,
  categories,
  loading,
  filters,
  onFilterChange,
  onProductClick,
  onEdit,
  onDelete,
}: ProductListProps) => {
  const categoryOptions = [
    "All Categories",
    ...categories.map((c) => c.name),
  ];
  const currentCategory = filters?.category || "All Categories";

  const safeProducts = Array.isArray(products) ? products : [];
  const tableData = safeProducts.filter((p) => {
    const matchesCategory =
      !filters?.category || filters.category === "All Categories"
        ? true
        : getCategoryName(p.category, categories).includes(filters.category);
    const matchesName = filters?.productName
      ? p.name.toLowerCase().includes(filters.productName.toLowerCase()) ||
        getSupplierName(p.supplier)
          .toLowerCase()
          .includes(filters.productName.toLowerCase())
      : true;
    return matchesCategory && matchesName;
  });

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
              {categoryOptions.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            size="small"
            placeholder="Product name or supplier"
            value={filters?.productName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, productName: e.target.value });
              }
            }}
            sx={{ flex: 1.5, minWidth: 300 }}
          />
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="product table">
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
                  Unit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Stock Available
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Supplier
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date Added
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No products found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => {
                const stock = row.stock_available ?? 0;
                const statusLabel =
                  stock === 0
                    ? "Out of Stock"
                    : stock < 50
                      ? "Low Stock"
                      : "In Stock";
                const statusColor =
                  statusLabel === "In Stock"
                    ? "success"
                    : statusLabel === "Low Stock"
                      ? "warning"
                      : "error";

                return (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography variant="subtitle2" fontWeight={500}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography color="textSecondary" variant="subtitle2">
                        {getCategoryName(row.category, categories)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography color="textSecondary" variant="subtitle2">
                        {row.measurment_unit
                          ? typeof row.measurment_unit === "object" &&
                            "name" in row.measurment_unit
                            ? row.measurment_unit.name
                            : String(row.measurment_unit)
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography color="textSecondary" variant="subtitle2">
                        {row.stock_available ?? 0}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Chip
                        label={statusLabel}
                        color={statusColor as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography color="textSecondary" variant="subtitle2">
                        {getSupplierName(row.supplier)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => onProductClick && onProductClick(row)}
                    >
                      <Typography color="textSecondary" variant="subtitle2">
                        {row.created_at
                          ? new Date(row.created_at).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() =>
                            onProductClick && onProductClick(row)
                          }
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit && onEdit(row)}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete && onDelete(row.id)}
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default ProductList;
