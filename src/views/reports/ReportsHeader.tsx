"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  IconDownload,
  IconPrinter,
  IconRefresh,
  IconCalendar,
  IconDotsVertical,
} from "@tabler/icons-react";

interface ReportsHeaderProps {
  onExport?: () => void;
  onPrint?: () => void;
  onRefresh?: () => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  onPeriodChange?: (period: string) => void;
}

const ReportsHeader = ({
  onExport,
  onPrint,
  onRefresh,
  onDateRangeChange,
  onPeriodChange,
}: ReportsHeaderProps) => {
  // Get date string helper
  const getDateString = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
  };

  // Get date range for period
  const getPeriodDates = (period: string) => {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    let startDate = "";

    switch (period) {
      case "daily":
        startDate = endDate;
        break;
      case "weekly":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        startDate = weekAgo.toISOString().split("T")[0];
        break;
      case "monthly":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        startDate = monthAgo.toISOString().split("T")[0];
        break;
      case "3months":
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        startDate = threeMonthsAgo.toISOString().split("T")[0];
        break;
      case "6months":
        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        startDate = sixMonthsAgo.toISOString().split("T")[0];
        break;
      case "yearly":
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        startDate = yearAgo.toISOString().split("T")[0];
        break;
      default:
        startDate = getDateString(30);
    }

    return { startDate, endDate };
  };

  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");
  const [startDate, setStartDate] = useState<string>(getPeriodDates("monthly").startDate);
  const [endDate, setEndDate] = useState<string>(getPeriodDates("monthly").endDate);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handlePeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriod: string | null
  ) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
      const dates = getPeriodDates(newPeriod);
      setStartDate(dates.startDate);
      setEndDate(dates.endDate);
      if (onDateRangeChange) {
        onDateRangeChange(dates.startDate, dates.endDate);
      }
      if (onPeriodChange) {
        onPeriodChange(newPeriod);
      }
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
    setSelectedPeriod("custom");
    if (onDateRangeChange) {
      onDateRangeChange(date, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setEndDate(date);
    setSelectedPeriod("custom");
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
        <Typography variant="h4">Reports & Analytics</Typography>
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
            <MenuItem onClick={handleMenuClose}>Schedule Report</MenuItem>
            <MenuItem onClick={handleMenuClose}>Report Settings</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Period Selection */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Quick Period Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconCalendar size={20} />
            <Typography variant="body2" color="text.secondary">
              Quick Period:
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={selectedPeriod}
            exclusive
            onChange={handlePeriodChange}
            size="small"
            aria-label="report period"
          >
            <ToggleButton value="daily">Daily</ToggleButton>
            <ToggleButton value="weekly">Weekly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="3months">3 Months</ToggleButton>
            <ToggleButton value="6months">6 Months</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Custom Date Range */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Custom Range:
          </Typography>
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
      </Box>
    </Box>
  );
};

export default ReportsHeader;

