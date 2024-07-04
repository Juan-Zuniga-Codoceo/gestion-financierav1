document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/user/profile';
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const profileImage = document.getElementById('profileImage').files[0];

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          window.location.href = '/auth/login';
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});
