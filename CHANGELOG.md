# Histórico de versões — Calculadora de Propostas IBFT

Registro do que mudou em cada versão da ferramenta. A versão em produção aparece no rodapé da própria calculadora (tela **"Novidades"**). Cada versão publicada tem uma **tag** correspondente neste repositório.

> Os números de versão são criados no Cowork. Algumas versões foram publicadas no GitHub em lote, então uma tag pode reunir versões intermediárias — indicado abaixo com *(inclui …)*.

## v28 — out/2026
- **Centavos e cronograma:** as parcelas do acordo são calculadas em centavos inteiros e a última absorve a diferença, então a soma sempre fecha com o total (antes, 6x de R$ 389,10 somavam R$ 0,02 a mais que R$ 2.334,58). O reparcelamento mostra a 1ª parcela, o dia das demais (de/até) e o valor da última quando difere. Grade de parcelas e resumo usam o mesmo cálculo.
- **Personalização:** campos "Nome do aluno" (colar o nome completo do Kommo deixa só o primeiro nome) e "Seu nome" (salvo no navegador, chave `ibft_atendente`). A proposta abre com "Oi, Maria! Aqui é Aretha, do Financeiro do IBFT.". O nome entra no histórico e na busca.
- **Texto:** "já com multa e juros até dd/mm" (ancoragem), "Descontos que apliquei para você" (reciprocidade), economia com o percentual primeiro, CTA por último com "É só responder SIM" (compromisso), prazo de 5 dias úteis para retirar a negativação na quitação com negativadas, aviso de último reparcelamento no 2º reparcelamento. A frase da extensão de acesso não promete mais o certificado.
- **Produto com busca:** combobox (o `select#produto` continua oculto) com busca sem acento e por partes, chip do tipo de acesso e grupo "Mais negociados por você" (histórico do navegador, últimos 90 dias).
- **Tipo de acesso em botões** (o `select#tipoAcesso` continua oculto), com "Automático pelo produto" / "Alterado manualmente · Voltar ao padrão".
- **Backup do histórico:** Exportar (JSON) e Importar (junta sem duplicar, valida o arquivo).
- **Aviso de nova versão:** a versão fica em `<meta name="versao">`; a página publicada é consultada a cada 15 min e ao voltar para a aba. O botão "Atualizar" recarrega mantendo a proposta da tela.
- Regras: limite de 2 reparcelamentos por dívida de cada produto e prazo de retirada da negativação.
- **Nenhuma regra de cálculo mudou:** as funções de cálculo são idênticas às da v27 e os 11 cenários de regressão dão os mesmos totais.

## v27 — out/2026
- **Refino visual e de UX.** Novo sistema de tokens de cor (o modo escuro passou a ser só troca de tokens, sem overrides `!important`), sombras em camadas, fundo com luzes e textura sutis, tipografia com títulos de seção em caixa normal e total do resumo a 28px.
- **Fio dourado = barra de progresso.** O fio laranja na base do header (padrão IBFT) mostra o progresso da proposta; ao rolar, uma barra fixa desce do topo com o que falta e o botão "Copiar proposta".
- **Controles:** tipo de proposta em controle segmentado (o `select` original continua existindo, oculto), opções em interruptores, afixos "R$", "%" e "dias" dentro dos campos, hierarquia de botões consistente, seções que recolhem com animação e status "Pronta" / "Falta preencher".
- **Prévia estilo WhatsApp** (fundo de conversa, balão enviado, "agora ✓✓").
- **Toasts no lugar de `alert`/`confirm`:** "Limpar" e "Nova proposta" limpam na hora e oferecem **Desfazer**; copiar com algo faltando rola até o campo, abre a seção e foca; fallback de área de transferência com mensagem de erro.
- **Histórico** com data e hora, busca por data e estado vazio. **Diálogos** acessíveis (Esc fecha, foco entra e volta, rolagem travada). Tema inicial segue o do computador.
- Texto das **Regras** corrigido (quitação parcial pode retirar os juros das atrasadas); "Como usar" reescrito.
- **Nenhuma regra de cálculo nem texto de proposta mudou:** as funções de cálculo/texto são idênticas byte a byte às da v26 e 11 cenários geram o mesmo texto nas duas versões.

## v26 — out/2026
- **Correção: ONION com multa e juros.** Foi confirmado que o ONION também tem encargos (só não estavam configurados na cobrança). Agora ele usa **multa de 2% e juros de 2%/mês**, igual aos demais produtos.
- Removida a regra "sem encargos" (flag `semEnc`, `multaRate`, textos e orientações "sem multa e sem juros"). Para o ONION voltam o desconto nos juros, a retirada de juros/multa na quitação e as orientações padrão.
- **Continua:** texto próprio de aplicativo e a regra de não misturar o ONION com cursos do IBFT na mesma proposta (agora baseada na flag `app`, porque é outra empresa).

## v25 — out/2026
- **Novo produto: ONION - O Novo Inconsciente (aplicativo)** — produto digital da ONION - O Novo Inconsciente LTDA (empresa própria, CNPJ diferente do IBFT), acesso de 12 meses.
- **Sem encargos para o ONION:** parcelas em atraso entram pelo valor original (multa e juros = 0). Implementado em um único ponto (`jurosRate`/`multaRate` consultam a flag `semEnc` do produto) — tabela, resumo, quitação e gráfico herdam automaticamente.
- **Texto próprio de aplicativo:** "seu aplicativo ONION", "acesso ao aplicativo" (em vez de plataforma de aulas/formação/certificado), destaque de que o atraso não tem multa nem juros e sem o bloco de regras de produtos IBFT/CITRG.
- **Interface:** aviso sob o produto; somem os controles que não se aplicam (desconto nos juros, retirar juros/multa, isenção de juros da negativada); orientações de quitação próprias; seção ONION no painel Regras.
- O ONION **não se combina** com cursos do IBFT na mesma proposta (fica fora da lista de produtos adicionais).
- Demais produtos: nenhuma regra de cálculo mudou.

## v24 — ago/2026
- **Correção do modo escuro:** os menus de seleção (tipo de proposta, produto, tipo de acesso e o seletor de zoom no cabeçalho) exibiam um padrão repetido de setas por cima do texto. Causa: a regra `body.dark ... {background:...}` usava o atalho `background`, que zerava `background-repeat`/`background-position`. Corrigido para `background-color` + reforço do `no-repeat`/posição.
- **Reforço de segurança:** escape (`escAtr`) dos valores interpolados nos campos gerados da tabela de parcelas (defesa em profundidade contra injeção via atributo).
- Nenhuma regra de cálculo mudou.

## v23 — jul/2026
- **Redesenho visual completo.** Novas fontes (Inter + Space Grotesk), tipografia e espaçamentos revistos, menus de seleção com estilo próprio, botões com mais destaque (o **Copiar** em dourado da marca), contraste reforçado, animações discretas (entrada das seções, micro-interações, overlays) e layout responsivo para telas menores.
- Nenhuma regra de cálculo mudou.

## v22 — jul/2026
- Correção: no **reparcelamento com desconto nos juros**, quando havia só parcelas em atraso (um único grupo), o valor total aparecia duplicado. Agora mostra uma linha só, igual à quitação.

## v21 — jul/2026
- A abertura **"condição especial"** na quitação agora só aparece quando há realmente algum desconto/isenção aplicado.
- O **valor da parcela a vencer** é preenchido automaticamente com o valor da parcela em atraso (só editar se for diferente).
- O **histórico** passou a guardar **todas** as propostas (não só 150).
- Mais uma rodada de **refinamento visual** (scrollbars, cabeçalhos de seção, tabelas, seleção de parcelas, overlays e micro-interações).

## v20 — jul/2026 *(inclui v19)*
- **v19:** cada seção ganhou um **"🧹 limpar"** no título, para zerar só aquela seção.
- **v20:** **visual premium** repaginado (tipografia, sombras, botões, cores, resumo). **Reparcelamento com desconto nos juros** mostra o valor cheio → descontos → valor final. **Quitação parcial** pode retirar os juros das atrasadas; sem isenção, a abertura fica neutra. **Quitação total:** fim da repetição do valor total quando há só um tipo de parcela.

## v18 — jul/2026
- **Correção na edição manual da data** das parcelas em atraso: antes só aceitava o primeiro dígito porque o campo era recriado a cada tecla. Agora dá para digitar a data inteira.

## v17 — jun/2026
- **Correção nos vencimentos:** quando o vencimento é dia 31 (ou o último dia do mês), as parcelas seguintes caem no último dia de cada mês (31/03 → 30/04 → 31/05 → 30/06). Vale para todos os tipos de proposta e para o cálculo de expiração do acesso.
- Novo produto: **"BF - Formação Avançada em Master Terapeuta + Formação em Leitura Corporal e Comportamental"** (vitalício).

## v16 — jun/2026 *(inclui v14 e v15)*
- **v14:** 2º reparcelamento explica o passo do **formulário → contrato de confissão de dívida → assinatura → boleto**; quitação parcial aparece como **"simulação de Quitação parcial"**; histórico guarda as últimas 150 propostas; visual mais suave; primeira tela de novidades.
- **v15:** seções **recolhem/expandem** ao clicar no título; barra de progresso diz **o que ainda falta**; **tooltips de ajuda** em cada campo; **contador de propostas do dia**.
- **v16:** botão **"📏 Regras"** com resumo da política; seletor de **zoom** (100% a 200%); **modo escuro com contraste corrigido**.

## v13 — jun/2026
- Removidos linha do tempo, modo comparativo e cálculo por mês (não agregavam).
- Ícones nas seções, validação de coerência (avisos em âmbar) e barra de pesquisa do histórico.

## v12 — jun/2026 *(inclui v11)*
- **v11:** novo produto no catálogo; histórico sem duplicatas; desconto adicional sobre o total na quitação; proposta de quitação reformulada (composição → valor atual → descontos → valor final).
- **v12:** texto mais persuasivo — abertura adaptável, % de economia em destaque, chamada final (CTA) e frase anti-confusão sobre parcelas.

## v9–v10 — jun/2026
- Base validada contra o **Asaas**: cálculo de juros/multa (com truncamento de centavos), quitação parcial sem desconto, multi-produto, desconto nos juros, acesso & extensão, edição manual da proposta, pré-visualização estilo WhatsApp, tema escuro e painel "Como usar".

## Versões anteriores
- Primeiras versões da calculadora, antes do registro de versões numeradas: fundação do cálculo de encargos, geração de parcelas e texto da proposta.
