const customers = [
    {
        "Id": 1,
        "Name": "Mohammad Smith",
        "DoB": "1/1/2010",
        "FavoriteColor": "Blue",
        "Pets": [
            { "type": "Bird", "Name": "Tweety" }
        ]
    },
    {
        "Id": 2,
        "Name": "Ilya Chang",
        "DoB": "2/1/1980",
        "Pets": [
            { "type": "Bird", "Name": "Fluffy" },
            { "type": "Cat", "Name": "Leon" }
        ]
    },
    {
        "Id": 3,
        "Name": "Chris",
        "DoB": "10/31/1987",
        "Pets": [
            { "type": "Dog", "Name": "Corky" },
            { "type": "Cat", "Name": "Bella" }
        ]
    },
    {
        "Id": 4,
        "Name": "Sanjay Grant",
        "DoB": "10/31/1987"
    },
    {
        "Id": 5,
        "Name": "Anna Kang",
        "DoB": "11/30/2004",
        "Pets": [
            { "type": "Lizard", "Name": "Kermit" },
            { "type": "Lizard", "Name": "Dino" }
        ]
    },
    {
        "Id": 6,
        "Name": "Smith Adebayo",
        "DoB": "11/30/2004",
        "Pets": [
            { "type": "Cat", "Name": "Walter" },
            { "type": "Lizard", "Name": "Lizzo" },
            { "type": "Bird", "Name": "Ladybird" }
        ]
    }
];



function compareDates(a, b) {
    return new Date(b.DoB) - new Date(a.DoB);
}

function displayCustomers(customers) {
    const table = document.getElementById("customerTable");
    table.innerHTML = '';  // reset table

    customers
        .sort(compareDates)
        .forEach(customer => {
            const row = table.insertRow();

            row.insertCell().textContent = customer.Name;
            row.insertCell().textContent = customer.DoB || '';
            row.insertCell().textContent = customer.FavoriteColor || '';

            const petsCell = row.insertCell();
            const button = document.createElement('button');
            button.textContent = 'View Pets';
            button.onclick = () => openModal(customer.Pets);
            petsCell.appendChild(button);
        });
}

// Functions to open and close the modal
function openModal(pets) {
    const petsList = document.getElementById('petsList');
    petsList.innerHTML = '';

    if (pets) {
        pets.sort((a, b) => {
            if (a.type === b.type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.type.localeCompare(b.type);
        }).forEach(pet => {
            const listItem = document.createElement('li');
            listItem.textContent = `${pet.type}: ${pet.Name}`;
            petsList.appendChild(listItem);
        });
    }

    const modal = document.getElementById('petsModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('petsModal');
    modal.style.display = 'none';
}

function searchPets() {
    const searchName = document.getElementById("searchName").value;
    const searchType = document.getElementById("searchType").value;
    const errorElement = document.getElementById("error");

    // Check if the search fields contain only alphabetic characters or spaces
    if (!searchName.match(/^[a-zA-Z\s]*$/) || !searchType.match(/^[a-zA-Z\s]*$/)) {
        errorElement.textContent = 'Only alphabetic characters are allowed.';
        return;
    }
    errorElement.textContent = '';

    const filteredCustomers = customers.filter(customer => {
        if (searchName === '' && searchType === '') {
            return true;
        }
        if (!customer.Pets) {
            return false;
        }
        return customer.Pets.some(pet =>
            (searchName === '' || pet.Name.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchType === '' || pet.type.toLowerCase().includes(searchType.toLowerCase()))
        );
    });
    displayCustomers(filteredCustomers);
}

displayCustomers(customers);
