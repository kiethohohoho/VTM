export interface Account {
  accountNumber: string | number;
  accountType: string;
  balance: number;
  blockBalance: number;
  workingBalance: number;
  status: number;
  currency: string;
  queryTime: number;
}

interface Card {
  cardNumber: string;
  accountNumber: string;
  cardName: string;
  status: number;
  cif: string;
  mainType: string;
  subType: string;
  product: string;
  base: string;
  name: string;
  currentBalance: number;
  vietnameseName: string;
  englishName: string;
}
export interface Data {
  account: Account[];
  cards: Card[];
}
