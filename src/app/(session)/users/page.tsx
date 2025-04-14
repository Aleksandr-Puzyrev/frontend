"use client";

import aclRoute from "@/shared/utils/aclRoute";
import ClientsTable from "@/view/clients/ClientsTable";
import { Stack, Typography } from "@mui/material";

const Clients = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Пользователи
      </Typography>
      <ClientsTable hideSelection={true} />
    </Stack>
  );
};

export default aclRoute(Clients, "read", "Clients");
