import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/UserHome.css'; // Ensure this CSS file exists for styles

const UserHome = () => {
    const navi = useNavigate();
    
    return (
        <div className="user-home">
            <div className="content-section">
                <h1 className="hero-title">Welcome, User!</h1>
                <p className="hero-description">Easily create a new task and connect with skilled professionals who are eager to help turn your ideas into reality!.</p>
                <button onClick={() => navi("/user-add-task")} className="post-task-button">Post a New Task</button>
            </div>

            <div className="image-section">
                <img 
                    src="https://media.istockphoto.com/id/1681619429/photo/silhouette-of-positive-man-celebrating-on-mountain-top-with-arms-raised-up-silhouette-of-man.jpg?s=612x612&w=0&k=20&c=qPt67d0B535UZrtk7kP3N_T7uZ-Nl_DdxB-xZIIhLRw=" 
                    alt="Motivational" 
                    className="motivation-image"
                />
            </div>
        </div>
    );
}

export default UserHome;
