import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    // Sample data for services
    const navi=useNavigate();
    return (
        <div>
            {/* Navigation Bar */}
        
                <div>
                    <img 
                        src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcF1hpnk1QJrYWiU8FdUbfK01kAajQulUK6g&s" 
                        alt="TaskBidHub Logo" 
                        style={{height:50,width:50}}
                        
                    />
                    <span >TaskBidHub</span>
                </div>
                <nav>
                    <ul >
                        <li >
                            <a href="/#/user-home" >Home</a>
                        </li>
                        <li >
                            <a href="/#/user-service-list" >Services</a>
                        </li>
                        <li >
                            <a href="/#/user-add-task" >Post a Task</a>
                        </li>
                        <li >
                            <a href="/#/user-profile">Profile</a>
                        </li>
                        <li >
                            <a href="#" >Logout</a>
                        </li>
                    </ul>
                </nav>
         

            {/* Hero Section */}
            <section >
                <h1>Welcome, User!</h1>
                <p>Explore services to get your tasks done by professionals.</p>
                <button onClick={()=>navi("/user-add-task")} >Post a New Task</button>
            </section>

        </div>
    );
}

export default UserHome;
