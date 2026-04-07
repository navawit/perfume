// ================= CART FIX =================

// OPEN CART
function showCart() {
    document.getElementById("cartDrawer").style.display = "block";
    document.getElementById("cartOverlay").style.display = "block";
}

// CLOSE CART
function closeCart() {
    document.getElementById("cartDrawer").style.display = "none";
    document.getElementById("cartOverlay").style.display = "none";
}

// ADD TO CART (NO AUTO OPEN)
function addtocart(name, price) {
    cartCount++;

    const badge = document.getElementById("cart-count");
    if (badge) badge.innerText = cartCount;

    const emptyMsg = document.getElementById("empty-msg");
    if (emptyMsg) emptyMsg.style.display = "none";

    const list = document.getElementById("cart-items-list");

    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${name}</strong>
        <span style="float:right;">ETB ${price.toLocaleString()}</span>
    `;

    list.appendChild(li);

    totalAmount += price;

    document.getElementById("total-price").innerText =
        "ETB " + totalAmount.toLocaleString();
}

// ================= AUTH SYSTEM =================
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("authModal");
    const openBtn = document.getElementById("openLogin");
    const closeBtn = document.querySelector(".close-btn");

    const loginBox = document.getElementById("loginBox");
    const signupBox = document.getElementById("signupBox");

    const showSignUp = document.getElementById("showSignUp");
    const showSignIn = document.getElementById("showSignIn");

    // OPEN LOGIN
    openBtn.onclick = () => {
        modal.style.display = "flex";
        loginBox.style.display = "block";
        signupBox.style.display = "none";
    };

    // CLOSE
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

    // SWITCH
    showSignUp.onclick = (e) => {
        e.preventDefault();
        loginBox.style.display = "none";
        signupBox.style.display = "block";
    };

    showSignIn.onclick = (e) => {
        e.preventDefault();
        loginBox.style.display = "block";
        signupBox.style.display = "none";
    };


    // ================= LOCAL STORAGE USERS =================
    let users = JSON.parse(localStorage.getItem("users")) || [];


    // ===== SIGN UP =====
    const signupBtn = signupBox.querySelector("button");

    signupBtn.onclick = () => {

        const inputs = signupBox.querySelectorAll("input");

        const firstName = inputs[0].value;
        const lastName = inputs[1].value;
        const email = inputs[2].value;
        const password = inputs[3].value;
        const confirmPassword = inputs[4].value;

        // VALIDATION
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // CHECK IF USER EXISTS
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("User already exists!");
            return;
        }

        // CREATE USER OBJECT
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        // PUSH TO ARRAY
        users.push(user);

        // SAVE TO LOCAL STORAGE
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");

        signupBox.style.display = "none";
        loginBox.style.display = "block";
    };


    // ===== LOGIN =====
    const loginBtn = loginBox.querySelector("button");

    loginBtn.onclick = () => {

        const email = loginBox.querySelector('input[type="email"]').value;
        const password = loginBox.querySelector('input[type="password"]').value;

        // FIND USER
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful! Welcome " + user.firstName);
            modal.style.display = "none";
        } else {
            alert("Invalid email or password");
        }
    };

});