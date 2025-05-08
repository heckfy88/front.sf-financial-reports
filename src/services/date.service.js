import { format, parse, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from "date-fns";

export function groupByTimeRange(transactions, range = "month") {
  const groupFunc = {
    week: (date) => format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd"),
    month: (date) => format(startOfMonth(date), "yyyy-MM"),
    quarter: (date) => format(startOfQuarter(date), "yyyy-'Q'q"),
    year: (date) => format(startOfYear(date), "yyyy"),
  };

  const result = {};

  for (const tx of transactions) {
    const date = parse(tx.date,"yyyy.MM.dd", new Date());
    const key = groupFunc[range](date);

    if (!result[key]) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
