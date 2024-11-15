import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Redux/Action/UserAction';
import { getPreDefineSkills } from '../../Redux/Action/CommonAction';
import '../Style/User-AddTask.css';
import { IoIosRemoveCircle } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Importing the styles for the date picker

const AddTask = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState({
        taskName: '',
        taskDescription: '',
        endDate: '',
        budget: '',
        skills: [],
        latitude: '',
        longitude: '',
    });

    const [skillInput, setSkillInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [predefinedSkills, setPredefinedSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const list = await dispatch(getPreDefineSkills());
            setPredefinedSkills(list);
        };
        fetchSkills();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.taskName.length >= 4 && task.budget > 0) {
            dispatch(addTask(task));
            alert("Task added successfully!");
        } else {
            alert("Please ensure task name is at least 4 characters and budget is positive.");
        }
    };

    const handleSkillAdd = () => {
        if (skillInput.trim() && !task.skills.includes(skillInput)) {
            setTask({ ...task, skills: [...task.skills, skillInput.trim()] });
        }
        setSkillInput('');
        setShowDropdown(false);
    };

    const handleSelectSkill = (skill) => {
        if (!task.skills.includes(skill)) {
            setTask({ ...task, skills: [...task.skills, skill] });
        }
        setShowDropdown(false);
        setSkillInput('');
    };

    const removeSkill = (skillToRemove) => {
        setTask({
            ...task,
            skills: task.skills.filter(skill => skill !== skillToRemove),
        });
    };

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
                    alert(`Error obtaining location: ${error.message}`);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const filteredSkills = skillInput.trim() === ''
        ? predefinedSkills
        : predefinedSkills.filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase()));

    return (
        <div className='user-add-task'>
            <form onSubmit={handleSubmit} className="add-task-form">
                <h1>Post New Task</h1>
                <label className="add-task-label">Task Name:
                    <input
                        type="text"
                        name="taskName"
                        value={task.taskName}
                        onChange={handleChange}
                        required
                        className="add-task-input"
                    />
                </label>

                <label className="add-task-label">Task Description:
                    <textarea
                        name="taskDescription"
                        value={task.taskDescription}
                        onChange={handleChange}
                        className="add-task-textarea"
                    />
                </label>

                <label className="add-task-label">End Date:
                    <DatePicker
                        selected={task.endDate ? new Date(task.endDate) : null} // Handling preselected date
                        onChange={(date) => setTask({ ...task, endDate: date })}
                        dateFormat="yyyy-MM-dd" // Format for the date input
                        className="add-task-input"
                        placeholderText="Select a date"
                        showPopperArrow={false}
                    />
                </label>

                <label className="add-task-label">Budget:
                    <input
                        type="number"
                        name="budget"
                        value={task.budget}
                        onChange={handleChange}
                        required
                        className="add-task-input"
                    />
                </label>

                <div className="add-task-skill-container">
                    <input
                        type="text"
                        placeholder="Enter a skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        className="add-task-input"
                    />
                    <button type="button" onClick={handleSkillAdd} className="add-task-button">Add Skill</button>

                    {showDropdown && (
                        <ul className="add-task-dropdown">
                            {filteredSkills.map((skill, index) => (
                                <li key={index} onMouseDown={() => handleSelectSkill(skill)} className="add-task-dropdown-item">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <ul className="add-task-skill-list">
                    {task.skills.map((skill, index) => (
                        <li key={index} className="add-task-skill-item">
                            {skill}
                            <IoIosRemoveCircle type="button" onClick={() => removeSkill(skill)} className="add-task-remove-skill">Remove</IoIosRemoveCircle>
                        </li>
                    ))}
                </ul>

                <label className="add-task-label">Latitude:
                    <input
                        type="number"
                        name="latitude"
                        value={task.latitude}
                        onChange={handleChange}
                        placeholder="Latitude"
                        required
                        className="add-task-input"
                    />
                </label>

                <label className="add-task-label">Longitude:
                    <input
                        type="number"
                        name="longitude"
                        value={task.longitude}
                        onChange={handleChange}
                        placeholder="Longitude"
                        required
                        className="add-task-input"
                    />
                </label>

                <button type="button" onClick={getLocation} className="add-task-location-button">Get Current Location</button>
                <button type="submit" className="add-task-submit-button">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
