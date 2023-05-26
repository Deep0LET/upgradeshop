import React, {useEffect, useState}from 'react';
import "./Header.css";
import axios from "axios";
import Card from "@mui/material/Card";
import{Tab, Tabs} from '@mui/material';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const Header = () => {
  const [user,setUser]=useState([]);
  const [open,setOpen]=useState(false);
  const handleOpen =()=>{
    setOpen(true);
  }
  const handleClose =()=>{
    setOpen(false);
  }
  const [formdata,setFormdata]=useState({firstName:" ",lastName:" ",email:" ",password:" ",contactNumber:" "});
  const [singindata,setSingindata]=useState({email:" ",password:" "});
  const [value, setValue] = useState('1');
  const handleChange = (event,value) => {
    setValue(value);
  }
  
  const url="http://localhost:3001/api/v1/users"
  const changeHandler =(e) =>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  const submitHandler= (e)=>{
    e.preventDefault();
    console.log(formdata)
      axios.post(url,{
      firstName:formdata.firstName,
      lastName:formdata.lastName,
      email:formdata.email.trim(),
      password:formdata.password,
      contactNumber:formdata.contactNumber.trim()
    })
    .then((response) =>{
      console.log(response.formdata)
    })
  };
  const handleSingIn=(e)=>{
    setSingindata({...singindata,[e.target.name]:e.target.value})
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/api/v1/auth",{
      email:singindata.email.trim(),
      password:singindata.password
  })
  .then((response) => {
    console.log(response.singindata)
  })
 };

 useEffect(() =>{
  fetch("https://fakestoreapi.com/products?limit=5")
  .then(response => response.json())
  .then(json => setUser(json));
 },[])

  
  return (
    <div className=''> 
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:"#3f51b5"}}>
        <Toolbar>UpGrad Eshop
        <ShoppingCartIcon className='cart'  sx={{flexGrow:0}}/>
        <Typography className='eshop'  sx={{flexGrow:1}}></Typography>
          {/* <Search sx={{flexGrow:1,mr:"250px"}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Button sx={{flexGrow:-1}} color="inherit" onClick={handleOpen} className='Button'>LogIn</Button>
          <Modal open={open}
          onClose={handleClose}
          className='model-model'>
          <div>
           <Card className='modal-card'>
            <Tabs className='tab' value={value} onChange={handleChange}>
            <Tab label='Sing Up' className='tab1' value='1'/><br/>
            <Tab label='Sing In' className='tab1' value='2'/>
            </Tabs>
          {value ==="1" &&
          <Card className='card' >
          <form onSubmit={submitHandler} className='form-control'>
          <div className='text-filed'>
      <label>FirtstName :</label><br />     
      <input id="firstname" className='text'  name="firstName" value={formdata.firstName}  required onChange={changeHandler} />
      </div>
      <div className='text-field'>
      <lable >LastName :</lable><br />
      <input id="lastname" className='text' name="lastName"  value={formdata.lastName}  required onChange={changeHandler} />
      </div>
      <div className='text-field'>
      <lable >Email :</lable><br />
      <input id="email" className='text' name="email" value={formdata.email} required  onChange={changeHandler} />
      </div>
      <div className='text-field'>
      <lable >Password :</lable><br />
      <input id="password" className='text' name="password" value={formdata.password} required onChange={changeHandler} />
      </div>
      <div className='text-field'>
      <lable >ContactNumber :</lable><br />
      <input id="contactnumber" className='text' name="contactNumber" value={formdata.contactNumber} required onChange={changeHandler} />
      </div><br />
      <button className='button'>Sign Up</button><br/>
    </form >
      </Card>
    }
    {value === "2" && 
    <Card className='card'>
      <form  className='form-control' onSubmit={handleSubmit}>
      <div  className='text-filed'>
      <lable >email :</lable><br/>
      <input id="email" className='text' name="email" value={singindata.email} onChange={handleSingIn} />
      </div><br/>
      <div className='text-filed'>
      <lable >password :</lable><br/>
      <input id="password"  className='text' name="password" value={singindata.password} onChange={handleSingIn} />
      </div><br/>
      <button className='button'>Sign In</button>
      </form>
    </Card>
    }
    </Card>
    </div>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
    {
      user.map((item)=>{
        return(
          <div>
            <h2>{item.title}</h2>
            <img src={item.image}></img>
          </div>
        )
      })
    }

    
    </div>

  )
}

export default Header