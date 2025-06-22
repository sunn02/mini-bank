export interface Account {
    id?: number;
    holder: string;
    number: string;
    type: number;
    currencyId: number;
    customerId: number;
    createSavingAccount: CreateSavingAccount;
    createCurrentAccount: CreateCurrentAccount;
}

export interface CreateSavingAccount {
    savingType: number;
}

export interface CreateCurrentAccount {
    operationalLimit: number | string;
    monthAverage: number | string;
    interest: number | string;
}
