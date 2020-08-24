import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#fff",
        },
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: "red",
                fontSize: 13,
            },
        },
    },
});

export default theme;
