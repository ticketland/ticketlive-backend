const paginationDefaults = {
  limit: 10,
  page: 1,
};

const paymentMethodsDefaults = {
  money_payment_method_id:
    process.env.MONEY_PAYMENT_METHOD_ID ||
    '4a8d0740-48cf-4983-9e04-ecaf21237db1',
};

const operationsDefaults = {
  withdrawal_operation_id:
    process.env.WITHDRAWAL_OPERATION_ID ||
    '23e9a016-0dce-4ecb-b830-18523f687914',
  sale_operation_id:
    process.env.SALE_OPERATION_ID || 'b422742b-0041-477c-a8db-071585570826',
};

export { paginationDefaults, paymentMethodsDefaults, operationsDefaults };
