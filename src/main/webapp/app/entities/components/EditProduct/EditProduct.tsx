import React from "react";
import {
    Grid,
    Paper,
    Box,
    createStyles,
    makeStyles,
    Theme,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Select,
    MenuItem,
    Typography,
    Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
        },
        textField: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            fontSize: "18px",
        },
        formControl: {
            margin: "1rem 0",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        headerBackground: {
            background: "#2A6A9E",
            color: "#fff",
            padding: "2rem",
        },
        buttonEdit: {
            background: "#4CAF50",
            color: "#fff",
            "&:hover": {
                background: "#047508",
            },
        },
        buttonBack: {
            background: "#2A6A9E",
            color: "#fff",
            "&:hover": {
                background: "#005396",
            },
        },
        button: {
            margin: theme.spacing(1),
        },
        label: {
            fontSize: "20px",
            color: "#000",
        },
        blackColorTypography: {
            color: "#000",
            position: "relative",
            bottom: "10px",
        },
        disableFontColor: {
            color: "#000 !important",
        },
    })
);
const EditProduct = ({ salesEntity, loading }) => {
    console.warn(salesEntity)
    const classes = useStyles();
    const [name, setName] = React.useState("Pizza Zurus");
    const [age, setAge] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={1} sm={2} md={3} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                    <Box mt={10}>
                        <Paper elevation={3}>
                            <Box className={classes.headerBackground}>
                                {/* There is already an h1 in the page, let's not duplicate it. */}
                                <Typography variant="h3" component="h2" align="center">
                                    Edit Product
                </Typography>
                            </Box>
                            <form>
                                <Box display="flex" flexDirection="column" pt={3} px={4}>
                                    {/* Product Input (Edit and View) */}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.label}
                                            htmlFor="component-helper"
                                        >
                                            Product
                    </InputLabel>
                                        <Input
                                            id="component-helper"
                                            value={name}
                                            className={classes.disableFontColor}
                                            onChange={handleChange}
                                            aria-describedby="component-helper-text"
                                        />
                                    </FormControl>

                                    {/* Delivery Status input if (Edit) */}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.label}
                                            id="demo-simple-select-helper-label"
                                        >
                                            Delivery Status
                    </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={age}
                                            onChange={handleChangeSelect}
                                        >
                                            <MenuItem value={10}>DELIVERED</MenuItem>
                                            <MenuItem value={20}>SHIPPED</MenuItem>
                                            <MenuItem value={30}>IN-CHARGE</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {/* Date Input (If edit) */}
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="date"
                                            label={
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    className={classes.blackColorTypography}
                                                >
                                                    {" "}
                          Date{" "}
                                                </Typography>
                                            }
                                            type="date"
                                            defaultValue="2017-05-24"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                            </form>

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                pt={5}
                                pb={2}
                                mr={2}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={`${classes.button} ${classes.buttonBack}`}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back
                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={`${classes.button} ${classes.buttonEdit}`}
                                    startIcon={<CreateIcon />}
                                >
                                    Edit
                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={1} sm={2} md={3} lg={4} xl={4}></Grid>
            </Grid>
        </>
    );
};

export default EditProduct;
