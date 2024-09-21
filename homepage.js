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