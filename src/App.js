import './App.css';
import instagramlogo from './instagramlogo.png';
import Posts from './posts';
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';


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




function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [openSignin, setOpensignin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
    //this is where the code runs
  }, []);

  const SignUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  }

  const SignIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpensignin(false);
  }

  return (
    <div className="App">
      <Modal
        open={openSignin}
        onClose={() => setOpensignin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img className="app-header-image" src={instagramlogo} alt="" />
          </center>
          <form className="signup">

            <Input type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" onClick={SignIn}>Sign in</Button>
          </form>
        </div>

      </Modal>


      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img className="app-header-image" src={instagramlogo} alt="" />
          </center>
          <form className="signup">
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />

            <Input type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" onClick={SignUp}>Sign Up</Button>
          </form>
        </div>

      </Modal>

      <div className="app_header">
        <img className="app-header-image" src={instagramlogo} alt="" />
        {user ?
          (<Button onClick={() => auth.signOut()}>logout</Button>)
          : (<div className="app_logincontainer">
            <Button onClick={() => setOpensignin(true)}>signin</Button>
            <Button onClick={() => setOpen(true)}>signup</Button>
          </div>
          )}
      </div>


      <div className="app_posts">
        {
          posts.map(({ id, post }) => (
            <Posts key={id} postId={id} user={user} username={post.username} caption={post.caption} imageurl={post.imageurl} />
          ))
          
        }

      </div>

      {user?.displayName ? (<ImageUpload username={user.displayName} />)
        : (<h3>Sorry!!! you need to login to upload</h3>)
      }
      {/* <Posts username="Abhishek" caption ="woow it is great" imageurl={reactlogo}/>
      <Posts username="farheen" caption="its so cute" imageurl={dog}/>
      <Posts username="Amish" caption="it is like a heaven" imageurl={nature}/>
      <Posts username="kumar sahab" caption="its amazing" imageurl={celeb}/> */}
    </div>
  );
}

export default App;
