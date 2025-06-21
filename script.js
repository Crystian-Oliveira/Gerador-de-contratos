
function preencherCampos() {
  const texto = document.getElementById('inputTexto').value;

  const regexps = {
    nome: /se chama ([\w\s]+),/i,
    estadoCivil: /, (solteira|casada|divorciada|viúva|solteiro|casado|divorciado|viúvo),/i,
    profissao: /, (\w+), CPF/i,
    cpf: /CPF (\d{3}\.\d{3}\.\d{3}-\d{2})/i,
    rg: /RG (\d+)/i,
    endereco: /mora na ([^\.]+)\./i,
    dataEvento: /Casamento.*?dia (\d{2}\/\d{2}\/\d{4})/i,
    pacote: /pacote ([\w]+)/i,
    cobertura: /\((.*?)\)/,
    valorTotal: /Pagará R\$(\d+[\.,]?\d{0,2})/i,
    entrada: /entrada de R\$(\d+[\.,]?\d{0,2})/i,
    parcelas: /(\d+)x de R\$/i,
    valorParcela: /x de R\$(\d+[\.,]?\d{0,2})/i,
    formaPagamento: /por (\w+)/i
  };

  for (let campo in regexps) {
    const match = texto.match(regexps[campo]);
    if (match) {
      document.getElementById(campo).value = match[1];
    }
  }
}

function gerarContrato() {
  const dados = {
    nome: v('nome'), estadoCivil: v('estadoCivil'), profissao: v('profissao'),
    rg: v('rg'), cpf: v('cpf'), endereco: v('endereco'), telefone: v('telefone'), email: v('email'),
    dataEvento: v('dataEvento'), pacote: v('pacote'), cobertura: v('cobertura'),
    valorTotal: v('valorTotal'), entrada: v('entrada'), parcelas: v('parcelas'),
    valorParcela: v('valorParcela'), formaPagamento: v('formaPagamento')
  };

  const contrato = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS

CONTRATANTE: ${dados.nome}, brasileiro(a), ${dados.estadoCivil}, ${dados.profissao},
portador do RG nº ${dados.rg}, inscrito no CPF sob nº ${dados.cpf}, residente à ${dados.endereco}.
Contato: ${dados.telefone || '[telefone]'} / ${dados.email || '[email]'}

CLÁUSULA PRIMEIRA – DO OBJETO DO CONTRATO:
Prestação de serviços fotográficos para o casamento em ${dados.dataEvento}, com pacote "${dados.pacote}" incluindo: ${dados.cobertura}.

CLÁUSULA SEGUNDA – DO VALOR E FORMA DE PAGAMENTO:
Valor total: R$${dados.valorTotal}
Entrada: R$${dados.entrada}
Parcelamento: ${dados.parcelas}x de R$${dados.valorParcela}
Forma de pagamento: ${dados.formaPagamento}

(Cláusulas restantes permanecem conforme contrato original.)`;

  document.getElementById('contrato').textContent = contrato;
}

function baixarPDF() {
  const element = document.getElementById('contrato');
  html2pdf().from(element).save('contrato-casamento.pdf');
}

function v(id) {
  return document.getElementById(id).value || '';
}
