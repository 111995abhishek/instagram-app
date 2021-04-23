import './App.css';
import instagramlogo from './instagramlogo.png';
import Posts from './posts';
import reactlogo from './reactimage.png';
import dog from './puppy.jpg';
import nature from './nature.jpg';
import celeb from './celeb.jpg';
import React, { useState } from 'react';



function App() {
  const [posts,setPosts] = useState([
    {
      username:"Abhishek", 
      caption :"woow it is great",
      imageurl:reactlogo
    },
    {
      username:"farheen",
      caption:"its so cute",
      imageurl:dog
    },
    {
      username:"Amish",
      caption:"it is like a heaven",
      imageurl:nature
    },
    {
      username:"kumar sahab",
      caption:"its amazing",
      imageurl:celeb
    }
  ]);
  return (
    <div className="App">
      <div className="app_header">
        <img className="app-header-image" src={instagramlogo} alt=""/>
      </div>
      <h1>lets build an instagram clone</h1>
      {
        posts.map(post=>(
          <Posts username={post.username} caption={post.caption} imageurl={post.imageurl}/>
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
