function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 38.48425, lng: -8.94301 },
    mapId: "4504f8b37365c3d0",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  const tentLocations = [
    {
      position: { lat: 38.48425, lng: -8.94301 },
      title: "Praia da Figueirinha",
    },
    {
      position: { lat: 38.48448, lng: -8.96369 },
      title: "Praia de Galápos",
    },
    {
      position: { lat: 38.48173, lng: -8.96945 },
      title: "Praia dos Coelhos",
    },
    {
      position: { lat: 38.48051, lng: -8.97035 },
      title: "Praia da Anicha",
    },
    {
      position: { lat: 38.48019, lng: -8.97744 },
      title: "Praia do Creiro",
    },
  ];
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  tentLocations.forEach(({ position, title }, i) => {
    const pinView = new google.maps.marker.PinView({
      glyph: `${i + 1}`,
      scale: 1.5,
      background: "#3F8880",
      borderColor: "#37776e",
      glyphColor: "white",
    });

    const marker = new google.maps.marker.AdvancedMarkerView({
      position,
      map,
      title: `${i + 1}. ${title}`,
      content: pinView.element,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

window.initMap = initMap;