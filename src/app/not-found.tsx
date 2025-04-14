'use client'

import Link from 'next/link'

import Routes from '@/shared/config/routes.config'
import { CardActions } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },
}))

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <BlankLayoutWrapper>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        <Box className='content-center'>
          <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <BoxWrapper>
              <Typography variant='h1'>404</Typography>
              <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
                Страница не найдена ⚠️
              </Typography>
              <Typography variant='body2'>Мы не смогли найти страницу, которую вы ищете.</Typography>
            </BoxWrapper>
            <Img height='487' alt='error-illustration' src='/404.png' />
            <CardActions sx={{ p: 0 }}>
              <Button onClick={() => router.back()} variant='outlined' sx={{ px: 5.5 }}>
                Вернуться назад
              </Button>
              <Button href={Routes.mainPage} component={Link} variant='contained' sx={{ px: 5.5 }}>
                На главную
              </Button>
            </CardActions>
          </Box>
        </Box>
      </Box>
    </BlankLayoutWrapper>
  )
}

export default NotFoundPage
