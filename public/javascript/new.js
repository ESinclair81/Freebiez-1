// async function to send form input to post endpoint / route on submit event
const newFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const title = document.querySelector("#post-title").value;
    const file = document.querySelector("#post-image-upload").files[0];
    const text = document.querySelector("#post-text").value;
    const token = localStorage.getItem("token");

    if (!file) {
        alert('Must upload an image!')
    }
    else if (title.length < 10) {
        alert('Title of post must be longer than 10 characters')
    }
    else {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('text', text);
        formData.append('title', title);

        await fetch(`/api/post`, {
            method: "POST",
            body: formData,
            headers: {
                authorization: `Bearer ${token}`,
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            }
        });

        document.location.replace("/dashboard");
    }
        
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);