import { useSortableHeader } from "@/hooks/useSortableHeader";
import { SortConfig, User } from "@/interfaces/user";

import { Flex, Table, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface UsersTableProps {
  data: User[];
  sortConfig: SortConfig<User>;
  onSort: (field: keyof User) => void;
}

export const UsersTable: FC<UsersTableProps> = ({
  data,
  sortConfig,
  onSort,
}) => {
  const { columns } = useSortableHeader();
  const router = useRouter();

  return (
    <Table.Root size="sm" variant="outline" striped>
      <Table.Header>
        <Table.Row>
          {columns.map(({ field, label, align }) => (
            <Table.ColumnHeader key={field}>
              <Flex
                as="span"
                className="sortable"
                onClick={() => onSort(field)}
                cursor="pointer"
                alignItems="center"
                justify={align || "start"}
              >
                <Text mr={2}>{label}</Text>
                {sortConfig.field === field &&
                  (sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  ))}
              </Flex>
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.length ? (
          data.map((item) => (
            <Table.Row
              cursor="pointer"
              onClick={() => router.push(`/user/${item?.id}`)}
              key={item.id}
            >
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.gender}</Table.Cell>
              <Table.Cell textAlign="end">{item.status}</Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={5} textAlign="center">
              No users found.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};
