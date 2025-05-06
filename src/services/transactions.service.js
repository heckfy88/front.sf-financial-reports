const CATEGORY_TYPES = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
}

export const CATEGORY_NAMES = {
  IN_PAYMENT_FOR_SERVICE: 'in_payment_for_service',
  OUT_PAYMENT_FOR_SERVICE: 'out_payment_for_service',
  IN_PAYMENT_FOR_GOOD: 'in_payment_for_goods',
  OUT_PAYMENT_FOR_GOOD: 'out_payment_for_goods',
  IN_WAGES: 'in_wages',
  OUT_WAGES: 'out_wages',
  IN_PERSONAL_TRANSFER: 'in_personal_transfer',
  OUT_PERSONAL_TRANSFER: 'out_personal_transfer',
};

export const CATEGORIES = {
  [CATEGORY_NAMES.IN_PAYMENT_FOR_SERVICE]: {
    id: "99af3f9b-93e2-4283-8cc1-6d1097a07887",
    name: CATEGORY_NAMES.IN_PAYMENT_FOR_SERVICE,
    description: "Оплата моих услуг",
    type: CATEGORY_TYPES.INCOME,
  },
  [CATEGORY_NAMES.OUT_PAYMENT_FOR_SERVICE]: {
    id: "14999a72-6e0c-41da-9445-0e5fdd27f54e",
    name: CATEGORY_NAMES.OUT_PAYMENT_FOR_SERVICE,
    description: "Оплата сторонних услуг",
    type: CATEGORY_TYPES.EXPENSE,
  },
  [CATEGORY_NAMES.IN_PAYMENT_FOR_GOOD]: {
    id: "ac8d4399-a379-4b12-8bb3-2a97f144f575",
    name: CATEGORY_NAMES.IN_PAYMENT_FOR_GOOD,
    description: "Оплата моих товаров",
    type: CATEGORY_TYPES.INCOME,
  },
  [CATEGORY_NAMES.OUT_PAYMENT_FOR_GOOD]: {
    id: "90c9752c-9d3e-4490-ab27-329f2538c0e0",
    name: CATEGORY_NAMES.OUT_PAYMENT_FOR_GOOD,
    description: "Оплата мной товаров",
    type: CATEGORY_TYPES.EXPENSE,
  },
  [CATEGORY_NAMES.IN_WAGES]: {
    id: "faefb39e-3924-4a52-848b-4efe2165cb79",
    name: CATEGORY_NAMES.IN_WAGES,
    description: "Получение зарплаты",
    type: CATEGORY_TYPES.INCOME,
  },
  [CATEGORY_NAMES.OUT_WAGES]: {
    id: "c3f053d5-53db-42e5-82fc-33006ec2f2db",
    name: CATEGORY_NAMES.OUT_WAGES,
    description: "Отправка мной зарплаты",
    type: CATEGORY_TYPES.EXPENSE,
  },
  [CATEGORY_NAMES.IN_PERSONAL_TRANSFER]: {
    id: "42190edd-db92-45d1-93c6-3640cf94a394",
    name: CATEGORY_NAMES.IN_PERSONAL_TRANSFER,
    description: "Получение личного перевода",
    type: CATEGORY_TYPES.INCOME,
  },
  [CATEGORY_NAMES.OUT_PERSONAL_TRANSFER]: {
    id: "5321fbb4-b930-46b1-825c-0f42287de9f2",
    name: CATEGORY_NAMES.OUT_PERSONAL_TRANSFER,
    description: "Отправка личного перевода",
    type: CATEGORY_TYPES.EXPENSE,
  },
};

export const CATEGORY_FROM_RUS_DESCRIPTIONS = Object.fromEntries(Object.entries(CATEGORIES).map(([, value]) => [value.description, value]));

export const TRANSACTION_STATUS_TYPES = {
  NEW: "NEW",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  CANCELED: "CANCELED",
  COMPLETED: "COMPLETED",
  DELETED: "DELETED",
  RETURNED: "RETURNED",
}

export const TRANSACTION_STATUSES = {
  [TRANSACTION_STATUS_TYPES.NEW]: {
    name: TRANSACTION_STATUS_TYPES.NEW,
    title: "Новая",
    weight: 0,
  },
  [TRANSACTION_STATUS_TYPES.CONFIRMED]: {
    name: TRANSACTION_STATUS_TYPES.CONFIRMED,
    title: "Подтверженная",
    weight: 100,
  },
  [TRANSACTION_STATUS_TYPES.PROCESSING]: {
    name: TRANSACTION_STATUS_TYPES.PROCESSING,
    title: "В обработке",
    weight: 200,
  },
  [TRANSACTION_STATUS_TYPES.CANCELED]: {
    name: TRANSACTION_STATUS_TYPES.CANCELED,
    title: "Отменена",
    weight: 500,
  },
  [TRANSACTION_STATUS_TYPES.COMPLETED]: {
    name: TRANSACTION_STATUS_TYPES.COMPLETED,
    title: "Платеж выполнен",
    weight: 300,
  },
  [TRANSACTION_STATUS_TYPES.DELETED]: {
    name: TRANSACTION_STATUS_TYPES.DELETED,
    title: "Платеж удален",
    weight: 600,
  },
  [TRANSACTION_STATUS_TYPES.RETURNED]: {
    name: TRANSACTION_STATUS_TYPES.RETURNED,
    title: "Возврат",
    weight: 400,
  },
};

export const TRANSACTION_STATUSES_FROM_RUS_TITLE = Object.fromEntries(Object.entries(TRANSACTION_STATUSES).map(([, value]) => [value.title, value]));

const PERSON_TYPES_NAMES = {
  PHYSICAL: 'PHYSICAL',
  LEGAL: 'LEGAL',
};

export const PERSON_TYPES = {
  "Физическое лицо": PERSON_TYPES_NAMES.PHYSICAL,
  "Юридическое лицо": PERSON_TYPES_NAMES.LEGAL,
};


