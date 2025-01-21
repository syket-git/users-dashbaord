"use client";

import Pagination from "@/components/reusable/Pagination";

import { useUsers } from "@/hooks/useUsers";
import { PaginationMeta, User } from "@/interfaces/user";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import UsersHeader from "./UserHeader";
import { UsersTable } from "./UsersTable";

const UsersPage = ({
  users,
  pagination,
}: {
  users: User[];
  pagination: PaginationMeta;
}) => {
  const {
    data,
    loading,
    error,
    paginationMeta,
    searchTerm,
    currentPage,
    handleSearch,
    handlePageChange,
  } = useUsers({ users, pagination });

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
        <UsersTable data={data} />
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
