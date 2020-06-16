import { createMuiTheme } from "@material-ui/core/styles";

//Paleta cesar
const blueForShadows = "#daf0f2";
// const a = "#4e9fbf";
const blueOne = "#63b6bf";
// const c = "#8fd1d9";
// const d = "#f2cf8d";
const yellowOne = "#f2bc79";
// const orangeOne = "#ffc914"; //https://coolors.co/63b6bf-e4572e-ffc914-2e282a-76b041 paleta tentativa de colores

const greyCustomPalette = {
    border: "#e5edef", //items border color
    text: "#555", //titles user view color
    footer: "#fafafa", //footer background
};
const chatPalette={    
    background: "#f5f5f5",
    yourBubble: "#e3eaf2",
    yourText: "#0d1637",
    myBubble: "#11a5ed",
    myText: "#fff",
}

// const prava0 = {
//   primary:{
//     main: blueOne,
//  },
//  secondary: {
//      main: yellowOne,
//  },
//  warning:{
//    main:orangeOne,
//  },
//  colorGrey: greyCustomPalette,
// }
// const prava1 = {
//     primary:{
//       main:blueOne,
//     },
//     secondary:{
//       main:yellowOne,
//     },
//     tertiary:{
//       main:"#662E9B",
//     },
//     error:{
//       main:"#EA3546",
//     },
//     warning:{
//       main:"#F86624",
//     },
//     colorGrey: greyCustomPalette,
// }
// const prava2 = {
//   primary:{
//     main:blueOne,
//   },
//   secondary:{
//     main:yellowOne,
//   },
//   tertiary:{
//     main:"#29335C",
//   },
//   error:{
//     main:"#DB2B39",
//   },
//   warning:{
//     main:"#F3A712",
//   },
//   colorGrey: greyCustomPalette,
// }
const prava3 = {
    primary: {
        main: blueOne,
    },
    secondary: {
        main: yellowOne,
    },
    tertiary: {
        main: "#3D405B",
    },
    error: {
        main: "#EF3E36",
    },
    success: {
        main: "#59CD90",
    },
    colorGrey: greyCustomPalette,
    chat: chatPalette,
};

const theme = createMuiTheme({
    palette: prava3,
});
theme.shadows[25] =
    "0px 3px 3px -2px #8FD1D9,0px 3px 4px 0px #8FD1D9,0px 1px 8px 0px #8FD1D9";

theme.shadows[26] = `0 3px 5px 2px ${blueForShadows}`; //edit profile buttons normal shadow
theme.shadows[27] = `0 6px 7px 3px ${blueForShadows}`; //edit profile buttons hover shadow
theme.shadows[28] =
    "0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.12)";
theme.shadows[29] = "0 7px 15px 0 rgba(0,0,0,.08)"; //user - vehicle card list
export default theme;
