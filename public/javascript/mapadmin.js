async function fetchTentData() {
  const response = await fetch('/allSensorData'); 
  const data = await response.json();
  return data;
}

async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 38.48425, lng: -8.94301 },
    mapId: "4504f8b37365c3d0",
  });

  const tentData = await fetchTentData();

  const infoWindow = new google.maps.InfoWindow();

  Object.keys(tentData).forEach((tentId, i) => {
    const data = tentData[tentId];
    const position = { 
      lat: parseFloat(data.gpsData.latitude), 
      lng: parseFloat(data.gpsData.longitude) 
    };
    const title = `${tentId}`;
    const content = `
      <div>
        <h3>${title}</h3>
        <p>Gas Description: ${data.gasDescription}</p>
        <p>Gas Value: ${data.gasValue}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Motion Detected: ${data.motionDetected}</p>
        <p>Temperature: ${data.temperature}</p>
      </div>
    `;

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
      title: content,
      content: pinView.element,
    });

    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

window.initMap = initMap;

// Event listener for logout button
document.querySelector('.nav-btn:last-of-type').addEventListener('click', async () => {
  try {
      const response = await fetch('/logout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (response.ok) {
          console.log('Logged out successfully');
          // Redirect to home page or login page
          window.location.href = 'start.html'; // Redirect to start.html after logout
      } else {
          console.error('Failed to log out:', response.statusText);
      }
  } catch (error) {
      console.error('Error logging out:', error);
  }
});