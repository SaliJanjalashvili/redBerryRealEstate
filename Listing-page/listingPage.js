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
