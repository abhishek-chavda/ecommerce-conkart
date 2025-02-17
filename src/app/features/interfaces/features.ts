export interface Category {
  id: string;
  name: string;
}

export interface CategoryBrand {
  categoryId: string;
  brands: Brand[];
}

export interface Brand {
  id: string;
  categoryId: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  brandId: string;
  brand: string;
  unitId: string;
  unit: number;
  attributes: {
    color: string[];
    size: string[];
  };
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  brand: string;
  color: string;
  size: string;
}

export interface Attribute {
  id: string;
  color: string[];
  size: string[];
}

export interface Unit {
  id: string;
  name: number;
}

export interface Package {
  id: string;
  productId: string;
  unitId: string;
  attributes: Attribute[];
  brandId: string;
  brand?: Brand;
  category?: Category;
  categoryId: string;
  unit: number;
}
