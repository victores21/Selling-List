import React from "react";
import {
    withStyles,
    Theme,
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Box,
    ThemeProvider,
    Typography,
    TablePagination,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@material-ui/core";
import {
    Link
} from "react-router-dom";
import { TransitionProps } from "@material-ui/core/transitions";
// Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import Loader from 'react-loader-spinner'
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import theme from "../../../../../../../themeConfig";


// Jhipster
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

const StyledTableCell = withStyles((themeCell: Theme) =>
    createStyles({
        head: {
            backgroundColor: "#2A6A9E",
            color: themeCell.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell);

const StyledTableRow = withStyles((themeRow: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: themeRow.palette.action.hover,
            },
        },
    })
)(TableRow);




const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    typographyMarginBottom: {
        marginBottom: "1rem",
    },
    stateDelivered: {
        color: "#4CAF50",


    },
    stateShipped: {
        color: "#0086F3",


    },
    stateInCharge: {
        color: "#F44336",

        top: "5px",
    },
    buttonDelete: {
        background: "#F44336",
        color: "#fff",
        "&:hover": {
            background: "#bd0d00",
        },
    },
    buttonView: {
        background: "#0086F3",
        color: "#fff",
        "&:hover": {
            background: "#005396",
        },
    },
    buttonEdit: {
        background: "#4CAF50",
        color: "#fff",
        "&:hover": {
            background: "#047508",
        },
    },
    button: {
        margin: theme.spacing(1),
    },
});


const ProductListTable = ({ salesList, match, loading }) => {

    const classes = useStyles();

    return (
        <>
            {loading ?
                <p>Loading...</p>
                : <ThemeProvider theme={theme}>

                    <Grid container>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={2}></Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
                            <Box mt={5}>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography
                                        variant="h3"
                                        component="h2"
                                        className={classes.typographyMarginBottom}
                                    >
                                        <Translate contentKey="testApp.sales.home.title">Sales</Translate>
                                    </Typography>

                                    <Link to={`${match.url}/new`}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            className={`${classes.button} ${classes.buttonEdit}`}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </Link>
                                </Box>
                                <form>
                                    <TableContainer component={Paper}>
                                        {salesList && salesList.length > 0 ? (
                                            <Table
                                                className={classes.table}
                                                aria-label="customized table"
                                                padding="default"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell> <Translate contentKey="global.field.id">ID</Translate></StyledTableCell>
                                                        <StyledTableCell align="left"><Translate contentKey="testApp.sales.description">Description</Translate> </StyledTableCell>
                                                        <StyledTableCell align="left"><Translate contentKey="testApp.sales.state">State</Translate></StyledTableCell>
                                                        <StyledTableCell align="left">  <Translate contentKey="testApp.sales.date">Date</Translate></StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {salesList.map((sales, i) => (
                                                        <StyledTableRow key={sales.id} hover>
                                                            <StyledTableCell component="th" scope="row">
                                                                {sales.id}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                {sales.description}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                <FiberManualRecordIcon
                                                                    className={
                                                                        sales.state === "DELIVERED"
                                                                            ? classes.stateDelivered
                                                                            : sales.state === "SHIPPED"
                                                                                ? classes.stateShipped
                                                                                : classes.stateInCharge
                                                                    }
                                                                />{" "}
                                                                <Translate contentKey={`testApp.State.${sales.state}`} />
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">

                                                                {sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" size="medium">
                                                                <Link to={`${match.url}/${sales.id}`}>
                                                                    <Button
                                                                        variant="contained"
                                                                        className={`${classes.button} ${classes.buttonView}`}
                                                                        startIcon={<VisibilityIcon />}
                                                                    >
                                                                        <Translate contentKey="entity.action.view">View</Translate>
                                                                    </Button></Link>
                                                                <Link to={`${match.url}/${sales.id}/edit`}>
                                                                    <Button
                                                                        variant="contained"
                                                                        className={`${classes.button} ${classes.buttonEdit}`}
                                                                        startIcon={<CreateIcon />}
                                                                    >
                                                                        <Translate contentKey="entity.action.edit">Edit</Translate>
                                                                    </Button></Link>
                                                                <DeleteProduct id={sales.id} />

                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        ) : (
                                                !loading && (
                                                    <Grid container>
                                                        <Grid item>
                                                            <Box display="flex" flexDirection="column" p={3}>
                                                                <Typography>
                                                                    <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>

                                                                </Typography>
                                                                <Typography>
                                                                    Create one!
                                                                </Typography>
                                                                <Link to={`${match.url}/new`}>
                                                                    <Button
                                                                        variant="contained"
                                                                        size="large"
                                                                        className={`${classes.button} ${classes.buttonEdit}`}
                                                                    >
                                                                        <AddIcon /> Create
                                                                    </Button>
                                                                </Link>

                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
                                    </TableContainer>
                                </form>
                            </Box>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={2}></Grid>
                    </Grid>
                </ThemeProvider>}
        </>
    );
};

export default ProductListTable;
