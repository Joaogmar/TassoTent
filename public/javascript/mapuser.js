//!DONT REMOVE COMMENTS

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 38.48425, lng: -8.94301 },
        mapId: "4504f8b37365c3d0",
    });
    const userIcon = document.createElement("div");
    const tentIcon = document.createElement("div");

    userIcon.innerHTML = '<i class="fa-solid fa-user"></i>';
    tentIcon.innerHTML = '<i class="fa-solid fa-campground"></i>';
    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.

    //TODO Get tentLocation from sensor 

    const tentLocation = { lat: 38.48425, lng: -8.94301 };

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();

    // Style the tent marker.
    //?Change icon color?

    const tentMarker = new google.maps.marker.PinView({
        glyph: tentIcon,
        glyphColor: "#9dc09d",
        background: "#3F8880",
        borderColor: "#37776e",
    });

    // Style the user marker.
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

    // Add a click listener for the tent marker, and set up the info window.
    tentLocationMarker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();
        infoWindow.setContent(tentLocationMarker.title);
        infoWindow.open(tentLocationMarker.map, tentLocationMarker);
    });

    const locationButton = document.createElement("button");
    const routeButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");

    routeButton.textContent = "Route to my tent";
    routeButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(routeButton);

    // Try HTML5 geolocation.
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

                // Add a click listener for the user marker, and set up the info window.
                userLocationMarker.addListener("click", ({ domEvent, latLng }) => {
                    const { target } = domEvent;

                    infoWindow.close();
                    infoWindow.setContent(userLocationMarker.title);
                    infoWindow.open(userLocationMarker.map, userLocationMarker);
                });

                routeButton.addEventListener("click", () => {
                    // Calculate route to tent location and display on the map
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
        // Browser doesn't support Geolocation
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