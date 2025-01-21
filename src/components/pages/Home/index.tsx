"use client";

import Pagination from "@/components/reusable/Pagination";

import { useUsers } from "@/hooks/useUsers";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import UsersHeader from "./UserHeader";
import { UsersTable } from "./UsersTable";

const UsersPage = () => {
  const {
    data,
    loading,
    error,
    paginationMeta,
    sortConfig,
    searchTerm,
    currentPage,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useUsers();

  return (
    <>
      <UsersHeader
        total={paginationMeta?.total}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <UsersTable data={data} sortConfig={sortConfig} onSort={handleSort} />
      )}

      <Pagination
        currentPage={currentPage}
        setPage={handlePageChange}
        total={paginationMeta.total}
        limit={paginationMeta.limit}
      />
    </>
  );
};

export default UsersPage;
