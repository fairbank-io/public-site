import axios from 'axios';
import {
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios';
import {
  Session,
  Referral,
  AccountDetails,
  Transaction
} from 'state/data';

// Request's dispatched to the platform's backend
interface Request {
  session?: Session;
  data: object;
}

// Responses received from the platform's backend
interface Response {
  ok: boolean;
  desc: string;
  data: object;
}

// Callback handler for API client methods
type ClientCallback = (r: Response | null, error: string | null) => void;

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

// Send a new invite
interface RequestNewInvite {
  name: string;
  email: string;
  message: string;
}

// Submit an activation code for validation
interface RequestActivation {
  source: string;
  data: object;
}

// Upload a file to storage
interface RequestUpload {
  name: string;
  contents: File;
}

class Client {
  handler: AxiosInstance;

  constructor() {
    this.handler = axios.create({
      baseURL:   (process.env.NODE_ENV === 'production') ? 'https://api.fairbank.io' : 'http://localhost:5559',
      timeout:   5000,
      httpAgent: 'public-site'
    });
  }

  public Ping(cb: ClientCallback) {
    this.request('/ping', cb);
  }

  public Login(data: RequestSession, cb: ClientCallback) {
    this.request('/session/start', cb, data);
  }

  public Logout(session: Session, cb: ClientCallback) {
    this.request('/session/end', cb, null, session);
  }

  public Register(data: RequestAccountRegister, cb: ClientCallback) {
    this.request('/account', cb, data);
  }

  public AccountInfo(session: Session, cb: ClientCallback) {
    this.request('/account/info', cb, null, session);
  }

  public AccountUpdate(session: Session, data: AccountDetails, cb: ClientCallback) {
    this.request('/account/update', cb, data, session);
  }

  public AccountValidation(session: Session, data: RequestActivation, cb: ClientCallback) {
    this.request('/account/validate', cb, data, session);
  }

  public SendInvite(session: Session, data: RequestNewInvite, cb: ClientCallback) {
    this.request('/invite', cb, data, session);
  }

  public NewTransaction(session: Session, data: Transaction, cb: ClientCallback) {
    this.request('/tx', cb, data, session);
  }

  public UploadFile(session: Session, req: RequestUpload, cb: ClientCallback) {
    // Prepare form data
    let fd = new FormData();
    fd.append('file_name', req.name);
    fd.append('file_contents', req.contents);
    fd.append('account_uuid', session.account_uuid);
    fd.append('session_token', session.token);

    // Execute request
    this.handler.request({
      method: 'post',
      url:    '/upload',
      data:   fd
    }).then(function (r: AxiosResponse) {
      cb(r.data as Response, null);
    }).catch(function(error: AxiosError) {
      cb(null, error.message);
    });
  }

  private request(path: string, cb: ClientCallback, data?: object | null, session?: Session) {
    // Build API request
    let req: Request = {} as Request;
    if (data) {
      req.data = data;
    }
    if (session) {
      req.session = session;
    }

    // Execute request
    this.handler.request({
      method: 'post',
      url:    path,
      data:   req
    }).then(function (r: AxiosResponse) {
      cb(r.data as Response, null);
    }).catch(function(error: AxiosError) {
      cb(null, error.message);
    });
  }
}

// Module exports
export {
  Request,
  Response,
  Client,
  ClientCallback,
  RequestSession,
  RequestAccountRegister,
  RequestActivation,
  RequestNewInvite,
  RequestUpload
};