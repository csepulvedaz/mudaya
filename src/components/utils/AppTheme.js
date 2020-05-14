import { createMuiTheme } from '@material-ui/core/styles';

//Paleta cesar
const blueForShadows = "#daf0f2";
const a = "#4e9fbf";
const blueOne = "#63b6bf";
const c = "#8fd1d9";
const d = "#f2cf8d";
const yellowOne = "#f2bc79";


const theme = createMuiTheme({
  palette: {
    primary:{
       main: blueOne,
    },
    secondary: {
        main: yellowOne,
    },
  },
}); 
theme.shadows[25] ="0px 3px 3px -2px #8FD1D9,0px 3px 4px 0px #8FD1D9,0px 1px 8px 0px #8FD1D9";

theme.shadows[26] = `0 3px 5px 2px ${blueForShadows}`;//edit profile buttons normal shadow
theme.shadows[27] = `0 6px 7px 3px ${blueForShadows}`;//edit profile buttons hover shadow

export default theme;