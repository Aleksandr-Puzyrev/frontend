"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordInput from "@/components/form-fields/PasswordInput";
import yupRules from "@/shared/config/yup-rules.config";
import Link from "next/link";
import Routes from "@/shared/config/routes.config";
import { LoadingButton } from "@mui/lab";
import useLoginMutation from "@/api/hooks/auth/useLoginMutation";

const schema = yup.object().shape({
  email: yupRules.email,
  password: yupRules.password,
  rememberMe: yupRules.boolean.required(),
});

type FormType = yup.InferType<typeof schema>;

const LoginFormPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useLoginMutation({
    onError: (error) => setError("email", { message: error.response?.data.message }),
  });
  const onSubmit = async (data: FormType) => {
    mutate(data);
  };

  return (
    <Box>
      <Stack alignItems="center">
        <Typography variant="h5">Вход в аккаунт</Typography>
        <Typography variant="body2">Авторизуйтесь, чтобы продолжить</Typography>
      </Stack>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="20px" mt="24px">
          <TextField
            {...register("email")}
            label="Электронная почта"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            fullWidth
          />
          <PasswordInput
            error_message={errors.password?.message}
            register={register}
            name={"password"}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} />}
            label={
              <Typography variant="body2" color="text.primary">
                Запомнить меня
              </Typography>
            }
          />
          <Link href={Routes.auth.recovery} prefetch>
            <Typography variant="body2" color="primary.main" width="fit-content">
              Забыли пароль?
            </Typography>
          </Link>
        </Stack>
        <Stack spacing={1}>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mt: 4, borderRadius: "8px !important" }}
            loading={isPending}
          >
            Войти в аккаунт
          </LoadingButton>
          <Button LinkComponent={Link} href={Routes.auth.registration} variant="outlined">
            Нет аккаунта? Зарегистрируйтесь
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginFormPage;
