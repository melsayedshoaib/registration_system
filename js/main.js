var signinEmail = document.getElementById("signinEmail");

var signinPassword = document.getElementById("signinPassword");

var signupName = document.getElementById("signupName");

var signupEmail = document.getElementById("signupEmail");

var signupPassword = document.getElementById("signupPassword");

var userName = localStorage.getItem("username");

var loginBtn = document.getElementById("loginBtn");

var signupBtn = document.getElementById("signupBtn");

var logoutBtn = document.getElementById("logoutBtn");

var signupArr = [];

// display the username with a welcome message in the home page after login is successful

if (userName) {
  document.getElementById("username").innerHTML = `Welcome ${userName}`;
}

// checking if there is a user object in the local storage

if (localStorage.getItem("users") == null) {
  signupArr = [];
} else {
  signupArr = JSON.parse(localStorage.getItem("users"));
}

// checking if signup input fields are empty or not

function isSignupEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword == ""
  ) {
    return true;
  } else {
    return false;
  }
}

// checking if email exist on signup or not

function isExist() {
  for (var i = 0; i < signupArr.length; i++) {
    if (signupArr[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }
}

// signup function

if (signupBtn) {
  signupBtn.addEventListener("click", function () {
    if (isSignupEmpty() == true) {
      document.getElementById(
        "exist"
      ).innerHTML = `<p class="text-danger m-3">All inputs is required</p>`;
      return true;
    }
    var signup = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    if (isExist() == true) {
      document.getElementById(
        "exist"
      ).innerHTML = `<p class="text-danger m-3">email already exists</p>`;
    } else {
      signupArr.push(signup);
      localStorage.setItem("users", JSON.stringify(signupArr));
      document.getElementById(
        "exist"
      ).innerHTML = `<p class="text-success m-3">Success</p>`;
    }
  });
}

// checking if signin input fields are empty or not

function isLoginEmpty() {
  if (signinEmail.value == "" || signinPassword == "") {
    return true;
  } else {
    return false;
  }
}

// signin function

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    if (isLoginEmpty() == true) {
      document.getElementById(
        "incorrect"
      ).innerHTML = `<p class="text-danger m-3">All inputs is required</p>`;
      return true;
    }
    var email = signinEmail.value;
    var password = signinPassword.value;
    for (var i = 0; i < signupArr.length; i++) {
      if (
        signupArr[i].email.toLowerCase() === email.toLowerCase() &&
        signupArr[i].password.toLowerCase() == password.toLowerCase()
      ) {
        localStorage.setItem("username", signupArr[i].name);
        document.getElementById(
          "incorrect"
        ).innerHTML = `<p class="p-2 text-success">Success</p>`;
        window.location.href = "home.html";
      } else {
        document.getElementById(
          "incorrect"
        ).innerHTML = `<p class="p-2 text-danger">incorrect email or password</p>`;
      }
    }
  });
}

// logout

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("username");
    window.location.href = "index.html";
  });
}
