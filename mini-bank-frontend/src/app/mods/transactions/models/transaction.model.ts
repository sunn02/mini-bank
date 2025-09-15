export interface TransferResponse {
    id: number;
    fromAccountId: number;
    toAccountId: number;
    amount: number;
    currencyId: number;
    description: string;
    date: string;
    fromAccountHolder: string;  
    toAccountHolder: string;   
}


