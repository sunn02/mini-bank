import { AccountResponse } from "../../accounts/models/account.model";

export interface Customer {
    id?: number;
    name: string;
    lastname: string;
    documentNumber: string;
    address: string;
    mail: string;
    phone: string;
    customerStatus: number;
    birth: string;
    accounts: AccountResponse[];
}



