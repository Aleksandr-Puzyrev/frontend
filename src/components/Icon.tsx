import { Icon as IconifyIcon, IconProps } from '@iconify/react'

const Icon = ({ icon, ...rest }: IconProps) => {
  return <IconifyIcon ssr icon={icon} fontSize='1.5rem' {...rest} />
}

export default Icon
