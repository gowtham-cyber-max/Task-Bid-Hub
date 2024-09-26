async function getSkillSet(req,res){
    const skillSet= [
        "House Cleaning", "Laundry", "Ironing", "Dishwashing", "Vacuuming", 
        "Window Cleaning", "Mopping", "Dusting", "Bathroom Cleaning", "Kitchen Cleaning", 
        "Grocery Shopping", "Cooking", "Baking", "Food Delivery", "Meal Preparation", 
        "Pet Sitting", "Dog Walking", "Cat Sitting", "Pet Grooming", "Fish Tank Cleaning", 
        "Babysitting", "Childcare", "Elderly Care", "Home Care", "In-Home Nursing", 
        "Gardening", "Lawn Mowing", "Tree Trimming", "Hedge Trimming", "Weeding", 
        "Plant Care", "Landscaping", "Vegetable Gardening", "Fertilizing", "Outdoor Cleaning", 
        "Patio Cleaning", "Driveway Cleaning", "Pressure Washing", "Gutter Cleaning", "Pool Cleaning", 
        "Snow Removal", "Leaf Raking", "Fence Repair", "Painting", "Wall Repairs", 
        "Furniture Assembly", "Picture Hanging", "Curtain Installation", "Blinds Installation", "Light Fixture Installation", 
        "Ceiling Fan Installation", "Outlet Installation", "TV Mounting", "Home Theater Setup", "Home Office Setup", 
        "Computer Troubleshooting", "Wi-Fi Setup", "Furniture Moving", "Packing Services", "Unpacking Services", 
        "Junk Removal", "Garage Organization", "Closet Organization", "Pantry Organization", "Decluttering", 
        "Carpet Cleaning", "Upholstery Cleaning", "Mattress Cleaning", "Air Duct Cleaning", "Pest Control", 
        "Rodent Control", "Termite Control", "Bed Bug Treatment", "Ant Control", "Mosquito Control", 
        "Home Security Installation", "Alarm System Setup", "Smart Lock Installation", "CCTV Installation", "Home Automation Setup", 
        "Home Appliance Repair", "Washing Machine Repair", "Refrigerator Repair", "Microwave Repair", "Oven Repair", 
        "Dishwasher Repair", "AC Repair", "Heater Repair", "Plumbing", "Leaky Faucet Repair", 
        "Toilet Installation", "Shower Installation", "Sink Installation", "Water Heater Installation", "Roof Repair", 
        "Chimney Repair", "Siding Repair", "Window Repair", "Door Repair", "Sewer Line Repair", "Custom Work"
      ]
      res.json(skillSet);
}

module.exports={getSkillSet};