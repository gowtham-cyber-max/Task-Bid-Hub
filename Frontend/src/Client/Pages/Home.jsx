import React from 'react';

const UserHome = () => {
    // Sample data for services
    const services = [
        { id: 1, title: "Plumbing", description: "Expert plumbing services for your home." },
        { id: 2, title: "Electrical", description: "Professional electrical installations and repairs." },
        { id: 3, title: "Cleaning", description: "Comprehensive cleaning services for your space." },
        { id: 4, title: "Painting", description: "Interior and exterior painting services." },
        { id: 5, title: "Carpentry", description: "Custom carpentry services for all needs." },
    ];

    // Inline styles
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#222', // Dark background color
            color: 'white',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
        },
        logoImage: {
            width: '40px', // Adjust logo size as needed
            height: '40px',
            marginRight: '10px',
        },
        logoText: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        navList: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
        },
        navItem: {
            margin: '0 15px',
        },
        navLink: {
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        hero: {
            backgroundColor: '#111',
            color: 'white',
            textAlign: 'center',
            padding: '60px 20px',
        },
        ctaButton: {
            backgroundColor: '#FFD700', // Yellow color
            color: 'black',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
        },
        services: {
            padding: '40px 20px',
            backgroundColor: '#222', // Keep background dark
            textAlign: 'center',
        },
        serviceList: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginTop: '20px',
        },
        serviceCard: {
            backgroundColor: '#444', // Light black
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '30%',
            margin: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow for elevation
            transition: 'transform 0.3s, box-shadow 0.3s',
        },
        serviceCardHover: {
            transform: 'scale(1.05)', // Scale up on hover
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)', // Enhanced shadow on hover
        },
        serviceBtn: {
            display: 'inline-block',
            backgroundColor: '#FFD700', // Yellow color
            color: 'black',
            padding: '5px 10px',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer',
            border: 'none',
        },
        customServiceBox: {
            backgroundColor: '#666', // Darker box for custom service
            color: 'white',
            padding: '30px',
            borderRadius: '10px',
            margin: '20px auto',
            width: '80%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s, box-shadow 0.3s',
        },
        customServiceBtn: {
            display: 'inline-block',
            backgroundColor: '#FFD700',
            color: 'black',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer',
            border: 'none',
        },
    };

    return (
        <div style={styles.body}>
            {/* Navigation Bar */}
            <header style={styles.navbar}>
                <div style={styles.logo}>
                    <img 
                        src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcF1hpnk1QJrYWiU8FdUbfK01kAajQulUK6g&s" 
                        alt="TaskBidHub Logo" 
                        style={styles.logoImage}
                    />
                    <span style={styles.logoText}>TaskBidHub</span>
                </div>
                <nav>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}>
                            <a href="#" style={styles.navLink}>Home</a>
                        </li>
                        <li style={styles.navItem}>
                            <a href="#" style={styles.navLink}>My Services</a>
                        </li>
                        <li style={styles.navItem}>
                            <a href="#" style={styles.navLink}>Post a Task</a>
                        </li>
                        <li style={styles.navItem}>
                            <a href="#" style={styles.navLink}>Profile</a>
                        </li>
                        <li style={styles.navItem}>
                            <a href="#" style={styles.navLink}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <section style={styles.hero}>
                <h1>Welcome, User!</h1>
                <p>Explore services to get your tasks done by professionals.</p>
                <button style={styles.ctaButton}>Post a New Task</button>
            </section>

            {/* Custom Service Box */}
            <section style={{ textAlign: 'center' }}>
                <div style={styles.customServiceBox}>
                    <h2>Request a Custom Service</h2>
                    <p>Can't find what you're looking for? Let us know, and we'll connect you with the right professional!</p>
                    <button style={styles.customServiceBtn}>Request Custom Service</button>
                </div>
            </section>

            {/* Services Section */}
            <section style={styles.services}>
                <h2>Available Services</h2>
                <div style={styles.serviceList}>
                    {services.map((service, index) => (
                        <div key={service.id} style={{...styles.serviceCard, ...(index === 0 ? styles.serviceCardHover : {})}}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <button style={styles.serviceBtn}>Request Service</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default UserHome;
