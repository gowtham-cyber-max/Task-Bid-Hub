import React, { useState } from 'react';
import { FaSearch, FaPen, FaComments, FaCheckCircle, FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importing icons

const BidderHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#222',
            color: 'white',
            display: 'flex',
            height: '100vh',
            overflow: 'hidden', // Prevent body overflow
        },
        sidebar: {
            width: isSidebarOpen ? '250px' : '60px', // Adjust width based on state
            backgroundColor: '#333',
            padding: isSidebarOpen ? '20px' : '10px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)',
            transition: 'width 0.3s, padding 0.3s', // Smooth transition
        },
        sidebarItem: {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            padding: '15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background 0.3s',
        },
        sidebarIcon: {
            marginRight: isSidebarOpen ? '10px' : '0',
            fontSize: '1.5rem',
        },
        container: {
            flex: 1,
            backgroundColor: '#444',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto', // Allow vertical scrolling
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#555',
            borderRadius: '5px',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        },
        navbarItem: {
            margin: '0 15px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        header: {
            marginBottom: '20px',
        },
        workflowDiagram: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
        },
        workflowStep: {
            backgroundColor: '#FFD700',
            color: 'black',
            padding: '15px',
            borderRadius: '5px',
            margin: '10px 0',
            width: '90%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            marginRight: '10px',
            fontSize: '1.5rem',
        },
        arrow: {
            width: '2px',
            height: '20px',
            backgroundColor: '#FFD700',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: -1, // Place behind the steps
        },
        rightSideContent: {
            backgroundColor: '#555',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '20px',
            color: 'white',
        },
        ongoingTasks: {
            marginBottom: '20px',
        },
        taskItem: {
            backgroundColor: '#666',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#FFD700',
            color: 'black',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={styles.body}>
            <div style={styles.sidebar}>
                <div style={styles.sidebarItem} onClick={toggleSidebar}>
                    <FaBars style={styles.sidebarIcon} />
                    {isSidebarOpen && 'Menu'}
                </div>
                {isSidebarOpen && (
                    <>
                        <div style={styles.sidebarItem}><FaHome style={styles.sidebarIcon} /> Home</div>
                        <div style={styles.sidebarItem}><FaUser style={styles.sidebarIcon} /> Profile</div>
                        <div style={styles.sidebarItem}><FaSignOutAlt style={styles.sidebarIcon} /> Logout</div>
                    </>
                )}
            </div>
            <div style={styles.container}>
                <div style={styles.navbar}>
                    <div style={styles.navbarItem}>Home</div>
                    <div style={styles.navbarItem}>My Bids</div>
                    <div style={styles.navbarItem}>Profile</div>
                </div>
                {/* Welcome Section */}
                <div style={styles.header}>
                    <h1>Welcome, Bidder!</h1>
                    <p>Here's how you can use TaskBidHub to get started:</p>
                </div>

                {/* Workflow Diagram */}
                <div style={styles.workflowDiagram}>
                    <div style={styles.workflowStep}>
                        <FaSearch style={styles.icon} /> Browse Tasks
                        <div style={styles.arrow}></div>
                    </div>
                    <div style={styles.workflowStep}>
                        <FaPen style={styles.icon} /> Submit Bids
                        <div style={styles.arrow}></div>
                    </div>
                    <div style={styles.workflowStep}>
                        <FaComments style={styles.icon} /> Communicate
                        <div style={styles.arrow}></div>
                    </div>
                    <div style={styles.workflowStep}>
                        <FaCheckCircle style={styles.icon} /> Complete Tasks
                    </div>
                </div>

                {/* Right Side Content for Ongoing Tasks */}
                <div style={styles.rightSideContent}>
                    <h2>Ongoing Tasks</h2>
                    <div style={styles.ongoingTasks}>
                        <div style={styles.taskItem}>Task 1: Plumbing Work</div>
                        <div style={styles.taskItem}>Task 2: Electrical Installation</div>
                        <div style={styles.taskItem}>Task 3: House Cleaning</div>
                    </div>
                    <button style={styles.button}>View All Tasks</button>
                </div>
            </div>
        </div>
    );
};

export default BidderHome;
