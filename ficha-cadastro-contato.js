// 1. Criamos a variável global com o valor padrão (6, por exemplo)
window.tipoPessoaSelecionada = "6";

// carregaLib("https://sitesrubeus.com.br/rblib/principal/rblib.2.1.0.0.js").then(sucessoRBLib, falhaRBLib);
carregaLib("https://repositoriosjs.apprbs.com.br/rblib/v1/rblib.2.1.0.js").then(sucessoRBLib, falhaRBLib);

function carregaLib(src) {
  document.body.insertAdjacentHTML("beforeend", `<div class="boxLoader"><div class="fadeInBox"><div class="loader"></div> </div> </div>`);
  return new Promise(function (resolve, reject) {
    let param = new URLSearchParams(window.location.search).get("tm");
    let tm = param ? param : new Date().getTime();
    let s = document.createElement("script");
    s.src = src + "?tm=" + tm;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function falhaRBLib() {
  console.log("Não foi possível carregar o script padrão.");
}

function sucessoRBLib() {
  RBLib.config({
    urlBase: "https://crmrbacademy.apprubeus.com.br/",
    urlFicha: "https://academy.apprbs.com.br",
    token: "ebbbd780c70a67d9bdc903267c2a0544",
    origem: "600",
    idProcesso: "76",
    pagina: "ficha-de-inscricao",
    modulos: [
      {
        modulo: "ficha",
        versao: "1.2.0",
        // url: "https://sitesrubeus.com.br/rblib/ficha/",
        url: "https://repositoriosjs.apprbs.com.br/rblib/v1/",
        configs: {
          linkFichaInscricao: "briefing-cs",
          estudante: "Sim",
          preencherCampos: false,
          tipoPessoa: window.tipoPessoaSelecionada,
        },
      },
    ],
  });

  setTimeout(enviarDadosPaginaPai, 1000);
}

(function() {
    // Lista fixa: usada só se não for possível buscar os tipos no CRM
    let dadosTitulos = [
        { "id": "45", "titulo": "(Cliente) Analista Administrativo" },
        { "id": "52", "titulo": "(Cliente) Analista Comercial" },
        { "id": "60", "titulo": "(Cliente) Analista Contábil" },
        { "id": "46", "titulo": "(Cliente) Analista CRM" },
        { "id": "85", "titulo": "(Cliente) Analista de comunicação" },
        { "id": "106", "titulo": "(Cliente) Analista de dados" },
        { "id": "96", "titulo": "(Cliente) Analista de Inteligência de Mercado" },
        { "id": "25", "titulo": "(Cliente) Analista de Marketing" },
        { "id": "29", "titulo": "(Cliente) Analista de Relacionamento" },
        { "id": "27", "titulo": "(Cliente) Analista de Vendas" },
        { "id": "66", "titulo": "(Cliente) Analista Financeiro" },
        { "id": "47", "titulo": "(Cliente) Analista Sucesso do Cliente" },
        { "id": "31", "titulo": "(Cliente) Analista Técnico" },
        { "id": "48", "titulo": "(Cliente) Analista TOTVS" },
        { "id": "87", "titulo": "(Cliente) Aprovador" },
        { "id": "49", "titulo": "(Cliente) Assessor Administrativo" },
        { "id": "51", "titulo": "(Cliente) Assessor Comercial" },
        { "id": "101", "titulo": "(Cliente) Assessor de negócios" },
        { "id": "50", "titulo": "(Cliente) Assessor Educacional" },
        { "id": "53", "titulo": "(Cliente) Assistente de Marketing" },
        { "id": "54", "titulo": "(Cliente) Assistente Social e Professora" },
        { "id": "34", "titulo": "(Cliente) Assistente Técnico" },
        { "id": "41", "titulo": "(Cliente) Capacitação Empresarial" },
        { "id": "90", "titulo": "(Cliente) Comercial" },
        { "id": "103", "titulo": "(Cliente) Consultor da Hoper" },
        { "id": "56", "titulo": "(Cliente) Coordenador Administrativo" },
        { "id": "57", "titulo": "(Cliente) Coordenador Comercial" },
        { "id": "81", "titulo": "(Cliente) Coordenador Comercial e Relacionamento" },
        { "id": "55", "titulo": "(Cliente) Coordenador de Cursos" },
        { "id": "44", "titulo": "(Cliente) Coordenador de Eventos" },
        { "id": "76", "titulo": "(Cliente) Coordenador de Inteligência Comercial" },
        { "id": "36", "titulo": "(Cliente) Coordenador de Marketing" },
        { "id": "58", "titulo": "(Cliente) Coordenador de Pós" },
        { "id": "102", "titulo": "(Cliente) Coordenador de Secretarias" },
        { "id": "40", "titulo": "(Cliente) Coordenador Educacional" },
        { "id": "42", "titulo": "(Cliente) Coordenador Pedagógico" },
        { "id": "94", "titulo": "(Cliente) Coordenador Técnico" },
        { "id": "84", "titulo": "(Cliente) Coordenadora de admissão e relacionamento" },
        { "id": "80", "titulo": "(Cliente) Coordenadora Serviço Social" },
        { "id": "92", "titulo": "(Cliente) Departamento de Marketing" },
        { "id": "83", "titulo": "(Cliente) Departamento Financeiro" },
        { "id": "91", "titulo": "(Cliente) Departamento Fiscal" },
        { "id": "61", "titulo": "(Cliente) Desenvolvedor de Sistemas" },
        { "id": "59", "titulo": "(Cliente) Desenvolvedor Web" },
        { "id": "95", "titulo": "(Cliente) Desenvolvimento de Soluções" },
        { "id": "43", "titulo": "(Cliente) Diretor Administrativo" },
        { "id": "79", "titulo": "(Cliente) Diretor Comercial" },
        { "id": "62", "titulo": "(Cliente) Diretor de Crescimento e Receita" },
        { "id": "37", "titulo": "(Cliente) Diretor de Marketing" },
        { "id": "65", "titulo": "(Cliente) Diretor de Negócios" },
        { "id": "63", "titulo": "(Cliente) Diretor Financeiro" },
        { "id": "64", "titulo": "(Cliente) Diretor Geral" },
        { "id": "35", "titulo": "(Cliente) Diretor Técnico" },
        { "id": "77", "titulo": "(Cliente) Especialista Técnico" },
        { "id": "89", "titulo": "(Cliente) Financeiro" },
        { "id": "67", "titulo": "(Cliente) Gerente Comercial" },
        { "id": "68", "titulo": "(Cliente) Gerente de Desenvolvimento de Sistemas" },
        { "id": "24", "titulo": "(Cliente) Gerente de Marketing" },
        { "id": "97", "titulo": "(Cliente) Gerente de Operações" },
        { "id": "28", "titulo": "(Cliente) Gerente de Relacionamento" },
        { "id": "26", "titulo": "(Cliente) Gerente de Vendas" },
        { "id": "78", "titulo": "(Cliente) Gerente Financeiro" },
        { "id": "30", "titulo": "(Cliente) Gerente Técnico" },
        { "id": "38", "titulo": "(Cliente) Gestor Comercial" },
        { "id": "73", "titulo": "(Cliente) Gestor Controller" },
        { "id": "39", "titulo": "(Cliente) Gestor Técnico" },
        { "id": "99", "titulo": "(Cliente) Head de Growth e Marketing" },
        { "id": "23", "titulo": "(Cliente) Líder do projeto" },
        { "id": "69", "titulo": "(Cliente) Pró-reitoria" },
        { "id": "70", "titulo": "(Cliente) Procuradora institucional" },
        { "id": "72", "titulo": "(Cliente) Reitor" },
        { "id": "93", "titulo": "(Cliente) Responsável do Projeto" },
        { "id": "86", "titulo": "(Cliente) Responsável Jurídico" },
        { "id": "82", "titulo": "(Cliente) Responsável Legal" },
        { "id": "100", "titulo": "(Cliente) Secretaria" },
        { "id": "104", "titulo": "(Cliente) Supervisor Comercial" },
        { "id": "98", "titulo": "(Cliente) Supervisor de Relacionamento com o Aluno" },
        { "id": "71", "titulo": "(Cliente) Supervisor Geral" },
        { "id": "88", "titulo": "(Cliente) Suporte" },
        { "id": "2", "titulo": "(Cliente) Testemunha contratual" },
        { "id": "75", "titulo": "(Cliente) Vice-Presidente" },
        { "id": "74", "titulo": "(Cliente) Vice-Reitor" },
        { "id": "10", "titulo": "Não identificado" }
    ];

    // Busca os tipos de pessoa direto do CRM, assim tipos novos entram sozinhos na lista
    carregarTiposPessoaCRM();

    async function carregarTiposPessoaCRM() {
        try {
            const response = await fetch("https://crmrbacademy.apprubeus.com.br/api/Navegacao/Tela/123/2/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (!data || !data.dadosTiposPessoas || !data.dadosTiposPessoas.success || !Array.isArray(data.dadosTiposPessoas.dados)) {
                console.warn("Resposta inesperada ao buscar os tipos de pessoa no CRM. Usando lista fixa.", data);
                return;
            }

            const listaCRM = data.dadosTiposPessoas.dados
                .filter(function(item) {
                    const titulo = item.titulo || "";
                    return titulo.indexOf("(Cliente)") === 0 || titulo === "Não identificado";
                })
                .map(function(item) {
                    return { id: String(item.id), titulo: item.titulo };
                })
                .sort(function(a, b) {
                    return a.titulo.localeCompare(b.titulo, "pt-BR");
                });

            if (listaCRM.length > 0) {
                dadosTitulos = listaCRM;
                console.log("Tipos de pessoa carregados do CRM:", dadosTitulos.length);
            }
        }
        catch (erro) {
            console.warn("Não foi possível buscar os tipos de pessoa no CRM. Usando lista fixa.", erro);
        }
    }

    // usca robusta: localiza o campo se o ID ou NAME apenas "contiverem" o texto final do campo
    const intervaloBusca = setInterval(function() {
        const inputCampo = document.querySelector('input[id*="campopersonalizado_129_compl_cont"]') ||
                           document.querySelector('input[name*="campopersonalizado_129_compl_cont"]');

        if (inputCampo) {
            clearInterval(intervaloBusca);
            configurarAutocomplete(inputCampo);
        }
    }, 500);

    // Cria e vincula a lista de opções
    function configurarAutocomplete(inputElement) {
        const listaId = 'lista_compl_proc';

        if (document.getElementById(listaId)) return;

        const lista = document.createElement('div');
        lista.id = listaId;

        lista.style.cssText = `
            display:none;
            position:absolute;
            background:#fff;
            border:1px solid #ddd;
            border-radius:6px;
            max-height:240px;
            overflow-y:auto;
            z-index:9999;
            width:100%;
            box-shadow:0 4px 8px rgba(0,0,0,.12);
        `;

        inputElement.parentNode.style.position = "relative";
        inputElement.parentNode.appendChild(lista);

        function renderizarLista(valor) {
            lista.innerHTML = "";

            const texto = valor.trim().toLowerCase();

            if (texto.length < 2) {
                lista.style.display = "none";
                return;
            }

            const resultados = dadosTitulos
                .filter(item =>
                    item.titulo.toLowerCase().includes(texto)
                )
                .slice(0,30);

            if (!resultados.length) {
                lista.innerHTML = `
                    <div style="padding:10px;color:#777">
                        Nenhum resultado encontrado
                    </div>
                `;
                lista.style.display = "block";
                return;
            }

            resultados.forEach(item => {

                const opcao = document.createElement("div");
                opcao.textContent = item.titulo;

                opcao.style.cssText = `
                    padding:10px;
                    cursor:pointer;
                    border-bottom:1px solid #eee;
                `;

                opcao.addEventListener("mouseenter",function(){
                    this.style.background="#f5f5f5";
                });

                opcao.addEventListener("mouseleave",function(){
                    this.style.background="#fff";
                });

                opcao.addEventListener("mousedown",function(e){
                    e.preventDefault();

                    inputElement.value = item.titulo;

                    // ATUALIZA A VARIÁVEL COM O ID SELECIONADO
                    window.tipoPessoaSelecionada = item.id;

                    if(typeof inputElement.oninput==="function"){
                        inputElement.oninput();
                    }
                    if(typeof inputElement.onkeyup==="function"){
                        inputElement.onkeyup();
                    }

                    inputElement.dispatchEvent(new Event("input",{bubbles:true}));
                    inputElement.dispatchEvent(new KeyboardEvent("keyup",{bubbles:true}));
                    inputElement.dispatchEvent(new Event("change",{bubbles:true}));

                    lista.style.display="none";
                });

                lista.appendChild(opcao);
            });

            lista.style.display="block";
        }

        inputElement.addEventListener("input",function(){
            renderizarLista(this.value);
        });

        inputElement.addEventListener("focus",function(){
            renderizarLista(this.value);
        });

        inputElement.addEventListener("blur",function(){
            setTimeout(()=>{
                lista.style.display="none";
            },200);
        });
    }
})();

function enviarDadosPaginaPai(){
    console.log("Função de comportamento em popUp adicionada")
    try{
        if (window.opener && !window.opener.closed) {
            ActionsForm.customCallback(function () {
                setTimeout( async () => {
                    let dados = {
                        nome: document.querySelector('[name="pessoa.nome"]').value,
                        email: document.querySelector('[name="pessoa.emailPrincipal"]').value
                    };

                    // Chama a função da tela principal passando o objeto
                    window.opener.receberDados(dados);

                    // Vincula o contato
                    await vinculaPessoaRegistroSelecionado();

                    // Fecha o popup automaticamente
                    window.close();
                }, 200);
            });
        } else {
            console.warn("A tela principal foi fechada!");
        }
    }catch(erro){
        console.warn('Erro na função de enviar os dados pra página Pai: ', erro)
    }
}

async function vinculaPessoaRegistroSelecionado() {
    var { id: idContato } = RBTracking.getVisitor();

    objRegistro = window.dadosRecebidos.oportunidade;
    objPessoa = window.dadosRecebidos.contato;
    let eventoVinculaPessoa = 4114;

    url = `?token=${RBLib.CONFIGS.token}&origem=${RBLib.CONFIGS.origem}&tipo=${eventoVinculaPessoa}&pessoa[id]=${objPessoa.id}&pessoasSecundarias[0][id]=${idContato}&pessoasSecundarias[0][tipo]=${window.tipoPessoaSelecionada}&codCurso=${objRegistro.codCurso}&codOferta=${objRegistro.codOferta}&permitirPessoaRepetida=1`;

    let descricao = `<div>
        <b style="padding-top: 10px">Tipo Evento:</b> ${eventoVinculaPessoa}
        <br/>
        <b style="padding-top: 10px">Pessoa Principal Id:</b> ${objPessoa.id}
        <br/>
        <b style="padding-top: 10px">Pessoas Secundarias</b>
        <ul style="margin: 0; padding-inline-start: 20px; list-style: disc">
        <li><b style="padding-top: 10px">Id:</b> ${idContato} </li>
        <li><b style="padding-top: 10px">Tipo:</b> ${window.tipoPessoaSelecionada} </li>
        </ul>
        <b style="padding-top: 10px">Cod Curso:</b> ${objRegistro.codCurso}
        <br/>
        <b style="padding-top: 10px">Cod Oferta:</b> ${objRegistro.codOferta}
        <br/>
        <b style="padding-top: 10px">Permitir Pessoa Repetida: </b> Sim <br/>
    </div>`;

    return await RBLib.api.enviarEvento(url, {descricao: descricao}, ()=>{}, "local", true);
}

// Campo "RpR Tag": só existe a opção RpR, então ela é marcada automaticamente e o campo fica oculto
(function() {
    const TEXTO_CAMPO = /rpr\s*tag/i;
    const TEXTO_OPCAO = /rpr/i;
    let tentativas = 0;

    const intervaloTag = setInterval(function() {
        tentativas++;

        if (marcarEOcultarCampoTag() || tentativas > 60) {
            clearInterval(intervaloTag);

            if (tentativas > 60) {
                console.warn('Campo "RpR Tag" não encontrado no formulário.');
            }
        }
    }, 500);

    function encontrarContainerCampo() {
        const candidatos = document.querySelectorAll("label, legend, span, p, strong, b");

        for (let i = 0; i < candidatos.length; i++) {
            const elemento = candidatos[i];
            const texto = (elemento.textContent || "").trim();

            if (texto.length > 40 || !TEXTO_CAMPO.test(texto)) continue;

            let container = elemento.parentElement;

            for (let nivel = 0; container && nivel < 5; nivel++) {
                const campos = container.querySelectorAll("select, input:not([type=hidden])");

                if (campos.length > 0) {
                    const nomes = new Set(Array.from(campos).map(function(campo) {
                        return campo.name || campo.id;
                    }));

                    // Se o container já pega mais de um campo, não é o bloco só do RpR Tag
                    return nomes.size === 1 ? container : null;
                }

                container = container.parentElement;
            }
        }

        return null;
    }

    function textoDaOpcao(input) {
        const label = (input.id && document.querySelector('label[for="' + input.id + '"]')) || input.closest("label");
        return (label ? label.textContent : "") + " " + (input.value || "");
    }

    function marcarEOcultarCampoTag() {
        const container = encontrarContainerCampo();
        if (!container) return false;

        let marcou = false;

        const select = container.querySelector("select");

        if (select) {
            const opcoes = Array.from(select.options).filter(function(opcao) {
                return opcao.value !== "";
            });

            const opcaoRpR = opcoes.find(function(opcao) {
                return TEXTO_OPCAO.test(opcao.textContent) || TEXTO_OPCAO.test(opcao.value);
            }) || (opcoes.length === 1 ? opcoes[0] : null);

            if (opcaoRpR) {
                opcaoRpR.selected = true;
                select.dispatchEvent(new Event("input", { bubbles: true }));
                select.dispatchEvent(new Event("change", { bubbles: true }));
                marcou = true;
            }
        }
        else {
            const opcoes = Array.from(container.querySelectorAll('input[type="checkbox"], input[type="radio"]'));

            const opcaoRpR = opcoes.find(function(input) {
                return TEXTO_OPCAO.test(textoDaOpcao(input));
            }) || (opcoes.length === 1 ? opcoes[0] : null);

            if (opcaoRpR) {
                if (!opcaoRpR.checked) opcaoRpR.click();
                if (!opcaoRpR.checked) opcaoRpR.checked = true;
                opcaoRpR.dispatchEvent(new Event("change", { bubbles: true }));
                marcou = true;
            }
        }

        if (!marcou) {
            console.warn('Campo "RpR Tag" encontrado, mas a opção RpR não foi localizada.', container);
            return true;
        }

        container.style.display = "none";
        console.log('Campo "RpR Tag" marcado com RpR e ocultado.');
        return true;
    }
})();
