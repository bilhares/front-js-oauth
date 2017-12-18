$(function() {
  $(window).on("hashchange", hashchanged);
  hashchanged();
});

function hashchanged() {
  var hash = location.hash.replace(/[#\/]/g, "") || "principal";
  const token = getToken();
  if (token != null) {
    if (hash == "listar") {
      listar();
    }
    $("#conteudo").load(hash + ".html");
  } else {
    window.open("index.html", "_self");
  }
}

function logout() {
  localStorage.clear();
  window.open("index.html", "_self");
}

window.onload = function() {
  setUsername();
  verifyRoles();
  $("#overlay").hide();
};

function setUsername() {
  const tk = parseJwt(getToken());
  console.log(tk);
  $("#username").append(`<p>${tk.user_name}</p>`);
}

function verifyRoles() {
  $("#cadastrar").hide();
  const tk = parseJwt(getToken());
  tk.authorities.map(n => {
    console.log(n);
    if (n.includes("ROLE_CADASTRAR_PESSOA")) {
      $("#cadastrar").show();
    }
  });
}
