
//========================Slider======================
let count = 0;
function handleSlide(action = "next", by) {
  let myImgs = document.querySelectorAll('.box');
  if (by == 'human') clearInterval(sliding);

  let previousCount = count; // store the previous count
  if (action == 'next') {
    count++
  } else {
    count--
  }

  if (count == myImgs.length) count = 0;
  if (count < 0) count = myImgs.length - 1;

  myImgs[previousCount].classList.remove('active');
  myImgs[count].classList.add("active");
  clearInterval(sliding);
  sliding = setInterval(handleSlide, 3000);
}
var sliding = setInterval(handleSlide, 3000);



//==================================================
let topBtn = document.querySelector(".top");
window.onscroll = function () {
  if (window.scrollY >= 400) {
    topBtn.style.display = "block"
  } else {
    topBtn.style.display = "none"

  }
}
function goTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}





