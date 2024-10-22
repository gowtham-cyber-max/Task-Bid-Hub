import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Redux/Action/UserAction';

const AddTask = () => {
  const dispatch=useDispatch();
    const [task, setTask] = useState({
        taskName: '',
        taskDescription: '',
        endDate: '',
        budget: '',
        skills: [],
        latitude: '',
        longitude: '',
    });

    const [skillInput, setSkillInput] = useState(''); // Input field for adding skills manually
    const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
    const predefinedSkills = ['Plumbing', 'Electricals', 'Carpentry', 'Painting', 'Masonry'];


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(task);
        dispatch(addTask(task));

    };

    // Add skill manually
    const handleSkillAdd = () => {
        if (skillInput.trim() && !task.skills.includes(skillInput)) {
            setTask({ ...task, skills: [...task.skills, skillInput.trim()] });
        }
        setSkillInput(''); 
    };

    // Select skill from dropdown
    const handleSelectSkill = (skill) => {
        if (!task.skills.includes(skill)) {
            setTask({ ...task, skills: [...task.skills, skill] });
        }
        setShowDropdown(false);
    };

    // Remove skill from selected list
    const removeSkill = (skillToRemove) => {
        const updatedSkills = task.skills.filter((skill) => skill !== skillToRemove);
        setTask({ ...task, skills: updatedSkills });
    };

    // Get current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setTask({
                        ...task,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            alert("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            alert("The request to get user location timed out.");
                            break;
                        default:
                            alert("An unknown error occurred.");
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,  // Enables high accuracy mode (using GPS when available)
                    timeout: 10000,            // Set a maximum wait time of 10 seconds
                    maximumAge: 0              // Disable caching of location data
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Task Name:
                <input
                    type="text"
                    name="taskName"
                    value={task.taskName}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Task Description:
                <textarea
                    name="taskDescription"
                    value={task.taskDescription}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    value={task.endDate}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Budget:
                <input
                    type="number"
                    name="budget"
                    value={task.budget}
                    onChange={handleChange}
                />
            </label>
            <br />

            {/* Manual Skill input */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Enter a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click on dropdown
                />
                <button type="button" onClick={handleSkillAdd}>Add Skill</button>

                {showDropdown && (
                    <ul style={{ position: 'absolute', border: '1px solid #ccc', backgroundColor: '#fff', width: '200px', zIndex: 1, listStyle: 'none', padding: '10px', margin: '5px 0' }}>
                        {predefinedSkills.map((skill, index) => (
                            <li
                                key={index}
                                style={{ padding: '5px', cursor: 'pointer', color: 'black' }}
                                onMouseDown={() => handleSelectSkill(skill)}
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Selected Skills List */}
            <ul>
                {task.skills.map((skill, index) => (
                    <li key={index}>
                        {skill} <button type="button" onClick={() => removeSkill(skill)}>Remove</button>
                    </li>
                ))}
            </ul>

            <label>
                Latitude:
                <input
                    type="number"
                    name="latitude"
                    value={task.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    required
                />
            </label>
            <br />
            <label>
                Longitude:
                <input
                    type="number"
                    name="longitude"
                    value={task.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    required
                />
            </label>
            <br />

            <button type="button" onClick={getLocation}>Get Current Location</button>
            <br />

            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
