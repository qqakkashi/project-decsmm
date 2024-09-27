declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?:number;
    TWILIO_SID?:string;
    TWILIO_TOKEN?:string;
    TWILIO_VERIFY_SID?:string;
    FRONTEND_URL?:string;
    SECRET_COOKIE?:string;
    DATABASE_URL?:string;
    JWT_SECRET?:string;
    AWS_BUCKET_NAME?:string;
    AWS_ACCESSKEYID?:string;
    AWS_SECRETACCESSKEY?:string;
    AWS_REGION?:string;
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
    };
  }
}
