// Get a reference to the table element
const table = document.getElementById("csvTable");

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Open and send the request
xhr.open("GET", "elements.csv");
xhr.send();

// Get a reference to the search input element
const searchInput = document.getElementById("input");

searchInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        search();
    }
});

// Define the search function
function search() {
    const age = searchInput.value;
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const cellAge = cells[0].textContent;
        if (cellAge !== age) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
}

// Define the callback function
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the CSV data
        const csvData = xhr.responseText;
        const rows = csvData.split("\n");
        const headers = rows[0].split(",");

        // Create the table data rows
        for (let i = 0; i < rows.length; i++) {
            const dataRow = table.insertRow();
            const rowData = rows[i].split(",");
            rowData.forEach((data) => {
                const td = document.createElement("td");
                td.textContent = data;
                dataRow.appendChild(td);
            });
        }
    }
};
