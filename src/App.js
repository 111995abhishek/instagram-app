import './App.css';
import instagramlogo from './instagramlogo.png';
import Posts from './posts';
import reactlogo from './reactimage.png';
import dog from './puppy.jpg';
import nature from './nature.jpg';
import celeb from './celeb.jpg';
import React, { useEffect, useState } from 'react';
import {db} from './firebase';




function App() {
  const [posts,setPosts] = useState([]);

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
      <div className="app_header">
        <img className="app-header-image" src={instagramlogo} alt=""/>
      </div>
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
