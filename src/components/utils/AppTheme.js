import { createMuiTheme } from '@material-ui/core/styles';

const blueOne = "#63b6bf";
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
export default theme;