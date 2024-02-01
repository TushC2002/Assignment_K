
function submitForm() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;

    if (!firstName || !lastName) {
        alert('Please enter both First Name and Last Name');
        return;
    }

    var existingData = JSON.parse(localStorage.getItem('userData'));
    existingData = Array.isArray(existingData) ? existingData : [];

    var newData = {
        firstName: firstName,
        lastName: lastName
    };

    existingData.push(newData);
    localStorage.setItem('userData', JSON.stringify(existingData));
    document.getElementById('myForm').reset();
    loadTable();
}


function loadTable() {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    var userData = JSON.parse(localStorage.getItem('userData')) || [];

    userData.forEach(function (data, index) {
        var row = tableBody.insertRow(index);
        row.insertCell(0).innerHTML = data.firstName;
        row.insertCell(1).innerHTML = data.lastName;
        row.insertCell(2).innerHTML = '<button class="btn btn-warning" onclick="updateEntry(' + index + ')">Update</button>';
        row.insertCell(3).innerHTML = '<button class="btn btn-danger" onclick="deleteEntry(' + index + ')">Delete</button>';
    });
}


function updateEntry(index) {
    var existingData = JSON.parse(localStorage.getItem('userData')) || [];
    var entryToUpdate = existingData[index];

    document.getElementById('firstName').value = entryToUpdate.firstName;
    document.getElementById('lastName').value = entryToUpdate.lastName;
    existingData.splice(index, 1);
    localStorage.setItem('userData', JSON.stringify(existingData));

    loadTable();
}


function deleteEntry(index) {
    var existingData = JSON.parse(localStorage.getItem('userData')) || [];

    existingData.splice(index, 1);
    localStorage.setItem('userData', JSON.stringify(existingData));
    loadTable();
}

loadTable();
