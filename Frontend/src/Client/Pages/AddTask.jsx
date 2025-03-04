import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Redux/Action/UserAction';
import { getPreDefineSkills } from '../../Redux/Action/CommonAction';
import '../Style/User-AddTask.css';
import { IoIosRemoveCircle } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [errors, setErrors] = useState({ taskName: '', budget: '' });

  // Fetch predefined skills on mount
  useEffect(() => {
    const fetchSkills = async () => {
      const list = await dispatch(getPreDefineSkills());
      setPredefinedSkills(list);
    };
    fetchSkills();
  }, [dispatch]);

  // Validate fields and set inline error messages
  const validateField = useCallback((name, value) => {
    if (name === 'taskName') {
      if (value.trim().length < 4) {
        setErrors(prev => ({ ...prev, taskName: 'Task name must be at least 4 characters.' }));
      } else {
        setErrors(prev => ({ ...prev, taskName: '' }));
      }
    }
    if (name === 'budget') {
      if (Number(value) <= 0) {
        setErrors(prev => ({ ...prev, budget: 'Budget must be a positive number.' }));
      } else {
        setErrors(prev => ({ ...prev, budget: '' }));
      }
    }
  }, []);

  // Update task state and validate on change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
    validateField(name, value);
  }, [validateField]);

  // Final form submission with validations
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (task.taskName.trim().length < 4 || Number(task.budget) <= 0) {
      alert("Please ensure the task name is at least 4 characters and the budget is positive.");
      return;
    }
    dispatch(addTask(task));
    alert("Task added successfully!");
  }, [task, dispatch]);

  // Add a skill from the input field if not already present
  const handleSkillAdd = useCallback(() => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !task.skills.includes(trimmedSkill)) {
      setTask(prevTask => ({
        ...prevTask,
        skills: [...prevTask.skills, trimmedSkill]
      }));
    }
    setSkillInput('');
    setShowDropdown(false);
  }, [skillInput, task.skills]);

  // Add a skill from the dropdown
  const handleSelectSkill = useCallback((skill) => {
    if (!task.skills.includes(skill)) {
      setTask(prevTask => ({
        ...prevTask,
        skills: [...prevTask.skills, skill]
      }));
    }
    setSkillInput('');
    setShowDropdown(false);
  }, [task.skills]);

  // Remove a selected skill
  const removeSkill = useCallback((skillToRemove) => {
    setTask(prevTask => ({
      ...prevTask,
      skills: prevTask.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

  // Get current location using the Geolocation API
  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTask(prevTask => ({
            ...prevTask,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
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
  }, []);

  // Filter skills based on user input
  const filteredSkills = useMemo(() => {
    if (!skillInput.trim()) return predefinedSkills;
    return predefinedSkills.filter(skill =>
      skill.toLowerCase().includes(skillInput.toLowerCase())
    );
  }, [skillInput, predefinedSkills]);

  return (
    <div className='user-add-task'>
      <form onSubmit={handleSubmit} className="add-task-form">
        <h1>Post New Task</h1>
        <label className="add-task-label">
          Task Name:
          <input
            type="text"
            name="taskName"
            value={task.taskName}
            onChange={handleChange}
            required
            className="add-task-input"
          />
          {errors.taskName && <span className="error-message">{errors.taskName}</span>}
        </label>

        <label className="add-task-label">
          Task Description:
          <textarea
            name="taskDescription"
            value={task.taskDescription}
            onChange={handleChange}
            className="add-task-textarea"
          />
        </label>

        <label className="add-task-label">
          End Date:
          <DatePicker
            selected={task.endDate ? new Date(task.endDate) : null}
            onChange={(date) => setTask(prevTask => ({ ...prevTask, endDate: date }))}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="add-task-input"
            placeholderText="Select a date"
            showPopperArrow={false}
          />
        </label>

        <label className="add-task-label">
          Budget:
          <input
            type="number"
            name="budget"
            value={task.budget}
            onChange={handleChange}
            required
            className="add-task-input"
          />
          {errors.budget && <span className="error-message">{errors.budget}</span>}
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
          <button type="button" onClick={handleSkillAdd} className="add-task-button">
            Add Skill
          </button>

          {showDropdown && (
            <ul className="add-task-dropdown">
              {filteredSkills.map((skill, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSelectSkill(skill)}
                  className="add-task-dropdown-item"
                >
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
              <IoIosRemoveCircle
                type="button"
                onClick={() => removeSkill(skill)}
                className="add-task-remove-skill"
              />
            </li>
          ))}
        </ul>

        <label className="add-task-label">
          Latitude:
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

        <label className="add-task-label">
          Longitude:
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

        <button type="button" onClick={getLocation} className="add-task-location-button">
          Get Current Location
        </button>
        <button type="submit" className="add-task-submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
