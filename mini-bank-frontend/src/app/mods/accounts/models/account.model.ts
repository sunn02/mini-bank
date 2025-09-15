

export interface AccountPostRequest {
    id?: number;
    holder: string;
    number: string;
    type: number;
    currencyId: number;
    customerId: number;
    bankId: number;
    createSavingAccount: CreateSavingAccount;
    createCurrentAccount: CreateCurrentAccount;
}


export interface AccountPutRequest {
    id?: number;
    holder: string;
    number: string;
    balance: number;
    status: number;
    currencyId: number;
    customerId: number;
    bankId: number;
}

export interface CreateSavingAccount {
    savingType:  number;
}

export interface CreateCurrentAccount {
    operationalLimit: number;
    monthAverage: number;
    interest: number;
}

export interface AccountResponse {
    id: number;
    holder: string;
    number: string;
    type: number;
    balance: number;
    status: string;
    currency: number;
    customerId: number;
    bankId: number;
    savingAccount: CreateSavingAccount | null;
    currentAccount: CreateCurrentAccount | null;
}

