"use client";

import useCoursesQuery from "@/api/hooks/courses/useCoursesQuery";
import NoRowsOverlay from "@/components/NoRowsOverlay";
import { CourseStatuses } from "@/shared/config/course-status.config";
import Routes from "@/shared/config/routes.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import usePaginationModel from "@/shared/utils/usePaginationModel";
import { Button, Card, CardContent, Chip, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

const CoursesTable = () => {
  const columns: GridColDef<ICourse>[] = [
    {
      flex: 0.12,
      field: "id",
      headerName: "Номер",
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
          href={Routes.courses.detail(String(item?.row.id))}
        >
          #{item?.row.id}
        </Button>
      ),
    },
    {
      flex: 0.25,
      field: "title",
      headerName: "Название",
      sortable: true,
      renderCell: (item) => item.row.title ?? "-",
    },
    {
      flex: 0.25,
      field: "description",
      headerName: "Описание",
      sortable: true,
      renderCell: (item) => item.row.description ?? "-",
    },
    {
      flex: 0.12,
      field: "status",
      headerName: "Статус",
      sortable: false,
      renderCell: (item) => (
        <Chip
          label={CourseStatuses[item.row.status ?? "CREATED"].label}
          color={CourseStatuses[item.row.status ?? "CREATED"].color}
        />
      ),
    },
    {
      flex: 0.25,
      field: "modules",
      headerName: "Модули",
      sortable: false,
      renderCell: (item) => item.row.modules.map((item) => item.title).join(", ") ?? "-",
    },
  ];

  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const [paginationModel, setPaginationModel] = usePaginationModel();
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const {
    data: coursesData,
    isError,
    error,
    isPending,
    isFetching,
  } = useCoursesQuery({
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
          minHeight: isPending ? 600 : !coursesData?.itemCount ? 400 : 0,
          color: "text.secondary",
        }}
        rows={coursesData?.entities ?? []}
        rowCount={coursesData?.itemCount || 0}
        paginationMode="server"
        columns={columns}
        slots={{ noRowsOverlay: NoRowsOverlay }}
        pageSizeOptions={[10, 20, 30]}
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

export default CoursesTable;
