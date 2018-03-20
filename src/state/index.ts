// Holder for additional information
interface Extension {
  id: string;
  version: string;
  data: object;
}

// Represent an attached document to a related element
interface Document {
  uuid: string;
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
  uuid: string;
  time: Date;
  account_uuid: string;
  method: string;
  description: string;
  amount: number;
  currency: string;
  extensions?: Extension[];
}

// Credit/Debit card representation
interface Card {
  uuid: string;
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
  uuid: string;
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

// ---- API Integration ---- //

// Request's dispatched to the platform's backend
interface APIRequest {
  session: Session;
  data: object;
}

// Responses received from the platform's backend
interface APIResponse {
  ok: boolean;
  desc: string;
  data: object;
}

// ---- Basic Requests ---- //

// Start a new session
interface RequestSession {
  email: string;
  password: string;
  tfa?: string;
}

// Create a new account
interface RequestAccountRegister {
  email: string;
  password: string;
  referral?: Referral;
}

// Dispatch a new referral invite
interface RequestAccountInvite {
  name: string;
  email: string;
  message: string;
}