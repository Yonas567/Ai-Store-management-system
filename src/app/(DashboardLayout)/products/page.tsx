export const dynamic = "force-dynamic";

import Product from "@/views/products/Product";
import PageContainer from "@/components/container/PageContainer";

const ProductApp = () => {
  return (
    <PageContainer title="Products" description="Manage your products">
      <div style={{ width: "100%" }}>
      <Product />
    </div>
    </PageContainer>
  );
};

export default ProductApp;
