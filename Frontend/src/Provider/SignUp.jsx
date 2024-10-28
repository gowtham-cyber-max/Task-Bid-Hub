import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { bidderSignup } from '../Redux/Action/BidderAction';
import { getPreDefineSkills } from '../Redux/Action/CommonAction';
import "./Style/Bidder-Signup.css"

import { FaTimes } from 'react-icons/fa'; 

function BidderSignUp() {
    const dispatch = useDispatch();
    const navi = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        pass: "",
        companyName: "",
        mobile: "",
        proof: "",
        skills: [],
        longitude: 0,
        latitude: 0
    });

    const [skillInput, setSkillInput] = useState(""); // Input for adding skills manually
    const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
    const [predefinedSkills, setPredefinedSkills] = useState([]);
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(-1); // Track the selected index

    useEffect(() => {
        const fetchSkills = async () => {
            const list = await dispatch(getPreDefineSkills());
            setPredefinedSkills(list);
           
        };
        fetchSkills();
    }, [dispatch]);

    const onSubmiting = async (event) => {
        event.preventDefault();
        console.log(data);
        const res=await dispatch(bidderSignup(data));
        if(res){
        navi("/bidder-login")
        }
        
    };

    const handleSkillAdd = () => {
        if (skillInput.trim() && !data.skills.includes(skillInput)) {
            setData(prevData => ({ ...prevData, skills: [...prevData.skills, skillInput.trim()] }));
        }
        setSkillInput("");
        setShowDropdown(false);
        setSelectedSkillIndex(-1); // Reset the index
    };

    const handleSelectSkill = (skill) => {
        if (!data.skills.includes(skill)) {
            setData(prevData => ({ ...prevData, skills: [...prevData.skills, skill] }));
        }
        setShowDropdown(false);
        setSkillInput("");
        setSelectedSkillIndex(-1); // Reset the index
    };

    const removeSkill = (skillToRemove) => {
        setData(prevData => ({
            ...prevData,
            skills: prevData.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // Show all skills if input is empty, otherwise filter by input value
    const filteredSkills = skillInput.trim() === ""
        ? predefinedSkills
        : predefinedSkills.filter(skill =>
            skill.toLowerCase().includes(skillInput.toLowerCase())
        );

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData(prevData => ({
                        ...prevData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                },
                (error) => {
                    alert("Error obtaining location: " + error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Handle keyboard navigation in the skills dropdown
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedSkillIndex((prevIndex) => (prevIndex < filteredSkills.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            setSelectedSkillIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter' && selectedSkillIndex >= 0) {
            handleSelectSkill(filteredSkills[selectedSkillIndex]);
        }
    };

    return (
        <div className='bidder-signup'>

        <div className='bidder-signup-container'>
        <h2>Bidder Signup</h2>
            <form onSubmit={onSubmiting} className='bidder-signup-form'>
                <input
                    type='text'
                    placeholder='Username'
                    onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
                />
                <input
                    type='email'
                    placeholder='Email'
                    onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}
                />
                <input
                    type='password'
                    placeholder='Password'
                    onChange={(e) => setData(prevData => ({ ...prevData, pass: e.target.value }))}
                />
                <input
                    type='text'
                    placeholder='Company Name'
                    onChange={(e) => setData(prevData => ({ ...prevData, companyName: e.target.value }))}
                />
                <PhoneInput
                    value={data.mobile}
                    onChange={(value) => setData(prevData => ({ ...prevData, mobile: value }))}
                    placeholder="Mobile Number"
                />
                <input
                    type='text'
                    placeholder='Proof (e.g., ID Number)'
                    onChange={(e) => setData(prevData => ({ ...prevData, proof: e.target.value }))}
                />
                <br />

                {/* Skill Input */}
                <div style={{ position: "relative" }}>
                    <input
                        type='text'
                        placeholder='Enter a skill'
                        value={skillInput}
                        onChange={(e) => {
                            setSkillInput(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)} // Show dropdown when focused
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Close after a delay
                        onKeyDown={handleKeyDown} // Add key down handler
                    />
                    <button type="button" className='button-2' onClick={handleSkillAdd}>Add Skill</button>

                    {/* Dropdown for predefined skills */}
                    {showDropdown && (
                        <ul style={{ position: "absolute", border: "1px solid #ccc", backgroundColor: "#fff", width: "200px", zIndex: 1, listStyle: "none", padding: "10px", margin: "5px 0" }}>
                            {filteredSkills.map((skill, index) => (
                                <li
                                    key={index}
                                    style={{ padding: "5px", cursor: "pointer", color: selectedSkillIndex === index ? "blue" : "black", backgroundColor: selectedSkillIndex === index ? "#e0e0e0" : "white" }}
                                    onMouseDown={() => handleSelectSkill(skill)}
                                    onMouseEnter={() => setSelectedSkillIndex(index)} // Set the index on hover
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* List of selected skills */}
                <ul>
                    {data.skills.map((skill, index) => (
                        <li key={index}>
                            {skill} <FaTimes   onClick={() => removeSkill(skill)} className='button-3'>Remove</FaTimes>
                        </li>
                    ))}
                </ul>

                <button type='button' onClick={getLocation} className='button-1'>Get Current Location</button>
                <button type='submit' className='button-0'>Submit</button>
            </form>
        </div>
     </div>
    );
}

export default BidderSignUp;
