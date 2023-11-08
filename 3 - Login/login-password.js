const callElement = id => { return document.querySelector(id) }
//-------------------------------------------------------------
const showEmail = callElement("#email_login")
const inputPassword = callElement("#login_password")
const buttonLogin = callElement("#btn_login")
const getEmailLogin = localStorage.getItem("email_login")

const loginButton = () => {
    let userPassword = inputPassword.value

    if (userPassword) {
        buttonLogin.removeAttribute('disabled')
        buttonLogin.style.background = "black"
    } else {
        buttonLogin.setAttribute('disabled', '');
        buttonLogin.style.background = "gray"
    }
    showEmail.innerHTML = `${JSON.parse(getEmailLogin)}`
}
inputPassword.addEventListener("keyup", loginButton)
loginButton()


const loginAPI = () => {
    let userEmail = JSON.parse(getEmailLogin)
    let userPassword = inputPassword.value
    let userLogin = {
        email: userEmail,
        password: userPassword
    }

    axios({
        method: 'post',
        url: 'https://shop.cyberlearn.vn/api/Users/signin',
        data: userLogin
    })
        .then(response => {
            let userToken = response.data.content.accessToken;
            localStorage.setItem("user_token", JSON.stringify(userToken))
            alert(response.data.message)
            window.location.href = `http://127.0.0.1:5500/1%20-%20Main/main.html`
        })
        .catch(error => {
            alert(error.response.data.message)
        })
}
buttonLogin.addEventListener("click", loginAPI)




