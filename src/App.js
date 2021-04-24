import './App.css';
import instagramlogo from './instagramlogo.png';
import Posts from './posts';
import reactlogo from './reactimage.png';
import dog from './puppy.jpg';
import nature from './nature.jpg';
import celeb from './celeb.jpg';
import React, { useEffect, useState } from 'react';
import {db} from './firebase';
import  {makeStyles} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import  {Button,Input} from '@material-ui/core';


function getModalStyle() {
  const top = 50; 
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SignUp = (event) =>{

}


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts,setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  useEffect(() =>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })
    //this is where the code runs
  },[]);
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img className="app-header-image" src={instagramlogo} alt=""/>
          </center>

          <Input 
          type="text"
          placeholder="username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}/>

          <Input type="text"
          placeholder="Email address"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}/>

          <Input type="text"
          placeholder="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}/>

          <Button onClick={SignUp}>Sign Up</Button>
        </div>
        
      </Modal>

      <div className="app_header">
        <img className="app-header-image" src={instagramlogo} alt=""/>
      </div>

      <Button onClick={()=>setOpen(true)}>signup</Button>
      <h1>lets build an instagram clone</h1>
      {
        posts.map(({id, post})=>(
          <Posts key={id} username={post.username} caption={post.caption} imageurl={post.imageurl}/>
        ))
      }
      {/* <Posts username="Abhishek" caption ="woow it is great" imageurl={reactlogo}/>
      <Posts username="farheen" caption="its so cute" imageurl={dog}/>
      <Posts username="Amish" caption="it is like a heaven" imageurl={nature}/>
      <Posts username="kumar sahab" caption="its amazing" imageurl={celeb}/> */}
    </div>
  );
}

export default App;
