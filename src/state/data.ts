// Holder for additional information
interface Extension {
  id: string;
  version: string;
  data: object;
}

// Represent an attached document to a related element
interface Document {
  uuid?: string;
  mime: string;
  name: string;
  description: string;
  url: string;
  contents: string;
  upload_date: Date;
  extensions?: Extension[];
}

// Represents an active session in the platform
interface Session {
  account_uuid: string;
  token: string;
  extensions?: Extension[];
}

// Postal address
interface Address {
  street_address: string;
  locality: string;
  region: string;
  postal_code: string;
  country_code: string;
  geo: object;
  extensions?: Extension[];
}

// Represents an existing invitation
interface Referral {
  email: string;
  code: string;
  account_uuid: string;
  accepted: boolean;
  extensions?: Extension[];
}

// Common transaction record
interface Transaction {
  time?: Date;
  account_uuid?: string;
  method: string;
  description: string;
  amount: number;
  fees: number;
  currency: string;
  extensions?: Extension[];
}

// Credit/Debit card representation
interface Card {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
  address: Address;
  extensions?: Extension[];
}

// Tokenized representation of a given credit/debit card
interface CardToken {
  code: string;
  provider: string;
  card_digits: string;
  card_brand: string;
  extensions?: Extension[];
}

// General account details
interface AccountDetails {
  name?: string;
  last_name: string;
  address: Address;
  additional_details: object;
  extensions?: Extension[];
}

// Account information as obtained from the platform
interface AccountInfo {
  details: AccountDetails;
  status: string;
  transactions: Transaction[];
  referrals: Referral[];
  extensions?: Extension[];
}

// Messages related to an account
interface Notification {
  title: string;
  priority: number;
  contents: string;
  creation_date: Date;
  read_date: Date;
}

// Module exports
export {
  AccountInfo,
  AccountDetails,
  Address,
  Card,
  CardToken,
  Document,
  Extension,
  Notification,
  Referral,
  Session,
  Transaction
};