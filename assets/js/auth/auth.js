/*=====================================
            AUTH
=====================================*/

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
});

function initAuth() {
    initAuthTabs();
    initPasswordToggle();
    initSignUp();
    initLogin();
}

/*=====================================
        SWITCH FORMS
=====================================*/

function initAuthTabs() {

    const loginBtn = document.getElementById("showLogin");
    const signupBtn = document.getElementById("showSignup");

    const loginContainer = document.getElementById("loginFormContainer");
    const signupContainer = document.getElementById("signupFormContainer");

    if (!loginBtn || !signupBtn || !loginContainer || !signupContainer) return;

    loginBtn.addEventListener("click", () => {

        loginContainer.classList.add("active");
        signupContainer.classList.remove("active");

    });

    signupBtn.addEventListener("click", () => {

        signupContainer.classList.add("active");
        loginContainer.classList.remove("active");

    });

}

/*=====================================
        PASSWORD TOGGLE
=====================================*/

function initPasswordToggle() {

    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            const input = document.getElementById(toggle.dataset.target);

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";

                toggle.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                input.type = "password";

                toggle.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    });

}

/*=====================================
            SIGN UP
=====================================*/

function initSignUp() {

    const form = document.getElementById("signupForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("signupConfirmPassword").value;

        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            alert("Please fill in all fields.");

            return;

        }

        if (!email.includes("@")) {

            alert("Please enter a valid email address.");

            return;

        }

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(user =>
            user.email === email
        );

        if (exists) {

            alert("An account with this email already exists.");

            return;

        }

        users.push({

            fullName,
            email,
            password

        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        form.reset();

        document.getElementById("showLogin").click();

    });

}

/*=====================================
            LOGIN
=====================================*/

function initLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword").value;

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        if (users.length === 0) {

            alert("No account found. Please create an account first.");

            return;

        }

        const user = users.find(user =>
            user.email === email &&
            user.password === password
        );

        if (!user) {

            alert("Invalid email or password.");

            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert(`Welcome back, ${user.fullName}!`);

        window.location.href = "pages/home.html";

    });

}