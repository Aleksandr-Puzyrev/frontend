'use client'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

const ReactHotToast = styled(Box)<BoxProps>(({ theme }) => {
  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      zIndex: "1301 !important",
    },
    '& .react-hot-toast': {
      fontWeight: 400,
      fontSize: '1rem',
      borderRadius: '5px',
      letterSpacing: '0.14px',
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 4px 10px -4px rgba(58, 53, 65, 0.6)'
          : '0px 8px 16px -4px rgba(19, 17, 32, 0.65)',
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14
      }
    }
  }
})

export default ReactHotToast
