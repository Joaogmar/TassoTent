import { fetchWeatherData } from './weather.js';

async function getTentLocation() {
    try {
        const response = await fetch('/getTentLocation');
        if (!response.ok) {
            throw new Error('Failed to fetch tent location');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tent location:', error);
        return null;
    }
}

async function initMap() {
    let tentLocation = await getTentLocation();
    console.log('Tent Location:', tentLocation);

    if (!tentLocation || isNaN(tentLocation.latitude) || isNaN(tentLocation.longitude)) {
        console.error('Invalid tent location');
        console.error('Tent location:', tentLocation);
        console.error('Using default location');
        tentLocation = { lat: 38.48425, lng: -8.94301 }; 
    } else {
        tentLocation = { lat: tentLocation.latitude, lng: tentLocation.longitude };
    }

    console.log('Setting map center to:', tentLocation);

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: tentLocation,
        mapId: "4504f8b37365c3d0",
    });

    const userIcon = document.createElement("div");
    const tentIcon = document.createElement("div");

    userIcon.innerHTML = '<i class="fa-solid fa-user"></i>';
    tentIcon.innerHTML = '<i class="fa-solid fa-campground"></i>';

    const infoWindow = new google.maps.InfoWindow();

    const tentMarker = new google.maps.marker.PinView({
        glyph: tentIcon,
        glyphColor: "#9dc09d",
        background: "#3F8880",
        borderColor: "#37776e",
    });

    const userMarker = new google.maps.marker.PinView({
        glyph: userIcon,
        glyphColor: "#9dc09d",
        background: "#3F8880",
        borderColor: "#37776e",
    });

    const tentLocationMarker = new google.maps.marker.AdvancedMarkerView({
        position: tentLocation,
        map,
        title: `Your Tent`,
        content: tentMarker.element,
    });

    tentLocationMarker.addListener("click", async ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();

        const weatherData = await fetchWeatherData(tentLocation.lat, tentLocation.lng);
        let weatherContent = 'Unable to fetch weather data';
        if (weatherData) {
            const arrowRotation = `transform: rotate(${weatherData.wind.direction_degrees}deg);`;
            weatherContent = `
                <div class="info-window-content">
                    <div><strong>Your Tent</strong></div>
                    <div class="weather">
                        <div><strong>Weather:</strong> ${weatherData.current.condition.text}</div>
                        <div><strong>Temperature:</strong> ${weatherData.current.temp_c}°C</div>
                        <div><strong>Humidity:</strong> ${weatherData.current.humidity}%</div>
                        <div><strong>Wind Speed:</strong> ${weatherData.wind.speed_kph} kph</div>
                        <div><strong>Wind Direction:</strong> ${weatherData.wind.direction_compass}
                            <span class="wind-arrow" style="${arrowRotation}">&#x27a4;</span>
                        </div>
                    </div>
                </div>
            `;
        }

        infoWindow.setContent(weatherContent);
        infoWindow.open(tentLocationMarker.map, tentLocationMarker);
    });

    const locationButton = document.createElement("button");
    const routeButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button", "location-button");

    routeButton.textContent = "Route to my tent";
    routeButton.classList.add("custom-map-control-button", "route-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(routeButton);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                locationButton.addEventListener("click", () => {
                    map.setCenter(pos);
                });

                const userLocationMarker = new google.maps.marker.AdvancedMarkerView({
                    map,
                    position: pos,
                    title: "Your Location",
                    content: userMarker.element,
                });

                userLocationMarker.addListener("click", ({ domEvent, latLng }) => {
                    const { target } = domEvent;

                    infoWindow.close();
                    infoWindow.setContent(userLocationMarker.title);
                    infoWindow.open(userLocationMarker.map, userLocationMarker);
                });

                routeButton.addEventListener("click", () => {
                    const directionsService = new google.maps.DirectionsService();
                    const directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);

                    const request = {
                        origin: pos,
                        destination: tentLocation,
                        travelMode: google.maps.TravelMode.WALKING,

                        //TODO Consider adding way to change travel method
                    };

                    directionsService.route(request, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsRenderer.setDirections(result);
                        } else {
                            window.alert("Directions request failed due to " + status);
                        }
                    });
                });

            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

window.initMap = initMap;

async function handleLogout() {
    try {
        console.log('Logging out...');

        const response = await fetch('/logout', {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Logout successful');
            window.location.href = 'start.html';
        } else {
            console.error('Failed to logout:', response.statusText);
            alert('Failed to logout. Please try again.');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred during logout. Please try again.');
    }
}

const logoutButton = document.querySelector('.nav-btn.logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
} else {
    console.error('Logout button not found');
}