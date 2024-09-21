// DISPLAY REGIONS IN FILTER TAB

async function getAllRegions(){
    return fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions",{
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
        });
      });
  }
  let data = getAllRegions();
  
  
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
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let counter = 0;
    checkboxes.forEach(checkbox => {
      if(checkbox.checked){
        counter++;
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
  
      chip.innerText = `${minPrice} ₾ - ${maxPrice} ₾`;
  
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
  
      chip.innerText = `${minArea} მ² - ${maxArea} მ²`;
  
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
  
    chip.firstChild.textContent = `${minArea} მ² - ${maxArea} მ²`;
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