import Product from "./Product";

interface ProductsData {
  items: Product[];
  pagination: { page: number; pages: number; total: number };
}
export default ProductsData;
