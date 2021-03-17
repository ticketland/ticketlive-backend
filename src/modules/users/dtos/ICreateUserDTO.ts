export default interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  password: string;
  avatar?: string;
}
