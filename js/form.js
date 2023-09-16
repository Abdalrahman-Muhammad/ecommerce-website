function handleSubmit(e) {
  e.preventDefault(); // pervent form submittion

  //get form input values
  const nameInput = document.getElementById('txtInput');
  const mailInput = document.getElementById("mail");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("review");

  //get validation label
  const validationLabel = document.querySelector(".validation");


  if (nameInput.value.trim() === "" || mailInput.value.trim() === "" || messageInput.value.trim() === "") {
    validationLabel.textContent = "You must fill all required fields";
    return; // stop submition
  }
  // validate name input
  const namePattern = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/

  if (!namePattern.test(nameInput.value)) {
    validationLabel.textContent = "Right a valid name";
    return
  }
  //validate mail input
  const emailPattern = /^([a-zA-z0-9.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,6})*$/

  if (!emailPattern.test(mailInput.value)) {
    validationLabel.textContent = "Please Enter A vaild Email";
    return;
  }

  validationLabel.textContent = "Submitted successfully";

}