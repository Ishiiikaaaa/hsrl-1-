// ========================================================================
// ACTION REQUIRED: Paste this code into a new file named locations.js
// ========================================================================

// Global variables
let map;
let markers = [];
let infoWindow;
const locationList = document.querySelector('.location-list-container');
const searchInput = document.getElementById('locationSearchInput');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');

// ========================================================================
// ACTION REQUIRED: REPLACE THIS SAMPLE DATA WITH YOUR REAL LOCATIONS
// - `lat` and `lng` are required for the map. You can get these from Google Maps.
// - `services` must match the 'value' of the checkboxes in locations.html
// ========================================================================
const locationsData = [
    {
        name: "Anson Service Station",
        address: "Brockhurst Road,Gosport,Hampshire, PO12 3AZ",
        lat: 50.8075,
        lng: -1.1499,
        services: ["Air", "Jet Wash", "Coffee", "Rollover"]
    },
    {
        name: "Belgrave Service Station",
        address: "529 Rayleith Road, Essex, SS9 5HJ",
        lat: 51.76590,
        lng: 0.66736,
        services: ["Rollover", "Air",	"Car Wash",	"Jet Wash",	"Vaccum", "Coffee"]
    },
    {
        name: "Baddesley Service Station",
        address: "54 Botley Road, North Baddesley, Hampshire, SO52 9DU",
        lat: 50.97793,
        lng: -1.43735,
        services: ["Air", "Car Wash", "Vaccum", "Rollover"]
    },
    {
        name: "Swanley Service Station",
        address: "London Road, Swanley, BR8 7HA",
        lat: 51.3971,
        lng: 0.1732,
        services: ["Air"]
    },
    {
        name: "Astwick Service Station",
        address: "Great North Road (A1), Stotfold, Hitchin, SG5 4BL",
        lat: 52.016,
        lng: -0.222,
        services: ["Air", "Coffee", "Rollover", "Subway", "Toilets"]
    },
    {
        name: "Vineyard Service Station",
        address: "Vineyard Road, Abingdon, OX14 3PB",
        lat: 51.670,
        lng: -1.278,
        services: ["Air", "Coffee", "Rollover"]
    },
    {
        name: "Wexham Service Station",
        address: "Wexham Road, Slough, Berkshire, SL2 5QY",
        lat: 51.536,
        lng: -0.602,
        services: ["Air", "Car Wash", "Vaccum", "Coffee", "Rollover"]
    },
    {
        name: "Lye Service Station",
        address: "51 Pedmore Road, Stourbridge, West Midlands, DY9 8DG",
        lat: 52.453,
        lng: -2.100,
        services: ["Air", "Jet Wash", "Vaccum", "Coffee", "Rollover", "Fireaway Pizza", "Toilets", "Stoneway Pizza", "Lauderette"]
    },
    {
        name: "Girton Service Station",
        address: "Huntingdon Road, Girton, Cambridgeshire, CB3 0LQ",
        lat: 52.235,
        lng: 0.088,
        services: ["Air", "Car Wash", "Vaccum", "Coffee", "Rollover", "Toilets"]
    },
    {
        name: "Patcham Service Station",
        address: "Patcham By-Pass, Brighton, East Sussex",
        lat: 50.871,
        lng: -0.137,
        services: ["Air", "Jet Wash", "Vaccum", "Coffee", "Rollover", "Toilets"]
    },
    {
        name: "ESSO Park Royal Service Station",
        address: "Abbey Road, London, NW10 7TS",
        lat: 51.532,
        lng: -0.267,
        services: ["Air", "Jet Wash", "Vaccum", "Coffee", "Rollover", "Toilets"]
    },
    {
        name: "Gravesend Service Station",
        address: "100 Old West Road, Gravesend Kent. DA11 0LR",
        lat: 51.455,
        lng: 0.359,
        services: ["Air", "Jet Wash", "Coffee", "Rollover", "Fireaway Pizza", "Toilets", "Stoneway Pizza"]
    },
    {
        name: "Amersham Service Station",
        address: "40 – 42 WOODSIDE ROAD AMERSHAM BUCKINGHAMSHIRE. HP6 6AJ",
        lat: 51.670,
        lng: -0.608,
        services: ["Air", "Coffee", "Rollover", "Toilets"]
    },
    {
        name: "Erith Service Station",
        address: "295 Bexley Road, Erith, Kent, DA8 3EX",
        lat: 51.472,
        lng: 0.170,
        services: ["Air", "Car Wash", "Vaccum", "Coffee", "Amazon Locker", "Rollover", "Subway", "Toilets"]
    }

];
// ========================================================================
// END OF DATA SECTION
// ========================================================================


/**
 * Google Maps initialization function. This is called by the API script tag.
 */
function initMap() {
    // Center the map on the UK
    const ukCenter = { lat: 54.0, lng: -2.5 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: ukCenter,
        zoom: 6.5,
        mapTypeControl: false,
        streetViewControl: false,
    });

    infoWindow = new google.maps.InfoWindow();

    // Initial render of all locations
    filterAndRenderLocations();
}

/**
 * Reads filters and search input, then re-renders the list and map.
 */
function filterAndRenderLocations() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeServices = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const filteredLocations = locationsData.filter(location => {
        const nameAndAddress = `${location.name} ${location.address}`.toLowerCase();
        
        // Check if matches search term
        const matchesSearch = nameAndAddress.includes(searchTerm);

        // Check if has all selected services
        const matchesServices = activeServices.every(service => location.services.includes(service));

        return matchesSearch && matchesServices;
    });

    renderList(filteredLocations);
    renderMapMarkers(filteredLocations);
}

/**
 * Clears and re-populates the location list on the left panel.
 * @param {Array} locations - The locations to display in the list.
 */
function renderList(locations) {
    locationList.innerHTML = ''; // Clear existing list
    
    if (locations.length === 0) {
        locationList.innerHTML = '<p style="padding: 20px;">No locations match your criteria.</p>';
        return;
    }
    
    locations.forEach(location => {
        const listItem = document.createElement('div');
        listItem.className = 'location-list-item';

        // Icons for available services
        const serviceIconMap = {
    "Air": "fa-wind",
    "Jet Wash": "fa-spray-can",
    "Vaccum": "fa-broom-ball",
    "Car Wash": "fa-car-side",
    "Coffee": "fa-mug-hot",
    "Deliveroo": "fa-biking",
    "Just Eat": "fa-utensils",
    "Uber Eat": "fa-motorcycle",
    "Amazon Locker": "fa-box-open",
    "Lottery": "fa-ticket",
    "Rollover": "fa-hotdog",
    "Subway": "fa-utensils",
    "Fireaway Pizza": "fa-pizza-slice",
    "Toilets": "fa-restroom",
    "ATM": "fa-credit-card",
    "Stoneway Pizza": "fa-pizza-slice"
};

const serviceIconsHTML = `
    <div class="location-item-services">
        ${location.services.map(service => 
            `<i class="fa-solid ${serviceIconMap[service]}" title="${service}"></i>`
        ).join('')}
    </div>
`;


        listItem.innerHTML = `
            <h5>${location.name}</h5>
            <p>${location.address}</p>
            ${serviceIconsHTML}
            <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank">Get Directions <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        
        // Add click listener to pan the map to the location
        listItem.addEventListener('click', () => {
            map.panTo({ lat: location.lat, lng: location.lng });
            map.setZoom(14);
            // Find the corresponding marker and open its info window
            const correspondingMarker = markers.find(m => m.getTitle() === location.name);
            if (correspondingMarker) {
                infoWindow.setContent(correspondingMarker.infowindowContent);
                infoWindow.open(map, correspondingMarker);
            }
        });

        locationList.appendChild(listItem);
    });
}

/**
 * Clears old markers and renders new ones on the map.
 * @param {Array} locations - The locations to display on the map.
 */
function renderMapMarkers(locations) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
        });

        // Store the content for the info window directly on the marker object
        marker.infowindowContent = `
            <div class="infowindow-content">
                <h5>${location.name}</h5>
                <p>${location.address}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank">Get Directions</a>
            </div>
        `;
        
        marker.addListener('click', () => {
            infoWindow.setContent(marker.infowindowContent);
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}


// --- EVENT LISTENERS ---
// Listen for input in the search box
searchInput.addEventListener('input', filterAndRenderLocations);

// Listen for changes on any filter checkbox
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterAndRenderLocations);
});