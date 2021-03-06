let tk = JSON.parse(getToken());

function listar(page) {
  let url_pag =`?size=${TOTAL_REGISTROS}&page=0`;

  if (page != null) {
    url_pag = `?size=${TOTAL_REGISTROS}&page=${page}`;
  }
  new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open("GET", URL_BASE + "pessoas" + url_pag, true);
    req.setRequestHeader("Authorization", `Bearer ${tk.access_token}`);

    req.onreadystatechange = () => {
      if (req.readyState == 3) {
        $("#overlay").show();
      }
      if (req.readyState == 4) {
        $("#overlay").hide();
        if (req.status == 200) {
          let dados = JSON.parse(req.responseText);
          $("#tabela_pessoas").empty();
          paginar(dados.totalPages);
          resolve(
            dados.content.map(n =>
              $("#tabela_pessoas").append(`
                <tr>
                  <td>${n.nome}</td>
                  <td>${n.endereco.estado}</td>
                </tr>
               `)
            )
          );
        } else {
          reject(console.log(JSON.parse(req.responseText)));
        }
      }
    };
    req.send();
  });
}

function paginar(total) {
  window.pagObj = $("#pagination")
    .twbsPagination({
      startPage:1,
      totalPages: total,
      visiblePages: 10,     
      onPageClick: function(event, page) {      
        listar(page-1);
      }
    })
    .on("page", function(event, page) {    
    });
}

function cadastrarPessoa() {
  var obj = JSON.stringify({
    nome: form_cadastro_pessoa.nome.value,
    endereco: {
      logradouro: form_cadastro_pessoa.logradouro.value,
      numero: form_cadastro_pessoa.numero.value,
      complemento: form_cadastro_pessoa.complemento.value,
      bairro: form_cadastro_pessoa.bairro.value,
      cep: form_cadastro_pessoa.cep.value,
      cidade: form_cadastro_pessoa.cidade.value,
      estado: form_cadastro_pessoa.estado.value
    },
    ativo: true
  });
  console.log(obj);
  new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open("POST", URL_BASE + "pessoas", false);
    req.setRequestHeader("content-type", "application/json");
    req.setRequestHeader("Authorization", `Bearer ${tk.access_token}`);

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        if (req.status == 200) {
          resolve(console.log(JSON.parse(req.responseText)));
        } else {
          reject(console.log(JSON.parse(req.responseText)));
        }
      }
    };
    req.send(obj);
  });
}
