# ticketlive-backend
# WIP:

# Setup

## Requisitos
- Ter docker e docker-compose instalados no computador. O docker-compose por padrão já vem instalado nos sistemas operacionais windows e macOS. Para o linux é necessário seguir alguns passos adicionais, que podem facilmente serem encontrados ([na documentação do docker-compose](https://docs.docker.com/compose/install/)).
   
- Ter o nodeJS instalado na versão LTS

## Rodando o docker-compose
	1. Entrar no diretório do projeto;
	2. executar docker-compose up -d;

Após estes passos teremos dois containers docker rodando no seu computador, um com o banco de dados (Postgres) e outro com a aplicação em si.

A flag -d no comando executa os containers em segundo plano no seu computador.

## Configurando a aplicação 
### Rodando script do banco de dados
Para rodar o script do banco basta executar:
`npm run typeorm migration:run` 
ou caso use yarn:
`yarn typeorm migration:run` 

Esse comando irá criar todas as tabelas no banco de dados e irá popular algumas tabelas necessárias.

### Recuperando o ID da operação venda
É necessário inserir no nosso arquivo  .env da aplicação algumas variáveis de ambiente, uma dessas variáveis é o id da operação de venda. Para conseguir o id podemos executar um comando dentro do nosso container docker:
`docker exec database psql -U docker -d ticketlive -c "SELECT id FROM operations WHERE type = 'venda'"` 
Esse comando irá retornar o ID da operação venda. 

### Preenchendo .env
Existe um arquivo .env.example na raiz do projeto, renomeie esse arquivo para .env e complete ele da seguinte forma:
```env
APP_SECRET= um hash md5 qualquer (https://www.md5hashgenerator.com/)

SALE_OPERATION_ID= colar o id recuperado no passo anterior
```
Um exemplo dessa configuração é a seguinte:
```env
APP_SECRET=ddb4af4874cbf48ba4aa41eabfd2a8b9

SALE_OPERATION_ID=9bc53686-211c-4a4b-af05-80fcae5d18f9
```

Após esse procedimento é necessário reiniciar os containers:
`docker-compose restart`

Seguindo esses passos o backend está preparado para aceitar as conexões com o frontend.

## Exibindo logs da aplicação
`docker logs ticketlive`

## Parando a aplicação
`docker-compose stop`

## Removendo traços da aplicação
Para remover a aplicação por inteiro basta executar
`docker-compose down` 

Isso fará com que os containers criados pelo docker sejam removidos do computador.


## Milestones
![80%](https://progress-bar.dev/80/?scale=100&title=progress&width=420)
- [x] Separar modulos da aplição
- [ ] Implementar ACL
- [x] Cashregisters
  - [x] Usuário deve ser capaz de abrir um caixa
  - [x] Usuário deve ser capaz de fechar um caixa
  - [x] Usuário deve ser capaz de ver todos seus caixas (fechados e aberto)
  - [x] Usuário só deve ter um caixa
  - [x] Administrador deve ser capaz de ver todos os caixas
  - [x] Usuário deve ser capaz de visualizar todas as operações de caixa disponíveis
- [x] Reservation
  - [x] Usuário deve ser capaz de fazer uma reserva de ingresso
  - [x] Usuário deve ser capaz de finalizar uma reseva de ingresso
- [ ] PaymentMethods
  - [x] Administrador deve ser capaz de criar um método de pagamento
  - [ ] Administrador deve ser capaz de editar um método de pagamento
  - [ ] Administrador deve ser capaz de excluir um método de pagamento
  - [x] Usuário deve ser capaz de visualizar todos os métodos de pagamento
- [x] Events
  - [x] Usuário deve ser capaz de visualizar todos os eventos
  - [x] Usuário deve ser capaz de visualizar informações de um evento (juntamente com os ingressos disponíveis)
- [ ] Users
  - [x] Usuário deve ser capaz de fazer login
  - [x] Administrador deve ser capaz de cadastrar usuário
  - [x] Usuário deve ser capaz de alterar seu avatar
- [ ] Entrance
  - [x] Usuário deve ser capaz de registrar uma entrada
  - [x] Usuário deve ser capaz de visualizar uma entrada
  - [ ] Administrador deve ser capaz de visualizar todas as entradas do evento
- [x] Ticket
  - [x] Usuário deve ser capaz de gerar ingressos a partir de uma reserva
  - [x] Usuário deve ser capaz de validar ingresso
  - [x] Administrador deve ser capaz de visualizar todos os ingressos para o evento

