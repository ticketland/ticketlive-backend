export default interface ICreateTransactionDTO {
  caixa_id: string;
  venda_id?: string;
  operacao_id: string;
  valor: number;
  usuario_id: string;
}
