import queryString from "query-string";

export const useQueryString = (payload: Record<string, any>) => {
  const qs = queryString.stringify(payload, {
    skipEmptyString: true,
    skipNull: true,
  });
  return queryString.parse(qs);
};
