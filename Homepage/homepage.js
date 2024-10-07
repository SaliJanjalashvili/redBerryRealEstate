// DISPLAY REGIONS IN FILTER TAB
let propertiesContainer;
let propertiesBody = [];
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

// Function to show or hide validation errors
function handleValidationError(inputElement, errorMessageElement, isError) {
  if (isError) {
    errorMessageElement.style.display = "block";
    inputElement.style.border = "1px solid #F93B1D";
  } else {
    errorMessageElement.style.display = "none";
    inputElement.style.border = "1px solid #808A93";
  }
}

// Reusable validate function for min-max comparison
function validate(minInput, maxInput, errorMessage, minValue, maxValue) {
  const isError = maxValue <= minValue;
  handleValidationError(minInput, errorMessage, isError);
  handleValidationError(maxInput, errorMessage, isError);
}

// setting the input values on click
function handleOptionClick(inputField, value) {
  inputField.value = value;
  validatePrices();
  validateArea();
}

  // Prices
function validatePrices() {
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);
  validate(minPriceInput, maxPriceInput, errorMessagePrice, minPrice, maxPrice);
}
minPriceInput.addEventListener("input", validatePrices);
maxPriceInput.addEventListener("input", validatePrices);

  // Area
function validateArea() {
  const minArea = parseInt(minAreaInput.value);
  const maxArea = parseInt(maxAreaInput.value);
  validate(minAreaInput, maxAreaInput, errorMessageArea, minArea, maxArea);
}
minAreaInput.addEventListener("input", validateArea);
maxAreaInput.addEventListener("input", validateArea);

  // Bedroom quantity
function validateBdrQuantity() {
  const bdrQuantity = parseInt(bdrQuantityInput.value);
  const isError = bdrQuantity <= 0;
  handleValidationError(bdrQuantityInput, errorMessageBdrQuantity, isError);
}
bdrQuantityInput.addEventListener("input", validateBdrQuantity);
const originalBdrQuantityInputPlaceholder = bdrQuantityInput.placeholder;
bdrQuantityInput.addEventListener("focus", () => {
  bdrQuantityInput.placeholder = '';
});
bdrQuantityInput.addEventListener("blur", () => {
  bdrQuantityInput.placeholder = originalBdrQuantityInputPlaceholder;
});

// Reusable function to insert hardcoded input options on click
function addOptionEventListeners(optionSelector, inputElement) {
  document.querySelectorAll(optionSelector).forEach(button => {
    button.addEventListener("click", function() {
      handleOptionClick(inputElement, this.getAttribute("data-value"));
    });
  });
}
  // price options on click
addOptionEventListeners("#min-options .price-option", minPriceInput);
addOptionEventListeners("#max-options .price-option", maxPriceInput);
  // area options on click
addOptionEventListeners("#min-options .area-option", minAreaInput);
addOptionEventListeners("#max-options .area-option", maxAreaInput);

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

// GENERATING CHIPS

const chips = document.getElementById('chips');
const chipContainer = document.querySelector('.chip_container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const CHIP_CLASSES = {
  REGION: 'regionChip',
  PRICE: 'priceChip',
  AREA: 'areaChip',
  BDR_QUANTITY: 'BdrQuantityChip'
};

// Function to generate a chip
function generateChip(chipClass, displayText, closeCallback) {
  const chip = document.createElement('div');
  chip.classList.add(chipClass);
  chip.innerText = displayText;

  const closeIcon = document.createElement('img');
  closeIcon.src = '/icons/icon_x.svg'; 
  closeIcon.alt = 'close';
  closeIcon.style.cursor = 'pointer';
  closeIcon.addEventListener('click', function () {
    chip.remove();
    closeCallback();
    if (chips.innerHTML === '') {
      chipContainer.style.display = 'none';
    }
  });
  chip.appendChild(closeIcon);
  chips.appendChild(chip);
  chipContainer.style.display = 'flex';
}
// Remove existing chip before generating a new one
function removeExistingChip(chipClass) {
  const existingChip = document.querySelector(`.${chipClass}`);
  if (existingChip) {
    existingChip.remove();
  }
}

// Generate region chips for each checked checkbox
function generateRegionChips() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  selectedFilters.regions = [];
  document.querySelectorAll(`.${CHIP_CLASSES.REGION}`).forEach(chip => chip.remove());

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const regionId = parseInt(checkbox.value);
      selectedFilters.regions.push(regionId);
      generateChip(CHIP_CLASSES.REGION, checkbox.nextSibling.textContent.trim(), () => {
        checkbox.checked = false; 
        selectedFilters.regions = selectedFilters.regions.filter(id => id !== regionId);
        updateFilteredProperties();
      });
    }
  });
  updateFilteredProperties();
}
document.getElementById('region_select_button').addEventListener('click', () => {
  generateRegionChips();
  dropdownDisplay('region');
});

// Generate chip for Price
function generatePriceChip(minPrice, maxPrice) {
  const displayText = `${minPrice} ₾ - ${maxPrice} ₾`;
  selectedFilters.priceRange = { min: minPrice, max: maxPrice };
  removeExistingChip(CHIP_CLASSES.PRICE);
  generateChip(CHIP_CLASSES.PRICE, displayText, () => {
    selectedFilters.priceRange = null;
    updateFilteredProperties();
  });
  updateFilteredProperties(); 
}
document.getElementById('price_select_button').addEventListener('click', function () {
  const minPrice = Number(document.getElementById('min-price').value);
  const maxPrice = Number(document.getElementById('max-price').value);

  if (minPrice && maxPrice && maxPrice > minPrice) {
    generatePriceChip(minPrice, maxPrice);
    dropdownDisplay('price');
  }
});

// Generate chip for Area
function generateAreaChip(minArea, maxArea) {
  const displayText = `${minArea} მ² - ${maxArea} მ²`;
  selectedFilters.areaRange = { min: minArea, max: maxArea };
  removeExistingChip(CHIP_CLASSES.AREA);
  generateChip(CHIP_CLASSES.AREA, displayText, () => {
    selectedFilters.areaRange = null; 
    updateFilteredProperties();
  });
  updateFilteredProperties();
}
document.getElementById('area_select_button').addEventListener('click', function () {
  const minArea = Number(document.getElementById('min-area').value);
  const maxArea = Number(document.getElementById('max-area').value);

  if (minArea && maxArea && maxArea > minArea) {
    generateAreaChip(minArea, maxArea);
    dropdownDisplay('area');
  }
});

// Generate chip for Bedroom Quantity
function generateBdrQuantityChip(number) {
  const displayText = `${number}`;
  selectedFilters.bedroomQuantity = number;
  removeExistingChip(CHIP_CLASSES.BDR_QUANTITY);
  generateChip(CHIP_CLASSES.BDR_QUANTITY, displayText, () => {
    selectedFilters.bedroomQuantity = null; 
    updateFilteredProperties();
  });
  updateFilteredProperties();
}
document.getElementById('bdr_quantity_select_button').addEventListener('click', function () {
  const number = Number(document.getElementById('number').value);

  if (number && number > 0) {
    generateBdrQuantityChip(number);
    dropdownDisplay('bdr_quantity');
  }
});

// CLEAR CHIPS
function removeAllChips() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  chips.innerHTML = '';
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  selectedFilters = {
    regions: [],
    priceRange: null,
    areaRange: null,
    bedroomQuantity: null,
  };

  chipContainer.style.display = 'none';
  updateFilteredProperties(); 
}
document.querySelector('.clear_all_chips').addEventListener('click', removeAllChips);

// GENERATE LISTINGS

const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
const apiPropertiesURL = 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates';
const apiCitiesURL = 'https://api.real-estate-manager.redberryinternship.ge/api/cities';

// Function to generate a property listing
function createPropertyListing(property, propertiesContainer) {
  const propertyDiv = document.createElement('div');
  const formattedPrice = property.price.toLocaleString('en-US').replace(/,/g, ' ');
  const cityName = cityMap.get(property.city_id);

  propertyDiv.innerHTML = `
    <img src="${property.image || '/path/to/default-image.jpg'}" alt="Property Image" class="property_image">
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
}

// Fetch cities and properties
document.addEventListener('DOMContentLoaded', function() {
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
    citiesData.forEach(city => {
      cityMap.set(city.id, city.name);
    });

    // Fetch properties from the API
    return fetch(apiPropertiesURL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  })
  .then(response => response.json())
  .then(propertiesData => {
    propertiesBody = propertiesData;
    const propertiesContainer = document.getElementById('all_listings_container');

    if (propertiesData && propertiesData.length > 0) {
      propertiesData.forEach(property => createPropertyListing(property, propertiesContainer));
    } else {
      propertiesContainer.innerHTML = '<p style="font-weight: 400; font-size: 20px; color: #021526CC">გთხოვთ შექმნათ განცხადება</p>';
    }
  });
});

// FILTER LISTINGS
let selectedFilters = {
  regions: [],
  priceRange: null,
  areaRange: null,
  bedroomQuantity: null,
};

function filterProperties(properties) {
  return properties.filter(property => {
    const propertyRegionId = property.city.region_id;

    const matchesRegion = selectedFilters.regions.length === 0 || selectedFilters.regions.includes(propertyRegionId);
    const matchesPrice = !selectedFilters.priceRange || (property.price >= selectedFilters.priceRange.min && property.price <= selectedFilters.priceRange.max);
    const matchesArea = !selectedFilters.areaRange || (property.area >= selectedFilters.areaRange.min && property.area <= selectedFilters.areaRange.max);
    const matchesBedroomQuantity = !selectedFilters.bedroomQuantity || property.bedrooms === selectedFilters.bedroomQuantity;
    
    let regionIsChosen;
    let priceIsChosen;
    let areaIsChosen;
    let quantityIsChosen;

    if(selectedFilters.regions.length > 0){
      regionIsChosen = matchesRegion
    }
    if(selectedFilters.priceRange){
      priceIsChosen = matchesPrice
    }
    if(selectedFilters.areaRange){
      areaIsChosen = matchesArea
    }
    if(selectedFilters.bedroomQuantity){
      quantityIsChosen = matchesBedroomQuantity
    }

    return regionIsChosen || priceIsChosen || areaIsChosen || quantityIsChosen;
  });
} 

function updateFilteredProperties() {
  const propertiesContainer = document.getElementById('all_listings_container');
  propertiesContainer.innerHTML = ''; 

  const noFiltersApplied =
    selectedFilters.regions.length === 0 &&
    !selectedFilters.priceRange &&
    !selectedFilters.areaRange &&
    !selectedFilters.bedroomQuantity;

  let propertiesToShow = propertiesBody;

  if (!noFiltersApplied) {
    propertiesToShow = filterProperties(propertiesBody);
  }

  if (propertiesToShow.length > 0) {
    propertiesToShow.forEach(property => createPropertyListing(property, propertiesContainer));
  } else {
    propertiesContainer.innerHTML = '<p style="font-weight: 400; font-size: 20px; color: #021526CC">აღნიშნული მონაცემებით განცხადება არ იძებნება</p>';
  }
}

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

