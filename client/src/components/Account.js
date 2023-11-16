import React, { useState,CSSProperties } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Backdrop from "@mui/material/Backdrop";
import img from '../assets/spinner.gif'
import HashLoader from "react-spinners/HashLoader";
import Snackbar from '@mui/material/Snackbar';
import Notiflix from "notiflix";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Account = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password,setPassword]=useState("");
  const [open,setOpen]=useState(false);
  const [formDisable, setFormDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [showPass,sethowPass]=useState(false);
  const submitHandler =async () => {
    setOpen(true)
    console.log(uname, email, mobile, "user");
    const body={
      uname:uname,
      email:email,
      mobile:mobile,
      password:password
    }
    console.log(body,"body");
    const user= await axios.post('http://localhost:4000/user/account',body);
    if(user)
    console.log(user.data);
    setOpen(false);
    Notiflix.Notify.success("User Created Successfully!");
    setEmail("");
    setUname("");
    setMobile("");
    setPassword("");
   
  };
  return (
    <>
    
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </Backdrop>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardHeader
            sx={{ textAlign: "center" }}
            title="User's Account Form"
          />
          <CardContent>
            <TextField
              label="UserName"
              sx={{ width: "100%", marginBottom: "30px" }}
              variant="outlined"
              placeholder="Enter UserName"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              value={uname}
              onChange={(event) => {
                setUname(event.target.value);
              }}
            />

            <TextField
              label="Email"
              sx={{ width: "100%", marginBottom: "30px" }}
              variant="outlined"
              placeholder="Enter Email"
              value={email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              type={showPass? "text": 'Password'}
              sx={{ width: "100%", marginBottom: "30px" }}
              variant="outlined"
              placeholder="Enter Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" onClick={()=>sethowPass(!showPass)} style={{cursor:'pointer'}}>
                    {showPass? <VisibilityIcon/>: <VisibilityOffIcon/>}
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              label="Mobile Number"
              sx={{ width: "100%", marginBottom: "30px" }}
              variant="outlined"
              placeholder="Enter Mobile Number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                ),
              }}
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", marginBottom: "30px", height: "2.5rem" }}
              onClick={submitHandler}
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Account;
