document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");

    loginBtn.addEventListener("click", () => {
        window.open("login.html", "_blank", "popup")
    })
})