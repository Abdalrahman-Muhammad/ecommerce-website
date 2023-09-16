let topBtnContact = document.querySelector(".top");
window.onscroll = function () {
  if (window.scrollY >= 400) {
    topBtnContact.style.display = "block"
  } else {
    topBtnContact.style.display = "none"

  }
}
function goTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}