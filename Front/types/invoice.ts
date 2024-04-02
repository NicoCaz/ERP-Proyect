export interface Invoice {
 
  Id: number | null;
  Date: Date;
  ClientId: number | null;
  Products: ProductInvoice[];
  Total: number;
}

export interface ProductInvoice {
  Id: number | null;
  Name: string;
  Price: number;
  Quantity: number;
  InvoiceId: number;
}
