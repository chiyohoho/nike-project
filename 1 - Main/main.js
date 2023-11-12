const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const showProduct = callElement("#showProductList")
const showSignOption = callElement("#sign_option")
const showProfile = callElement("#profile")
let token = JSON.parse(localStorage.getItem("user_token"))

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


const showProductList = () => {
    let str = ``
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',
    })
        .then(function (response) {
            let data = response.data.content
            data.map(item => {
                const rateUSD = 24000;
                let itemPrice = (item.price * rateUSD).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                str += `
                <li onclick="redirectDetail(${item.id})" class="product_item">
                    <div class="item_image">
                        <img src="${item.image}"
                            alt="">
                    </div>

                    <div class="item_info">
                        <div class="info1">
                            <h4 class="info_special">Sustainable Materials</h4>
                            <h4 class="info_name">${item.name}</h4>
                            <p class="info_type">Main Trial Running Shoes</p>
                            <p class="info_color">2 Colours</p>
                            <h4 class="info_price">${itemPrice}</h4>
                        </div>
                        <div class="info2">
                            <div class="info2_another_color" style="display: flex;">
                                <div class="img_color_1" style="width: 50px;">
                                    <img width="100%"
                                        src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a878af84-456f-42e1-8ec4-dcbf667cb073/juniper-trail-2-trail-running-shoes-PT4wqk.png"
                                        alt="">
                                </div>
                                <div class="img_color_2" style="width: 50px;">
                                    <img width="100%"
                                        src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2d7c4c6c-d247-489a-bece-e96faf853ccd/juniper-trail-2-trail-running-shoes-PT4wqk.png"
                                        alt="">
                                </div>
                            </div>
                            <div class="info2_another_info">
                                <h4 class="info_special">Sustainable Materials</h4>
                                <h4 class="info_price">${itemPrice}</h4>
                            </div>
                        </div>
                    </div>
                </li>
                `
            })
            showProduct.innerHTML = str
        });
}
showProductList()

const redirectDetail = (id) => {
    window.location.href = `http://127.0.0.1:5500/2%20-%20Detail/detail.html?id=${id}`
}
