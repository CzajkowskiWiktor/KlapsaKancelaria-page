const footerYear = document.querySelector('.footer__year');
const form = document.getElementById("contact-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

const handleCurrentYear = () => {
    const year = (new Date).getFullYear();
    footerYear.innerHTML = year;
};

handleCurrentYear();

$(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggler")) {
        $(".navbar-toggler").click();
    }
});

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'success') {
            alert('Email sent');
            name.value='';
            email.value='';
            subject.value='';
            message.value='';
        } else {
            alert('Something went wrong!');
        }
    }

    xhr.send(JSON.stringify(formData));
    // sendMail(mail);
});

// const sendMail = (mail) => {
//     fetch("https://klapsa-radca.pl/send", {
//         method: "post",
//         body: mail,
//     }).then((response) => {
//         return response.json();
//     });
// };
