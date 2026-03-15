"use client";
import DashboardCard from "@/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Typography, Chip, Box } from "@mui/material";
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowsExchange,
} from "@tabler/icons-react";

const movements = [
  {
    id: 1,
    time: "10:30 am",
    type: "entry",
    description: "Stock Entry - Paint Can Blue (50 pcs)",
    amount: "$1,000",
    branch: "Branch A",
  },
  {
    id: 2,
    time: "09:15 am",
    type: "outgoing",
    description: "Stock Outgoing - Paint Brush Set (5 pcs)",
    amount: "$100",
    branch: "Branch B",
  },
  {
    id: 3,
    time: "08:45 am",
    type: "transfer",
    description: "Stock Transfer - Roller Brush (20 pcs)",
    from: "Branch A",
    to: "Branch B",
  },
  {
    id: 4,
    time: "08:00 am",
    type: "entry",
    description: "Stock Entry - Paint Can Red (10 pcs)",
    amount: "$200",
    branch: "Branch A",
  },
];

const RecentStockMovements = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "entry":
        return "success";
      case "outgoing":
        return "error";
      case "transfer":
        return "info";
      default:
        return "primary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "entry":
        return <IconArrowDown size={16} />;
      case "outgoing":
        return <IconArrowUp size={16} />;
      case "transfer":
        return <IconArrowsExchange size={16} />;
      default:
        return null;
    }
  };

  return (
    <DashboardCard title="Recent Stock Movements">
      <Timeline
        className="theme-timeline"
        nonce={undefined}
        onReset={undefined}
        onResetCapture={undefined}
        sx={{
          p: 0,
          mb: "-40px",
          "& .MuiTimelineConnector-root": {
            width: "1px",
            backgroundColor: "#efefef",
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {movements.map((movement, index) => (
          <TimelineItem key={movement.id}>
            <TimelineOppositeContent>
              <Typography variant="caption" color="text.secondary">
                {movement.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={getTypeColor(movement.type) as any}
                variant="outlined"
                sx={{
                  borderWidth: 2,
                }}
              >
                {getTypeIcon(movement.type)}
              </TimelineDot>
              {index < movements.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2" fontWeight={500}>
                {movement.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5, alignItems: "center" }}>
                {movement.amount && (
                  <Typography variant="caption" color="text.secondary">
                    {movement.amount}
                  </Typography>
                )}
                {movement.from && movement.to && (
                  <Typography variant="caption" color="text.secondary">
                    {movement.from} → {movement.to}
                  </Typography>
                )}
                <Chip
                  label={movement.branch || movement.type}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: "0.7rem" }}
                />
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentStockMovements;

