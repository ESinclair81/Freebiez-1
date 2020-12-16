// async function to send form input to post endpoint / route on submit event
const newFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const title = document.querySelector('input[name="post-title"]').value;
    const file = document.querySelector('input[name="post-image"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;
    console.log(file);
    const token = localStorage.getItem("token");
    await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({
            title,
            file,
            body
        }),
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    // document.location.replace("/dashboard");
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);