let logInForm = document.querySelector(".logInForm");
let usernameInp = document.querySelector(".usernameInp");
let passInp = document.querySelector(".passInp");
let base_url = "http://localhost:3000/user";


logInForm.addEventListener("submit", function(e){
    e.preventDefault();
    let newUser = {
        username: usernameInp.value,
        password: passInp.value
    };
    console.log(newUser);

    fetch(base_url)
        .then(res => res.json())
        .then(data => {
            let find = false;
            for (let element of data) {
                if (element.username == newUser.username && element.password == newUser.password) {
                    console.log("xos geldiniz");
                    find = true;
                    location.href = "home.html";
                }
            }
            if (!find) {
                console.log("istifadeci adi ve ya kod yanlisdir");
            }
        })
        .catch(err => {
            console.error("Error fetching data: ", err);
        });
});
