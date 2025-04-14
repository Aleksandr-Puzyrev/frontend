'use client'

import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material'
import { useId, useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Icon from '../Icon';

interface IPasswordInput<T extends FieldValues> extends Omit<OutlinedInputProps, 'name'> {
  error_message?: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
}

const PasswordInput = <T extends FieldValues,>({ sx, label = "Пароль", register, name, ...props }: IPasswordInput<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const id = useId();

  /* Если пропсами не пришла функция register и название поля (name) формы,
    то привязка поля к форме осуществляться не будет
  */
  const registerObject = register && name ? register(name) : {};

  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel htmlFor={id} error={Boolean(props.error_message)}>
        {label}
      </InputLabel>
      <OutlinedInput
        label={label}
        name={name}
        {...props}
        {...registerObject}
        id={id}
        type={isPasswordVisible ? 'text' : 'password'}
        error={Boolean(props.error_message)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              onMouseDown={e => e.preventDefault()}
              onClick={() => setIsPasswordVisible(prev => !prev)}
            >
              <Icon icon={isPasswordVisible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
            </IconButton>
          </InputAdornment>
        }
      />
      {props.error_message && (
        <FormHelperText sx={{ color: 'error.main' }} id=''>
          {props.error_message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default PasswordInput
