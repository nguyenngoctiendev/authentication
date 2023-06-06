async function userLogin() {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("/login", {
            email: email, password: password
        })
        if (response.status == 200) {
            const accessToken = response.data.accessToken;
            const payLoad = jwt_decode(accessToken);
            if (payLoad === "customer") {
                window.location.href = "home.html";
            }
            else {
                window.location.href = "admin.html";
            }
            localStorage.setItem("accesstoken", accessToken)
        }
    }
    catch (err) {
        console.log(`err: ${err}`)
    }
}
