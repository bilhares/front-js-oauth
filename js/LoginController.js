function logar() {
  let user = form_login.user.value;
  let pass = form_login.pass.value;
  if (auth(user, pass)) {
    window.open("home.html", "_self");
  } else {
    alert("invalidoo");
  }
}
$("#form_login_id").submit(function(e) {
  e.preventDefault();
});

window.onload = function() {
  const token = localStorage.getItem("token");
  if (token != null) {
    console.log(token);
    window.open("home.html", "_self");
  }
};
