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
  
  /* FORM VALIDATION */
  
    const form = document.getElementById('add_listing_form');
    const messages = {
      address: document.getElementById('address_message'),
      zip: document.getElementById('zip_message'),
      price: document.getElementById('price_message'),
      area: document.getElementById('area_message'),
      bdr_quantity: document.getElementById('bdr_quantity_message'),
      description: document.getElementById('description_message'),
      photo: document.getElementById('photo_message'),
      agent: document.getElementById('agent_message')
    };
  
    // Address live validation
    const address = document.getElementById('address');
    address.addEventListener('input', ()=> {
      if (address.value.length < 2) {
        address.classList.add('error');
        messages.address.classList.add('error');
        messages.address.classList.remove('success');
      } else {
        address.classList.remove('error');
        messages.address.classList.remove('error');
        messages.address.classList.add('success');
      }
    });
    
  
    // Zip code live validation
    const zip = document.getElementById('zip');
    zip.addEventListener('input', ()=> {
      if (!/^\d+$/.test(zip.value)) {
        zip.classList.add('error');
        messages.zip.classList.add('error');
        messages.zip.classList.remove('success');
      } else {
        zip.classList.remove('error');
        messages.zip.classList.remove('error');
        messages.zip.classList.add('success');
      }
    });
  
    // Region live validation
    const region = document.getElementById('region_dropdown');
  
    region.addEventListener('click', ()=> {
      region.classList.remove('error');
      region.addEventListener('change', ()=> {
        if (region.querySelector('#region_selected_text').innerText === 'აირჩიე') {
          region.classList.add('error');
        } else {
          region.classList.remove('error');
        }
      });
    });
  
    // City live validation
    const city = document.getElementById('city_dropdown');
  
    city.addEventListener('click', ()=> {
      city.classList.remove('error');
      city.addEventListener('change', ()=> {
        if (city.querySelector('#city_selected_text').innerText === 'აირჩიე') {
          city.classList.add('error');
        } else {
          city.classList.remove('error');
        }
      });
    });
  
    // Price live validation
    const price = document.getElementById('price');
    price.addEventListener('input', ()=> {
      if (isNaN(price.value) || price.value <= 0) {
        price.classList.add('error');
        messages.price.classList.add('error');
        messages.price.classList.remove('success');
      } else {
        price.classList.remove('error');
        messages.price.classList.remove('error');
        messages.price.classList.add('success');
      }
    });
  
    // Area live validation
    const area = document.getElementById('area');
    area.addEventListener('input', ()=> {
      if (isNaN(area.value) || area.value <= 0) {
        area.classList.add('error');
        messages.area.classList.add('error');
        messages.area.classList.remove('success');
      } else {
        area.classList.remove('error');
        messages.area.classList.remove('error');
        messages.area.classList.add('success');
      }
    });
  
    // Bdr quantity live validation
    const bdrQuantity = document.getElementById('bdr_quantity');
    bdrQuantity.addEventListener('input', ()=> {
      if (isNaN(bdrQuantity.value) || !Number.isInteger(parseFloat(bdrQuantity.value))) {
        bdrQuantity.classList.add('error');
        messages.bdr_quantity.classList.add('error');
        messages.bdr_quantity.classList.remove('success');
      } else {
        bdrQuantity.classList.remove('error');
        messages.bdr_quantity.classList.remove('error');
        messages.bdr_quantity.classList.add('success');
      }
    });
  
    // Description live validation
    const description = document.getElementById('description');
    description.addEventListener('input', ()=> {
  
      const words = description.value.trim().split(/\s+/).filter(word => word.length > 0);
  
      if (words.length < 5) {
        description.classList.add('error');
        messages.description.classList.add('error');
        messages.description.classList.remove('success');
      } else {
        description.classList.remove('error');
        messages.description.classList.remove('error');
        messages.description.classList.add('success');
      }
    });
  
    // Photo live validation
    const photoContainer = document.getElementById('upload_photo_container');
    const image = uploadPhotoInput.files[0];
    uploadPhotoInput.addEventListener('change', ()=> {
      if ( uploadPhotoInput.length === 0 || image && image.size > 1048576) {
        photoContainer.classList.add('error');
      } else {
        photoContainer.classList.remove('error');
      }
    }); 
  
    // Agent live validation
    const agent = document.getElementById('agent_dropdown');
    agent.addEventListener('input', ()=> {
      if (agent.querySelector('#agent_selected_text').innerText === 'აირჩიე აგენტი') {
        agent.classList.add('error');
      } else {
        agent.classList.remove('error');
      }
    });
  
    document.querySelector('.add_listing_button').addEventListener('click', function (event) {
      event.preventDefault();
  
      const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
  
      let isValid = true;
  
      const is_rental = document.querySelector('input[name="type"]:checked');
  
      // address
      if (address.value.length < 2) {
        address.classList.add('error');
        messages.address.classList.add('error');
        messages.address.classList.remove('success');
        isValid = false;
      } else {
        address.classList.remove('error');
        messages.address.classList.remove('error');
        messages.address.classList.add('success');
      }
  
      // zip
      if (!/^\d+$/.test(zip.value)) {
        zip.classList.add('error');
        messages.zip.classList.add('error');
        messages.zip.classList.remove('success');
        isValid = false;
      } else {
        zip.classList.remove('error');
        messages.zip.classList.remove('error');
        messages.zip.classList.add('success');
      }
  
      //region
      if (region.querySelector('#region_selected_text').innerText === 'აირჩიე') {
        region.classList.add('error');
        isValid = false;
      } else {
        region.classList.remove('error');
      }
  
      //city
      if (city.querySelector('#city_selected_text').innerText === 'აირჩიე') {
        city.classList.add('error');
        isValid = false;
      } else {
        city.classList.remove('error');
      }
  
      //price
      if (isNaN(price.value) || price.value <= 0) {
        price.classList.add('error');
        messages.price.classList.add('error');
        messages.price.classList.remove('success');
        isValid = false;
      } else {
        price.classList.remove('error');
        messages.price.classList.remove('error');
        messages.price.classList.add('success');
      }
  
      //area
      if (isNaN(area.value) || area.value <= 0) {
        area.classList.add('error');
        messages.area.classList.add('error');
        messages.area.classList.remove('success');
        isValid = false;
      } else {
        area.classList.remove('error');
        messages.area.classList.remove('error');
        messages.area.classList.add('success');
      }
  
      //bdr quantity
      if (isNaN(bdrQuantity.value) || !Number.isInteger(parseFloat(bdrQuantity.value))) {
        bdrQuantity.classList.add('error');
        messages.bdr_quantity.classList.add('error');
        messages.bdr_quantity.classList.remove('success');
        isValid = false;
      } else {
        bdrQuantity.classList.remove('error');
        messages.bdr_quantity.classList.remove('error');
        messages.bdr_quantity.classList.add('success');
      }
  
      //description
      const words = description.value.trim().split(/\s+/).filter(word => word.length > 0);
  
      if (words.length < 5) {
        description.classList.add('error');
        messages.description.classList.add('error');
        messages.description.classList.remove('success');
        isValid = false;
      } else {
        description.classList.remove('error');
        messages.description.classList.remove('error');
        messages.description.classList.add('success');
      }
  
      //photo
      if (uploadPhotoInput.length === 0 || image && image.size > 1048576) {
        photoContainer.classList.add('error');
        isValid = false;
      } else {
        photoContainer.classList.remove('error');
      }
  
      //agent
  
      if (agent.querySelector('#agent_selected_text').innerText === 'აირჩიე აგენტი') {
        agent.classList.add('error');
        isValid = false;
      } else {
        agent.classList.remove('error');
      }
  
      if (isValid) {
        const formData = new FormData();
        formData.append('is_rental', is_rental.value);
        formData.append('address', address.value);
        formData.append('zip_code', zip.value);
        formData.append('region_id', selectedRegionId);
        formData.append('city_id', selectedCityId);
        formData.append('price', price.value);
        formData.append('area', area.value);
        formData.append('bedrooms', bdrQuantity.value);
        formData.append('description', description.value);
        formData.append('image', uploadPhotoInput.files[0]);
        formData.append('agent_id', selectedAgentId);
  
        fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData 
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            window.location.href = '/index.html';
            form.reset();
          })
          .catch((error) => console.error('Error:', error));
        };
      });
  });
  
  // ADD AGENT MODAL
  
  const addAgentButton = document.getElementById('add_agent_button');
  const addAgentModal = document.querySelector('.add_agent_modal');
  const overlay = document.getElementById('overlay');
  const cancelButton = document.querySelector('.add_agent_form_button.cancel');
  
  function showModal() {
    addAgentModal.style.display = 'flex';
    overlay.style.display = 'block';
  }
  
  function hideModal() {
    addAgentModal.style.display = 'none';
    overlay.style.display = 'none';
  }
  
  addAgentButton.addEventListener('click', function() {
    showModal();
    sessionStorage.setItem('isOpen', 'true');
  });
  
  overlay.addEventListener('click', function() {
    hideModal();
    sessionStorage.setItem('isOpen', 'false');
  });
  
  cancelButton.addEventListener('click', function() {
    hideModal();
    sessionStorage.setItem('isOpen', 'false');
  });
  
  if(sessionStorage.getItem('isOpen') === 'true'){
    showModal();
  };
  
  // ADD AGENT MODAL VALIDATION
  
  document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile_number');
    const uploadPhotoInputModal = document.getElementById('upload_photo_modal');
  
  
    nameInput.addEventListener('input', function () {
  
      if (nameInput.value.trim().length < 2) {
        showError('name_message', 'name', 'ჩაწერეთ ვალიდური მონაცემები');
      } else {
        hideError('name_message', 'name', 'მინიმუმ ორი სიმბოლო');
      };
    });
  
    surnameInput.addEventListener('input', function () {
      if (surnameInput.value.trim().length < 2) {
        showError('surname_message', 'surname', 'ჩაწერეთ ვალიდური მონაცემები');
      } else {
        hideError('surname_message', 'surname', 'მინიმუმ ორი სიმბოლო');
      };
    });
  
    emailInput.addEventListener('input', function () {
      if (!emailInput.value.endsWith('@redberry.ge')) {
        showError('email_message', 'email', 'ჩაწერეთ ვალიდური მონაცემები');
      } else {
        hideError('email_message', 'email', 'გამოიყენეთ @redberry.ge ფოსტა');
      };
    });
  
    mobileInput.addEventListener('input', function () {
      const mobilePattern = /^5\d{8}$/;
      if (!mobilePattern.test(mobileInput.value.trim())) {
        showError('mobile_number_message', 'mobile_number', 'ჩაწერეთ ვალიდური მონაცემები');
      } else {
        hideError('mobile_number_message', 'mobile_number', 'მხოლოდ რიცხვები');
      };
    });
  
    uploadPhotoInputModal.addEventListener('change', function () {
      if (uploadPhotoInputModal.files.length === 0) {
        showError('photo_message_modal', 'upload_photo_container_modal', 'ატვირთეთ ფოტო');
      } else {
        hideError('photo_message_modal', 'upload_photo_container_modal', '');
      };
    });
  
    // add agent form submit validation
    document.querySelector('.add_agent_form_button.add_agent').addEventListener('click', function (e) {
      e.preventDefault();
  
      const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
  
      let formIsValid = true;
  
      // Validate name
      if (nameInput.value.trim().length < 2) {
        showError('name_message', 'name', 'ჩაწერეთ ვალიდური მონაცემები');
        formIsValid = false;
      } else {
        hideError('name_message', 'name', 'მინიმუმ ორი სიმბოლო');
      };
  
      // Validate surname
      if (surnameInput.value.trim().length < 2) {
        showError('surname_message', 'surname', 'ჩაწერეთ ვალიდური მონაცემები');
        formIsValid = false;
      } else {
        hideError('surname_message', 'surname', 'მინიმუმ ორი სიმბოლო');
      };
  
      // Validate email
      if (!emailInput.value.endsWith('@redberry.ge')) {
        showError('email_message', 'email', 'ჩაწერეთ ვალიდური მონაცემები');
        formIsValid = false;
      } else {
        hideError('email_message', 'email', 'გამოიყენეთ @redberry.ge ფოსტა');
      };
  
      // Validate mobile number
      const mobilePattern = /^5\d{8}$/;
      if (!mobilePattern.test(mobileInput.value.trim())) {
        showError('mobile_number_message', 'mobile_number', 'ჩაწერეთ ვალიდური მონაცემები');
        formIsValid = false;
      } else {
        hideError('mobile_number_message', 'mobile_number', 'მხოლოდ რიცხვები');
      };
  
      // Validate photo
      if (uploadPhotoInputModal.files.length === 0) {
        showError('photo_message_modal', 'upload_photo_container_modal', 'ატვირთეთ ფოტო');
        formIsValid = false;
      } else {
        hideError('photo_message_modal', 'upload_photo_container_modal', '');
      };
  
      if (formIsValid) {
        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('surname', surnameInput.value);
        formData.append('email', emailInput.value);
        formData.append('phone', mobileInput.value);
        formData.append('avatar', uploadPhotoInputModal.files[0]);
  
        fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        document.getElementById('add_agent_form').reset();
        hideModal();
        document.getElementById('agent_dropdown').reset();
      };
    });
  
    function showError(messageElementId, inputElementId, errorMessage) {
      const messageElement = document.getElementById(messageElementId);
      const inputElement = document.getElementById(inputElementId);
      inputElement.classList.add('error');
      messageElement.classList.remove('success');
      messageElement.classList.add('error');
  
      let textNodeFound = false;
  
      messageElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
            node.nodeValue = ` ${errorMessage}`; 
            textNodeFound = true;
        }
      });
  
      if (!textNodeFound) {
        messageElement.appendChild(document.createTextNode(` ${errorMessage}`));
      }
    };
  
    function hideError(messageElementId, inputElementId, successMessage) {
      const messageElement = document.getElementById(messageElementId);
      const inputElement = document.getElementById(inputElementId);
      inputElement.classList.remove('error');
      messageElement.classList.remove('error');
      messageElement.classList.add('success');
  
      messageElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
            node.nodeValue = ` ${successMessage}`; 
        }
      });
    };
  });
  
  
  /* uploading image to modal*/
  
  const uploadPhotoInputModal = document.getElementById('upload_photo_modal');
  const uploadIconModal = document.getElementById('upload_icon_modal');
  const uploadedImageModal = document.getElementById('uploaded_image_modal');
  const deleteIconModal = document.getElementById('delete_icon_modal');
  const uploadPhotoContainerModal = document.querySelector('.upload_photo_container_modal');
  
  uploadPhotoContainerModal.addEventListener('click', () => {
    if(!uploadedImageModal.src || !uploadPhotoInputModal.value){
      uploadPhotoInputModal.click();
    }
  })
  
  uploadPhotoInputModal.addEventListener('change', function(event) {
      const file = event.target.files[0];
      
      if (file) {
          const reader = new FileReader();
  
          reader.onload = function(e) {
              
            uploadIconModal.style.display = 'none';
  
            uploadedImageModal.src = e.target.result;
            uploadedImageModal.style.display = 'block';
            deleteIconModal.style.display = 'block';
          };
  
          reader.readAsDataURL(file);
      }
  });
  
  deleteIconModal.addEventListener('click', function() {
    uploadedImageModal.style.display = 'none';
    uploadPhotoInputModal.value = '';
    uploadedImageModal.src = ''; 
    deleteIconModal.style.display = 'none';
    uploadIconModal.style.display = 'block';
  });
  