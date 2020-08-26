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
    Typography,
    Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';


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
    },
    loading: boolean
}
const ViewProduct: React.FC<Props> = ({ salesEntity, loading }) => {

    const { id } = useParams();
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
    // const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    //     new Date('2014-08-18T21:11:54'),
    // );
    // const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    return (

        <>
            {loading ? <p>Loading...</p> : <Grid container>
                <Grid item xs={1} sm={2} md={3} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                    <Box mt={10}>
                        <Paper elevation={3}>
                            <Box className={classes.headerBackground}>
                                {/* There is already an h1 in the page, let's not duplicate it. */}
                                <Typography variant="h2" component="h2" align="center">
                                    <Translate contentKey="testApp.sales.detail.title">Detail </Translate> [<b>{salesEntity.id}</b>]
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
                                            <Translate contentKey="testApp.sales.description">Description</Translate>
                                        </InputLabel>
                                        <Input
                                            id="component-helper"
                                            value={salesEntity.description || ""}
                                            className={classes.disableFontColor}

                                            aria-describedby="component-helper-text"
                                        />
                                    </FormControl>

                                    {/* Delivery Status input if (Edit) */}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.label}
                                            htmlFor="component-helper"
                                        >
                                            <Translate contentKey="testApp.sales.state">State</Translate>
                                        </InputLabel>
                                        <Input
                                            id="component-helper"
                                            value={salesEntity.state || ""}
                                            className={classes.disableFontColor}

                                            aria-describedby="component-helper-text"
                                        />
                                    </FormControl>

                                    {/* Date Input (If edit) */}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.label}
                                            htmlFor="component-helper"
                                        >
                                            <Translate contentKey="testApp.sales.date">Date</Translate>
                                        </InputLabel>
                                        <Input
                                            id="component-helper"
                                            value={salesEntity.date || ""}
                                            className={classes.disableFontColor}

                                            aria-describedby="component-helper-text"
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

                                <Link to={`/sales/${salesEntity.id}/edit`}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        className={`${classes.button} ${classes.buttonEdit}`}
                                        startIcon={<CreateIcon />}
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

export default ViewProduct;
