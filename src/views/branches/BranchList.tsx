import React, { useState } from "react";
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
  IconButton,
  Collapse,
  Button,
  CircularProgress,
} from "@mui/material";
import { IconChevronDown, IconChevronUp, IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { Branch, Warehouse } from "@/types/branch";

interface FilterState {
  branchName: string;
}

interface BranchListProps {
  branches: Branch[];
  loading: boolean;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit?: (branch: Branch) => void;
  onAddWarehouse?: (branchId: number) => void;
  onEditWarehouse?: (warehouse: Warehouse, branchId: number) => void;
  onDeleteWarehouse?: (warehouseId: number) => void;
}

const BranchList = ({
  branches,
  loading,
  filters,
  onFilterChange,
  onEdit,
  onAddWarehouse,
  onEditWarehouse,
  onDeleteWarehouse,
}: BranchListProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const safeBranches = Array.isArray(branches) ? branches : [];
  const tableData = safeBranches.filter((b) =>
    filters?.branchName
      ? b.name.toLowerCase().includes(filters.branchName.toLowerCase())
      : true,
  );

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

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
            placeholder="Branch name"
            value={filters?.branchName || ""}
            onChange={(e) => {
              if (filters && onFilterChange) {
                onFilterChange({ ...filters, branchName: e.target.value });
              }
            }}
            sx={{ flex: 1.5, maxWidth: 300 }}
          />
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="branch table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }}></TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Branch Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Warehouses Count
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
                    No branches found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => {
                const isExpanded = expandedRow === row.id;
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      sx={{
                        borderTop: 1,
                        borderTopColor: "divider",
                        borderBottom: isExpanded ? 0 : 1,
                        borderBottomColor: "divider",
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleRow(row.id)}
                          sx={{ p: 0.5 }}
                        >
                          {isExpanded ? (
                            <IconChevronUp size={20} />
                          ) : (
                            <IconChevronDown size={20} />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={500}>
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.address || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={500}>
                          {(row.warehouses ?? []).length}
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
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit && onEdit(row)}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                        sx={{
                          borderBottom: 1,
                          borderBottomColor: "divider",
                        }}
                      >
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box
                            sx={{
                              margin: 2,
                              borderLeft: 3,
                              borderLeftColor: "primary.main",
                              pl: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Typography variant="h6" gutterBottom>
                                Warehouses
                              </Typography>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<IconPlus size={16} />}
                                onClick={() =>
                                  onAddWarehouse && onAddWarehouse(row.id)
                                }
                              >
                                Add Warehouse
                              </Button>
                            </Box>
                            {(row.warehouses ?? []).length > 0 ? (
                              <Table
                                size="small"
                                aria-label="warehouses"
                                sx={{
                                  "& .MuiTableRow-root": {
                                    borderBottom: "1px solid",
                                    borderBottomColor: "grey.300",
                                    "&:last-child": {
                                      borderBottom: "none",
                                    },
                                  },
                                  "& .MuiTableCell-root": {
                                    borderBottom: "1px solid",
                                    borderBottomColor: "grey.300",
                                    py: 1.5,
                                  },
                                  "& .MuiTableHead-root .MuiTableCell-root": {
                                    bgcolor: "grey.100",
                                    borderBottom: "2px solid",
                                    borderBottomColor: "grey.400",
                                  },
                                }}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                      >
                                        Warehouse Name
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                      >
                                        Address
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                      >
                                        Date Created
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight={600}
                                      >
                                        Action
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.warehouses.map((warehouse) => (
                                    <TableRow
                                      key={warehouse.id}
                                      hover
                                      sx={{
                                        "&:hover": {
                                          bgcolor: "action.hover",
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        <Typography variant="body2">
                                          {warehouse.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {warehouse.address || "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {warehouse.created_at
                                            ? new Date(
                                                warehouse.created_at,
                                              ).toLocaleDateString()
                                            : "N/A"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Box sx={{ display: "flex", gap: 0.5 }}>
                                          <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                              onEditWarehouse &&
                                              onEditWarehouse(warehouse, row.id)
                                            }
                                          >
                                            <IconEdit size={16} />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                              onDeleteWarehouse &&
                                              onDeleteWarehouse(warehouse.id)
                                            }
                                          >
                                            <IconTrash size={16} />
                                          </IconButton>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ textAlign: "center", py: 2 }}
                              >
                                No warehouses. Click &quot;Add Warehouse&quot; to
                                add one.
                              </Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default BranchList;

