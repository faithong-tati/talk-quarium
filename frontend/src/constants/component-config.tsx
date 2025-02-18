import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'

export const MENU_ITEMS = [
  {
    icon: <HomeOutlinedIcon />,
    label: 'Home',
    path: '/',
    labelVariant: 'content-2',
    labelActiveVariant: 'content-3',
    isRequireAuth: false,
  },
  {
    icon: <EditCalendarOutlinedIcon />,
    label: 'Our Blog',
    path: '/our-blog',
    labelVariant: 'content-2',
    labelActiveVariant: 'content-3',
    isRequireAuth: true,
  },
]

export const DRAWER_WIDTH = 280
