// async function to send form input to signup endpoint / route on submit event
const signupFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");

    // send signup request to endpoint
    fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    }).then(function () {
        document.location.replace("/dashboard");
    }).catch(err => console.log(err));
};

// listen for submit event on signup form
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);