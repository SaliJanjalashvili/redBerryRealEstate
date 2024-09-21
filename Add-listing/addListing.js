/* Generate region options */

document.addEventListener('DOMContentLoaded', function () {
    const regionSelect = document.getElementById('region_dropdown_options');
  
    fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions", {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      data.forEach(region => {
          const li = document.createElement('li');
          li.textContent = region.name; 
          li.dataset.id = region.id;
          regionSelect.appendChild(li);
      });
    });
  });
  
  /* Generate city options */
  function loadCityOptions(regionId) {
    const citySelect = document.getElementById('city_dropdown_options');
    citySelect.innerHTML = ''; 
  
    fetch(`https://api.real-estate-manager.redberryinternship.ge/api/cities`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      const filteredCities = data.filter(city => city.region_id === parseInt(regionId)); // Filter cities based on selected region ID
  
      filteredCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city.name;
        li.dataset.id = city.id;
        citySelect.appendChild(li);
      });
    });
  }
  
  /* Generate agent options */
  
  document.addEventListener('DOMContentLoaded', () => {
    const optionsList = document.getElementById('agent_dropdown_options');
    const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
  
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
      data.forEach(agent => {
        const agentFullName = document.createElement('li');
        agentFullName.textContent = `${agent.name} ${agent.surname}`;
        agentFullName.dataset.id = agent.id;
        optionsList.appendChild(agentFullName);
      });
    });
  });

/* uploading image */

const uploadPhotoInput = document.getElementById('upload_photo');
const uploadIcon = document.getElementById('upload_icon');
const uploadedImage = document.getElementById('uploaded_image');
const deleteIcon = document.getElementById('delete_icon');
const uploadPhotoContainer = document.querySelector('.upload_photo_container');

uploadPhotoContainer.addEventListener('click', () => {
  if(!uploadedImage.src || !uploadPhotoInput.value){
    uploadPhotoInput.click();
  }
})

uploadPhotoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            
          uploadIcon.style.display = 'none';

          uploadedImage.src = e.target.result;
          uploadedImage.style.display = 'block';
          deleteIcon.style.display = 'block';
        };

        reader.readAsDataURL(file);
    }
});

deleteIcon.addEventListener('click', function() {
  uploadedImage.style.display = 'none';
  uploadPhotoInput.value = '';
  uploadedImage.src = ''; 
  deleteIcon.style.display = 'none';
  uploadIcon.style.display = 'block';
});

  document.addEventListener('DOMContentLoaded', () => {
    /* REGION DROPDOWN AND DISPLAY HANDELING */
      const regionDropdown = document.getElementById('region_dropdown');
      const selectedRegionText = document.getElementById('region_selected_text');
      const regionOptions = document.getElementById('region_dropdown_options');
      const dropdownIconRegion = document.getElementById('region_dropdown_icon');
    
      const cityContainer = document.getElementById('city_hidden_container');
      const selectedCityText = document.getElementById('city_selected_text');
    
      let selectedRegionId = null;
    
      // Toggle region dropdown
      regionDropdown.addEventListener('click', () => {
        const isOptionsVisible = regionOptions.style.display === 'block';
        regionOptions.style.display = isOptionsVisible ? 'none' : 'block';
        regionDropdown.style.borderRadius = isOptionsVisible ? '6px' : '6px 6px 0 0';
        dropdownIconRegion.style.rotate = isOptionsVisible ? '0deg' : '180deg';
      });
    
      // Handle region selection
      regionOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          selectedRegionText.innerText = e.target.innerText;
          regionOptions.style.display = 'block';
          regionDropdown.style.borderRadius = '6px';
          cityContainer.style.display = 'flex';
          selectedCityText.innerHTML = 'აირჩიე';
    
          selectedRegionId = e.target.dataset.id;
          loadCityOptions(selectedRegionId);
        }
      });
    
      // Close the dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!regionDropdown.contains(e.target)) {
          regionOptions.style.display = 'none';
          regionDropdown.style.borderRadius = '6px';
          dropdownIconRegion.style.rotate = '0deg';
        }
      });
    
    /* CITY DROPDOWN AND DISPLAY HANDELING*/
    
      const cityDropdown = document.getElementById('city_dropdown');
      const cityOptions = document.getElementById('city_dropdown_options');
      const dropdownIconCity = document.getElementById('city_dropdown_icon');
      let selectedCityId = null;
    
      // Toggle city dropdown
      cityDropdown.addEventListener('click', () => {
        const isOptionsVisible = cityOptions.style.display === 'block';
        cityOptions.style.display = isOptionsVisible ? 'none' : 'block';
        cityDropdown.style.borderRadius = isOptionsVisible ? '6px' : '6px 6px 0 0';
        dropdownIconCity.style.rotate = isOptionsVisible ? '0deg' : '180deg';
      });
    
      // Handle city selection
      cityOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          selectedCityText.innerText = e.target.innerText;
          cityOptions.style.display = 'block';
          cityDropdown.style.borderRadius = '6px';
    
          selectedCityId = e.target.dataset.id;
        };
      });
    
      // Close the dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!cityDropdown.contains(e.target)) {
          cityOptions.style.display = 'none';
          cityDropdown.style.borderRadius = '6px';
          dropdownIconCity.style.rotate = '0deg';
        };
      });
    
    /* AGENT DROPDOWN AND DISPLAY HANDELING*/
    
      const agentDropdown = document.getElementById('agent_dropdown');
      const selectedAgentText = document.getElementById('agent_selected_text');
      const agentOptions = document.getElementById('agent_dropdown_options');
      const dropdownIconAgent = document.getElementById('agent_dropdown_icon');
      let selectedAgentId = null;
    
      // Toggle agent dropdown
      agentDropdown.addEventListener('click', () => {
        const isOptionsVisible = agentOptions.style.display === 'block';
        agentOptions.style.display = isOptionsVisible ? 'none' : 'block';
        agentDropdown.style.borderRadius = isOptionsVisible ? '6px' : '6px 6px 0 0';
        dropdownIconAgent.style.rotate = isOptionsVisible ? '0deg' : '180deg';
      });
    
      // Handle agent selection
      agentOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          selectedAgentText.innerText = e.target.innerText;
          selectedAgentId = e.target.dataset.id;
          agentOptions.style.display = 'block';
          agentDropdown.style.borderRadius = '6px';
        }
      });
    
      // Close the dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!agentDropdown.contains(e.target)) {
          agentOptions.style.display = 'none';
          agentDropdown.style.borderRadius = '6px';
          dropdownIconAgent.style.rotate = '0deg';
        }
      });
    })
  