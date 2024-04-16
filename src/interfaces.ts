export interface IBusinesses {
    id: number;
    title: string;
    country: string;
    client: string;
}

export interface IClients {
    id: number;
    title: string;
    name: string;
    sureName: string;
    email: string;
    creationDate: Date;
}

export interface IOperateItemResult {
    id: number;
    title: string;
    client: string;
    notes: string;
}