// Function to fetch and populate the tent table
async function populateTentTable() {
    try {
      const response = await fetch('/allTents');
      if (response.ok) {
        const data = await response.json();
        const tentTableBody = document.querySelector('#tentTable tbody');
        tentTableBody.innerHTML = ''; // Clear existing rows
        Object.keys(data.tents).forEach(key => {
          const tent = data.tents[key];
          const row = `
            <tr>
              <td>${tent.username}</td>
              <td>${tent.password}</td>
            </tr>
          `;
          tentTableBody.innerHTML += row;
        });
      } else {
        console.error('Failed to fetch tent data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tent data:', error);
    }
  }
  
  // Call the function to populate the tent table when the page loads
  window.addEventListener('load', populateTentTable);
  