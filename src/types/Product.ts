import Color from "./Color";
import Season from "./Season";
import Material from "./Material";

export default interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  colors: Color[];
  seasons: Season[];
  materials: Material[];
}
