export interface ISkuRetailerProduct {
  skuVariationIncluded: string;
  description: string;
  barcode: string;
}

export interface IPayloadImportGoods {
  sku: string;
  retailerProductId: string;
  storeId: string;
  wareHouseId: string;
  quantity: number;
  importPrice: string;
  sellingPrice?: string;
}

export interface IImage {
  file: File;
  src: string;
  id: string;
}

export interface IPayloadCreateProduct {
  name: string;
  description: string;
  images: string; // This should be an array of strings
  productSkus: IProductSku[];
  category: string;
}

export interface IProductSku {
  skuVariationIncluded: string;
  description: string;
  barcode: string;
  quantity: number;
  importPrice: string;
  sellingPrice: string;
}
