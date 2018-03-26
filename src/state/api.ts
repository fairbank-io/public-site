import axios from 'axios';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  Session,
  Referral
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

// Callback handler for API client methods
type ClientCallback = (r: Response | null, error: string | null) => void;

class Client {
  handler: AxiosInstance;

  constructor() {
    this.handler = axios.create({
      baseURL:   'http://localhost:5559',
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
  RequestAccountRegister
};