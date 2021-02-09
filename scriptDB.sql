CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "usuarios" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "nome" varchar(255) NOT NULL,
 "email" varchar(255) NOT NULL ,
 "cpf" varchar(11) NOT NULL,
 "senha" varchar(60) NOT NULL,
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "UQ_UsuariosEmail" UNIQUE ("email"),
 CONSTRAINT "UQ_UsuariosCPF" UNIQUE ("cpf"),
 CONSTRAINT "PK_UsuariosID" PRIMARY KEY ("id")
);

CREATE TABLE "grupos" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "nome" varchar(30) NOT NULL,
 "slug" varchar(50) NOT NULL,
 "descricao" varchar(255),
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "UQ_GruposSlug" UNIQUE ("slug"),
 CONSTRAINT "PK_GruposID" PRIMARY KEY ("id")
);

CREATE TABLE "permissoes" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "nome" varchar(30) NOT NULL,
 "slug" varchar(50) NOT NULL,
 "descricao" varchar(255),
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "UQ_PermissoesSlug" UNIQUE ("slug"),
 CONSTRAINT "PK_PermissoesID" PRIMARY KEY ("id")
);

CREATE TABLE "grupo_usuario" (
 "grupo_id" uuid NOT NULL,
 "usuario_id" uuid NOT NULL,
 CONSTRAINT "FK_GrupoUsuarioGrupo" FOREIGN KEY ("grupo_id") REFERENCES "grupos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT "FK_GrupoUsuarioUsuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "grupo_permissao" (
 "grupo_id" uuid NOT NULL,
 "permissao_id" uuid NOT NULL,
 CONSTRAINT "FK_RolePermissionRole" FOREIGN KEY ("grupo_id") REFERENCES "grupos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT "FK_RolePermissionPermission" FOREIGN KEY ("permissao_id") REFERENCES "permissoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "caixas" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "usuario_id" uuid NOT NULL,
 "valor_abertura" real NOT NULL DEFAULT 0,
 "valor_fechamento" real,
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 "closed_at" TIMESTAMP WITH TIME ZONE,
 CONSTRAINT "FK_CaixaUsuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT "PK_CaixaID" PRIMARY KEY ("id")
);

CREATE TRIGGER checkOpeningValue BEFORE INSERT ON caixas
  FOR EACH ROW EXECUTE PROCEDURE checkOpeningValue();

CREATE TABLE "metodos_pagamento" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "tipo" varchar(20) NOT NULL,
 CONSTRAINT "UQ_MetodosPagamentoTipo" UNIQUE ("tipo"),
 CONSTRAINT "PK_MetodosPagamentoID" PRIMARY KEY ("id")
);

INSERT INTO metodos_pagamento (tipo) values ('Crédito'), ('Débito'), ('Dinheiro');

CREATE TABLE "vendas" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "metodo_pagamento_id" uuid NOT NULL,
 "participante_id" uuid,
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "FK_VendaMetodoPagamento" FOREIGN KEY ("metodo_pagamento_id") REFERENCES "metodos_pagamento" ("id"),
 CONSTRAINT "PK_VendasID" PRIMARY KEY ("id")
);

CREATE TABLE "operacoes" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "nome" varchar(20) NOT NULL,
 CONSTRAINT "UQ_OperacoesNome" UNIQUE ("nome"),
 CONSTRAINT "PK_OperacoesID" PRIMARY KEY ("id")
);

INSERT INTO operacoes (nome) values ('Sangria'), ('Aporte'), ('Venda');

CREATE TABLE "transacoes" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "caixa_id" uuid NOT NULL,
 "venda_id" uuid,
 "operacao_id" uuid NOT NULL,
 "valor" real NOT NULL,
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "FK_TransacoesCaixa" FOREIGN KEY ("caixa_id") REFERENCES "caixas" ("id"),
 CONSTRAINT "FK_TransacoesVenda" FOREIGN KEY ("venda_id") REFERENCES "vendas" ("id"),
 CONSTRAINT "FK_TransacoesOperacao" FOREIGN KEY ("operacao_id") REFERENCES "operacoes" ("id"),
 CONSTRAINT "PK_TransacoessID" PRIMARY KEY ("id")
);

CREATE TABLE "ingressos" (
 "id" uuid NOT NULL,
 "venda_id" uuid NOT NULL,
 "evento_id" uuid NOT NULL,
 "nome_participante" varchar(255),
 "setor" varchar(50) NOT NULL,
 "data" TIMESTAMP WITH TIME ZONE NOT NULL,
 CONSTRAINT "FK_IngressoSale" FOREIGN KEY ("venda_id") REFERENCES "vendas" ("id"),
 CONSTRAINT "PK_IngressosID" PRIMARY KEY ("id")
);

CREATE TABLE "entradas" (
 "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
 "usuario_id" uuid NOT NULL,
 "ingresso_id" uuid NOT NULL,
 "evento_id" uuid NOT NULL,
 "participante_id" uuid,
 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
 CONSTRAINT "FK_EntradaUser" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id"),
 CONSTRAINT "FK_EntradaTicket" FOREIGN KEY ("ingresso_id") REFERENCES "ingressos" ("id"),
 CONSTRAINT "PK_EntradasID" PRIMARY KEY ("id")
);
