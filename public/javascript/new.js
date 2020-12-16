// async function to send form input to post endpoint / route on submit event
const newFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const title = document.querySelector('input[name="post-title"]').value;
    const file = document.querySelector('#post-image').files[0];
    console.log(file);
    const body = document.querySelector('textarea[name="post-body"]').value;
    // console.log(file);
    const token = localStorage.getItem("token");
    const formData = new FormData()
    formData.append('post-image', file)

    await fetch(`/api/post`, {
        method: "POST",
        body: formData,

        headers: {
            // authorization: `Bearer ${token}`,
            // 'Content-Type':
            //     'multipart/form-data; boundary=----WebKitFormBoundarylKRlagDQDch6f3w6',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
    });

    // document.location.replace("/dashboard");
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);