import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/UserHome.css'; // Ensure this CSS file exists for styles

const UserHome = () => {
    const navi = useNavigate();
    
    return (
        <div className="user-home">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Welcome, User!</h1>
                <p>Explore services to get your tasks done by professionals.</p>
                <button onClick={() => navi("/user-add-task")} className="post-task-button">Post a New Task</button>
            </section>

            {/* Motivational Image Section */}
            <div className="motivation-section">
                <img 
                    src="https://source.unsplash.com/600x400/?motivation,success" 
                    alt="Motivational" 
                    className="motivation-image"
                />
            </div>
        </div>
    );
}

export default UserHome;
