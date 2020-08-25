import React, { useEffect } from "react";
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
import { Link, Redirect } from 'react-router-dom';
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
interface Props {
    salesEntity: {
        id?: number,
        description: string,
        state: string,
        date: string
    }
    loading: boolean,
    url: string
}
const EditProduct: React.FC<Props> = ({ salesEntity, loading, url }) => {

    const { id } = useParams();
    console.warn(url);
    const token = sessionStorage.getItem("jhi-authenticationToken");
    const bearerToken = `Bearer ${token}`;
    const normalizedToken = bearerToken.replace(/['"]+/g, '')
    useEffect(() => {

        const reqData = async () => {
            const req = await fetch("http://localhost:9000/api/sales/2", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${normalizedToken}`

                }
            })
            const data = await req.json();
            console.warn(data);
        }
        reqData();
    })

    const classes = useStyles();
    const [description, setDescription] = React.useState(salesEntity.description);
    const [state, setState] = React.useState(salesEntity.state);
    // const [date, setDate] = React.useState(salesEntity.date);
    const [selectedDate, handleDateChange] = React.useState(new Date());

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleEditButtin = (event: React.MouseEvent<HTMLElement>) => {
        const putData = async () => {

            const dataString = `{ "date": "2020-08-15", "description":  "${description}", "id": ${id}, "state": "${state}", "summary": "any", "acceptance": "any", "status": "any"}`;

            const req = await fetch("http://localhost:9000/api/sales/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${normalizedToken}`/* "Bearer " + sessionStorage.getItem("jhi-authenticationToken") */

                },
                body: dataString
            })



            const data = await req.json();
            console.warn(data);
        }
        putData();
    }

    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState(event.target.value as string);
    };

    const [startDate, setStartDate] = React.useState(new Date());
    console.warn(new Date())
    return (

        <>
            {loading ? <p>Loading</p> :
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
                                                value={description}
                                                className={classes.disableFontColor}
                                                onChange={handleDescriptionChange}
                                                aria-describedby="component-helper-text"
                                            />
                                        </FormControl>

                                        {/* Delivery Status input if (Edit) */}
                                        <FormControl className={classes.formControl}>
                                            <InputLabel
                                                className={classes.label}
                                                id="demo-simple-select-helper-label"
                                            >
                                                State
                                        </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={state}
                                                onChange={handleChangeSelect}
                                            >
                                                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                                                <MenuItem value={"SHIPPED"}>SHIPPED</MenuItem>
                                                <MenuItem value={"IN_CHARGE"}>IN-CHARGE</MenuItem>
                                            </Select>

                                        </FormControl>

                                        {/* Date Input (If edit) */}
                                        <FormControl className={classes.formControl}>
                                            {/* <TextField
                                            id="date"
                                            label={
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    className={classes.blackColorTypography}
                                                >
                                                    {" "}
                                                    Date
                                                </Typography>
                                            }
                                            type="date"
                                            defaultValue={date}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}

                                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" />
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

                                    <Link to={"/sales"}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            className={`${classes.button} ${classes.buttonBack}`}
                                            startIcon={<ArrowBackIcon />}
                                        >
                                            Back
                                     </Button>
                                    </Link>

                                    <Link to={"/sales"}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            className={`${classes.button} ${classes.buttonEdit}`}
                                            startIcon={<CreateIcon />}
                                            onClick={(e) => handleEditButtin(e)}
                                        >
                                            Edit
                                </Button>
                                    </Link>


                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={1} sm={2} md={3} lg={4} xl={4}></Grid>
                </Grid>
            }

        </>
    );
};

export default EditProduct;
