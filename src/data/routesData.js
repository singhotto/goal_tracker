
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HistoryIcon from '@mui/icons-material/History';

export const links = [
    {
      title: 'Dashboard',
      name: 'dashboard',
      icon: <DashboardIcon />,
    },

    {
        title: 'Main Goals',
        name: 'mainGoals',
        icon: <FlagCircleIcon />,
    },
      {
        title: 'Daily Goals',
        name: 'dailyGoals',
        icon: <FormatListNumberedIcon />,
      },
      {
        title: 'Tasks',
        name: 'tasks',
        icon: <TaskAltIcon />,
      },
      {
        title: 'History',
        name: 'history',
        icon: <HistoryIcon />,
      }
]