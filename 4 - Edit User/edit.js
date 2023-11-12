const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const showSignOption = callElement("#sign_option")
const showProfile = callElement("#profile")
const currentPassword = callElement("#password")
const newPasswordInput = callElement("#newpassword")
const confirmNewPasswordInput = callElement("#confirm_newpassword")
const btnSaveChange = callElement("#btn_changepw")
let token = JSON.parse(localStorage.getItem("user_token"))
const getEmailLogin = JSON.parse(localStorage.getItem("email_login"))

const showHeader = () => {
    if (token) {
        showProfile.style.display = "block"
        showSignOption.style.display = "none"
    } else {
        showProfile.style.display = "none"
        showSignOption.style.display = "block"
    }

    axios({
        method: 'post',
        url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
        headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
        let dataUser = response.data.content
        let strHeader = `
        <div class="profile_signout">
        <a href="http://127.0.0.1:5500/4%20-%20Edit%20User/edit.html" style="text-decoration: none; color: black;">
            <h5>Hi, ${dataUser.name}</h5>
        </a>

        <span class="material-symbols-outlined xoay">
            horizontal_rule
        </span>

        <h5 onclick="signOut()">Sign Out</h5>
    </div>
    `
        showProfile.innerHTML = strHeader
    }).catch(error => {
        console.log("check error nè : ", error)
    })


}
showHeader()

const signOut = () => {
    if (!token) {
        window.location.href = `http://127.0.0.1:5500/1%20-%20Main/main.html`
    } else {
        localStorage.removeItem("user_token")
        window.location.href = `http://127.0.0.1:5500/1%20-%20Main/main.html`
    }
}

const changePassword = (e) => {
    e.preventDefault();

    let newPasswordNe = newPasswordInput.value;
    let confirmNewPassword = confirmNewPasswordInput.value;
    let userPassword = currentPassword.value;
    let userEmail = getEmailLogin;

    let userLogin = {
        email: userEmail,
        password: userPassword,
    };

    const newPassword = {
        newPassword: newPasswordNe,
    };

    if (userPassword && newPasswordNe && confirmNewPassword) {
        axios({
            method: "post",
            url: "https://shop.cyberlearn.vn/api/Users/signin",
            data: userLogin,
        })
            .then(response => {
                let userToken = response.data.content.accessToken;

                if (newPasswordNe !== userPassword) {
                    if (newPasswordNe === confirmNewPassword) {
                        axios({
                            method: "post",
                            url: "https://shop.cyberlearn.vn/api/Users/changePassword",
                            headers: { Authorization: `Bearer ${userToken}` },
                            data: { newPassword: newPasswordNe },
                        })
                            .then(response => {
                                alert("Bạn đã đổi mật khẩu thành công")
                            })
                            .catch(error => {
                                console.log("check error : ", error)
                            });
                    } else {
                        alert("Xác thực mật khẩu mới không đúng, vui lòng kiểm tra lại")
                    }

                } else {
                    alert("Mật khẩu mới phải khác mật khẩu cũ");
                }
            })
            .catch(error => {
                alert("Mật khẩu hiện tại không đúng")
            })
    } else {
        alert("Vui lòng không để trống");
    }
};
btnSaveChange.addEventListener("click", changePassword);
