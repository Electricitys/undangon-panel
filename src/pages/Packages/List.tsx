import { useTable } from "@refinedev/react-table";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/mantine";
import { PackageSchema } from "interfaces";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Group, Pagination } from "@mantine/core";
import { Table } from "components/Table";
import currency from "currency.js";

export const PackageList: React.FC = () => {
  const columns = useMemo<ColumnDef<PackageSchema>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
        cell: function render({ getValue }) {
          return currency(getValue() as number, {
            symbol: "Rp.",
          }).format();
        },
      },
      {
        id: "created_at",
        accessorKey: "created_at",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField format="LLL" value={getValue<any>()} />;
        },
      },
      {
        id: "updated_at",
        accessorKey: "updated_at",
        header: "Updated At",
        cell: function render({ getValue }) {
          return <DateField format="LLL" value={getValue<any>()} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
      },
    ],
    []
  );
  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { tableQueryResult, setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  if (tableQueryResult?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      <Table getHeaderGroups={getHeaderGroups} getRowModel={getRowModel} />
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
