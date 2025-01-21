import { PaginationMeta, User, UsersState } from "@/interfaces/user";
import { getUsers } from "@/services/user";
import { sortData } from "@/utils/sortData";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

const initialPaginationMeta: PaginationMeta = {
  total: 0,
  pages: 0,
  page: 1,
  limit: 10,
};

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  paginationMeta: initialPaginationMeta,
  sortConfig: { field: "", direction: "" },
  searchTerm: "",
};

export const useUsers = () => {
  //   const toast = useToast();
  const [state, setState] = useState<UsersState>(initialState);
  const [pageIndex, setPageIndex] = useState(1);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (searchValue: string, page: number) => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
          const response = await getUsers(page, searchValue);

          setState((prev) => ({
            ...prev,
            data: response.data.data,
            paginationMeta:
              response.data?.meta?.pagination || initialPaginationMeta,
            loading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch users";

          setState((prev) => ({
            ...prev,
            error: errorMessage,
            data: [],
            paginationMeta: initialPaginationMeta,
            loading: false,
          }));

          //   toast({
          //     title: "Error",
          //     description: errorMessage,
          //     status: "error",
          //     duration: 5000,
          //     isClosable: true,
          //   });
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(state.searchTerm, pageIndex);
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, state.searchTerm, pageIndex]);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
    setPageIndex(1);
  }, []);

  const handleSort = useCallback((field: keyof User) => {
    setState((prev) => {
      const { sortedData, direction } = sortData(field, prev.data);
      return {
        ...prev,
        data: sortedData,
        sortConfig: { field, direction },
      };
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPageIndex(page);
  }, []);

  return {
    ...state,
    handleSearch,
    handleSort,
    handlePageChange,
    currentPage: pageIndex,
  };
};
