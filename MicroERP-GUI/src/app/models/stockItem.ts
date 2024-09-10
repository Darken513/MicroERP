export interface StockItem {
    id: string;
    name: string;
    restaurant: string,
    minimum: number,
    confNok?: boolean;
    created_at?: Date;
}
