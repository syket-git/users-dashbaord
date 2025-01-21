import { useTableHeader } from "@/hooks/useTableHeader";
import { User } from "@/interfaces/user";

import { Flex, Table, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface UsersTableProps {
  data: User[];
}

export const UsersTable: FC<UsersTableProps> = ({ data }) => {
  const { columns } = useTableHeader();
  const router = useRouter();

  return (
    <Table.Root size="sm" variant="outline" striped>
      <Table.Header>
        <Table.Row>
          {columns.map(({ field, label, align }) => (
            <Table.ColumnHeader key={field}>
              <Flex as="span" alignItems="center" justify={align || "start"}>
                <Text mr={2}>{label}</Text>
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
