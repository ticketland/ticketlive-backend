# ticketlive-backend
# WIP:

## Setup

```sh
# Rodar script do banco
psql -U username -d ticketlive -a -f scriptDB.sql

# Instalar dependencias
npm install || yarn

# Rodar migration 
npm run typeorm migration:run || yarn typeorm migration:run

# Rodar servidor
npm run dev:server || yarn dev:server
```

A partir desse ponto um servidor local estará rodando na porta 3333 do seu computador.

## Insomnia
Junto na raiz desse repositório está o arquivo "ticketliveInsomnia.json", esse arquivo permite que todos os requests já implementados sejam importados no programa "Insomnia". 
Com o insomnia rodando o arquivo disponibilizado será possível fazer as chamadas e visualizar seus resultados.

#### Atenção
> Algumas chamadas que são dependentes da API da ticketland não irão funcionar pois estão rodando localmente. O deploy da API já foi requisitado à chácara berté.

## Milestones
![56%](https://progress-bar.dev/56/?scale=100&title=progress&width=420)
- [x] Separar modulos da aplição
- [ ] Implementar ACL
- [ ] Cashregisters
  - [x] Usuário deve ser capaz de abrir um caixa
  - [x] Usuário deve ser capaz de fechar um caixa
  - [x] Usuário deve ser capaz de ver todos seus caixas (fechados e aberto)
  - [x] Usuário só deve ter um caixa
  - [x] Administrador deve ser capaz de ver todos os caixas
  - [ ] Usuário deve ser capaz de visualizar todas as operações de caixa disponíveis
- [ ] Reservation
  - [ ] Usuário deve ser capaz de fazer uma reserva de ingresso
  - [ ] Usuário deve ser capaz de finalizar uma reseva de ingresso
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
  - [ ] Usuário deve ser capaz de alterar seu avatar
- [ ] Entrance
  - [x] Usuário deve ser capaz de registrar uma entrada
  - [x] Usuário deve ser capaz de visualizar uma entrada
  - [ ] Administrador deve ser capaz de visualizar todas as entradas do evento
- [ ] Ticket
  - [ ] Usuário deve ser capaz de gerar ingressos a partir de uma reserva
  - [ ] Usuário deve ser capaz de validar ingresso
  - [ ] Administrador deve ser capaz de visualizar todos os ingressos para o evento
