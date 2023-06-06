async function createUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    const gender = document.getElementById("gender").value;

    try {
        const sendData = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                gender: gender
            })
        });

        if (sendData.status === 200) {
            window.location.href = "/login.html";
        }
    } catch (err) {
        console.log("Error:", err);
    }
}
