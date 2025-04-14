"use client";

import useUsersQuery from "@/api/hooks/users/useUsersQuery";
import NoRowsOverlay from "@/components/NoRowsOverlay";
import Routes from "@/shared/config/routes.config";
import { IUser } from "@/shared/interfaces/user/User";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import MuiChip from "@mui/material/Chip";
import clsx from "clsx";
import usePaginationModel from "@/shared/utils/usePaginationModel";

interface IClientsTable {
  hideSelection?: boolean;
  customUserLink?: (id: string) => string;
}

const ClientsTable = ({ hideSelection, customUserLink }: IClientsTable) => {
  const columns: GridColDef<IUser>[] = [
    {
      flex: 0.12,
      field: "id",
      headerName: "Ун. Идентификатор",
      sortable: false,
      renderCell: (item) => (
        <Button
          LinkComponent={Link}
          variant="text"
          sx={{
            ":hover": {
              borderBottom: "2px solid",
            },
          }}
          href={
            customUserLink
              ? customUserLink(String(item?.row.id))
              : Routes.users.detail(String(item?.row.id))
          }
        >
          #{item?.row.id}
        </Button>
      ),
    },
    {
      flex: 0.25,
      field: "email",
      headerName: "Почта",
      sortable: false,
      renderCell: (item) => item.row.email ?? "-",
    },
    {
      flex: 0.2,
      field: "banned",
      headerName: "Статус",
      sortable: false,
      renderCell: (item) => (
        <MuiChip
          variant="filled"
          className={clsx({
            "MuiChip-rounded": false,
            "MuiChip-light": true,
          })}
          label={item.row?.banned ? "Забанен" : "Активен"}
          sx={{ width: "fit-content", color: item.row?.banned ? "red" : "green" }}
        />
      ),
    },
    {
      flex: 0.25,
      field: "banReason",
      headerName: "Комментарий бана",
      sortable: false,
      renderCell: (item) => item.row.banReason ?? "-",
    },
  ];

  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const [paginationModel, setPaginationModel] = usePaginationModel();
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const {
    data: clientsData,
    isError,
    error,
    isPending,
    isFetching,
  } = useUsersQuery({
    search: !!deferredSearch ? deferredSearch : undefined,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  if (isError) {
    return (
      <CardContent>
        <Typography variant="h6" color="error">
          Ошибка загрузки данных {error?.message}
        </Typography>
      </CardContent>
    );
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          color="secondary"
          label="Найти"
          size="small"
        />
      </CardContent>
      <DataGrid
        sx={{
          minHeight: isPending ? 600 : !clientsData?.itemCount ? 400 : 0,
          color: "text.secondary",
        }}
        rows={clientsData?.entities ?? []}
        rowCount={clientsData?.itemCount || 0}
        paginationMode="server"
        columns={columns}
        slots={{ noRowsOverlay: NoRowsOverlay }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection={!hideSelection}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        getRowId={(row) => row.id}
        loading={isPending || isFetching}
        slotProps={{
          loadingOverlay: {
            variant: isPending ? "skeleton" : "linear-progress",
            noRowsVariant: isPending ? "skeleton" : "linear-progress",
          },
        }}
      />
    </Card>
  );
};

export default ClientsTable;
