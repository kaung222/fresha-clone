"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
type SetQueryProps = {
  key: string;
  value: string;
  backToFirstPage?: boolean;
};
const useSetUrlParams = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const path = usePathname();

  const setQuery = (props: SetQueryProps): void => {
    const { key, value, backToFirstPage = false } = props;
    value.length === 0 ? params.delete(key) : params.set(key, value);
    backToFirstPage ? params.set("page", "1") : null;
    const queryString = params.toString();
    router.push(path + "?" + queryString);
  };
  const deleteQuery = ({ key }: { key: string }): void => {
    params.delete(key);
    const queryString = params.toString();
    router.push(path + "?" + queryString);
  };
  const getQuery = (key: string) => {
    return params.get(key) || "";
  };
  return {
    setQuery,
    deleteQuery,
    getQuery,
  };
};
export default useSetUrlParams;
