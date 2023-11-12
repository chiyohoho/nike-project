const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const showDetail = callElement("#showDetail")
// ---------Get ID Item-----------------
const currentURL = window.location.href
const parts = currentURL.split("?");
const idItem = parts[1].split("=")[1];
// -------------------------------------
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

const getByID = () => {
    axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${idItem}`,
    })
        .then(function (response) {
            let data = response.data.content
            let dataSize = data.size
            showDetailbyID(data)
            showSizeUI(dataSize)
        })
}
getByID()

const showDetailbyID = (data) => {
    const rateUSD = 24000;
    let itemPrice = (data.price * rateUSD).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    let discountPrice = ((data.price * rateUSD) * 80 / 100).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    let str = `
    <div class="detail_item_left">
                <ul class="carousel_left" style="list-style: none;">
                    <li class="onfocus"><img
                            src="https://static.nike.com/a/images/t_default/cd846a97-f0e5-4ea3-a1be-340ce15a064f/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/videos/so_0.78/5e81498a-cf1d-4a9b-9107-1dbfaa289006/infinityrn-4-road-running-shoes-mLRjcz.jpg"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/f64be46b-130d-4176-a4dc-05754f1d1dd1/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/0fd0f197-fde3-4da0-a133-10d17666ed90/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/84ca6db5-b626-4196-a4cb-b0c73a9fb37f/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/d866de97-3b99-4897-b350-52f596abfe38/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/e0ea6e5c-d40c-416a-aeef-a3088566a621/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/9474969b-eac9-48a2-a915-4dcf6fcb471c/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/db5f7739-5652-4c84-ad24-b62cca814594/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                    <li><img src="https://static.nike.com/a/images/t_default/18894f2b-e58c-4096-9eba-1efc3828871b/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt=""></li>
                </ul>

                <div class="carousel_right">
                    <img style="width: 100%;"
                        src="${data.image}"
                        alt="">
                    <div class="highly_rated">
                        <span class="material-symbols-outlined">
                            grade
                        </span>
                        <p>Highly Rated</p>
                    </div>
                </div>
            </div>

            <div class="detail_item_right">
                <div class="detail_info" style="margin-bottom: 20px;">
                    <h4 class="detail_special">Sustainable Materials</h4>
                    <h4 class="detail_name detail_same" style="font-size: 26px; margin: 5px 0px;">${data.name}</h4>
                    <p class="detail_type detail_same" style="font-weight: 500; margin-bottom: 10px;">Main Trial Running Shoes</p>
                    <div class="price_sale" style="display:flex; align-items: center;; gap:5px">
                        <h4 id="price_discount" class="detail_price detail_same" style="font-weight: 500; font-size: 20px;">${discountPrice}</h4>
                        <img style="width: 20px" src="https://media2.giphy.com/media/U2FtGTf6LJpzOSuD1c/giphy.gif?cid=6c09b952stxvvtftigwusb281jlog8yxoao4iz3houq1p3ir&ep=v1_stickers_related&rid=giphy.gif&ct=s" alt="">
                        <span id="countdown_sale" style="border:3px solid red; border-radius:10px;padding:5px;width:fit-content;height:36px;text-align:center"></span>
                    </div>
                    
                    <h4 id="price_default" class="detail_price detail_same" style="font-weight: 500; font-size: 20px;">${itemPrice}</h4>
                </div>

                <ul class=" detail_color" style="list-style: none; margin-bottom: 30px;">
                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/f585564b-b885-4bdb-8f64-e1afacf31c91/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img onfocus">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/cd846a97-f0e5-4ea3-a1be-340ce15a064f/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/124ef1bd-d20a-423d-9588-e8277775b699/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/71a3d324-05c0-4b8d-9d78-0bd937520798/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/ed45ceac-1a49-450c-a71d-3ffedbb376d0/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/c8ef1729-4fb5-466f-a378-51ede49aa5f3/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/fb5ad585-ec9c-4ab6-ab6f-b0b6b50235a4/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/083db8cd-ef0f-4fbb-9fbf-9da0be98f802/infinityrn-4-road-running-shoes-mLRjcz.png"
                            alt="">
                    </li>

                    <li class="detail_img">
                        <img src="https://static.nike.com/nike-prod-cld/images/t_PDP_144_v1/f_auto/static/en_gb-DYO/DYO.png"
                            alt="">
                    </li>
                </ul>

                <div class="detail_size" style="margin-bottom: 20px;">
                    <div class="option_size">
                        <p class="size_select">Select Size</p>
                        <p class="size_guide" style="color: gray;">Size Guide</p>
                    </div>

                    <ul id="show_size" class="select_size" style="list-style: none;">
                    </ul>
                </div>

                <div class="detail_button" style="margin-bottom: 50px;">
                    <button class="btn_add">Add to Bag</button>
                    <button class="btn_favorite">
                        Favorite
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="detail_description">
                    <div class="note">
                        ${data.shortDescription}
                    </div>

                    <div class="description">
                        ${data.description}
                    </div>
                </div>
            </div>
    `
    showDetail.innerHTML = str
    flashSale(data.price)
}

const showSizeUI = (data) => {
    const showSize = callElement("#show_size")
    let strSize = ``
    data.map(item => {
        strSize += `
        <li>${item}</li>
        `
    })
    showSize.innerHTML = strSize
}


// ------------------

let minuteSale = 1
let secondSale = 10
const flashSale = () => {
    const showSalePrice = callElement("#price_discount")
    const showDefaultPrice = callElement("#price_default")
    const countdownSale = callElement("#countdown_sale")

    if (secondSale === -1) {
        secondSale = 10
        minuteSale = minuteSale - 1
    }

    if (minuteSale === 0 && secondSale === 0) {
        showSalePrice.style.textDecoration = "line-through"
        showSalePrice.style.color = "#ccc"
        showDefaultPrice.style.textDecoration = "none"
        showDefaultPrice.style.color = "black"
        countdownSale.textContent = `Khuyến mãi này đã hết hạn`
    } else {
        showDefaultPrice.style.textDecoration = "line-through"
        showDefaultPrice.style.color = "#ccc"
        countdownSale.textContent = `${minuteSale} phút ${secondSale--} giây`
    }
}
setInterval(flashSale, 1000)




