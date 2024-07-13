// main.js

document.addEventListener('DOMContentLoaded', function() {
  // Search Functionality
  const searchInput = document.getElementById('searchInput');
  const blogPosts = document.querySelectorAll('.blog-post');

  searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    blogPosts.forEach(post => {
      const title = post.querySelector('h2').textContent.toLowerCase();
      if (title.includes(filter)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  });

  // Comment Section
  const commentForms = document.querySelectorAll('.comment-form');
  const sampleComments = [
    { author: "John Doe", text: "Great post! Really enjoyed it.", timestamp: "2024-07-10 10:00 AM" },
    { author: "Jane Smith", text: "Thanks for sharing!", timestamp: "2024-07-10 10:30 AM" },
    { author: "Alice Johnson", text: "Very informative, learned a lot!", timestamp: "2024-07-10 11:00 AM" },
    { author: "Bob Brown", text: "Can't wait to read more from you.", timestamp: "2024-07-10 11:30 AM" },
    { author: "Charlie Davis", text: "Interesting perspective, thanks!", timestamp: "2024-07-10 12:00 PM" }
  ];
  const commentList = document.querySelector('.comment-list');
  
  // Add sample comments
  sampleComments.forEach(comment => {
    const newComment = document.createElement('li');
    newComment.innerHTML = `
      <p class="comment-author">${comment.author}</p>
      <p class="comment-timestamp">${comment.timestamp}</p>
      <p>${comment.text}</p>
    `;
    commentList.appendChild(newComment);
  });

  commentForms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const commentInput = form.querySelector('.comment-input');
      const newComment = document.createElement('li');
      newComment.innerHTML = `
        <p class="comment-author">You</p>
        <p class="comment-timestamp">${new Date().toLocaleString()}</p>
        <p>${commentInput.value}</p>
      `;
      commentList.appendChild(newComment);
      commentInput.value = '';
    });
  });

  // User Authentication
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const logoutButton = document.getElementById('logoutButton');
  const userStatus = document.getElementById('userStatus');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;

    if (regUsername && regPassword) {
      localStorage.setItem('user', JSON.stringify({ username: regUsername, password: regPassword }));
      alert('Registration successful');
      registerForm.reset();
    } else {
      alert('Please fill in both fields');
    }
  });

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
      localStorage.setItem('authenticated', 'true');
      userStatus.textContent = 'Logged in as ' + username;
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      alert('Invalid credentials');
    }
  });

  logoutButton.addEventListener('click', function() {
    localStorage.removeItem('authenticated');
    userStatus.textContent = 'Not logged in';
    loginForm.style.display = 'inline-block';
    registerForm.style.display = 'inline-block';
    logoutButton.style.display = 'none';
  });

  // Check authentication status on load
  if (localStorage.getItem('authenticated') === 'true') {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    userStatus.textContent = 'Logged in as ' + (storedUser ? storedUser.username : '');
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    userStatus.textContent = 'Not logged in';
  }
});
