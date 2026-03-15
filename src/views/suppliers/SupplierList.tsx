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
} from "@mui/material";
import { IconEdit } from "@tabler/icons-react";

interface FilterState {
  supplierName: string;
  status: string;
}

interface SupplierListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit?: (supplier: any) => void;
}

const SupplierList = ({
  filters,
  onFilterChange,
  onEdit,
}: SupplierListProps) => {
  const currentStatus = filters?.status || "";

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      name: "TechCorp Industries",
      contactPerson: "John Smith",
      email: "john@techcorp.com",
      phone: "+1 234-567-8900",
      products: [
        "Laptop Pro X1",
        "Wireless Mouse",
        "USB-C Cable",
        "Keyboard Mechanical",
        "Monitor 27inch",
      ],
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Fashion Inc",
      contactPerson: "Sarah Johnson",
      email: "sarah@fashion.com",
      phone: "+1 234-567-8901",
      products: [
        "Cotton T-Shirt",
        "Denim Jeans",
        "Leather Jacket",
        "Running Shoes",
        "Baseball Cap",
      ],
      status: "Active",
      date: "2024-01-20",
    },
    {
      id: 3,
      name: "Home Depot Supplies",
      contactPerson: "Mike Williams",
      email: "mike@homedepot.com",
      phone: "+1 234-567-8902",
      products: [
        "Paint Brush Set",
        "Wall Paint Blue",
        "Screwdriver Kit",
        "Hammer",
      ],
      status: "Inactive",
      date: "2024-01-25",
    },
    {
      id: 4,
      name: "Sports World Ltd",
      contactPerson: "Emily Davis",
      email: "emily@sportsworld.com",
      phone: "+1 234-567-8903",
      products: [
        "Basketball",
        "Tennis Racket",
        "Soccer Ball",
        "Yoga Mat",
        "Dumbbells Set",
      ],
      status: "Active",
      date: "2024-02-01",
    },
    {
      id: 5,
      name: "BookStore Publishers",
      contactPerson: "David Brown",
      email: "david@bookstore.com",
      phone: "+1 234-567-8904",
      products: [
        "Programming Guide",
        "Design Patterns",
        "Web Development",
        "Data Structures",
      ],
      status: "Active",
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
          {/* <FormControl size="small" sx={{ flex: 1.2, maxWidth: 350 }}>
            <InputLabel id="supplier-select-label">Supplier</InputLabel>
            <Select
              labelId="supplier-select-label"
              id="supplier-select"
              label="Supplier"
              value={filters?.supplierName || ""}
              onChange={(e) => {
                if (filters && onFilterChange) {
                  onFilterChange({ ...filters, supplierName: e.target.value });
                }
              }}
            >
              <MenuItem value="">All Suppliers</MenuItem>
              <MenuItem value="TechCorp Industries">
                TechCorp Industries
              </MenuItem>
              <MenuItem value="Fashion Inc">Fashion Inc</MenuItem>
              <MenuItem value="Home Depot Supplies">
                Home Depot Supplies
              </MenuItem>
              <MenuItem value="Sports World Ltd">Sports World Ltd</MenuItem>
              <MenuItem value="BookStore Publishers">
                BookStore Publishers
              </MenuItem>
            </Select>
          </FormControl> */}

          <TextField
            fullWidth
            size="small"
            placeholder="Supplier name or Products"
            value={filters?.supplierName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, supplierName: e.target.value });
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

        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Supplier Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Contact Person
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Products
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date Added
                </Typography>
              </TableCell> */}
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
                    {row.contactPerson}
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.email}
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2">
                    {row.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      maxWidth: 400,
                    }}
                  >
                    {row.products.map((product, index) => (
                      <Chip
                        key={index}
                        label={product}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.75rem",
                          height: 24,
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit && onEdit(row)}
                    sx={{ p: 1 }}
                  >
                    <IconEdit size={18} />
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

export default SupplierList;
