// $( "#signupform" ).validate({
//     rules: {
//       password: {
//           required: true,
//           minlength: 8
//       },
//       password_again: {
//         equalTo: "#password"
//       },
//       email:{
//         required: true,
//         email: true
//       },
//       firstname:{
//         required: true,
//       },
//       lastname:{
//         required: true,
//       },
//     }
//     });

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#inputPassword").value.trim();
  const firstname = document.querySelector("#firstname").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const lusername = document.querySelector("#username").value.trim();

  console.log(email, password, firstname, lastname, username);

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const rdata = await response.json();
    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to sign up.");
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
