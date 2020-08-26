import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@material-ui/core";
import {
    makeStyles,
} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    Link
} from "react-router-dom";
import theme from "../../../../../../../themeConfig";


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
interface Props {
    id: number,
}
const DeleteProduct: React.FC<Props> = ({ id }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const token = sessionStorage.getItem("jhi-authenticationToken");
    const bearerToken = `Bearer ${token}`;
    const normalizedToken = bearerToken.replace(/['"]+/g, '')
    const handleDeleteButton = (event: React.MouseEvent<HTMLElement>) => {
        const deleteData = async (idProduct: number) => {

            const dataString = `{ "id": ${idProduct}, "summary": "any", "acceptance": "any", "status": "any"}`;
            console.warn(dataString)

            const req = await fetch(`http://localhost:9000/api/sales/${idProduct}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${normalizedToken}`

                },
                body: dataString
            })

            console.warn(req);

        }
        deleteData(id);
        console.warn(id);
        setOpen(false)
        window.location.reload();
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Link to={`/sales/${id}/delete`}>
                <Button
                    variant="contained"
                    className={`${classes.button} ${classes.buttonDelete}`}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                >
                    Delete
            </Button>
            </Link>
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

                    <Link to={"/sales"}>

                        <Button
                            onClick={e => handleDeleteButton(e)}
                            className={`${classes.button} ${classes.buttonDelete}`}
                            autoFocus
                        >

                            Delete
                    </Button>
                    </Link>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteProduct;