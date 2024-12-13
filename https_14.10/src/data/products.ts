export interface IProduct {
    id: number;
    title: string;
    price: number;
    image?: string;
}

export interface IProductUpdateOrCreate extends Omit<IProduct, 'id'> {}

export const products: IProduct[] = [
    { id: 1, title: 'orange', price: 100 },
    { id: 2, title: 'milk', price: 200 },
    { id: 3, title: 'bread', price: 230 },
];
