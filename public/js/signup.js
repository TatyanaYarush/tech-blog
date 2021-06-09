$( "#signupform" ).validate({
    rules: {
      password: {
          required: true,
          minlength: 8
      },
      password_again: {
        equalTo: "#password"
      },
      email:{
        required: true,
        email: true
      },
      firstname:{
        required: true,
      },
      lastname:{
        required: true,
      },
    }
    });


    const signupFormHandler = async (event) => {
        event.preventDefault();
      
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        const firstname = document.querySelector('#firstname').value.trim();
        const lastname = document.querySelector('#lastname').value.trim();

        if (username && email && password) {
            const response = await fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({ username, email, password }),
              headers: { 'Content-Type': 'application/json' },
            });
            const rdata = await response.json();
            if (response.ok) {
              document.location.replace('/login');
            } else {
              alert('Failed to sign up.');
            }
          }
        };
        
        
        document
        .querySelector('.signup-form')
        .addEventListener('submit', signupFormHandler);
    