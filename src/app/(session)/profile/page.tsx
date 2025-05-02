"use client";

import useSessionQuery from "@/api/hooks/users/useSessionQuery";
import Icon from "@/components/Icon";
import Routes from "@/shared/config/routes.config";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const ProfilePage = () => {
  const { data: session, isPending } = useSessionQuery();

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        Не удалось загрузить данные профиля
      </Typography>
    );
  }

  return (
    <Stack alignItems="center" p={2}>
      <Card sx={{ maxWidth: 900, width: "100%" }}>
        <CardContent sx={{ padding: "20px" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "primary.main",
                  fontSize: 48,
                }}
              >
                <Icon icon="mdi:account" />
              </Avatar>
              <Typography variant="h5" component="h1" textAlign="center">
                {session.email.split("@")[0]}
              </Typography>
              <Chip
                label={session.banned ? "Заблокирован" : "Активен"}
                color={session.banned ? "error" : "success"}
                variant="outlined"
              />
            </Stack>
            <Stack spacing={3} flex={1}>
              <Stack spacing={1}>
                <Typography variant="h6" component="h2">
                  Основная информация
                </Typography>
                <Divider />
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon icon="mdi:at" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={session.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon icon="mdi:calendar-clock" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Дата регистрации"
                      secondary={moment(session.createdAt).format("LL")}
                    />
                  </ListItem>
                  {session.banned && (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Icon icon="mdi:alert-circle" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Причина блокировки"
                        secondary={session.banReason || "Не указана"}
                      />
                    </ListItem>
                  )}
                </List>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h6" component="h2">
                  Мои курсы ({session.courses?.length || 0})
                </Typography>
                <Divider />
                {session.courses?.length ? (
                  <List>
                    {session.courses.map((course) => (
                      <ListItem
                        key={course.id}
                        secondaryAction={
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Icon icon="mdi:arrow-right" />}
                            href={Routes.courses.detail(course.id)}
                          >
                            Перейти
                          </Button>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <Icon icon="mdi:book" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={course.title}
                          secondary={course.description}
                          sx={{ maxWidth: "500px" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    У вас пока нет курсов
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProfilePage;
