"use client";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import {
  IconX,
  IconDownload,
  IconPrinter,
  IconArrowLeft,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ReportViewerProps {
  reportId: string;
  reportTitle: string;
  onClose: () => void;
  dateFrom?: string;
  dateTo?: string;
}

const ReportViewer = ({
  reportId,
  reportTitle,
  onClose,
  dateFrom,
  dateTo,
}: ReportViewerProps) => {
  const theme = useTheme();
  const [branchFilter, setBranchFilter] = useState("all");

  // Sample report data - in real app, this would come from API based on reportId
  const reportData = {
    summary: {
      total: 125000,
      count: 342,
      average: 365.5,
    },
    rows: [
      {
        id: 1,
        product: "Paint Can Blue",
        category: "Paint",
        quantity: 450,
        value: 11250,
        branch: "Branch A",
      },
      {
        id: 2,
        product: "Paint Brush Set",
        category: "Tools",
        quantity: 320,
        value: 6400,
        branch: "Branch B",
      },
      {
        id: 3,
        product: "Roller Brush",
        category: "Tools",
        quantity: 180,
        value: 4500,
        branch: "Branch A",
      },
    ],
  };

  const chartOptions: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 350,
    },
    colors: [theme.palette.primary.main],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: reportData.rows.map((r) => r.product),
    },
    yaxis: {
      title: {
        text: "Value ($)",
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val.toLocaleString();
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Value",
      data: reportData.rows.map((r) => r.value),
    },
  ];

  const handleExport = () => {
    console.log("Exporting report:", reportId);
    // Implement export functionality
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onClose} size="small">
            <IconArrowLeft size={20} />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {reportTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dateFrom} to {dateTo}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Branch</InputLabel>
            <Select
              value={branchFilter}
              label="Branch"
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <MenuItem value="all">All Branches</MenuItem>
              <MenuItem value="Branch A">Branch A</MenuItem>
              <MenuItem value="Branch B">Branch B</MenuItem>
              <MenuItem value="Branch C">Branch C</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<IconDownload size={18} />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconPrinter size={18} />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            flex: 1,
            borderLeft: "4px solid",
            borderLeftColor: "primary.main",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Value
          </Typography>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            ${reportData.summary.total.toLocaleString()}
          </Typography>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            flex: 1,
            borderLeft: "4px solid",
            borderLeftColor: "success.main",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Items
          </Typography>
          <Typography variant="h5" fontWeight={700} color="success.main">
            {reportData.summary.count}
          </Typography>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            flex: 1,
            borderLeft: "4px solid",
            borderLeftColor: "info.main",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Average Value
          </Typography>
          <Typography variant="h5" fontWeight={700} color="info.main">
            ${reportData.summary.average.toLocaleString()}
          </Typography>
        </Paper>
      </Box>

      {/* Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Visual Analysis
        </Typography>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
          width="100%"
        />
      </Paper>

      {/* Detailed Table */}
      <Paper sx={{ overflow: "hidden" }}>
        <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
          Detailed Data
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Branch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.product}</TableCell>
                <TableCell>
                  <Chip label={row.category} size="small" variant="outlined" />
                </TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>
                    ${row.value.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>{row.branch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Paper>
  );
};

export default ReportViewer;


