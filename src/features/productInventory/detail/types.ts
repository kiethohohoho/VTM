export interface IProductDictionaryModel {
  productDictionaryId: string;
  name: string;
  barcode: string;
  description: string;
  status: number;
  isDeleted: number;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
}

export interface IDictionaryVariantDetail {
  productDictionaryVariantDetailId: string;
  value: string;
  code: string;
  productDictionaryVariantId: string;
}

export interface IVariantModel {
  productVariantId: string;
  name: string;
  description: string;
  categoryId: string;
  dictionaryVariantDetailModels: IDictionaryVariantDetail[];
}

export interface IGoodsModel {
  goodsId: string;
  sku: string;
  quantityAvailable: number;
  warehouseId: string;
  productDictionaryId: string;
}

export interface IProduct {
  productDictionaryModel: {
    productDictionaryId: string;
    name: string;
    code: string;
    description: string;
    images: string;
    status: number;
    skuModel: ISKUModel;
  };
  productSource: number;
}

export interface ISKUModel {
  skuId: string;
  productDictionaryId: string;
  sku: string;
  name: string;
  barcode: string;
  goodsModel: IGoodsModel[];
}
export interface IResponseSearchBarcode {
  productDictionaryModel: IProductDictionaryModel;
  variantModels: IVariantModel[];
  listSKU: IProduct[];
}
