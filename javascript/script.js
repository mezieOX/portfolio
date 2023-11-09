const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger");




toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});

var firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);
function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("fa-moon-o", "fa-sun-o");
        localStorage.setItem("dark", 1);
    }else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("fa-sun-o", "fa-moon-o");
        localStorage.setItem("dark", 0);    }
}

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
})
links.forEach(link => link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}))



var currentIndex = 0;

zoom_icons.forEach((icn, i)=> icn.addEventListener("click", () => {
     prt_section.classList.add("open");
     document.body.classList.add("stopScrolling");
     currentIndex = i;
     changeImage(currentIndex);
    }));
     modal_overlay.addEventListener("click", () => { prt_section.classList.remove("open")
document.body.classList.remove("stopScrolling");
}
 );

 prev_btn.addEventListener("click", () => {
    if (currentIndex === 0){
        currentIndex = 2;
    } else {
    currentIndex--;
    }
    changeImage(currentIndex);
})

next_btn.addEventListener("click", () => {
    if (currentIndex === 2){
        currentIndex = 0;
    } else {
    currentIndex++;
    }
    changeImage(currentIndex);
})

 function changeImage(index){
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
    }

window.addEventListener("scroll", () => {
    
  if(!skillsPlayed) skillsCounter();
  if(!mlPlayed) mlCounter();
// skillsCounter()
activeLink();
});

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0); 
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar)


let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});

function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum){
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

 

var skillsPlayed = false;

function skillsCounter(){
if (!hasReached(first_skill)) return;
 skillsPlayed = true;

sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
        updateCount(counter, target);
    }, 400);
});

progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));
}

var mlPlayed = false;

function mlCounter(){
    if (!hasReached(ml_section)) return;
   
mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;

        setTimeout(() => {
            updateCount(ctr, target)
        }, 400);
    })
}
let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: ".prt-card",
    },
    animation: {
        duration: 500,
    }
});


const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });





  function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return { y: sct.getBoundingClientRect().top - header.offsetHeight,
      id: i,
      };
    }).filter(sct => sct.y <= 0);

    let currentSectionID = passedSections.at(-1).id;

    links.forEach(l => l.classList.remove("active"));
    links[currentSectionID].classList.add("active");
     
}
activeLink();








