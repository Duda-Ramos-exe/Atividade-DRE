function calcularDRE() {
    // FUNÇÃO AUXILIAR PARA CALCULAR A SOMA DE UMA CLASSE DE ELEMENTOS
    const somarPorClasse = (className) => {
        let total = 0;
        // Seleciona todos os inputs com a classe especificada
        const elementos = document.querySelectorAll(`.${className} input[type="number"]`);
        
        elementos.forEach(input => {
            // Pega o valor, converte para número e soma
            const valor = parseFloat(input.value) || 0;
            total += valor;
        });
        return total;
    };
    
    // FUNÇÃO AUXILIAR PARA OBTER VALOR DE UM ÚNICO ID
    const getValorId = (id) => {
        const input = document.getElementById(id);
        // Se o input não existir, retorna 0 para evitar erros
        if (!input) {
            console.error("Erro: Elemento com ID não encontrado: ", id);
            return 0;
        }
        return Math.abs(parseFloat(input.value) || 0);
    };

    // 1. OBTER VALORES DE ENTRADA E SOMAS
    const receitaBruta = getValorId('receitaBruta');
    
    // Somas por Classe
    const deducoesTotais = somarPorClasse('deducao-item');
    const custos = getValorId('custos');
    const despesasOperacionaisTotais = somarPorClasse('despesa-operacional-item');
    const despesasNaoOperacionais = getValorId('despesasNaoOperacionais');

    // 2. REALIZAR OS CÁLCULOS DA DRE

    // ROL = Receita Bruta - Deduções Totais
    const rol = receitaBruta - deducoesTotais;

    // Lucro Bruto = ROL - Custos
    const lucroBruto = rol - custos;
    
    // Lucro Operacional = Lucro Bruto - Despesas Operacionais Totais
    const lucroOperacional = lucroBruto - despesasOperacionaisTotais;

    // LAIR (Lucro Antes do Imposto de Renda) = Lucro Operacional - Despesas Não Operacionais
    const lair = lucroOperacional - despesasNaoOperacionais;
    
    // Lucro Depois do Imposto = LAIR - Impostos/Contribuições
    const contribuicaoSocial = getValorId('contribuicaoSocial');
    const impostoRenda = getValorId('impostoRenda');
    const impostosEContribuicoes = contribuicaoSocial + impostoRenda;

    const lucroPosImposto = lair - impostosEContribuicoes;

    // Lucro Líquido = Lucro Depois do Imposto - Participações
    const participacaoAdm = getValorId('participacaoAdm');
    const participacaoEmp = getValorId('participacaoEmp');
    const participacoes = participacaoAdm + participacaoEmp;

    const lucroLiquido = lucroPosImposto - participacoes;


    // 3. ATUALIZAR A TABELA COM OS RESULTADOS

    // Função auxiliar para formatar o número com duas casas decimais
    const formatar = (numero) => numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Função auxiliar para atualizar o texto do SPAN
    const atualizarResultado = (id, valor) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = formatar(valor);
        } else {
            console.error("Erro: Span de resultado não encontrado: ", id);
        }
    };
    
    atualizarResultado('resultadoROL', rol);
    atualizarResultado('resultadoLucroBruto', lucroBruto);
    atualizarResultado('resultadoLucroOperacional', lucroOperacional);
    atualizarResultado('resultadoLAIR', lair);
    atualizarResultado('resultadoLucroPosImposto', lucroPosImposto);
    atualizarResultado('resultadoLucroLiquido', lucroLiquido);
}

// Inicializa o cálculo ao carregar a página
window.onload = calcularDRE;