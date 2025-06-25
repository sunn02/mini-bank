import { Injectable } from '@angular/core';
import { Customer } from '../mods/customer/models/customer.model';
import { Bank } from '../mods/banks/models/bank.model';
import { Account } from '../mods/accounts/models/account.model';
import { CustomerApiService } from '../mods/customer/services/customer-api.service';
import { BankApiService } from '../mods/banks/services/bank-api.service';
import { AccountApiService } from '../mods/accounts/services/account-api.service';
import { CurrencyApiService } from '../mods/currency/services/currency-api.service';
import { Currency } from '../mods/currency/models/currency.model';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(  public customerApiService: CustomerApiService,
    public bankApiService: BankApiService,
    public accountApiService: AccountApiService,
    public currencyApiService: CurrencyApiService,
  ) {}

}
