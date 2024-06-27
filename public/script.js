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

  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const password = document.getElementById('password').value;
      const profileImage = document.getElementById('profileImage').files[0];
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      try {
        const response = await fetch('/user/profile', {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert('Perfil actualizado exitosamente');
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const budgetForm = document.getElementById('budgetForm');
  if (budgetForm) {
    budgetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const budgetAmount = document.getElementById('budgetAmount').value;
      const extraIncome = document.getElementById('extraIncome').value;
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ budgetAmount, extraIncome }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Presupuesto guardado exitosamente');
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  const expenseForm = document.getElementById('expenseForm');
  if (expenseForm) {
    expenseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const expenseName = document.getElementById('expenseName').value;
      const expenseType = document.getElementById('expenseType').value;
      const expenseAmount = document.getElementById('expenseAmount').value;
      const expenseDate = document.getElementById('expenseDate').value;
      const expenseComment = document.getElementById('expenseComment').value;
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/budget/expense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ expenseName, expenseType, expenseAmount, expenseDate, expenseComment }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Gasto agregado exitosamente');
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  // Verificar si el token se envía correctamente para rutas protegidas
  const token = localStorage.getItem('token');
  if (token) {
    fetch('/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => {
      if (response.status === 401) {
        alert('Acceso denegado. No se proporcionó un token o el token es inválido.');
      } else {
        response.text().then(text => console.log(text));
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }
});
