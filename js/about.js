let topBtnAbout = document.querySelector(".top");
console.log(topBtnAbout);
window.onscroll = function () {
  if (window.scrollY >= 400) {
    topBtnAbout.style.display = "block"
  } else {
    topBtnAbout.style.display = "none"

  }
}
function goTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}