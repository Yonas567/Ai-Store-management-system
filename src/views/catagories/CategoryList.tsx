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
  CircularProgress,
} from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Category } from "@/types/category";

interface FilterState {
  categoryName: string;
  status: string;
}

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: number) => void;
}

const CategoryList = ({
  categories,
  loading,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  const currentStatus = filters?.status || "";

  const safeCategories = Array.isArray(categories) ? categories : [];
  const tableData = safeCategories.filter((cat) => {
    const matchesName = filters?.categoryName
      ? cat.name.toLowerCase().includes(filters.categoryName.toLowerCase()) ||
        (cat.description ?? "")
          .toLowerCase()
          .includes(filters.categoryName.toLowerCase())
      : true;
    const matchesStatus = filters?.status
      ? (cat.status ?? "").toLowerCase() === filters.status.toLowerCase()
      : true;
    return matchesName && matchesStatus;
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
          <TextField
            fullWidth
            size="small"
            placeholder="Category name or description"
            value={filters?.categoryName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, categoryName: e.target.value });
              }
            }}
            sx={{ flex: 1.5, maxWidth: 350 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              label="Status"
              value={currentStatus}
              onChange={(e) => {
                if (filters && onFilterChange) {
                  onFilterChange({ ...filters, status: e.target.value });
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="category table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Category Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Products Count
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date Created
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
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No categories found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={500}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2">
                      {row.description || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={500}>
                      {row.products_count ?? 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      color={
                        (row.status ?? "").toLowerCase() === "active"
                          ? "success.main"
                          : "error.main"
                      }
                    >
                      {row.status || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default CategoryList;
