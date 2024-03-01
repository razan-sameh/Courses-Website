//function handle avtive state
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// start setting
//open and close the setting
let settingdiv = document.querySelector(".setting");
let gear = document.getElementsByTagName("i")[0];
gear.onclick = function() {
    gear.classList.toggle("fa-spin");
    settingdiv.classList.toggle("open");
}

//color setting
let colorsetting = window.localStorage.getItem("titlecolor");
let licolor = document.querySelectorAll(".setting-color li");
if (colorsetting !== null) {
    document.documentElement.style.setProperty("--titlecolor",colorsetting);
    licolor.forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === colorsetting) {
            element.classList.add("active");
        }
    });

}
licolor.forEach(ele => {
    ele.addEventListener("click",function (e) {
        document.documentElement.style.setProperty("--titlecolor",e.target.dataset.color);
        window.localStorage.titlecolor = e.target.dataset.color;
        //go to ul and loop on every element has active class and remove .active from all of them 
        handleActive(e);
    })
});

//img setting
let imgsetting = window.localStorage.getItem("randomimg");
let randomimg = document.querySelectorAll(".setting-img .btns button");
let randomoption = true;
let imginterval;
if (imgsetting !== null) {
    if (imgsetting === "yes") {
        randomoption = true;
        randomimage();
    }
    else {
        randomoption = false;
        clearInterval(imginterval);
    }
    randomimg.forEach(element => {
        element.classList.remove("active");
        if (element.dataset.random === imgsetting) {
            element.classList.add("active");
        }
    });

}
randomimg.forEach(ele => {
    ele.addEventListener("click",function (e) {
        window.localStorage.randomimg = e.target.dataset.random;
        //go to ul and loop on every element has active class and remove .active from all of them 
        handleActive(e);
        if (e.target.dataset.random === "yes") {
            randomoption = true;
            randomimage();
        }
        else {
            randomoption = false;
            clearInterval(imginterval);
        }
    })
});

// end setting

// start change img in landing 
let imgdiv = document.querySelector(".landing .img");
let img = document.querySelector(".landing .img img");
let imgarray = ["land (1).jpg","land (2).jpg","land (3).jpg","land (4).jpg","land (5).jpg","land (6).jpg","land (7).jpg","land (8).jpg"];
function randomimage() {
    if (randomoption == true) {
        imginterval = setInterval(function () {
            let randomNum = Math.floor(Math.random() * imgarray.length);
            img.setAttribute("src",`images/${imgarray[randomNum]}`);
        },10000);
    }
};
randomimage();
// end change img in landing 


//start play video
let playvideo = document.querySelector(".video .play");
let video = document.querySelector(".video video");
function playPause() { 
    if (video.paused) 
    {
        video.play(); 
    }
    else 
    {
        video.pause(); 
    }
} 
playvideo.onclick = function () {
    playPause();
}
//end play video

// start increase static 
let nums = document.querySelectorAll(".static .num-box .num");
let section = document.querySelector(".static");
nums.forEach(num => startcount(num));
function startcount(ele){
    let goal = ele.dataset.goal;
    let counter = setInterval(() => {
        ele.textContent++;
        if (ele.textContent == goal) {
            clearInterval(counter);
        }
    },5)
    }
// end increase static 


// start sign up popup
let btnsign = document.querySelector("header .SignUp");
let overlay = document.querySelector(".popup-overlay");
let signpage = document.querySelector(".signup-page");
//open signup form from landing
btnsign.addEventListener("click",(e) => {
    e.preventDefault();
    overlay.style.display= "block";
    signpage.style.display = "flex";
});

//open login form from signup
let login = document.querySelector(".signup-page .login-btn");
let loginpage = document.querySelector(".login-page");
login.addEventListener("click",(e) => {
    e.preventDefault();
    overlay.style.display= "block";
    signpage.style.display = "none";
    loginpage.style.display = "block";
});

//open signup form from login
let signup = document.querySelector(".login-page .sign-btn");
signup.addEventListener("click",(e) => {
    e.preventDefault();
    overlay.style.display= "block";
    signpage.style.display = "flex";
    loginpage.style.display = "none";
});

//close popup
overlay.addEventListener("click",(e) => {
    e.preventDefault();
    overlay.style.display= "none";
    signpage.style.display = "none";
    loginpage.style.display = "none";
});
document.addEventListener("click",function (e) {
    if (e.target.className == "close") {
        e.target.parentNode.style.display = "none";
        overlay.style.display = "none";
    }
});

// end sign up popup

//start scroll inside div
let courses = document.querySelectorAll(".course .container-courses");
let prebtn = document.querySelectorAll(".course .pre-btn");
let nextbtn = document.querySelectorAll(".course .next-btn");
courses.forEach((item,i) => {
    nextbtn[i].addEventListener("click",function () {
        item.scrollLeft += 200;
    });
    prebtn[i].addEventListener("click",function () {
        item.scrollLeft -= 200;
    });
});
//end scroll inside div

//start go to section
let alllinks = document.querySelectorAll(".links .link");
function scrollto(elements) {
    elements.forEach(element => {
        element.addEventListener("click",function (e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:"smooth"
            })
        })
    });
}
scrollto(alllinks);
//end go to section

// start nav bullet
let allsection = document.querySelectorAll("section");
let navbullet = document.querySelector(".nav-bullets");
for (let i = 0; i < allsection.length; i++) {
    let bullet = document.createElement("div");
    bullet.setAttribute("class","bullet");
    bullet.dataset.section = `.${allsection[i].getAttribute("class")}`;
    navbullet.appendChild(bullet);
    let bulletname = document.createElement("div");
    bulletname.innerHTML = allsection[i].getAttribute("id");
    bulletname.setAttribute("class","bullet-name");
    bullet.appendChild(bulletname);
}
let bullets = document.querySelectorAll(".nav-bullets .bullet");
scrollto(bullets);

//show bullets setting
let showbullets = document.querySelectorAll(".setting-bullets .btns button");
let bulletlocal = localStorage.getItem("showbullet");
if (bulletlocal !== null) {
    showbullets.forEach(btn => {
        btn.classList.remove("active");
    });
    if (bulletlocal == "yes") {
        navbullet.style.display = "block";
        document.querySelector(".setting-bullets .btns .yes").classList.add("active");
    }
    else{
        navbullet.style.display = "none";
        document.querySelector(".setting-bullets .btns .no").classList.add("active");
    }
}
showbullets.forEach(btn => {
    btn.addEventListener("click",function (e) {
        if (e.target.dataset.show === "yes") {
            navbullet.style.display = "block";
            localStorage.setItem("showbullet","yes");
        }
        else {
            navbullet.style.display = "none";
            localStorage.setItem("showbullet","no");
        }
        handleActive(e);
    })
});
// end nav bullet

// start reset options
let reset = document.querySelector(".setting .reset");
reset.onclick = function () {
    localStorage.clear();
    window.location.reload();
}
// end reset options

// start menu
let menubtn = document.querySelector("header .container-link i");
let menulinks = document.querySelector("header .container-link ul");
menubtn.onclick = function () {
    menulinks.classList.toggle("open");
    menubtn.classList.toggle("up")
}
document.addEventListener("click", function (e) {
    //incase i clicked anywhere excpt the menu or the links close the menu.
    if (e.target !== menubtn && e.target !== menulinks) {
        if (menulinks.classList.contains("open")) {
            menulinks.classList.toggle("open");
            menubtn.classList.toggle("up")
        }
        // menulinks.classList.remove("open");
        // menubtn.classList.remove("up");
    }
});
menulinks.onclick = function (e) {
    //prevents the first child element inside ul from doing click event.
    e.stopPropagation();
}
// end menu