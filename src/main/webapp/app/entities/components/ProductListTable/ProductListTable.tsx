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

import theme from "../../../../../../../themeConfig";


// Jhipster

import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: "#2A6A9E",
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow);

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }
function createData(id: number, product: string, state: string, date: string) {
    return { id, product, state, date };
}

const rows = [
    createData(1, "Pizza Hut 1KG Free Gluten", "DELIVERED", "10/10/20"),
    createData(2, "Donuts", "SHIPPED", "10/10/20"),
    createData(3, "Hamburger", "IN_CHARGE", "10/10/20"),
    createData(4, "Car", "DELIVERED", "10/10/20"),
    createData(5, "Motorcycle", "DELIVERED", "10/10/20"),
    createData(6, "Book", "IN_PROGRESS", "10/10/20"),
    createData(7, "Computer", "DELIVERED", "10/10/20"),
    createData(8, "Bed", "DELIVERED", "10/10/20"),
    createData(9, "Rices", "IN_CHARGE", "10/10/20"),
    createData(10, "Strings", "DELIVERED", "10/10/20"),
];

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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Pagination

const ProductListTable = ({ salesList, match, loading }) => {
    console.warn(salesList)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <ThemeProvider theme={theme}>
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
                                                <StyledTableCell>ID</StyledTableCell>
                                                <StyledTableCell align="left">Product </StyledTableCell>
                                                <StyledTableCell align="left">State</StyledTableCell>
                                                <StyledTableCell align="left">Date</StyledTableCell>
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
                                                        {sales.state}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {sales.date}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" size="medium">
                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonView}`}
                                                            startIcon={<VisibilityIcon />}
                                                        >
                                                            View
                                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonEdit}`}
                                                            startIcon={<CreateIcon />}
                                                        >
                                                            Edit
                                                                        </Button>

                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonDelete}`}
                                                            startIcon={<DeleteIcon />}
                                                            onClick={handleClickOpen}
                                                        >
                                                            Delete
                                                                        </Button>
                                                        <Dialog
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                {"Are you sure?"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Do you really want to delete this product?
                                                                    This process cannot be undone
                                                                            </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button
                                                                    onClick={handleClose}
                                                                    variant="contained"
                                                                    className={`${classes.button} ${classes.buttonEdit}`}
                                                                >
                                                                    No, cancel
                                                                            </Button>
                                                                <Button
                                                                    onClick={handleClose}
                                                                    className={`${classes.button} ${classes.buttonDelete}`}
                                                                    autoFocus
                                                                >
                                                                    Delete
                                                                            </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </StyledTableCell>
                                                </StyledTableRow>


                                            ))}
                                            {/* {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )} */}
                                        </TableBody>
                                    </Table>
                                ) : (
                                        !loading && (
                                            <div className="alert alert-warning">
                                                <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
                                            </div>
                                        )
                                    )}
                                {/* <Table
                                    className={classes.table}
                                    aria-label="customized table"
                                    padding="default"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>ID</StyledTableCell>
                                            <StyledTableCell align="left">Product </StyledTableCell>
                                            <StyledTableCell align="left">State</StyledTableCell>
                                            <StyledTableCell align="left">Date</StyledTableCell>
                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row, index) => (
                                                <StyledTableRow key={sales.id} hover="true">
                                                    <StyledTableCell component="th" scope="row">
                                                        {sales.id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {sales.product}
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
                                                        {sales.state}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {sales.date}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" size="medium">
                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonView}`}
                                                            startIcon={<VisibilityIcon />}
                                                        >
                                                            View
                            </Button>
                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonEdit}`}
                                                            startIcon={<CreateIcon />}
                                                        >
                                                            Edit
                            </Button>

                                                        <Button
                                                            variant="contained"
                                                            className={`${classes.button} ${classes.buttonDelete}`}
                                                            startIcon={<DeleteIcon />}
                                                            onClick={handleClickOpen}
                                                        >
                                                            Delete
                            </Button>
                                                        <Dialog
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                {"Are you sure?"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Do you really want to delete this product?
                                                                    This process cannot be undone
                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button
                                                                    onClick={handleClose}
                                                                    variant="contained"
                                                                    className={`${classes.button} ${classes.buttonEdit}`}
                                                                >
                                                                    No, cancel
                                </Button>
                                                                <Button
                                                                    onClick={handleClose}
                                                                    className={`${classes.button} ${classes.buttonDelete}`}
                                                                    autoFocus
                                                                >
                                                                    Delete
                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                /> */}
                            </TableContainer>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={2}></Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default ProductListTable;
