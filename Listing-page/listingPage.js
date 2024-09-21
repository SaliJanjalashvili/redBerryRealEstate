/* generate main listing */

document.addEventListener('DOMContentLoaded', function() {
    const token = '9d0c401a-9398-4cf8-ac8b-32b0f3121fc2';
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (!propertyId) {
      alert('Property ID is missing');
      return;
    }
  
    const apiSelectedPropertyURL = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${propertyId}`;
  
    fetch(apiSelectedPropertyURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(property => {

      const propertyDetailsContainer = document.getElementById('detailed_listing_container');
  
      if (property) {
        const formattedPrice = property.price.toLocaleString('en-US').replace(/,/g, ', ');
  
        propertyDetailsContainer.innerHTML = `
            <div class="listing_image_and_type">
                <img src="${property.image || '/path/to/default-image.jpg'}" alt="Property Image">
                <div class="is_rental_sign">${property.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}</div>
            </div> 
            <div class="listing_details">
                <div style="display:flex; flex-direction:column; gap:24px ">
                    <h3 style="font-size:48px; font-weight:700; color: #021526">${formattedPrice} ₾</h3>
                    <div style="font-size:24px; font-weight:400; color: #808A93; display: flex; flex-direction: column; gap: 16px">
                        <p style="display: flex; align-items: center; gap: 4px">
                            <img src="/icons/icon_location.svg" />
                            ${property.city.name}, ${property.address}
                        </p>
                        <p style="display: flex; align-items: center; gap: 4px; padding-left:3px">
                            <img src="/icons/icon_area.svg" />
                            ფართი ${property.area} მ²
                        </p>
                        <p style="display: flex; align-items: center; gap: 4px">
                            <img src="/icons/icon_bed.svg" />
                            საძინებელი ${property.bedrooms}
                        </p>
                        <p style="display: flex; align-items: center; gap: 4px">
                            <img src="/icons/icon_zip.svg" />
                            საფოსტო ინდექსი ${property.zip_code}
                        </p>
                    </div>
                    <p style="margin-top: 24px; font-size: 16px; font-weight: 400">${property.description}</p>
                </div>
                <div class="agent_detail_container">
                    <div class="agent_details">
                        <div style="display:flex; align-items:center; margin-bottom:16px">
                            <img src="${property.agent.avatar}" alt="Agent Avatar" style="width: 72px; height: 72px; margin-right: 20px; border-radius: 50%; object-fit: cover;">
                            <p style="font-size:16px; font-weight:400; color:#021526"> ${property.agent.name} ${property.agent.surname}<br>
                                <span style="font-size:14px; color:#676E76">აგენტი</span>
                            </p>
                        </div>
                        <div style="font-size: 14px; font-weight:400; color:#808A93; display:flex; flex-direction:column; gap: 4px">
                            <p style="display: flex; align-items: center; gap: 5px">
                                <img src="/icons/icon_phone.svg" />
                                ${property.agent.email}
                            </p>
                            <p style="display: flex; align-items: center; gap: 5px">
                                <img src="/icons/icon_email.svg" />
                                ${property.agent.phone}
                            </p>
                        </div>
                    </div>
                    <span id="delete_listing">ლისტინგის წაშლა</span>
                </div>
            </div>
        `;

        fetchSimilarListings(property.city.region.id, token, property.id);

        } else {
            propertyDetailsContainer.innerHTML = '<p>Property not found.</p>';
        }

        const cancelButton = document.querySelector('.delete_listing_button.cancel');
        const closeButton = document.querySelector('.delete_listing_modal_close_button');
        const deleteListingButton = document.getElementById('delete_listing');

        deleteListingButton.addEventListener('click', function() {
            showModal();
        });
        
        overlay.addEventListener('click', function() {
            hideModal();
        });
        
        cancelButton.addEventListener('click', function() {
            hideModal();
        });
        
        closeButton.addEventListener('click', function() {
            hideModal();
        });

        document.querySelector('.delete_listing_button.delete').addEventListener('click', function() {
            deleteListing(propertyId, token);
        });
    })
    .catch(error => {
      console.error('Error fetching property:', error);
      const propertyDetailsContainer = document.getElementById('property-details');
      propertyDetailsContainer.innerHTML = '<p>Error fetching property details.</p>';
    });
});

// Function display similar listings by region
function fetchSimilarListings(regionId, token, mainPropertyId) {
    const apiPropertiesURL = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`;
    
    fetch(apiPropertiesURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(properties => {
        const similarListingsContainer = document.getElementById('similar_listings_container');
        similarListingsContainer.innerHTML = ''; 

        const similarProperties = properties.filter(property => property.city.region.id === regionId && property.id !== mainPropertyId);

        if (similarProperties.length > 0) {
            similarProperties.forEach(property => {
                const formattedPrice = property.price.toLocaleString('en-US').replace(/,/g, ' ');

                const listingDiv = document.createElement('div');
                
                listingDiv.innerHTML = `
                    <div style="height:307px">
                        <img src="${property.image || '/path/to/default-image.jpg'}" alt="Property Image" >
                        <div class="is_rental_sign_small">${property.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}</div>
                    </div> 
                    <div class="similar_listing_details">
                        <div>
                            <h4 style="font-size: 28px; font-weight: 700; margin-bottom: 6px; color: #021526">
                            ${formattedPrice} ₾</h4>
                            <p style="display: flex; align-items: center; gap: 4px">
                            <img src="/icons/icon_location.svg" />
                            ${property.city.name}, ${property.address}</p>
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
                listingDiv.classList.add('individual_similar_listing_contanier');
                similarListingsContainer.appendChild(listingDiv);

                listingDiv.addEventListener('click', () => {
                    window.location.href = `/Listing-page/listingPage.html?id=${property.id}`;
                });
            });

            if (similarProperties.length > 4) {
                carouselScroll();
            }
        } else {
            similarListingsContainer.innerHTML = '<p style="font-size:20px; font-weight:400; color: #021526CC">მსგავს ლოკაციაზე სხვა განცხადებები არ იძებნება</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching similar listings:', error);
        const similarListingsContainer = document.getElementById('similar_listings_container');
        similarListingsContainer.innerHTML = '<p>Error fetching similar listings.</p>';
    });
}

function carouselScroll() {
    const carousel = document.getElementById('similar_listings_container');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

    let visibleItemsCount = 4; 
    const totalItems = carousel.children.length;

    // showing arrows
    if (totalItems > visibleItemsCount) {
        leftArrow.style.display = 'flex';
        rightArrow.style.display = 'flex';
    }

    rightArrow.addEventListener('click', () => {
        const firstItem = carousel.firstElementChild;
        carousel.appendChild(firstItem);
        updateArrows(carousel, visibleItemsCount);
    });

    leftArrow.addEventListener('click', () => {
        const lastItem = carousel.lastElementChild;
        carousel.prepend(lastItem);
        updateArrows(carousel, visibleItemsCount);
    });

    updateArrows(carousel, visibleItemsCount);
}

// Function to hide/show arrows if there's nothing to scroll
function updateArrows(carousel, visibleItemsCount) {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

    if (carousel.children.length <= visibleItemsCount) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'flex';
        rightArrow.style.display = 'flex';
    }
}

// Function to delete request
function deleteListing(propertyId, token) {
    const deleteURL = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${propertyId}`;
    
    fetch(deleteURL, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/index.html';
        } else {
            alert('Failed to delete the listing.');
        }
    });
};

// listing delete modal


const deleteListingModal = document.querySelector('.delete_listing_modal');
const overlay = document.getElementById('overlay');


function showModal() {
    deleteListingModal.style.display = 'flex';
    overlay.style.display = 'block';
}

function hideModal() {
    deleteListingModal.style.display = 'none';
    overlay.style.display = 'none';
}