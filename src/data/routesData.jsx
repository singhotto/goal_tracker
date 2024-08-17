import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HistoryIcon from '@mui/icons-material/History';
import DailyForm from '../components/DailyForm';
import MainForm from '../components/MainForm';
import TaskForm from '../components/TaskForm';

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
    form: MainForm
  },
  {
    title: 'Daily Goals',
    name: 'dailyGoals',
    icon: <FormatListNumberedIcon />,
    form: DailyForm
  },
  {
    title: 'Tasks',
    name: 'tasks',
    icon: <TaskAltIcon />,
    form: TaskForm
  },
  {
    title: 'History',
    name: 'history',
    icon: <HistoryIcon />,
  }
]