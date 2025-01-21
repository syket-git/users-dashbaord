import { PaginationMeta, User, UsersState } from "@/interfaces/user";
import { getUsers } from "@/services/user";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const initialPaginationMeta: PaginationMeta = {
  total: 0,
  pages: 0,
  page: 1,
  limit: 10,
};

export const useUsers = ({
  users,
  pagination,
}: {
  users: User[];
  pagination: PaginationMeta;
}) => {
  const initialState: UsersState = {
    data: users || [],
    loading: false,
    error: null,
    paginationMeta: pagination || initialPaginationMeta,
    searchTerm: "",
  };

  const [state, setState] = useState<UsersState>(initialState);
  const [pageIndex, setPageIndex] = useState(1);
  const isInitialRender = useRef(true); // Flag to track the initial render

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
        }
      }, 300),
    []
  );

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the API call on the initial render
      isInitialRender.current = false;
      return;
    }
    debouncedFetch(state.searchTerm, pageIndex);

    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, state.searchTerm, pageIndex]);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
    setPageIndex(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPageIndex(page);
  }, []);

  return {
    ...state,
    handleSearch,
    handlePageChange,
    currentPage: pageIndex,
  };
};
