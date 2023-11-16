import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import HashLoader from "react-spinners/HashLoader";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";

const columns = [
  { id: "_id", label: "User Id", minWidth: 130 },
  { id: "uname", label: "UserName", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: 80,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Creation Date",
    minWidth: 130,
    align: "right",
  },

  {
    id: "Action",
    label: "Report Generate",
    minWidth: 130,
    align: "right",
  },
];

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("#ffffff");
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [singleUser, setSingleUser] = React.useState({});
  const [savedRows,setSavedRows]=React.useState([]);
  const [search,setSearch]=React.useState('');
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    setOpen(true);
    fetchData();
    setTimeout(() => {
      setOpen(false);
      console.log("open");
    }, 3000);
  }, []);
  const fetchData = async () => {
    const users = await axios.get("http://localhost:4000/user/account");
    setRows(users.data.data);
    setSavedRows(users.data.data);
    // setRowsPerPage(users.data.data.length);
    console.log(users.data.data);
  };

  const dateFormat = (date, column) => {
    if (column.id === "createdAt") {
      let ndate = new Date(date);

      return (
        ndate.getDate() +
        "/" +
        (ndate.getMonth() + 1) +
        "/" +
        ndate.getFullYear()
      );
    } else return date;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const searchHandler=(e)=>{
    
    if(e.target.value.length > 0) {
      let newRows = rows.filter(row => row.uname.includes(e.target.value) || row.email.includes(e.target.value)||row.mobile.includes(e.target.value)||row._id.includes(e.target.value))   
    
      setRows(newRows)
    } else {
     setRows(savedRows)
    }
  }
  console.log(rows);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Backdrop>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User's Report!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>UserName : {singleUser.uname}</p>
            <p>Email : {singleUser.email}</p>
            <p>Mobile : {singleUser.mobile}</p>
            <p>Creation Date: {singleUser.createdAt}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          
        </DialogActions>
      </Dialog>
      <TextField type="text" placeholder="Search..." sx={{marginBottom:'1rem',width:'40%'}} onChange={searchHandler} id="outlined-basic" label="Search" variant="outlined"  InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }} />
     
      <Paper sx={{ width: "100%", overflow: "hidden",padding:'1rem' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        console.log(row[column.id]);
                        if (column.label === "Report Generate") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button  variant="contained"  onClick={() => {
                                  setOpenDialog(true);
                                  setSingleUser(row);
                                  console.log(row);
                                }}>Generate</Button>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : dateFormat(value, column)}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {console.log(rowsPerPage,"sdfdf")}
        <TablePagination
          rowsPerPageOptions={[5,10,15,20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
