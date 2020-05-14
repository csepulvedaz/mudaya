import { createMuiTheme } from '@material-ui/core/styles';

//Paleta cesar
const blueForShadows = "#daf0f2";
const a = "#4e9fbf";
const blueOne = "#63b6bf";
const c = "#8fd1d9";
const d = "#f2cf8d";
const yellowOne = "#f2bc79";
const orangeOne= "#ffc914"; //https://coolors.co/63b6bf-e4572e-ffc914-2e282a-76b041 paleta tentativa de colores
const borderColorGrey = "#e5edef";
const prava0 = {
  primary:{
    main: blueOne,
 },
 secondary: {
     main: yellowOne,
 },
 warning:{
   main:orangeOne,
 },
}
const prava1 = {
    primary:{
      main:blueOne,
    },
    secondary:{
      main:yellowOne,
    },
    tertiary:{
      main:"#662E9B",
    },
    error:{
      main:"#EA3546",
    },
    warning:{
      main:"#F86624",
    },
}
const prava2 = {
  primary:{
    main:blueOne,
  },
  secondary:{
    main:yellowOne,
  },  
  tertiary:{
    main:"#29335C",
  },
  error:{
    main:"#DB2B39",
  },
  warning:{
    main:"#F3A712",
  },
}
const prava3 = {
  primary:{
    main:blueOne,
  },
  secondary:{
    main:yellowOne,
  },  
  tertiary:{
    main:"#3D405B",
  },
  error:{
    main:"#EF3E36",
  },
  success:{
    main:"#59CD90",
  },
  borderGrey:{
    main: borderColorGrey,
  }
}

const theme = createMuiTheme({
  palette: prava3
}); 
theme.shadows[25] ="0px 3px 3px -2px #8FD1D9,0px 3px 4px 0px #8FD1D9,0px 1px 8px 0px #8FD1D9";

theme.shadows[26] = `0 3px 5px 2px ${blueForShadows}`;//edit profile buttons normal shadow
theme.shadows[27] = `0 6px 7px 3px ${blueForShadows}`;//edit profile buttons hover shadow

export default theme;