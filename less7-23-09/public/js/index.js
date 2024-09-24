const my_form = document.getElementById('new_product');
const HOST = window.location.href;

const sendData = (data, method) => {
    fetch(HOST, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            window.location.href = HOST;
        })
        .catch((err) => console.log(err));
};

my_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data);
    sendData(data, 'POST');
});

document.getElementById('update_button').addEventListener('click', (e) => {
    e.preventDefault();
    const form_data = new FormData(my_form);
    const data = Object.fromEntries(form_data);
    sendData(data, 'PUT');
});

document.getElementById('delete_button').addEventListener('click', (e) => {
    e.preventDefault();
    const form_data = new FormData(my_form);
    const data = Object.fromEntries(form_data);
    sendData(data, 'DELETE');
});

fetch('http://localhost:3000/products/view')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        const outputDiv = document.getElementById('view');
        outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
