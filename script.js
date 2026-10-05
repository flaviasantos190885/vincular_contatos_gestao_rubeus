let contatosSelecionados = [];
let dadosRegistroAtual = {};
const REGISTRAR_EVENTO_VINCULO = true;
const MAPA_PROCESSO_ESPELHO = {
  "83": "76",
  "76": "83"
};

let TIPOS_VINCULO = [
  { value: "107", label: "(Analista) CRM" },
  { value: "109", label: "(Analista) Omnichannel" },
  { value: "108", label: "(Analista) TOTVS" },
  { value: "45", label: "(Cliente) Analista Administrativo" },
  { value: "52", label: "(Cliente) Analista Comercial" },
  { value: "60", label: "(Cliente) Analista Contábil" },
  { value: "46", label: "(Cliente) Analista CRM" },
  { value: "85", label: "(Cliente) Analista de comunicação" },
  { value: "106", label: "(Cliente) Analista de dados" },
  { value: "96", label: "(Cliente) Analista de Inteligência de Mercado" },
  { value: "25", label: "(Cliente) Analista de Marketing" },
  { value: "29", label: "(Cliente) Analista de Relacionamento" },
  { value: "27", label: "(Cliente) Analista de Vendas" },
  { value: "66", label: "(Cliente) Analista Financeiro" },
  { value: "47", label: "(Cliente) Analista Sucesso do Cliente" },
  { value: "31", label: "(Cliente) Analista Técnico" },
  { value: "48", label: "(Cliente) Analista TOTVS" },
  { value: "87", label: "(Cliente) Aprovador" },
  { value: "49", label: "(Cliente) Assessor Administrativo" },
  { value: "51", label: "(Cliente) Assessor Comercial" },
  { value: "101", label: "(Cliente) Assessor de negócios" },
  { value: "50", label: "(Cliente) Assessor Educacional" },
  { value: "53", label: "(Cliente) Assistente de Marketing" },
  { value: "54", label: "(Cliente) Assistente Social e Professora" },
  { value: "34", label: "(Cliente) Assistente Técnico" },
  { value: "41", label: "(Cliente) Capacitação Empresarial" },
  { value: "90", label: "(Cliente) Comercial" },
  { value: "103", label: "(Cliente) Consultor da Hoper" },
  { value: "56", label: "(Cliente) Coordenador Administrativo" },
  { value: "57", label: "(Cliente) Coordenador Comercial" },
  { value: "81", label: "(Cliente) Coordenador Comercial e Relacionamento" },
  { value: "55", label: "(Cliente) Coordenador de Cursos" },
  { value: "44", label: "(Cliente) Coordenador de Eventos" },
  { value: "76", label: "(Cliente) Coordenador de Inteligência Comercial" },
  { value: "36", label: "(Cliente) Coordenador de Marketing" },
  { value: "58", label: "(Cliente) Coordenador de Pós" },
  { value: "102", label: "(Cliente) Coordenador de Secretarias" },
  { value: "40", label: "(Cliente) Coordenador Educacional" },
  { value: "42", label: "(Cliente) Coordenador Pedagógico" },
  { value: "94", label: "(Cliente) Coordenador Técnico" },
  { value: "84", label: "(Cliente) Coordenadora de admissão e relacionamento" },
  { value: "80", label: "(Cliente) Coordenadora Serviço Social" },
  { value: "92", label: "(Cliente) Departamento de Marketing" },
  { value: "83", label: "(Cliente) Departamento Financeiro" },
  { value: "91", label: "(Cliente) Departamento Fiscal" },
  { value: "61", label: "(Cliente) Desenvolvedor de Sistemas" },
  { value: "59", label: "(Cliente) Desenvolvedor Web" },
  { value: "95", label: "(Cliente) Desenvolvimento de Soluções" },
  { value: "43", label: "(Cliente) Diretor Administrativo" },
  { value: "79", label: "(Cliente) Diretor Comercial" },
  { value: "62", label: "(Cliente) Diretor de Crescimento e Receita" },
  { value: "37", label: "(Cliente) Diretor de Marketing" },
  { value: "65", label: "(Cliente) Diretor de Negócios" },
  { value: "63", label: "(Cliente) Diretor Financeiro" },
  { value: "64", label: "(Cliente) Diretor Geral" },
  { value: "35", label: "(Cliente) Diretor Técnico" },
  { value: "77", label: "(Cliente) Especialista Técnico" },
  { value: "112", label: "(Cliente) Ex-colaborador" },
  { value: "89", label: "(Cliente) Financeiro" },
  { value: "67", label: "(Cliente) Gerente Comercial" },
  { value: "68", label: "(Cliente) Gerente de Desenvolvimento de Sistemas" },
  { value: "24", label: "(Cliente) Gerente de Marketing" },
  { value: "97", label: "(Cliente) Gerente de Operações" },
  { value: "28", label: "(Cliente) Gerente de Relacionamento" },
  { value: "26", label: "(Cliente) Gerente de Vendas" },
  { value: "78", label: "(Cliente) Gerente Financeiro" },
  { value: "30", label: "(Cliente) Gerente Técnico" },
  { value: "38", label: "(Cliente) Gestor Comercial" },
  { value: "73", label: "(Cliente) Gestor Controller" },
  { value: "39", label: "(Cliente) Gestor Técnico" },
  { value: "99", label: "(Cliente) Head de Growth e Marketing" },
  { value: "23", label: "(Cliente) Líder do projeto" },
  { value: "69", label: "(Cliente) Pró-reitoria" },
  { value: "70", label: "(Cliente) Procuradora institucional" },
  { value: "72", label: "(Cliente) Reitor" },
  { value: "93", label: "(Cliente) Responsável do Projeto" },
  { value: "86", label: "(Cliente) Responsável Jurídico" },
  { value: "82", label: "(Cliente) Responsável Legal" },
  { value: "100", label: "(Cliente) Secretaria" },
  { value: "104", label: "(Cliente) Supervisor Comercial" },
  { value: "98", label: "(Cliente) Supervisor de Relacionamento com o Aluno" },
  { value: "71", label: "(Cliente) Supervisor Geral" },
  { value: "88", label: "(Cliente) Suporte" },
  { value: "2", label: "(Cliente) Testemunha contratual" },
  { value: "75", label: "(Cliente) Vice-Presidente" },
  { value: "74", label: "(Cliente) Vice-Reitor" }
];

function iniciar() {
  RBLib.config({
    urlBase: "https://crmrbacademy.apprubeus.com.br/",
    urlFicha: "https://rbacademy.apprbs.com.br",
    token: "ebbbd780c70a67d9bdc903267c2a0544",
    origem: "600",
    pagina: "acao-personalizada",
    modulos: [{
      modulo: "acaopersonalizada",
      versao: "1.0.0",
      url: "https://repositoriosjs.apprbs.com.br/rblib/v1/",
      configs: { tipo: "card" }
    }]
  });

  const params = new URLSearchParams(document.location.search);
  dadosRegistroAtual.idRegistro = params.get("idRegistro");
  dadosRegistroAtual.idPessoa = params.get("idPessoa");

  if (!dadosRegistroAtual.idPessoa || !dadosRegistroAtual.idRegistro) {
    criarInterface();
    mostrarMensagem("Erro ao carregar os dados do registro. Verifique o console.", "erro");
    return;
  }

  carregarTiposVinculo();
  buscarDadosRegistro();
}

async function carregarTiposVinculo() {
  try {
    const response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Navegacao/Tela/123/2/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if (
      data &&
      data.dadosTiposPessoas &&
      data.dadosTiposPessoas.success &&
      Array.isArray(data.dadosTiposPessoas.dados)
    ) {
      var listaFiltrada = data.dadosTiposPessoas.dados
        .filter(function(item) {
          var titulo = item.titulo || "";
          return titulo.indexOf("(Cliente)") === 0 || titulo.indexOf("(Analista)") === 0;
        })
        .map(function(item) {
          return { value: String(item.id), label: item.titulo };
        })
        .sort(function(a, b) {
          return a.label.localeCompare(b.label, "pt-BR");
        });

      if (listaFiltrada.length > 0) {
        TIPOS_VINCULO = listaFiltrada;
        console.log("Tipos de vínculo carregados dinamicamente do CRM:", TIPOS_VINCULO.length);
      }
    }
  }
  catch (error) {
    console.warn("Não foi possível carregar os tipos de vínculo dinamicamente do CRM. Usando lista fixa.", error);
  }
}

function buscarDadosRegistro() {
  const payload = {
    id: dadosRegistroAtual.idRegistro,
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  fetch("https://crmrbacademy.apprubeus.com.br/api/Registro/dados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    if (data.success && data.dados) {
      dadosRegistroAtual.dadosRegistro = data.dados;

      if (data.dados.pessoa) {
        dadosRegistroAtual.idPessoaRegistro = data.dados.pessoa;
      }

      if (data.dados.cursos && data.dados.cursos.length > 0) {
        dadosRegistroAtual.idCurso = data.dados.cursos[0].id;
      }

      if (data.dados.codigoExterno) {
        dadosRegistroAtual.codigoExterno = data.dados.codigoExterno;
      }

      var idProcessoAtual = data.dados.processo || data.dados.idProcesso || data.dados.funil || data.dados.idFunil;

      console.log("Dados completos do registro atual (para identificar o campo do processo):", data.dados);

      if (idProcessoAtual) {
        dadosRegistroAtual.idProcesso = String(idProcessoAtual);
      }
      else {
        console.warn("Não foi possível identificar o processo/funil deste registro automaticamente.");
      }
    }

    criarInterface();
  })
  .catch(function(error) {
    console.error(error);
    criarInterface();
  });
}

function criarInterface() {
  const container = document.getElementById("interface");
  if (!container) return;

  const html = `
    <div id="loading-inicial" class="loading-inicial">
      <div class="spinner"></div>
      <p>Carregando...</p>
    </div>

    <div id="box-pesquisa" class="box-pesquisa hidden">
      <div class="campo-pesquisa">
        <div class="container-input-busca">
          <input id="input-busca" class="input-busca rb-form-field-input" placeholder="Digite o nome do contato...">
          <button id="btn-busca-estudante" class="btn-busca">
            <div id="loader-btn" class="loader-btn hidden"></div>
            <p id="pesquisar-text" class="texto-pesquisar">Pesquisar</p>
          </button>
        </div>
      </div>

      <div class="container-resultados">
        <label class="rb-label-form label-lista">Contatos encontrados</label>
        <div id="lista-contatos-container" class="lista-contatos-container">
          <p class="sem-contatos">Use a busca acima para encontrar contatos</p>
        </div>
      </div>

      <div id="contatos-selecionados-container" class="container-selecionados">
        <label class="rb-label-form label-selecionados">Contatos selecionados</label>
        <div id="contatos-selecionados" class="contatos-selecionados"></div>
      </div>

      <div class="container-tipo-vinculo">
        <label class="rb-label-form">Tipo de vínculo</label>

        <div style="position: relative;">
          <input
            id="input-tipo-vinculo"
            class="input-busca"
            placeholder="Digite para buscar o tipo de vínculo..."
            autocomplete="off"
            style="width: 100%; border-radius: 4px;"
          >

          <input type="hidden" id="select-tipo-vinculo" value="">

          <div
            id="lista-tipo-vinculo"
            class="hidden"
            style="position: absolute; top: 100%; left: 0; right: 0; z-index: 50; background: #ffffff; border: 1px solid #ddd; border-radius: 4px; max-height: 220px; overflow-y: auto; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); margin-top: 4px;"
          ></div>
        </div>
      </div>

      <div class="container-concluir">
        <button id="btn-concluir" class="btn-concluir">Vincular contatos</button>
      </div>
    </div>
  `;

  container.innerHTML = html;
  configurarEventos();
  atualizarListaContatosSelecionados();

  setTimeout(function() {
    var loadingInicial = document.getElementById("loading-inicial");
    var boxPesquisa = document.getElementById("box-pesquisa");
    if (loadingInicial) loadingInicial.classList.add("hidden");
    if (boxPesquisa) boxPesquisa.classList.remove("hidden");
  }, 500);
}

function configurarEventos() {
  var btnBusca = document.getElementById("btn-busca-estudante");

  if (btnBusca) {
    btnBusca.addEventListener("click", function() {
      var pesquisarText = document.getElementById("pesquisar-text");
      var loaderBtn = document.getElementById("loader-btn");
      if (pesquisarText) pesquisarText.classList.add("hidden");
      if (loaderBtn) loaderBtn.classList.remove("hidden");

      setTimeout(function() {
        buscaEstudante();
        if (pesquisarText) pesquisarText.classList.remove("hidden");
        if (loaderBtn) loaderBtn.classList.add("hidden");
      }, 50);
    });
  }

  var inputBusca = document.getElementById("input-busca");

  if (inputBusca) {
    inputBusca.addEventListener("keypress", function(evt) {
      if (evt.key === "Enter" && this.value.length >= 3) {
        var btn = document.getElementById("btn-busca-estudante");
        if (btn) btn.click();
      }
    });
  }

  var btnConcluir = document.getElementById("btn-concluir");

  if (btnConcluir) {
    btnConcluir.addEventListener("click", concluirVinculacao);
  }

  configurarComboTipoVinculo();
}

function renderizarListaTipoVinculo(filtro) {
  var lista = document.getElementById("lista-tipo-vinculo");
  if (!lista) return;

  var termo = (filtro || "").trim().toLowerCase();

  var resultados = termo
    ? TIPOS_VINCULO.filter(function(item) {
        return item.label.toLowerCase().indexOf(termo) !== -1;
      })
    : TIPOS_VINCULO;

  resultados = resultados.slice(0, 60);

  if (resultados.length === 0) {
    lista.innerHTML = '<div style="padding: 10px 12px; color: #888; font-size: 13px;">Nenhum tipo encontrado</div>';
  }
  else {
    lista.innerHTML = resultados.map(function(item) {
      return `
        <div class="item-tipo-vinculo" data-value="${item.value}" data-label="${item.label.replace(/"/g, "&quot;")}" style="padding: 8px 12px; cursor: pointer; font-size: 14px; color: #333;">
          ${item.label}
        </div>
      `;
    }).join("");

    lista.querySelectorAll(".item-tipo-vinculo").forEach(function(itemEl) {
      itemEl.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#f0f0f0";
      });

      itemEl.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "";
      });

      itemEl.addEventListener("mousedown", function(evento) {
        evento.preventDefault();

        var inputVisivel = document.getElementById("input-tipo-vinculo");
        var inputOculto = document.getElementById("select-tipo-vinculo");

        if (inputVisivel) inputVisivel.value = this.getAttribute("data-label");
        if (inputOculto) inputOculto.value = this.getAttribute("data-value");

        var listaAtual = document.getElementById("lista-tipo-vinculo");
        if (listaAtual) listaAtual.classList.add("hidden");
      });
    });
  }

  lista.classList.remove("hidden");
}

function configurarComboTipoVinculo() {
  var inputVisivel = document.getElementById("input-tipo-vinculo");
  var inputOculto = document.getElementById("select-tipo-vinculo");
  var lista = document.getElementById("lista-tipo-vinculo");

  if (!inputVisivel || !inputOculto || !lista) return;

  inputVisivel.addEventListener("input", function() {
    inputOculto.value = "";
    renderizarListaTipoVinculo(this.value);
  });

  inputVisivel.addEventListener("focus", function() {
    renderizarListaTipoVinculo(this.value);
  });

  inputVisivel.addEventListener("blur", function() {
    setTimeout(function() {
      lista.classList.add("hidden");
    }, 150);
  });
}

function buscaEstudante() {
  var inputBusca = document.getElementById("input-busca");
  if (!inputBusca) return;

  var nome = removerAspas(inputBusca.value);

  if (nome.length < 3) {
    mostrarMensagem("Digite pelo menos 3 caracteres para realizar a busca.", "aviso");
    return;
  }

  var listaContatos = document.getElementById("lista-contatos-container");

  if (listaContatos) {
    listaContatos.innerHTML = `
      <div class="loading-lista">
        <div class="spinner"></div>
        <p>Buscando contatos...</p>
      </div>
    `;
  }

  var objBusca = { nome: nome };
  var resultado = RBLib.api.buscarContatos(objBusca, "", "local", false);
  processarResultadoBusca(resultado);
}

function montarHtmlCadastroContato() {
  return `
    <div class="cadastro-novo-contato-wrapper" style="margin-top: 15px; text-align: center;">
      <button type="button" id="btn-cadastrar-novo-contato" class="btn-busca" style="width: auto; padding: 0 20px; border-radius: 4px;">
        <p class="texto-pesquisar">+ Cadastrar novo contato</p>
      </button>

      <div id="box-novo-contato" class="hidden" style="text-align: left; margin-top: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: #ffffff;">
        <label class="label-lista">Nome *</label>
        <input id="novo-contato-nome" class="input-busca" placeholder="Nome do contato" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

        <label class="label-lista">CPF</label>
        <input id="novo-contato-cpf" class="input-busca" placeholder="000.000.000-00" maxlength="14" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

        <label class="label-lista">E-mail</label>
        <input id="novo-contato-email" type="email" class="input-busca" placeholder="email@exemplo.com" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

        <label class="label-lista">Telefone</label>
        <input id="novo-contato-telefone" type="tel" class="input-busca" placeholder="(00) 00000-0000" maxlength="15" style="width: 100%; border-radius: 4px; margin-bottom: 8px;">

        <p class="sem-contatos" style="text-align: left; font-style: normal; font-size: 12px; padding: 0; margin: 0 0 12px;">
          Informe pelo menos um e-mail ou telefone.
        </p>

        <p id="erro-modal-cadastro" class="erro-busca hidden" style="text-align: left; font-style: normal; padding: 0; margin: 0 0 12px; font-size: 13px;"></p>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button type="button" id="cancelar-cadastro-contato" class="btn-busca" style="background-color: #ffffff; color: #0da6a6; border: 1px solid #0da6a6; width: auto; padding: 0 20px; border-radius: 4px;">
            <p class="texto-pesquisar">Cancelar</p>
          </button>

          <button type="button" id="confirmar-cadastro-contato" class="btn-busca" style="width: auto; padding: 0 20px; border-radius: 4px; gap: 8px;">
            <div id="loader-btn-cadastro" class="loader-btn hidden"></div>
            <p id="cadastrar-text" class="texto-pesquisar">Cadastrar contato</p>
          </button>
        </div>
      </div>
    </div>
  `;
}

function aplicarMascaraCPF(valor) {
  var digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 3) return digitos;
  if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  if (digitos.length <= 9) return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;

  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

function aplicarMascaraTelefone(valor) {
  var digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;

  var ddd = digitos.slice(0, 2);
  var resto = digitos.slice(2);

  if (resto.length <= 4) return `(${ddd}) ${resto}`;

  if (digitos.length <= 10) {
    return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
  }

  return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
}

function configurarEventosCadastroContato(nomePesquisado) {
  var btnCadastrar = document.getElementById("btn-cadastrar-novo-contato");
  var boxNovoContato = document.getElementById("box-novo-contato");

  if (btnCadastrar && boxNovoContato) {
    btnCadastrar.addEventListener("click", function() {
      boxNovoContato.classList.remove("hidden");
      btnCadastrar.classList.add("hidden");

      var inputNome = document.getElementById("novo-contato-nome");

      if (inputNome) {
        inputNome.value = nomePesquisado || "";
        inputNome.focus();
      }
    });
  }

  var inputCpf = document.getElementById("novo-contato-cpf");

  if (inputCpf) {
    inputCpf.addEventListener("input", function() {
      this.value = aplicarMascaraCPF(this.value);
    });
  }

  var inputTelefoneNovoContato = document.getElementById("novo-contato-telefone");

  if (inputTelefoneNovoContato) {
    inputTelefoneNovoContato.addEventListener("input", function() {
      this.value = aplicarMascaraTelefone(this.value);
    });
  }

  var btnCancelarCadastro = document.getElementById("cancelar-cadastro-contato");

  if (btnCancelarCadastro && boxNovoContato && btnCadastrar) {
    btnCancelarCadastro.addEventListener("click", function() {
      boxNovoContato.classList.add("hidden");
      btnCadastrar.classList.remove("hidden");

      var erro = document.getElementById("erro-modal-cadastro");
      if (erro) erro.classList.add("hidden");
    });
  }

  var btnConfirmarCadastro = document.getElementById("confirmar-cadastro-contato");

  if (btnConfirmarCadastro) {
    btnConfirmarCadastro.addEventListener("click", cadastrarNovoContato);
  }
}

function processarResultadoBusca(data) {
  var contatos = data;
  var listaContatos = document.getElementById("lista-contatos-container");
  if (!listaContatos) return;

  var inputBusca = document.getElementById("input-busca");
  var nomePesquisado = inputBusca ? inputBusca.value.trim() : "";

  var resultadosHTML = `<p class="sem-contatos">Nenhum registro encontrado</p>`;

  if (contatos && contatos.success && contatos.dados) {
    var contatosFiltrados = [];

    try {
      var dadosContatos = Array.isArray(contatos.dados) ? contatos.dados : [contatos.dados];

      contatosFiltrados = dadosContatos.filter(function(contato) {
        return String(contato.id) !== String(dadosRegistroAtual.idPessoa);
      });
    }
    catch (err) {
      contatosFiltrados = [];
    }

    if (contatosFiltrados.length > 0) {
      resultadosHTML = "";

      contatosFiltrados.forEach(function(contato) {
        var jaSelecionado = contatosSelecionados.some(function(c) {
          return String(c.id) === String(contato.id);
        });

        var classeItem = jaSelecionado
          ? "contato-item-resultado selecionado"
          : "contato-item-resultado";

        var nomeContato = contato.nome || "";
        var nomeEscapado = nomeContato.replace(/'/g, "\\'");

        var temTagAIRA = false;

        if (contato.tags && Array.isArray(contato.tags)) {
          temTagAIRA = contato.tags.some(function(tag) {
            return tag === "Integração AIRA";
          });
        }

        var tagAIRA = temTagAIRA ? '<span class="tag-aira">AIRA</span>' : "";

        resultadosHTML += `
          <div class="${classeItem}" data-id="${contato.id}" data-nome="${nomeEscapado}" id="contato-${contato.id}" style="display: block;">
            <div id="resumo-contato-${contato.id}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="nome-contato" style="cursor: pointer;" data-acao="selecionar">
                  ${nomeContato}
                  ${tagAIRA}
                </span>

                <button type="button" class="btn-editar-contato" data-id-editar="${contato.id}" style="background: #f0f0f0; border: none; color: #0da6a6; font-size: 12px; font-weight: 500; cursor: pointer; padding: 4px 10px; border-radius: 4px; white-space: nowrap; margin-left: 8px;">
                  Editar
                </button>
              </div>

              <span class="cpf-contato" style="cursor: pointer; display: block;" data-acao="selecionar">
                CPF:
                ${contato.cpf ? contato.cpf : "-"}
                |
                <a href="https://crmrbacademy.apprubeus.com.br/contato/${contato.id}" target="_blank" class="link-id">
                  ID: ${contato.id}
                </a>
              </span>
            </div>

            <div id="editar-contato-${contato.id}" class="hidden" style="text-align: left; margin-top: 4px; padding: 12px; border: 1px solid #ddd; border-radius: 4px; background-color: #ffffff; cursor: default;">
              <div id="loading-editar-${contato.id}" style="display: flex; flex-direction: column; align-items: center; padding: 20px 0;">
                <div class="spinner" style="width: 26px; height: 26px; margin-bottom: 10px;"></div>
                <p style="font-size: 12px; color: #888; margin: 0;">Carregando dados do contato...</p>
              </div>

              <div id="form-editar-${contato.id}" class="hidden">
                <label class="label-lista">Nome</label>
                <input class="input-busca campo-editar-nome" placeholder="Nome do contato" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

                <label class="label-lista">CPF</label>
                <input class="input-busca campo-editar-cpf" placeholder="000.000.000-00" maxlength="14" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

                <label class="label-lista">E-mail</label>
                <input type="email" class="input-busca campo-editar-email" placeholder="email@exemplo.com" style="width: 100%; border-radius: 4px; margin-bottom: 12px;">

                <label class="label-lista">Telefone</label>
                <input type="tel" class="input-busca campo-editar-telefone" placeholder="(00) 00000-0000" maxlength="15" style="width: 100%; border-radius: 4px; margin-bottom: 8px;">

                <p class="erro-busca hidden campo-editar-erro" style="text-align: left; font-style: normal; padding: 0; margin: 0 0 12px; font-size: 13px;"></p>

                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                  <button type="button" class="btn-busca btn-cancelar-editar" data-id-editar="${contato.id}" style="background-color: #ffffff; color: #0da6a6; border: 1px solid #0da6a6; width: auto; padding: 0 20px; border-radius: 4px;">
                    <p class="texto-pesquisar">Cancelar</p>
                  </button>

                  <button type="button" class="btn-busca btn-salvar-editar" data-id-editar="${contato.id}" style="width: auto; padding: 0 20px; border-radius: 4px; gap: 8px;">
                    <div class="loader-btn hidden loader-editar"></div>
                    <p class="texto-pesquisar">Salvar alterações</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  listaContatos.innerHTML = resultadosHTML + montarHtmlCadastroContato();

  var itensLista = listaContatos.querySelectorAll(".contato-item-resultado");

  if (itensLista && itensLista.length > 0) {
    itensLista.forEach(function(item) {
      var areasSelecionaveis = item.querySelectorAll('[data-acao="selecionar"]');

      areasSelecionaveis.forEach(function(area) {
        area.addEventListener("click", function() {
          var id = parseInt(item.getAttribute("data-id"));
          var nome = item.getAttribute("data-nome");
          selecionarContato(id, nome);
        });
      });
    });
  }

  var botoesEditar = listaContatos.querySelectorAll(".btn-editar-contato");

  botoesEditar.forEach(function(botao) {
    botao.addEventListener("click", function(evento) {
      evento.stopPropagation();

      var id = this.getAttribute("data-id-editar");
      abrirEdicaoContato(id);
    });
  });

  var botoesCancelarEditar = listaContatos.querySelectorAll(".btn-cancelar-editar");

  botoesCancelarEditar.forEach(function(botao) {
    botao.addEventListener("click", function(evento) {
      evento.stopPropagation();

      var id = this.getAttribute("data-id-editar");
      fecharEdicaoContato(id);
    });
  });

  var botoesSalvarEditar = listaContatos.querySelectorAll(".btn-salvar-editar");

  botoesSalvarEditar.forEach(function(botao) {
    botao.addEventListener("click", function(evento) {
      evento.stopPropagation();

      var id = this.getAttribute("data-id-editar");
      salvarEdicaoContato(id);
    });
  });

  var camposCpfEdicao = listaContatos.querySelectorAll(".campo-editar-cpf");

  camposCpfEdicao.forEach(function(campo) {
    campo.addEventListener("input", function() {
      this.value = aplicarMascaraCPF(this.value);
    });
  });

  var camposTelefoneEdicao = listaContatos.querySelectorAll(".campo-editar-telefone");

  camposTelefoneEdicao.forEach(function(campo) {
    campo.addEventListener("input", function() {
      this.value = aplicarMascaraTelefone(this.value);
    });
  });

  configurarEventosCadastroContato(nomePesquisado);
}

async function abrirEdicaoContato(idContato) {
  var resumo = document.getElementById("resumo-contato-" + idContato);
  var painel = document.getElementById("editar-contato-" + idContato);
  var loading = document.getElementById("loading-editar-" + idContato);
  var form = document.getElementById("form-editar-" + idContato);

  if (!painel) return;

  if (resumo) resumo.classList.add("hidden");
  painel.classList.remove("hidden");

  if (loading) loading.classList.remove("hidden");
  if (form) form.classList.add("hidden");

  try {
    var response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Pessoa/dados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idContato,
        origem: "600",
        token: "ebbbd780c70a67d9bdc903267c2a0544"
      })
    });

    var data = await response.json();

    console.log("PESSOA/DADOS (edição):", data);

    var dados = (data && data.success && data.dados) ? data.dados : {};

    var inputNome = painel.querySelector(".campo-editar-nome");
    var inputCpf = painel.querySelector(".campo-editar-cpf");
    var inputEmail = painel.querySelector(".campo-editar-email");
    var inputTelefone = painel.querySelector(".campo-editar-telefone");

    if (inputNome) inputNome.value = dados.nome || "";
    if (inputCpf) inputCpf.value = aplicarMascaraCPF(dados.cpf || "");

    if (inputEmail) {
      inputEmail.value = (dados.emails && dados.emails.principal) ? dados.emails.principal : "";
    }

    if (inputTelefone) {
      var telefonePrincipal = (dados.telefones && dados.telefones.principal) ? dados.telefones.principal : "";
      var digitosTelefone = telefonePrincipal.replace(/\D/g, "");

      if ((digitosTelefone.length === 12 || digitosTelefone.length === 13) && digitosTelefone.indexOf("55") === 0) {
        digitosTelefone = digitosTelefone.slice(2);
      }

      inputTelefone.value = aplicarMascaraTelefone(digitosTelefone);
    }
  }
  catch (error) {
    console.error("Erro ao buscar dados do contato para edição:", error);
  }
  finally {
    if (loading) loading.classList.add("hidden");
    if (form) form.classList.remove("hidden");
  }
}

function fecharEdicaoContato(idContato) {
  var resumo = document.getElementById("resumo-contato-" + idContato);
  var painel = document.getElementById("editar-contato-" + idContato);

  if (painel) painel.classList.add("hidden");
  if (resumo) resumo.classList.remove("hidden");
}

async function salvarEdicaoContato(idContato) {
  var painel = document.getElementById("editar-contato-" + idContato);
  if (!painel) return;

  var inputNome = painel.querySelector(".campo-editar-nome");
  var inputCpf = painel.querySelector(".campo-editar-cpf");
  var inputEmail = painel.querySelector(".campo-editar-email");
  var inputTelefone = painel.querySelector(".campo-editar-telefone");
  var erro = painel.querySelector(".campo-editar-erro");
  var btnSalvar = painel.querySelector(".btn-salvar-editar");
  var loaderSalvar = painel.querySelector(".loader-editar");

  if (erro) erro.classList.add("hidden");

  var nome = inputNome ? inputNome.value.trim() : "";
  var cpf = inputCpf ? inputCpf.value.replace(/\D/g, "") : "";
  var email = inputEmail ? inputEmail.value.trim() : "";
  var telefone = inputTelefone ? inputTelefone.value.replace(/\D/g, "") : "";

  if (!nome) {
    if (erro) {
      erro.textContent = "Informe o nome do contato.";
      erro.classList.remove("hidden");
    }
    return;
  }

  if (btnSalvar) btnSalvar.disabled = true;
  if (loaderSalvar) loaderSalvar.classList.remove("hidden");

  var payload = {
    id: idContato,
    nome: nome,
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  if (cpf) payload.cpf = cpf;
  if (email) payload.emailPrincipal = email;
  if (telefone) payload.telefonePrincipal = telefone;

  console.log("PAYLOAD Pessoa/cadastro (edição):", payload);

  try {
    var response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Pessoa/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    var data = await response.json();

    console.log("RETORNO Pessoa/cadastro (edição):", data);

    if (!data || !data.success) {
      var mensagemErro = "Não foi possível salvar as alterações.";

      if (data && data.errors) {
        mensagemErro = typeof data.errors === "string" ? data.errors : JSON.stringify(data.errors);
      }

      if (erro) {
        erro.textContent = mensagemErro;
        erro.classList.remove("hidden");
      }

      if (btnSalvar) btnSalvar.disabled = false;
      if (loaderSalvar) loaderSalvar.classList.add("hidden");

      return;
    }

    var itemContato = document.getElementById("contato-" + idContato);

    if (itemContato) {
      itemContato.setAttribute("data-nome", nome);

      var nomeSpan = itemContato.querySelector(".nome-contato");
      if (nomeSpan) nomeSpan.firstChild.textContent = nome + " ";

      var cpfSpan = itemContato.querySelector(".cpf-contato");
      if (cpfSpan) {
        var cpfFormatado = cpf ? aplicarMascaraCPF(cpf) : "-";
        cpfSpan.innerHTML = cpfSpan.innerHTML.replace(/CPF:\s*[^|]*\|/, "CPF: " + cpfFormatado + " |");
      }
    }

    painel.classList.add("hidden");
    fecharEdicaoContato(idContato);

    mostrarMensagem("Contato atualizado com sucesso!", "sucesso");
  }
  catch (error) {
    console.error(error);

    if (erro) {
      erro.textContent = "Erro ao salvar as alterações. Verifique o console.";
      erro.classList.remove("hidden");
    }
  }
  finally {
    if (btnSalvar) btnSalvar.disabled = false;
    if (loaderSalvar) loaderSalvar.classList.add("hidden");
  }
}

function selecionarContato(idContato, nomeContato) {
  var indiceExistente = -1;

  for (var i = 0; i < contatosSelecionados.length; i++) {
    if (String(contatosSelecionados[i].id) === String(idContato)) {
      indiceExistente = i;
      break;
    }
  }

  if (indiceExistente !== -1) {
    contatosSelecionados.splice(indiceExistente, 1);

    var itemContato = document.getElementById(`contato-${idContato}`);
    if (itemContato) itemContato.classList.remove("selecionado");
  }
  else {
    contatosSelecionados.push({ id: idContato, nome: nomeContato });

    var itemContato = document.getElementById(`contato-${idContato}`);
    if (itemContato) itemContato.classList.add("selecionado");
  }

  atualizarListaContatosSelecionados();
}

function atualizarListaContatosSelecionados() {
  var container = document.getElementById("contatos-selecionados");
  if (!container) return;

  if (contatosSelecionados.length === 0) {
    container.innerHTML = `<p class="sem-contatos">Nenhum contato selecionado</p>`;
    return;
  }

  var html = "";

  for (var i = 0; i < contatosSelecionados.length; i++) {
    var contato = contatosSelecionados[i];

    html += `
      <div id="selecionado-${contato.id}" class="contato-item-selecionado">
        <span class="nome-contato-selecionado">
          ${contato.nome}
        </span>

        <button class="btn-remover-contato" data-id="${contato.id}">
          Remover
        </button>
      </div>
    `;
  }

  container.innerHTML = html;

  var botoesRemover = container.querySelectorAll(".btn-remover-contato");

  if (botoesRemover && botoesRemover.length > 0) {
    botoesRemover.forEach(function(botao) {
      botao.addEventListener("click", function() {
        var id = parseInt(this.getAttribute("data-id"));
        removerContatoSelecionado(id);
      });
    });
  }
}

function removerContatoSelecionado(idContato) {
  contatosSelecionados = contatosSelecionados.filter(function(contato) {
    return String(contato.id) !== String(idContato);
  });

  atualizarListaContatosSelecionados();

  var itemLista = document.getElementById(`contato-${idContato}`);
  if (itemLista) itemLista.classList.remove("selecionado");
}

async function concluirVinculacao() {
  if (contatosSelecionados.length === 0) {
    mostrarMensagem("Selecione pelo menos um contato para vincular.", "aviso");
    return;
  }

  var selectTipoVinculo = document.getElementById("select-tipo-vinculo");

  if (!selectTipoVinculo || !selectTipoVinculo.value) {
    mostrarMensagem("Selecione o tipo de vínculo antes de continuar.", "aviso");
    return;
  }

  var tipoVinculo = selectTipoVinculo.value;
  var btnConcluir = document.getElementById("btn-concluir");

  if (btnConcluir) {
    btnConcluir.disabled = true;

    btnConcluir.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="loader-btn"></div>
        <span style="margin-left: 10px">Processando...</span>
      </div>
    `;
  }

  var erros = 0;

  if (tipoVinculo === "16" && contatosSelecionados.length > 0) {
    var novaPessoaPrincipal = contatosSelecionados[0];

    alterarPessoaPrincipal(novaPessoaPrincipal.id, async function(sucesso) {
      if (!sucesso) {
        finalizarProcesso(1);
        return;
      }

      await replicarVinculoProcessoGestao(novaPessoaPrincipal, tipoVinculo);

      if (REGISTRAR_EVENTO_VINCULO) {
        try {
          await cadastrarEventoVinculo(novaPessoaPrincipal, tipoVinculo);
        }
        catch (erroEvento) {
          console.warn(erroEvento);
        }
      }

      finalizarProcesso(0);
    });

    return;
  }

  for (var i = 0; i < contatosSelecionados.length; i++) {
    var contato = contatosSelecionados[i];

    try {
      var resultado = await enviarVinculo(contato, tipoVinculo);

      if (!resultado || !resultado.success) {
        erros++;
      }
    }
    catch (erro) {
      erros++;
      console.error(erro);
    }
  }

  finalizarProcesso(erros);
}

async function enviarVinculo(contato, tipoVinculo) {
  var resultadoVinculo = await alterarPessoasDaOportunidade(contato, tipoVinculo);

  if (!resultadoVinculo || !resultadoVinculo.success) {
    return {
      success: false,
      etapa: "alterarPessoas",
      resposta: resultadoVinculo
    };
  }

  await replicarVinculoProcessoGestao(contato, tipoVinculo);

  var resultadoEvento = null;

  if (REGISTRAR_EVENTO_VINCULO) {
    try {
      resultadoEvento = await cadastrarEventoVinculo(contato, tipoVinculo);
    }
    catch (erroEvento) {
      console.warn(erroEvento);
    }
  }

  return {
    success: true,
    vinculo: resultadoVinculo,
    evento: resultadoEvento
  };
}

async function alterarPessoasDaOportunidade(contato, tipoVinculo, idRegistroAlvo) {
  var idRegistro = idRegistroAlvo || dadosRegistroAtual.idRegistro;

  const payloadRegistro = {
    id: idRegistro,
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  const responseRegistro = await fetch("https://crmrbacademy.apprubeus.com.br/api/Registro/dados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadRegistro)
  });

  const registro = await responseRegistro.json();

  if (!registro || !registro.success || !registro.dados) {
    return {
      success: false,
      errors: "Não foi possível obter os dados atuais da oportunidade."
    };
  }

  const pessoasAtuais = Array.isArray(registro.dados.pessoas) ? registro.dados.pessoas : [];

  const pessoas = pessoasAtuais.map(function(pessoa) {
    return {
      id: String(pessoa.id),
      tipo: String(pessoa.tipo || ""),
      principal: String(pessoa.principal || "0")
    };
  });

  const pessoaExistente = pessoas.find(function(pessoa) {
    return String(pessoa.id) === String(contato.id);
  });

  if (pessoaExistente) {
    pessoaExistente.tipo = String(tipoVinculo);
  }
  else {
    pessoas.push({
      id: String(contato.id),
      tipo: String(tipoVinculo),
      principal: "0"
    });
  }

  const payload = {
    id: idRegistro,
    pessoas: pessoas,
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  const response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Oportunidade/alterarPessoas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  return data;
}

async function replicarVinculoProcessoGestao(contato, tipoVinculo) {
  try {
    var idProcessoAtual = dadosRegistroAtual.idProcesso;
    var idProcessoAlvo = idProcessoAtual ? MAPA_PROCESSO_ESPELHO[idProcessoAtual] : null;

    if (!idProcessoAlvo) {
      console.warn("Processo atual não identificado (ou sem espelhamento configurado). Processo atual detectado: " + idProcessoAtual + ". Replicação pulada.");
      return;
    }

    var idPessoaPrincipal = dadosRegistroAtual.idPessoa;

    var resultadoBusca = RBLib.api.buscarRegistros({ id: idPessoaPrincipal }, function() {}, "", false);

    console.log("Registros encontrados para replicar no processo " + idProcessoAlvo + ":", resultadoBusca);

    if (!resultadoBusca || !resultadoBusca.success || !resultadoBusca.dados) {
      console.warn("Não foi possível localizar registros da pessoa principal para replicar no processo " + idProcessoAlvo + ".");
      return;
    }

    var lista = Array.isArray(resultadoBusca.dados) ? resultadoBusca.dados : [resultadoBusca.dados];

    var candidatos = lista.filter(function(registro) {
      var idProcesso = registro.processo || registro.idProcesso || registro.funil || registro.idFunil;
      return String(idProcesso) === idProcessoAlvo;
    });

    var candidatosAtivos = candidatos.filter(function(registro) {
      var etapaNome = (registro.etapaNome || "").toLowerCase();
      return etapaNome.indexOf("evas") === -1;
    });

    if (candidatosAtivos.length === 0) {
      console.warn("Nenhum registro ativo do processo " + idProcessoAlvo + " encontrado para esta pessoa. Replicação pulada (isso é esperado se o cliente ainda não tem registro nesse processo).");
      return;
    }

    if (candidatosAtivos.length > 1) {
      console.log("Mais de um registro ativo encontrado no processo " + idProcessoAlvo + " para esta pessoa. Replicando em todos:", candidatosAtivos);
    }

    for (var i = 0; i < candidatosAtivos.length; i++) {
      var registroAlvo = candidatosAtivos[i];

      try {
        var resultado = await alterarPessoasDaOportunidade(contato, tipoVinculo, registroAlvo.id);

        if (!resultado || !resultado.success) {
          console.warn("Falha ao replicar vínculo no processo " + idProcessoAlvo + ", registro " + registroAlvo.id + ":", resultado);
        }
        else {
          console.log("Vínculo replicado com sucesso no processo " + idProcessoAlvo + ", registro " + registroAlvo.id);
        }
      }
      catch (erroRegistro) {
        console.error("Erro ao replicar vínculo no registro " + registroAlvo.id + ":", erroRegistro);
      }
    }
  }
  catch (erro) {
    console.error("Erro ao replicar vínculo:", erro);
  }
}

function cadastrarEventoVinculo(contato, tipoVinculo) {
  var payload = {
    tipo: "4204",
    pessoa: { id: dadosRegistroAtual.idPessoa },
    pessoasSecundarias: [{ id: contato.id, tipo: tipoVinculo }],
    idOportunidade: dadosRegistroAtual.idRegistro,
    codRegistro: dadosRegistroAtual.codigoExterno || "",
    curso: dadosRegistroAtual.idCurso || "",
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  return fetch("https://crmrbacademy.apprubeus.com.br/api/Evento/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(function(response) { return response.json(); });
}

function alterarPessoaPrincipal(idNovaPessoaPrincipal, callback) {
  var payload = {
    id: dadosRegistroAtual.idRegistro,
    pessoas: [
      { id: idNovaPessoaPrincipal, tipo: "16", principal: "1" },
      { id: dadosRegistroAtual.idPessoa, tipo: "33", principal: "0" }
    ],
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  fetch("https://crmrbacademy.apprubeus.com.br/api/Oportunidade/alterarPessoas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    if (data && data.success) {
      callback(true);
    }
    else {
      console.error(data);
      callback(false);
    }
  })
  .catch(function(error) {
    console.error(error);
    callback(false);
  });
}

function finalizarProcesso(requisicoesComErro) {
  var btnConcluir = document.getElementById("btn-concluir");

  if (btnConcluir) {
    btnConcluir.disabled = false;
    btnConcluir.innerHTML = "Vincular contatos";
  }

  if (requisicoesComErro === 0) {
    var quantidade = contatosSelecionados.length;
    var nomesVinculados = contatosSelecionados.map(function(contato) { return contato.nome; }).join(", ");

    var mensagemSucesso = quantidade === 1
      ? `✓ ${nomesVinculados} vinculado(a) com sucesso!`
      : `✓ ${quantidade} contatos vinculados com sucesso: ${nomesVinculados}`;

    mostrarMensagem(mensagemSucesso, "sucesso");

    setTimeout(function() {
      var selectTipoVinculo = document.getElementById("select-tipo-vinculo");

      contatosSelecionados = [];
      atualizarListaContatosSelecionados();

      var listaContatos = document.getElementById("lista-contatos-container");

      if (listaContatos) {
        listaContatos.innerHTML = `<p class="sem-contatos">Use a busca acima para encontrar contatos</p>`;
      }

      var inputBusca = document.getElementById("input-busca");
      if (inputBusca) inputBusca.value = "";

      if (selectTipoVinculo) selectTipoVinculo.value = "";

      var inputTipoVinculo = document.getElementById("input-tipo-vinculo");
      if (inputTipoVinculo) inputTipoVinculo.value = "";
    }, 2200);
  }
  else {
    mostrarMensagem(`Erro ao vincular ${requisicoesComErro} contato(s). Verifique o console.`, "erro");
  }
}

function removerAspas(texto) {
  if (!texto) return "";
  return texto.replace(/['"]/g, "");
}

function mostrarMensagem(mensagem, tipo) {
  var divMensagem = document.createElement("div");

  divMensagem.className = `mensagem-status mensagem-${tipo}`;
  divMensagem.textContent = mensagem;

  document.body.appendChild(divMensagem);

  setTimeout(function() {
    divMensagem.style.opacity = "0";

    setTimeout(function() {
      if (document.body.contains(divMensagem)) {
        document.body.removeChild(divMensagem);
      }
    }, 500);
  }, 3000);
}

function preencherCampos(idContato, idRegistro) {
  let objPessoa = RBLib.api.buscarContato({ id: idContato }, callback, "local", false);
  let registros = RBLib.api.buscarRegistros({ id: idContato }, callback, "", false);
  let registroSelecionado;

  if (registros.success) {
    registroSelecionado = registros.dados.find(function(registro) {
      return registro.id == idRegistro;
    });

    registroSelecionado = { dados: registroSelecionado };
  }

  RBLib.form.preencherCampos(objPessoa, registroSelecionado.dados, callback, false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}

function callback() {
}

function mostrarErroCadastroContato(mensagem) {
  var erro = document.getElementById("erro-modal-cadastro");
  if (!erro) return;

  erro.textContent = mensagem;
  erro.classList.remove("hidden");
}

async function cadastrarNovoContato() {
  var inputNome = document.getElementById("novo-contato-nome");
  var inputCpf = document.getElementById("novo-contato-cpf");
  var inputEmail = document.getElementById("novo-contato-email");
  var inputTelefone = document.getElementById("novo-contato-telefone");
  var btnCadastrar = document.getElementById("confirmar-cadastro-contato");
  var erro = document.getElementById("erro-modal-cadastro");

  if (erro) erro.classList.add("hidden");

  var nome = inputNome ? inputNome.value.trim() : "";
  var cpf = inputCpf ? inputCpf.value.replace(/\D/g, "") : "";
  var email = inputEmail ? inputEmail.value.trim() : "";
  var telefone = inputTelefone ? inputTelefone.value.trim() : "";

  if (!nome) {
    mostrarErroCadastroContato("Informe o nome do contato.");
    return;
  }

  if (!email && !telefone) {
    mostrarErroCadastroContato("Informe pelo menos um e-mail ou telefone.");
    return;
  }

  if (btnCadastrar) {
    btnCadastrar.disabled = true;
    btnCadastrar.innerHTML = "<span>Cadastrando...</span>";
  }

  var payload = {
    nome: nome,
    origem: "600",
    token: "ebbbd780c70a67d9bdc903267c2a0544"
  };

  if (email) payload.emailPrincipal = email;
  if (cpf) payload.cpf = cpf;

  if (telefone) {
    payload.telefonePrincipal = telefone.replace(/\D/g, "");
  }

  try {
    var response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Contato/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    var data = await response.json();

    if (!data || !data.success || !data.dados) {
      var mensagemErro = "Não foi possível cadastrar o contato.";

      if (data && data.errors) {
        mensagemErro = typeof data.errors === "string" ? data.errors : JSON.stringify(data.errors);
      }

      if (data && data.erro && Array.isArray(data.erro) && data.erro.length > 0) {
        mensagemErro = data.erro
          .map(function(item) { return item.erro || item.mensagem || ""; })
          .filter(Boolean)
          .join(" ");
      }

      mostrarErroCadastroContato(mensagemErro);

      if (btnCadastrar) {
        btnCadastrar.disabled = false;
        btnCadastrar.innerHTML = "Cadastrar contato";
      }

      return;
    }

    var novoId = data.dados;

    var jaSelecionado = contatosSelecionados.some(function(contato) {
      return String(contato.id) === String(novoId);
    });

    if (!jaSelecionado) {
      contatosSelecionados.push({ id: novoId, nome: nome });
    }

    atualizarListaContatosSelecionados();

    var boxNovoContato = document.getElementById("box-novo-contato");
    var btnCadastrarNovoContato = document.getElementById("btn-cadastrar-novo-contato");

    if (boxNovoContato) boxNovoContato.classList.add("hidden");
    if (btnCadastrarNovoContato) btnCadastrarNovoContato.classList.remove("hidden");

    var listaContatos = document.getElementById("lista-contatos-container");

    if (listaContatos) {
      listaContatos.innerHTML = `
        <div class="contato-criado-sucesso">
          <strong>Contato cadastrado</strong>
          <span>${nome}</span>
          <small>ID: ${novoId}</small>
        </div>
      `;
    }

    mostrarMensagem("Contato cadastrado e selecionado com sucesso!", "sucesso");
  }
  catch (error) {
    console.error(error);

    mostrarErroCadastroContato("Erro ao cadastrar o contato. Verifique o console.");

    if (btnCadastrar) {
      btnCadastrar.disabled = false;
      btnCadastrar.innerHTML = "Cadastrar contato";
    }
  }
}
