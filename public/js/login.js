// $("#loginform").validate({
//   rules: {
//     password: {
//       required: true,
//       minlength: 8,
//     },
//     email: {
//       required: true,
//       email: true,
//     },
//   },
// });

const loginFormHandler = async (event) => {
  event.preventDefault();

console.log(document.querySelector("#email-login"))
console.log(document.querySelector("#email-login").value)



  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#inputPassword").value.trim();
  console.log(email, password)

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // console.log("Getting JSON data...");
    // const rdata = await response.json();
    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to login.');
    }
  }
};


document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);


  
