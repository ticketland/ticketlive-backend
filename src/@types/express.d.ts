declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    cashRegister: {
      opened_cash_register_id: string;
    };
  }
}
