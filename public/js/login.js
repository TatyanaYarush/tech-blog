$("#loginform").validate({
  rules: {
    password: {
      required: true,
      minlength: 8,
    },
    email: {
      required: true,
      email: true,
    },
  },
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // console.log("Getting JSON data...");
    const rdata = await response.json();

    if (response.ok) {
      document.location.replace("/home");
    } else {
      //   $("#error").text(rdata.message).show().delay(3000).fadeOut(300);
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
