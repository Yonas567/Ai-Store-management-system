"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  IconDownload,
  IconPrinter,
  IconRefresh,
  IconCalendar,
  IconDotsVertical,
} from "@tabler/icons-react";

interface StockHistoryHeaderProps {
  onExport?: () => void;
  onPrint?: () => void;
  onRefresh?: () => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

const StockHistoryHeader = ({
  onExport,
  onPrint,
  onRefresh,
  onDateRangeChange,
}: StockHistoryHeaderProps) => {
  // Get date 30 days ago and today in YYYY-MM-DD format
  const getDateString = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState<string>(getDateString(30));
  const [endDate, setEndDate] = useState<string>(getDateString(0));
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
    if (onDateRangeChange) {
      onDateRangeChange(date, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setEndDate(date);
    if (onDateRangeChange) {
      onDateRangeChange(startDate, date);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Sample stats data
  const stats = {
    totalTransactions: 1247,
    totalValue: 125000,
    entriesCount: 856,
    outgoingCount: 391,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Title and Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4">Stock History</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<IconRefresh size={20} />}
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconDownload size={20} />}
            onClick={onExport}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconPrinter size={20} />}
            onClick={onPrint}
          >
            Print
          </Button>
          <IconButton onClick={handleMenuOpen}>
            <IconDotsVertical size={20} />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>View Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Column Preferences</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Date Range Picker */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconCalendar size={20} />
          <Typography variant="body2" color="text.secondary">
            Date Range:
          </Typography>
        </Box>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Typography variant="body2" color="text.secondary">
          to
        </Typography>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Quick Stats Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: "1 1 calc(25% - 12px)",
            minWidth: 200,
            borderLeft: "4px solid",
            borderLeftColor: "primary.main",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {stats.totalTransactions.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Transactions
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: "1 1 calc(25% - 12px)",
            minWidth: 200,
            borderLeft: "4px solid",
            borderLeftColor: "success.main",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            ${stats.totalValue.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Value
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: "1 1 calc(25% - 12px)",
            minWidth: 200,
            borderLeft: "4px solid",
            borderLeftColor: "info.main",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {stats.entriesCount.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock Entries
          </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            flex: "1 1 calc(25% - 12px)",
            minWidth: 200,
            borderLeft: "4px solid",
            borderLeftColor: "warning.main",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {stats.outgoingCount.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock Outgoing
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StockHistoryHeader;
