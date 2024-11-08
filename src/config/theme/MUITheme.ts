import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-date-pickers/locales';

const theme = createTheme({
  palette: {
    // Colores principales
    primary: {
      main: '#4E1504',
      contrastText: '#fff',
      light: '#fff',
    },
    secondary: {
      main: '#311502',
    },
    background: {
      default: '#160900',
      paper: '#311502',
    },
    divider: 'rgba(255,255,255,0.12)',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(210,203,203,0.7)',
    },
    // error: {
    //   main: '#d32f2f',   // Color para errores
    //   light: '#ff6659',
    //   dark: '#9a0007',
    //   contrastText: '#ffffff',
    // },
    // warning: {
    //   main: '#ed6c02',   // Color para advertencias
    //   light: '#ff9800',
    //   dark: '#e65100',
    //   contrastText: '#ffffff',
    // },
    // info: {
    //   main: '#0288d1',   // Color informativo
    //   light: '#03a9f4',
    //   dark: '#01579b',
    //   contrastText: '#ffffff',
    // },
    // success: {
    //   main: '#2e7d32',   // Color para éxito
    //   light: '#4caf50',
    //   dark: '#1b5e20',
    //   contrastText: '#ffffff',
    // },
  },
  // typography: {
  //   // Tipografía para enlaces
  //   link: {
  //     color: '#1976d2',
  //     '&:hover': {
  //       color: '#115293',  // Color en hover
  //       textDecoration: 'underline',
  //     },
  //     '&:visited': {
  //       color: '#673ab7', // Color al ser visitado
  //     },
  //   },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Evita que el texto esté en mayúsculas
          borderRadius: 4,       // Bordes redondeados
          backgroundColor: "#4E1504",
          color: "#fff",
          '&:hover': {
            backgroundColor: 'rgba(78, 21, 4, 0.7)', // Color al pasar el cursor sobre el botón
          },
          '&:active': {
            backgroundColor: '#4E1504', // Color al hacer clic
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // color: '#1976d2',
          // textDecoration: 'none',
          // '&:hover': {
          //   color: '#115293', // Color en hover
          //   textDecoration: 'underline',
          // },
          // '&:visited': {
          //   color: '#673ab7', // Color visitado
          // },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label' : {
            color: '#fff'
          },
          '& label.Mui-focused': {
            color: '#fff',  // Color del label cuando está enfocado
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#1976d2', // Color de la línea inferior al enfocar
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d9d9d9', // Color del borde por defecto
            },
            '&:hover fieldset': {
              borderColor: '#fff', // Color del borde al pasar el cursor
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff', // Color del borde cuando está enfocado
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#311502',  // Fondo de los elementos de papel
          color: '#fff',            // Color de texto en los elementos de papel
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#212121',  // Fondo del tooltip
          color: '#ffffff',            // Texto del tooltip
        },
      },
    },
  },
}, esES);

export default theme;
