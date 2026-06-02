let show = document.getElementById("main-container");

async function getAllUser() {

    let res = await fetch("http://localhost:3000/users");
    let data = await res.json();
    console.log(data);
    
    render(data);
}

getAllUser()


function render(allUsers) {

  
    show.innerHTML = "";
    
    allUsers.forEach(v => {
       
        show.innerHTML += `  <div class="card">

            <h2>${v.name}</h2>
            <h2>${v.age}</h2>
            <h2>${v.email}</h2>
            <h2>${v.city}</h2>
            <h3>${v.id}</h3>
            <button onclick="Delete('${v.id}')">Delete</button>
            <button onclick="Edit('${v.id}')">Edit</button>
           

        </div>`
        
    });
    
}





async function Delete(id) {

    let res = await fetch(`http://localhost:3000/users/${id}` , {
        method : "DELETE"
    });

    getAllUser()
   
}






let userInfoBox = document.getElementById("main-userInfoBox");
let postBtn = document.querySelector(".post-btn")
async function Edit(id) {

    show.style.display = "none";
    userInfoBox.style.display = "flex";

    postBtn.style.display = "none"


    let res = await fetch(`http://localhost:3000/users/${id}`);
    let user = await res.json();

    userInfoBox.innerHTML = `
        <div class="userInfoBox">
            <input type="text" id="name" value="${user.name}">
            <input type="number" id="age" value="${user.age}">
            <input type="email" id="email" value="${user.email}">
            <input type="text" id="city" value="${user.city}">
            <button onclick="updateUser('${id}')">Update</button>
        </div>
    `;
}


async function updateUser(id) {

    let userName = document.getElementById("name").value;
    let userAge = document.getElementById("age").value;
    let userEmail = document.getElementById("email").value;
    let userCity = document.getElementById("city").value;

    if (!userName || !userAge || !userEmail || !userCity) {
    alert("All fields are required!");
    return;
    }

    await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            name: userName,
            age: userAge,
            email: userEmail,
            city: userCity
        })
    });

    userInfoBox.style.display = "none";
    show.style.display = "flex";

    postBtn.style.display = "block"
    getAllUser(); 
}







async function post() {

    show.style.display = "none";
    userInfoBox.style.display = "flex";
    postBtn.style.display = "none";

    userInfoBox.innerHTML = `
        <div class="userInfoBox">
            <input type="text" id="name" placeholder="Enter name">
            <input type="number" id="age" placeholder="Enter age">
            <input type="email" id="email" placeholder="Enter email">
            <input type="text" id="city" placeholder="Enter city">
            <button onclick="addUser()">Add User</button>
        </div>
    `;
}


async function addUser() {

    let userName = document.getElementById("name").value;
    let userAge = document.getElementById("age").value;
    let userEmail = document.getElementById("email").value;
    let userCity = document.getElementById("city").value;

    if (!userName || !userAge || !userEmail || !userCity) {
    alert("All fields are required!");
    return;
    }


    await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
            name: userName,
            age: userAge,
            email: userEmail,
            city: userCity
        })
    });

    userInfoBox.style.display = "none";
    show.style.display = "flex";
    postBtn.style.display = "block";

    getAllUser(); 
}

