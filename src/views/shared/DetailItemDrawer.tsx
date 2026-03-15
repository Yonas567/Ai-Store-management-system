"use client";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";

interface ProductItem {
  id: string;
  barcode: string;
  serialNumber?: string;
  location?: string;
  status: "available" | "sold" | "reserved";
  dateAdded: string;
}

interface CategoryRef {
  id: number;
  name: string;
}

interface DetailItemDrawerProps {
  open: boolean;
  onClose: () => void;
  product: any | null;
  categories?: CategoryRef[];
}

const resolveName = (val: any): string => {
  if (!val) return "N/A";
  if (typeof val === "object" && "name" in val) return val.name;
  return String(val);
};

const resolveCategoryNames = (
  val: any,
  allCategories: CategoryRef[] = [],
): string => {
  if (!val) return "N/A";
  if (Array.isArray(val)) {
    if (val.length === 0) return "N/A";
    return val
      .map((c: any) => {
        if (typeof c === "object" && "name" in c) return c.name;
        const found = allCategories.find((ac) => ac.id === c);
        return found ? found.name : String(c);
      })
      .join(", ");
  }
  return resolveName(val);
};

const getStockStatus = (stock: number) => {
  if (stock === 0) return { label: "Out of Stock", color: "error" as const };
  if (stock < 50) return { label: "Low Stock", color: "warning" as const };
  return { label: "In Stock", color: "success" as const };
};

const DetailItemDrawer = ({
  open,
  onClose,
  product,
  categories = [],
}: DetailItemDrawerProps) => {
  if (!product) return null;

  const stockCount = product.stock_available ?? product.stock ?? 0;
  const stockStatus = getStockStatus(stockCount);
  const categoryDisplay = resolveCategoryNames(product.category, categories);
  const supplierDisplay = resolveName(product.supplier);
  const warehouseDisplay = resolveName(product.warehouse);
  const branchDisplay = resolveName(product.branch);
  const dateDisplay = product.created_at
    ? new Date(product.created_at).toLocaleDateString()
    : product.date || "N/A";

  const items: ProductItem[] =
    product.items ||
    Array.from({ length: stockCount }, (_, index) => ({
      id: `${product.id}-${index + 1}`,
      barcode: `BC${product.id.toString().padStart(3, "0")}${(index + 1)
        .toString()
        .padStart(3, "0")}`,
      serialNumber: `SN${product.id}-${index + 1}`,
      location: index % 2 === 0 ? "Warehouse A" : "Warehouse B",
      status:
        index % 10 === 0 ? "reserved" : index % 15 === 0 ? "sold" : "available",
      dateAdded: dateDisplay,
    }));

  const statusColors = {
    available: "success",
    sold: "error",
    reserved: "warning",
  } as const;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 1000 },
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h5">Product Details</Typography>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Box>

        {/* Main Content - Side by Side */}
        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left Side - Product Details (Narrow) */}
          <Box
            sx={{
              width: 300,
              // borderRight: 1,
              borderColor: "divider",
              p: 3,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Product Image */}
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // bgcolor: "grey.100",
                // borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
                // border: 1,
                borderColor: "divider",
              }}
            >
              {product.image ? (
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src="/top-view-paint-can.jpg"
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>

            {/* Product Name */}
            <div className="flex flex-col gap-10">
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {product.name}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2.5,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Category
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {categoryDisplay}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Price
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {product.price}
                  </Typography>
                </Box>

                {product.costPrice && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Cost Price
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      ${product.costPrice}
                    </Typography>
                  </Box>
                )}

                {product.sellingPrice && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Selling Price
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      ${product.sellingPrice}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Supplier
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {supplierDisplay}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Status
                  </Typography>
                  <Chip
                    label={stockStatus.label}
                    color={stockStatus.color}
                    size="medium"
                    sx={{ mt: 0.5, fontSize: "0.95rem", height: 32 }}
                  />
                </Box>

                {product.sku && (
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      SKU
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontFamily="monospace"
                      sx={{ bgcolor: "grey.100", p: 1.5, borderRadius: 1 }}
                    >
                      {product.sku}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Total Stock
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="info.main">
                    {stockCount} items
                  </Typography>
                </Box>

                {product.minStock && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Minimum Stock
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {product.minStock} items
                    </Typography>
                  </Box>
                )}

                {product.warehouse && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Warehouse
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {warehouseDisplay}
                    </Typography>
                  </Box>
                )}

                {product.branch && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Branch
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {branchDisplay}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ mb: 0.75, fontSize: "0.85rem", fontWeight: 500 }}
                  >
                    Date Added
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {dateDisplay}
                  </Typography>
                </Box>

                {product.description && (
                  <Box sx={{ gridColumn: "span 2", mt: 1 }}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mb: 1, fontSize: "0.85rem", fontWeight: 500 }}
                    >
                      Description
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{
                        lineHeight: 1.7,
                        bgcolor: "grey.50",
                        p: 2,
                        borderRadius: 1,
                        fontSize: "1rem",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            </div>

            {/* Product Details - Two Column Grid */}
          </Box>

          {/* Right Side - Table (Full Height) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                pr: 1,
                pt: 0,
              }}
            >
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",

                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          #
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Barcode
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Serial Number
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Location
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Date Added
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Typography variant="body2">{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {item.barcode}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {item.serialNumber || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {item.location || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={statusColors[item.status]}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {item.dateAdded}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailItemDrawer;
