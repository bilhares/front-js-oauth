function auth(user, pass) {
  let isvalido = false;
  new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open("POST", URL_BASE + "oauth/token", false);
    req.setRequestHeader("Authorization", "Basic YW5ndWxhcjoxMjM=");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        if (req.status == 200) {
          saveToken(req.responseText);
          resolve((isvalido = true));
        } else {
          reject((isvalido = false));
        }
      }
    };
    req.send(`username=${user}&password=${pass}&grant_type=password`);
  });

  return isvalido;
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  console.log(JSON.parse(window.atob(base64)));
  return JSON.parse(window.atob(base64));
}

function verifyToken() {
  const token = localStorage.getItem("token");
  if (parseJwt(token).exp < Date.now() / 1000) {
    console.log("invalido");
    localStorage.clear();
    window.open("index.html", "_self");
  } else {
    console.log("valido");
  }
}

setInterval(function() {
  const token = getToken();
  if(token != null){
    verifyToken();
  }
}, 40000);//3 minutos in ms

