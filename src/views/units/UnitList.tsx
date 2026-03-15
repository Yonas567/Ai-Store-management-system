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
  Button,
} from "@mui/material";
import { IconEdit } from "@tabler/icons-react";

interface FilterState {
  unitName: string;
  status: string;
}

interface UnitData {
  id: number;
  name: string;
  symbol: string;
  description: string;
  status: string;
  date: string;
}

interface UnitListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit: (unit: UnitData) => void;
}

const UnitList = ({ filters, onFilterChange, onEdit }: UnitListProps) => {
  const currentStatus = filters?.status || "";

  // Sample data for the table
  const tableData: UnitData[] = [
    {
      id: 1,
      name: "Kilogram",
      symbol: "kg",
      description: "Unit of mass",
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Liter",
      symbol: "L",
      description: "Unit of volume",
      status: "Active",
      date: "2024-01-20",
    },
    {
      id: 3,
      name: "Meter",
      symbol: "m",
      description: "Unit of length",
      status: "Active",
      date: "2024-01-25",
    },
    {
      id: 4,
      name: "Piece",
      symbol: "pcs",
      description: "Unit of count",
      status: "Active",
      date: "2024-02-01",
    },
    {
      id: 5,
      name: "Box",
      symbol: "box",
      description: "Unit of packaging",
      status: "Inactive",
      date: "2024-02-05",
    },
  ];

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
            placeholder="Unit name or symbol"
            value={filters?.unitName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, unitName: e.target.value });
              }
            }}
            sx={{ flex: 1.5, maxWidth: 300 }}
          />
          <FormControl size="small" sx={{ flex: 1.5, maxWidth: 100 }}>
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

        <Table sx={{ minWidth: 650 }} aria-label="unit table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Unit Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Symbol
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Description
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
            {tableData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.symbol}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    color={
                      row.status === "Active" ? "success.main" : "error.main"
                    }
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<IconEdit size={16} />}
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default UnitList;


