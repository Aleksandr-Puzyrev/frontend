"use client";

import useRegistrationMutation from "@/api/hooks/auth/useRegistrationMutation";
import PasswordInput from "@/components/form-fields/PasswordInput";
import Routes from "@/shared/config/routes.config";
import yupRules from "@/shared/config/yup-rules.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yupRules.email,
  password: yupRules.password,
  rememberMe: yupRules.boolean.required(),
});

type FormType = yup.InferType<typeof schema>;

const RegistrationFormPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useRegistrationMutation({
    onError: (error) => setError("email", { message: error.response?.data.message }),
  });
  const onSubmit = async (data: FormType) => {
    mutate(data);
  };

  return (
    <Box>
      <Stack alignItems="center">
        <Typography variant="h5">Регистрация</Typography>
        <Typography variant="body2">Зарегистрируйтесь, чтобы продолжить</Typography>
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
            Зарегистрироваться
          </LoadingButton>
          <Button LinkComponent={Link} href={Routes.auth.login} variant="outlined">
            Есть аккаунт? Войти
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationFormPage;
