interface ISale {
  sale_id: string;
  payment_method_id: string;
}

export default interface ICreateTransactionDTO {
  cash_register_id: string;
  operation_id: string;
  value: number;
  user_id: string;
  sales?: ISale[];
}
