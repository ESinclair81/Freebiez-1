// async function to send form input to post endpoint / route on submit event
const newFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const title = document.querySelector("#post-title").value;
    const file = document.querySelector("#post-image").files[0];
    const text = document.querySelector("#post-text").value;
    const token = localStorage.getItem("token");
    
    const formData = new FormData()
    formData.append('file', file);
    formData.append('text', text);
    formData.append('title', title);

    await fetch(`/api/post`, {
        method: "POST",
        body: formData,
        headers: {
            authorization: `Bearer ${token}`,
            // 'Content-Type':
            //     'multipart/form-data; boundary=----WebKitFormBoundarylKRlagDQDch6f3w6',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
    });

    document.location.replace("/dashboard");
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);