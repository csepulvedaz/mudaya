import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

const CustomSelect = withStyles((theme) => ({
    input: {
        borderRadius: 4,
        position: "relative",
        border: "1px solid #C2C2C2",
        fontSize: 16,
        color: "#737B80",
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            borderRadius: 4,
            border: "1px #000 solid",
            // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

export default CustomSelect;
