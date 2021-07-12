import { MotorcycleStockDTO } from './MotorcycleStockDTO';

export interface MotorcycleDTO {
  id:number;
  code:string;
  name:string;
  price:string;
  stock:number;
  avatar:string;
  avatar_url:string;
  stock_entries:Array<MotorcycleStockDTO>;
}