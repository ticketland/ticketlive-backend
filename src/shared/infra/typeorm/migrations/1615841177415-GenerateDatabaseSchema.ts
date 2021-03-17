import { MigrationInterface, QueryRunner } from 'typeorm';

export default class GenerateDatabaseSchema1615841177415
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- Created by Vertabelo (http://vertabelo.com)
      -- Last modification date: 2021-03-17 20:31:51.917

      -- tables
      -- Table: cash_registers
      CREATE TABLE cash_registers (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          user_id uuid  NOT NULL,
          opening_value real  NOT NULL DEFAULT 0,
          closing_value real  NULL,
          created_at timestamp  NOT NULL DEFAULT NOW(),
          closed_at timestamp  NULL,
          CONSTRAINT cash_registers_pk PRIMARY KEY (id)
      );

      -- Table: entrances
      CREATE TABLE entrances (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          user_id uuid  NOT NULL,
          ticket_id uuid  NOT NULL,
          ext_event_id integer  NOT NULL,
          ext_participant_id integer  NULL,
          created_at timestamp  NOT NULL DEFAULT NOW(),
          CONSTRAINT entrances_pk PRIMARY KEY (id)
      );

      -- Table: operations
      CREATE TABLE operations (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          type varchar(20)  NOT NULL,
          CONSTRAINT UQ_OperacoesNome UNIQUE (type) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT operations_pk PRIMARY KEY (id)
      );

      -- Table: payment_methods
      CREATE TABLE payment_methods (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          type varchar(20)  NOT NULL,
          CONSTRAINT UQ_MetodosPagamentoTipo UNIQUE (type) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT payment_methods_pk PRIMARY KEY (id)
      );

      -- Table: permission_role
      CREATE TABLE permission_role (
          permission_id uuid  NOT NULL,
          role_id uuid  NOT NULL,
          CONSTRAINT permission_role_pk PRIMARY KEY (permission_id,role_id)
      );

      -- Table: permissions
      CREATE TABLE permissions (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          name varchar(30)  NOT NULL,
          slug varchar(50)  NOT NULL,
          description varchar(255)  NULL,
          CONSTRAINT UQ_PermissoesSlug UNIQUE (slug) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT permissions_pk PRIMARY KEY (id)
      );

      -- Table: reservations
      CREATE TABLE reservations (
          id uuid  NOT NULL,
          status varchar(10)  NOT NULL,
          created_at timestamp  NOT NULL DEFAULT NOW(),
          user_id uuid  NOT NULL,
          CONSTRAINT reservations_pk PRIMARY KEY (id)
      );

      -- Table: role_user
      CREATE TABLE role_user (
          grupo_id uuid  NOT NULL,
          usuario_id uuid  NOT NULL,
          CONSTRAINT role_user_pk PRIMARY KEY (grupo_id,usuario_id)
      );

      -- Table: roles
      CREATE TABLE roles (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          name varchar(30)  NOT NULL,
          slug varchar(50)  NOT NULL,
          description varchar(255)  NULL,
          CONSTRAINT UQ_GruposSlug UNIQUE (slug) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT roles_pk PRIMARY KEY (id)
      );

      -- Table: sale_transaction
      CREATE TABLE sale_transaction (
          sale_id uuid  NOT NULL,
          transaction_id uuid  NOT NULL,
          CONSTRAINT sale_transaction_pk PRIMARY KEY (sale_id,transaction_id)
      );

      -- Table: sales
      CREATE TABLE sales (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          payment_method_id uuid  NOT NULL,
          ext_participant_id integer  NULL,
          created_at timestamp  NOT NULL DEFAULT NOW(),
          user_id uuid  NOT NULL,
          CONSTRAINT sales_pk PRIMARY KEY (id)
      );

      -- Table: tickets
      CREATE TABLE tickets (
          id uuid  NOT NULL,
          sale_id uuid  NOT NULL,
          ext_event_id integer  NOT NULL,
          participant_name varchar(255)  NULL,
          sector varchar(50)  NOT NULL,
          event_date timestamp  NOT NULL,
          code varchar(10)  NOT NULL,
          CONSTRAINT tickets_pk PRIMARY KEY (id)
      );

      -- Table: tokens
      CREATE TABLE tokens (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          token uuid  NOT NULL,
          user_id uuid  NOT NULL,
          CONSTRAINT tokens_pk PRIMARY KEY (id)
      );

      -- Table: transactions
      CREATE TABLE transactions (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          cash_register_id uuid  NOT NULL,
          operation_id uuid  NOT NULL,
          value real  NOT NULL,
          created_at timestamp  NOT NULL DEFAULT NOW(),
          user_id uuid  NOT NULL,
          CONSTRAINT transactions_pk PRIMARY KEY (id)
      );

      -- Table: users
      CREATE TABLE users (
          id uuid  NOT NULL DEFAULT uuid_generate_v4(),
          name varchar(255)  NOT NULL,
          email varchar(255)  NOT NULL,
          cpf varchar(11)  NOT NULL,
          password varchar(60)  NOT NULL,
          avatar varchar  NOT NULL,
          CONSTRAINT UQ_UsuariosEmail UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT UQ_UsuariosCPF UNIQUE (cpf) NOT DEFERRABLE  INITIALLY IMMEDIATE,
          CONSTRAINT users_pk PRIMARY KEY (id)
      );

      -- foreign keys
      -- Reference: FK_CashRegistersUsers (table: cash_registers)
      ALTER TABLE cash_registers ADD CONSTRAINT FK_CashRegistersUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          ON DELETE  RESTRICT
          ON UPDATE  CASCADE
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_EntrancesTickets (table: entrances)
      ALTER TABLE entrances ADD CONSTRAINT FK_EntrancesTickets
          FOREIGN KEY (ticket_id)
          REFERENCES tickets (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_EntrancesUsers (table: entrances)
      ALTER TABLE entrances ADD CONSTRAINT FK_EntrancesUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_ReservationsUsers (table: reservations)
      ALTER TABLE reservations ADD CONSTRAINT FK_ReservationsUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_RolePermissionPermission (table: permission_role)
      ALTER TABLE permission_role ADD CONSTRAINT FK_RolePermissionPermission
          FOREIGN KEY (permission_id)
          REFERENCES permissions (id)
          ON DELETE  CASCADE
          ON UPDATE  CASCADE
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_RolePermissionRoles (table: permission_role)
      ALTER TABLE permission_role ADD CONSTRAINT FK_RolePermissionRoles
          FOREIGN KEY (role_id)
          REFERENCES roles (id)
          ON DELETE  CASCADE
          ON UPDATE  CASCADE
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_RoleUserRoles (table: role_user)
      ALTER TABLE role_user ADD CONSTRAINT FK_RoleUserRoles
          FOREIGN KEY (grupo_id)
          REFERENCES roles (id)
          ON DELETE  CASCADE
          ON UPDATE  CASCADE
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_RoleUserUsers (table: role_user)
      ALTER TABLE role_user ADD CONSTRAINT FK_RoleUserUsers
          FOREIGN KEY (usuario_id)
          REFERENCES users (id)
          ON DELETE  CASCADE
          ON UPDATE  CASCADE
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_SalePaymentMethod (table: sales)
      ALTER TABLE sales ADD CONSTRAINT FK_SalePaymentMethod
          FOREIGN KEY (payment_method_id)
          REFERENCES payment_methods (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_SaleTransactionSales (table: sale_transaction)
      ALTER TABLE sale_transaction ADD CONSTRAINT FK_SaleTransactionSales
          FOREIGN KEY (sale_id)
          REFERENCES sales (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_SaleTransactionTransactions (table: sale_transaction)
      ALTER TABLE sale_transaction ADD CONSTRAINT FK_SaleTransactionTransactions
          FOREIGN KEY (transaction_id)
          REFERENCES transactions (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_SalesUsers (table: sales)
      ALTER TABLE sales ADD CONSTRAINT FK_SalesUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_TicketSale (table: tickets)
      ALTER TABLE tickets ADD CONSTRAINT FK_TicketSale
          FOREIGN KEY (sale_id)
          REFERENCES sales (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_TokensUsers (table: tokens)
      ALTER TABLE tokens ADD CONSTRAINT FK_TokensUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_TransactionCashRegisters (table: transactions)
      ALTER TABLE transactions ADD CONSTRAINT FK_TransactionCashRegisters
          FOREIGN KEY (cash_register_id)
          REFERENCES cash_registers (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_TransactionOperation (table: transactions)
      ALTER TABLE transactions ADD CONSTRAINT FK_TransactionOperation
          FOREIGN KEY (operation_id)
          REFERENCES operations (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- Reference: FK_TransactionsUsers (table: transactions)
      ALTER TABLE transactions ADD CONSTRAINT FK_TransactionsUsers
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          NOT DEFERRABLE
          INITIALLY IMMEDIATE
      ;

      -- End of file.
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- Created by Vertabelo (http://vertabelo.com)
      -- Last modification date: 2021-03-17 20:31:51.917

      -- foreign keys
      ALTER TABLE cash_registers
          DROP CONSTRAINT FK_CashRegistersUsers;

      ALTER TABLE entrances
          DROP CONSTRAINT FK_EntrancesTickets;

      ALTER TABLE entrances
          DROP CONSTRAINT FK_EntrancesUsers;

      ALTER TABLE reservations
          DROP CONSTRAINT FK_ReservationsUsers;

      ALTER TABLE permission_role
          DROP CONSTRAINT FK_RolePermissionPermission;

      ALTER TABLE permission_role
          DROP CONSTRAINT FK_RolePermissionRoles;

      ALTER TABLE role_user
          DROP CONSTRAINT FK_RoleUserRoles;

      ALTER TABLE role_user
          DROP CONSTRAINT FK_RoleUserUsers;

      ALTER TABLE sales
          DROP CONSTRAINT FK_SalePaymentMethod;

      ALTER TABLE sale_transaction
          DROP CONSTRAINT FK_SaleTransactionSales;

      ALTER TABLE sale_transaction
          DROP CONSTRAINT FK_SaleTransactionTransactions;

      ALTER TABLE sales
          DROP CONSTRAINT FK_SalesUsers;

      ALTER TABLE tickets
          DROP CONSTRAINT FK_TicketSale;

      ALTER TABLE tokens
          DROP CONSTRAINT FK_TokensUsers;

      ALTER TABLE transactions
          DROP CONSTRAINT FK_TransactionCashRegisters;

      ALTER TABLE transactions
          DROP CONSTRAINT FK_TransactionOperation;

      ALTER TABLE transactions
          DROP CONSTRAINT FK_TransactionsUsers;

      -- tables
      DROP TABLE cash_registers;

      DROP TABLE entrances;

      DROP TABLE operations;

      DROP TABLE payment_methods;

      DROP TABLE permission_role;

      DROP TABLE permissions;

      DROP TABLE reservations;

      DROP TABLE role_user;

      DROP TABLE roles;

      DROP TABLE sale_transaction;

      DROP TABLE sales;

      DROP TABLE tickets;

      DROP TABLE tokens;

      DROP TABLE transactions;

      DROP TABLE users;

      -- End of file.
    `);
  }
}
