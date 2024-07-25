let logInForm = document.querySelector(".logInForm");
let usernameInp = document.querySelector(".usernameInp");
let emailInp = document.querySelector(".emailInp");
let passInp = document.querySelector(".passInp");
let balanceInp = document.querySelector(".balanceInp");

let base_url = "http://localhost:3000/user";

logInForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let newUser = {
        username: usernameInp.value,
        password: passInp.value,
        email: emailInp.value,
        balance: balanceInp.value
    };
    console.log(newUser);

    if (usernameInp.value && passInp.value && emailInp.value && balanceInp.value) {
        try {
            let response = await fetch(base_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                location.href = "login.html";
            } else {
                console.error("Failed to submit data", response.statusText);
            }
        } catch (err) {
            console.error("Error occurred:", err);
        }
    } else {
        console.log("All fields are required.");
    }
});
