// DISPLAY REGIONS IN FILTER TAB
let propertiesContainer;
let propertiesBody;
let radioInput;
let propertyDiv;
const cityMap = new Map();
let cityName;
   fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions",{
    method: 'GET'
})
.then(response => response.json())
    .then(data => {
      const list = document.getElementById('regionList');
      
      data.forEach(region => {
        
        const label = document.createElement('label');
        const radioInput = document.createElement('input');
        
        radioInput.type = 'checkbox';
        radioInput.value = region.id;
        label.textContent = region.name;
        
        label.prepend(radioInput);
        
        list.appendChild(label);
      })
    })




//  PRICE, AREA & QUANTITY VALIDATION

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const errorMessagePrice = document.getElementById("price-error-message");
const priceSelectButton = document.getElementById("price_select_button");

const minAreaInput = document.getElementById("min-area");
const maxAreaInput = document.getElementById("max-area");
const errorMessageArea = document.getElementById("area-error-message");
const areaSelectButton = document.getElementById("area_select_button");

const bdrQuantityInput = document.getElementById("number");
const errorMessageBdrQuantity = document.getElementById('bdr-quantity-error-message');

  // error message
function validatePrices() {
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);
  
  if (maxPrice < minPrice) {
    errorMessagePrice.style.display = "block";
    minPriceInput.style.border = "1px solid #F93B1D";
    maxPriceInput.style.border = "1px solid #F93B1D";
  } else {
    errorMessagePrice.style.display = "none";
    minPriceInput.style.border = "1px solid #808A93";
    maxPriceInput.style.border = "1px solid #808A93";
  }
}

function validateArea() {
  const minArea = parseInt(minAreaInput.value);
  const maxArea = parseInt(maxAreaInput.value);
  
  if (maxArea < minArea) {
    errorMessageArea.style.display = "block";
    minAreaInput.style.border = "1px solid #F93B1D";
    maxAreaInput.style.border = "1px solid #F93B1D";
  } else {
    errorMessageArea.style.display = "none";
    minAreaInput.style.border = "1px solid #808A93";
    maxAreaInput.style.border = "1px solid #808A93";
  }
}

function validateBdrQuantity() {
  const bdrQuantity = parseInt(bdrQuantityInput.value);

  if(bdrQuantity <= 0){
    errorMessageBdrQuantity.style.display = 'block';
    bdrQuantityInput.style.border = "1px solid #F93B1D";
  }else{
    errorMessageBdrQuantity.style.display = 'none';
    bdrQuantityInput.style.border = "1px solid #808A93";
  }
};

minPriceInput.addEventListener("input", validatePrices);
maxPriceInput.addEventListener("input", validatePrices);

minAreaInput.addEventListener("input", validateArea);
maxAreaInput.addEventListener("input", validateArea);

bdrQuantityInput.addEventListener("input", validateBdrQuantity);

  // setting the input values on click
function handleOptionClick(inputField, value) {
  inputField.value = value;
  validatePrices();
  validateArea();
}

  // for price
document.querySelectorAll("#min-options .price-option").forEach(button => {
  button.addEventListener("click", function() {
    handleOptionClick(minPriceInput, this.getAttribute("data-value"));
  });
});

document.querySelectorAll("#max-options .price-option").forEach(button => {
  button.addEventListener("click", function() {
    handleOptionClick(maxPriceInput, this.getAttribute("data-value"));
  });
});

  // for area

document.querySelectorAll("#min-options .area-option").forEach(button => {
  button.addEventListener("click", function() {
    handleOptionClick(minAreaInput, this.getAttribute("data-value"));
  });
});

document.querySelectorAll("#max-options .area-option").forEach(button => {
  button.addEventListener("click", function() {
    handleOptionClick(maxAreaInput, this.getAttribute("data-value"));
  });
});

// HANDELING DROPDOWN TABS

function dropdownDisplay (optionStr) {

  let dropdown = document.querySelector(`.drop_down_${optionStr}`);
    dropdown.style.display = 'none';
    
    const container = document.querySelector('.chip_container');
    container.style.display = 'flex';
  
    const options = document.querySelector(`.${optionStr}`);
    options.addEventListener('mouseover', () => {
      dropdown.style.display = 'block';
    });
    options.addEventListener('mouseout', () => {
      dropdown.style.display = 'none';
    });
};

// GENERATE REGION CHIPS

function generateRegionChips() {

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const chips = document.getElementById('chips');
  const chipContainer = document.querySelector('.chip_container');
  let regionChip = document.querySelectorAll('.regionChip');

  regionChip.forEach(chip => {
    chip.remove();
  })

  checkboxes.forEach(checkbox => {

    if (checkbox.checked) {

      const chip = document.createElement('div');
      chip.classList.add('regionChip');

      chip.innerText = checkbox.nextSibling.textContent.trim();
      
      const closeIcon = document.createElement('img');
      closeIcon.src = '/icons/icon_x.svg';
      closeIcon.alt = 'close';  
      closeIcon.style.cursor = 'pointer';

      closeIcon.addEventListener('click', function() {
        chip.remove(); 
        checkbox.checked = false;
        if(chips.innerHTML == ''){
          chipContainer.style.display = 'none';
        }
      });

      chip.appendChild(closeIcon);
      chips.appendChild(chip);
    };
  });
};

document.getElementById('region_select_button').addEventListener('click', () => {
  document.querySelector("#all_listings_container").innerHTML = "";
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let counter = 0;
  checkboxes.forEach(checkbox => {
    if(checkbox.checked){
      counter++;
      propertiesBody.forEach((property) => {

        if(checkbox.value == property.city.region_id){

           propertyDiv = document.createElement('div');

          const formattedPrice = property.price.toLocaleString('en-US').replace(/,/g, ' ');
  
           cityName = cityMap.get(property.city_id);
  
          propertyDiv.innerHTML = `
            <img src="${property.image || '/path/to/default-image.jpg'}" alt="Property Image" >
            <div class="is_rental_sign">${property.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}</div>
            <div class="listing_details">
              <div>
                <h4 style="font-size: 28px; font-weight: 700; margin-bottom: 6px; color: #021526">
                ${formattedPrice} ₾</h4>
                <p style="display: flex; align-items: center; gap: 4px">
                <img src="/icons/icon_location.svg" />
                ${cityName}, ${property.address}</p>
              </div>
              <div style="display: flex; gap: 32px">
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_bed.svg" />${property.bedrooms}</p>
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_area.svg" />${property.area} მ²</p>
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_zip.svg" />${property.zip_code}</p>
              </div>
            </div>
          `;
  
          propertyDiv.classList.add('homepage_listing_contanier');
          propertiesContainer.appendChild(propertyDiv);
  
          propertyDiv.addEventListener('click', () => {
            window.location.href =` /Listing-page/listingPage.html?id=${property.id}`;
          });
        }
        
      })
    }

  })

  if(counter > 0){
    generateRegionChips();
    dropdownDisplay('region');
  }
});

// GENERATE PRICE CHIPS

function generatePriceChip(minPrice, maxPrice) {
  const chips = document.getElementById('chips');
  const chipContainer = document.querySelector('.chip_container');
  let chip = document.querySelector('.priceChip');

  if(!chip) {
    chip = document.createElement('div');
    chip.classList.add('priceChip');

    chip.innerText =` ${minPrice} ₾ - ${maxPrice} ₾`;

    const closeIcon = document.createElement('img');
    closeIcon.src = '/icons/icon_x.svg'; 
    closeIcon.alt = 'close';
    closeIcon.style.cursor = 'pointer'; 

    closeIcon.addEventListener('click', function () {
      chip.remove();
      if(chips.innerHTML == ''){
        chipContainer.style.display = 'none';
      }
    });

    chip.appendChild(closeIcon);
    chips.appendChild(chip);
    chipContainer.style.display = 'flex';
  }

  chip.firstChild.textContent = `${minPrice} ₾ - ${maxPrice} ₾`;
}

document.getElementById('price_select_button').addEventListener('click', function () {
  const minPrice = document.getElementById('min-price').value;
  const maxPrice = document.getElementById('max-price').value;
  
  if (minPrice && maxPrice && Number(maxPrice) > Number(minPrice)) {
    generatePriceChip(minPrice, maxPrice);
    dropdownDisplay('price');
  }

});

// GENERATE AREA CHIPS

function generateAreaChip(minArea, maxArea) {
  const chips = document.getElementById('chips');
  const chipContainer = document.querySelector('.chip_container');
  let chip = document.querySelector('.areaChip');

  if(!chip) {
    chip = document.createElement('div');
    chip.classList.add('areaChip');

    chip.innerText =`${minArea} მ² - ${maxArea} მ²`;

    const closeIcon = document.createElement('img');
    closeIcon.src = '/icons/icon_x.svg'; 
    closeIcon.alt = 'close';
    closeIcon.style.cursor = 'pointer'; 

    closeIcon.addEventListener('click', function () {
      chip.remove();
      if(chips.innerHTML == ''){
        chipContainer.style.display = 'none';
      }
    });

    chip.appendChild(closeIcon);
    chips.appendChild(chip);
    chipContainer.style.display = 'flex';
  }

  chip.firstChild.textContent =`${minArea} მ² - ${maxArea} მ²`;
}

document.getElementById('area_select_button').addEventListener('click', function () {
  const minArea = document.getElementById('min-area').value;
  const maxArea = document.getElementById('max-area').value;
  
  if (minArea && maxArea && Number(maxArea) > Number(minArea)) {
    generateAreaChip(minArea, maxArea);
    dropdownDisplay('area');
  }

});

// GENERATE BEDROOM QUANTITY CHIPS

function generateBdrQuantityChip(number) {

  const chips = document.getElementById('chips');
  const chipContainer = document.querySelector('.chip_container');
  let chip = document.querySelector('.BdrQuantityChip');

  if(!chip) {
    chip = document.createElement('div');
    chip.classList.add('BdrQuantityChip');

    chip.innerText = number;

    const closeIcon = document.createElement('img');
    closeIcon.src = '/icons/icon_x.svg'; 
    closeIcon.alt = 'close';
    closeIcon.style.cursor = 'pointer'; 

    closeIcon.addEventListener('click', function () {
      chip.remove();
      if(chips.innerHTML == ''){
        chipContainer.style.display = 'none';
      }
    });

    chip.appendChild(closeIcon);
    chips.appendChild(chip);
    chipContainer.style.display = 'flex';
  }

  chip.firstChild.textContent = number;
}

document.getElementById('bdr_quantity_select_button').addEventListener('click', function () {
  const number = document.getElementById('number').value;
  
  if(number && number > 0) {
    generateBdrQuantityChip(number);
    dropdownDisplay('bdr_quantity');
  };
});

// CLEAR CHIPS

function removeAllChips() {
  const chips = document.getElementById('chips');
  const chipsContainer = document.querySelector('.chip_container');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  chips.innerHTML = '';

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  chipsContainer.style.display = 'none';
  
}

document.querySelector('.clear_all_chips').addEventListener('click', removeAllChips);

// ADD AGENT MODAL

const homepageAddAgentButton = document.querySelector('.homepage_button.add_agent');
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

homepageAddAgentButton.addEventListener('click', function() {
  showModal();
});

overlay.addEventListener('click', function() {
  hideModal();

});

cancelButton.addEventListener('click', function() {
  hideModal();

});



// ADD AGENT MODAL VALIDATION

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const emailInput = document.getElementById('email');
  const mobileInput = document.getElementById('mobile_number');
  const uploadPhotoInput = document.getElementById('upload_photo');


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

  uploadPhotoInput.addEventListener('change', function () {
    if (uploadPhotoInput.files.length === 0) {
      showError('photo_message', 'upload_photo_container', 'ატვირთეთ ფოტო');
    } else {
      hideError('photo_message', 'upload_photo_container', '');
    };
  });

  // Form submit validation
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
    if (uploadPhotoInput.files.length === 0) {
      showError('photo_message', 'upload_photo_container', 'ატვირთეთ ფოტო');
      formIsValid = false;
    } else {
      hideError('photo_message', 'upload_photo_container', '');
    };

    if (formIsValid) {
      const formData = new FormData();
      formData.append('name', nameInput.value);
      formData.append('surname', surnameInput.value);
      formData.append('email', emailInput.value);
      formData.append('phone', mobileInput.value);
      formData.append('avatar', uploadPhotoInput.files[0]);

      fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      document.getElementById('add_agent_form').reset();
      hideModal();
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

/* generate listings */

document.addEventListener('DOMContentLoaded', function() {
  const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
  const apiPropertiesURL = 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates';
  const apiCitiesURL = 'https://api.real-estate-manager.redberryinternship.ge/api/cities';

  
  // Fetch cities from the API
  fetch(apiCitiesURL, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(citiesData => {
    citiesBody = citiesData;
    
    citiesData.forEach(city => {
      cityMap.set(city.id, city.name);
    });

    // Fetch properties from the API
    fetch(apiPropertiesURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(propertiesData => {
       propertiesContainer = document.getElementById('all_listings_container');
        propertiesBody = propertiesData;
      if (propertiesData && propertiesData.length > 0) {
        propertiesData.forEach(property => {

           propertyDiv = document.createElement('div');

          const formattedPrice = property.price.toLocaleString('en-US').replace(/,/g, ' ');

           cityName = cityMap.get(property.city_id);

          propertyDiv.innerHTML = `
            <img src="${property.image || '/path/to/default-image.jpg'}" alt="Property Image" >
            <div class="is_rental_sign">${property.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}</div>
            <div class="listing_details">
              <div>
                <h4 style="font-size: 28px; font-weight: 700; margin-bottom: 6px; color: #021526">
                ${formattedPrice} ₾</h4>
                <p style="display: flex; align-items: center; gap: 4px">
                <img src="/icons/icon_location.svg" />
                ${cityName}, ${property.address}</p>
              </div>
              <div style="display: flex; gap: 32px">
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_bed.svg" />${property.bedrooms}</p>
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_area.svg" />${property.area} მ²</p>
                <p style="display: flex; align-items: center; gap: 5px">
                <img src="/icons/icon_zip.svg" />${property.zip_code}</p>
              </div>
            </div>
          `;

          propertyDiv.classList.add('homepage_listing_contanier');
          propertiesContainer.appendChild(propertyDiv);

          propertyDiv.addEventListener('click', () => {
            window.location.href = `/Listing-page/listingPage.html?id=${property.id}`;
          });
        });
      } else {
        propertiesContainer.innerHTML = '<p>No properties found.</p>';
      }
    })
  });
});