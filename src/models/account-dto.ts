import { Account } from '../value-objects/account';

export class AccountDTO {

    constructor(
        public accountNumber: string,
        public emailAddress: string,
        public name: string,
    ) {

    }

    public static fromValueObject(account: Account): AccountDTO {
        if (!account) {
            return null;
        }

        return new AccountDTO(account.accountNumber, account.emailAddress, account.name);
    }

    public toValueObject(): Account {
        return new Account(this.accountNumber, this.emailAddress, this.name);
    }

}
