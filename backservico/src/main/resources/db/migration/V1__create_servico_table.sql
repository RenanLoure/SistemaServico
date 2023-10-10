CREATE TABLE servico (
    id SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_termino DATE,
    descricao TEXT,
    valor_servico NUMERIC(10, 2),
    valor_pago NUMERIC(10, 2),
    data_pagamento DATE,
    status VARCHAR(50)
);