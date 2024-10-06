import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { bidderSignup } from '../Redux/Action/BidderAction';

function BidderSignUp() {
    const dispatch=useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    pass: "",
    companyName: "",
    phone: "",
    proof: "",
    skills: [],
    mobile: "",
    longitude: 0, 
    latitude: 0
  });
  
  const [skillInput, setSkillInput] = useState(""); // Input field for adding skills manually
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown

  const predefinedSkills = ["Plumbing", "Electricals", "Carpentry", "Painting", "Masonry"];

  const navigate = useNavigate();

  const onSubmiting = async (event) => {
    event.preventDefault();
    console.log(data);
    dispatch(bidderSignup(data));

  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput)) {
      setData({ ...data, skills: [...data.skills, skillInput.trim()] });
    }
    setSkillInput(""); 
  };

  const handleSelectSkill = (skill) => {
    if (!data.skills.includes(skill)) {
      setData({ ...data, skills: [...data.skills, skill] });
    }
    setShowDropdown(false);
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = data.skills.filter((skill) => skill !== skillToRemove);
    setData({ ...data, skills: updatedSkills });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setData({ ...data, latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      alert("Please allow the location for the task location.");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmiting}>
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setData({ ...data, pass: e.target.value })}
          />

          <input
            type='text'
            placeholder='Company Name'
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
          />

          <PhoneInput
            value={data.mobile}
            onChange={(value) => setData({ ...data, mobile: value })}
            placeholder="Mobile Number"
          />

          <input
            type='text'
            placeholder='Proof (e.g., ID Number)'
            onChange={(e) => setData({ ...data, proof: e.target.value })}
          />
          <br />

          {/* Manual Skill input */}
          <div style={{ position: "relative" }}>
            <input
              type='text'
              placeholder='Enter a skill'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click on dropdown
            />
            <button type="button" onClick={handleSkillAdd}>Add Skill</button>
{/*  it will show the options  */}
            {showDropdown && (
              <ul style={{ position: "absolute", border: "1px solid #ccc", backgroundColor: "#fff", width: "200px", zIndex: 1, listStyle: "none", padding: "10px", margin: "5px 0" }}>
                {predefinedSkills.map((skill, index) => (
                  <li
                    key={index}
                    style={{ padding: "5px", cursor: "pointer" ,color:"black"}}
                    onMouseDown={() => handleSelectSkill(skill)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* list of selected skills  */}
          <ul>
            {data.skills.map((skill, index) => (
                <li key={index} >
                    {skill} <button type="button" onClick={() => removeSkill(skill)}>Remove</button>
                </li>

            ))}
          </ul>

          <button type='button' onClick={getLocation}>Get Current Location</button>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BidderSignUp;
