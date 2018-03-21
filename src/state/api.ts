import {
  Session,
  Referral
} from 'state/data';

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

// Module exports
export {
  APIRequest,
  APIResponse,
  RequestSession,
  RequestAccountInvite,
  RequestAccountRegister
};