import React from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';
function Posts({username,caption,imageurl}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar" src="/static/images/avatar/1.jpg" alt="Abhishek"/>
                <h3>{username}</h3> 
            </div>
           <img className="post_image" src={imageurl} alt="reactlogo"/>
           <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    );
}

export default Posts;