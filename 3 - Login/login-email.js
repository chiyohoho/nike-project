const callElement = id => { return document.querySelector(id) }
//-------------------------------------------------------------
const inputEmail = callElement("#login_email")
const buttonLogin = callElement("#btn_login")
const getEmailLogin = localStorage.getItem("email_login")

const loginButton = () => {
    let userEmail = inputEmail.value

    if (userEmail) {
        buttonLogin.removeAttribute('disabled')
        buttonLogin.style.background = "black"
    } else {
        buttonLogin.setAttribute('disabled', '');
        buttonLogin.style.background = "gray"
    }
}
inputEmail.addEventListener("keyup", loginButton)
loginButton()

const loginEmail = () => {
    let userEmail = inputEmail.value
    localStorage.setItem("email_login", JSON.stringify(userEmail))
    window.location.href = `http://127.0.0.1:5500/3%20-%20Login/login-password.html`

}
buttonLogin.addEventListener("click", loginEmail)





