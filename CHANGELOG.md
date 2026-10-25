# Histórico de versões — Calculadora de Propostas IBFT

Registro do que mudou em cada versão da ferramenta. A versão em produção aparece no rodapé da própria calculadora (tela **"Novidades"**). Cada versão publicada tem uma **tag** correspondente neste repositório.

> Os números de versão são criados no Cowork. Algumas versões foram publicadas no GitHub em lote, então uma tag pode reunir versões intermediárias — indicado abaixo com *(inclui …)*.

## v39 — out/2026
- **Busca rápida (Ctrl+K):** caixa central que acha ações (nova proposta, tipo, copiar, tema, regras, exportar…), produtos e propostas do histórico (nome, produto, valor), com as letras que batem destacadas, setas e Enter. Novos atalhos: Ctrl+P (produto), Ctrl+E (editar texto), Ctrl+H (propostas de hoje); os de Alt continuam.
- **Campo ligado ao texto:** a prévia passa a ser desenhada linha a linha; o campo em uso acende a linha que ele muda (`linhasDoGrupo`) e a coluna da direita rola até ela. Teste automático confere que cada campo acha a sua linha.
- **Cor por tipo:** `<html data-tipo>` troca `--tipo` (azul 1º reparc., âmbar 2º, verde quitação) com transição; vale para o fio do topo, a barra do resumo e a etiqueta no botão de copiar.
- **Dicas próprias** nos "i" e nos botões do topo (balão no visual da calculadora, também por teclado).
- **Movimento:** destaque deslizante na grade de parcelas; linhas do resumo entram e saem deslizando; avisos com linha de tempo (pausa com o mouse) e arrastar para dispensar; topo que encolhe ao rolar (desktop); seção com foco em destaque; troca de tema em círculo a partir do botão (View Transitions).
- **Parcelas:** botões − e + nas quantidades (segurar repete, número rola); tabela com títulos fixos, linha nova em destaque com foco no valor, apagar com Desfazer.
- Respeita "reduzir movimento". Nenhuma regra de cálculo nem de texto mudou (73 cenários idênticos).

## v38 — out/2026
- **Propostas de hoje:** o contador do topo virou botão e abre um painel lateral com as propostas copiadas hoje (hora, aluno, tipo, produto, valor e forma), total negociado, quantidade por tipo e gráfico dos últimos 7 dias. "Abrir" recupera a proposta e "Copiar texto" copia de novo o texto exatamente como foi enviado (o histórico passa a guardar o texto copiado, o total e a forma).
- **Contador corrigido:** passa a contar propostas diferentes copiadas hoje, tiradas do histórico (`_cts`), só depois que a cópia deu certo; "Nova proposta" não apaga a marca de copiada; vira o dia sozinho à meia-noite. Itens de versões antigas contam pela data em que foram salvos.
- **Proposta com vencimento vencido:** aviso no resumo com "Usar hoje" (no 2º reparcelamento, "Usar amanhã"), que atualiza a data e recalcula. Parcelas a vencer que venceram antes da nova data passam para "em atraso" (mensais depois da última em atraso, ou a partir do "Venc. da 1ª a vencer"), a quantidade a vencer diminui e a próxima data avança. Com Desfazer.
- **Histórico:** recuperar uma proposta tem Desfazer; o filtro acha valores sem formatação ("1234" → R$ 1.234,00); o espelhamento do valor a vencer volta certo depois de recuperar.
- **Visual:** blocos condicionais deslizam (altura e opacidade) ao aparecer e sumir; número da seção vira ✓ quando ela fica pronta; ✓ do "Copiado" e dos avisos se desenha; lua/sol giram; resumo e proposta com mais elevação e total com fundo dourado leve; composição com paleta validada para daltonismo nos dois temas; hora real na prévia; "digitando…" no estado vazio; saudação no topo; aviso "Novidades" uma vez por versão.
- **Agilidade:** atalhos Hoje · Amanhã · +7 dias no vencimento e +30 · +60 · +90 dias na extensão; setas na grade de parcelas.
- **Código:** um só seletor de produto (principal e adicionais), código morto removido.
- **Teste automático:** novos testes do "Usar hoje" (1º e 2º reparcelamento, sem a vencer) e do contador do dia. Os 73 cenários continuam idênticos.

## v37 — out/2026
- **Logo interativa:** a logo do cabeçalho virou um botão. Ao passar o mouse, um brilho dourado atravessa só o desenho da logo (a própria imagem é a máscara) e ela sobe de leve. Clicar recarrega a calculadora mantendo a proposta da tela (mesmo mecanismo do "Atualizar"), com o aviso "Calculadora recarregada. Sua proposta foi mantida.". A logo entra com animação suave ao abrir e brilha ao copiar uma proposta.
- **"Nova proposta" volta ao topo:** as duas colunas (ou a página, no celular) sobem na hora, a seção 1 abre se estiver recolhida e o cursor vai para o nome do aluno. Vale também para Alt+N.
- Tudo respeita "reduzir movimento". Nenhuma regra de cálculo nem de texto mudou (73 cenários idênticos).

## v36 — out/2026
- **Proposta com duas opções (1º e 2º reparcelamento):** interruptor "Oferecer também a quitação à vista com desconto" no resumo financeiro. A mensagem traz "Como está hoje" (com o total), "Escolha a melhor opção pra você", 1️⃣ quitar à vista (pagamento único na mesma data, descontos item a item e economia) e 2️⃣ parcelar (datas, total e, no 2º reparcelamento, o formulário e o contrato), formas de pagamento, acesso, regras ("se escolher parcelar"), validade das duas opções e "É só responder 1 ou 2".
- **Desconto da opção 1:** a seção 4 vira "Desconto da opção 1 (quitação à vista)", com o padrão sem os juros do atraso e 10% nas parcelas a vencer (aplicado quando a seção está zerada). A conta reaproveita a da quitação total (`quitModel(true)`); a opção 2 é o parcelamento, com o desconto nos juros do reparcelamento, se houver.
- **Depois da resposta:** botões "Aluno escolheu 1 · gerar quitação" (mesma data e mesmo desconto, sem voltar a data ao padrão) e "Aluno escolheu 2 · gerar parcelamento", com Desfazer.
- **Avisos na tela:** opção 1 que não fica mais barata e diferença pequena entre as opções (menos de 3%). Resumo financeiro mostra a opção 1; histórico guarda o interruptor.
- **Aviso de negativação:** interruptor "Há parcela negativada nesta dívida" (reparcelamento e quitação). Só muda o texto: no reparcelamento, "assim que o pagamento da 1ª parcela for identificado, pedimos a retirada da restrição… até 5 dias úteis"; com duas opções, vale para as duas; na quitação, o mesmo aviso de sempre. Nenhum valor muda (as negativadas seguem como parcelas em atraso, com multa e juros). Regras atualizadas.
- **Teste automático:** 73 cenários (23 de duas opções e 5 do aviso de negativação) e conferência de que "escolheu 1/2" gera exatamente o valor e a data oferecidos. Os 45 cenários anteriores continuam idênticos.

## v35 — out/2026
- **Quitação parcial com mais de um produto:** a tabela de parcelas ganha a coluna "Produto" (aparece só quando a quitação parcial tem 2+ produtos). Cada parcela vem no produto principal e pode ser trocada para outro; ao mexer no gerador de parcelas, o produto escolhido em cada linha é mantido. A proposta separa "Como está hoje" por produto, com a data de cada parcela ("Parcela de 02/10", "3 parcelas (25/07, 25/08 e 25/09)", "4 parcelas (desde 20/06)"), e uma linha "Valores já com multa e juros até dd/mm". Aviso na tela se um produto da proposta ficar sem parcela.
- **Seletor dos produtos adicionais** igual ao do produto principal (busca sem acento, "Mais negociados", chip do tipo de acesso, teclado e mouse); não oferece o principal, os já escolhidos nem o aplicativo ONION. Ao adicionar um produto, a busca já abre.
- **Quitação parcial de um produto:** com 2 ou 3 parcelas, mostra as datas ("30/07 e 28/09") em vez de "desde".
- **Teste automático:** 45 cenários (4 novos de quitação parcial). Nenhuma regra de cálculo mudou: os totais de todos os cenários são os mesmos da v34; só mudaram os textos de quitação parcial.

## v34 — out/2026
- **Teclado e modo rápido:** Enter leva ao próximo campo essencial (nome → produto → tipo → parcelas em atraso → acesso → vencimento → copiar); Enter na busca de produto escolhe e segue para o tipo. Ctrl+Enter copia de qualquer campo, Alt+1/2/3 escolhe o tipo de proposta, Alt+P abre a busca de produto. Dica de atalhos embaixo do botão de copiar; atalhos atualizados no "Como usar". O "Limpar" das seções saiu do Tab.
- **Números animados:** total, valor da parcela e total da barra de copiar "rolam" até o novo valor (420 ms); o total continua piscando de leve quando muda.
- **Prévia viva:** linhas que mudaram ficam destacadas em dourado por ~1,5 s; o balão entra com animação curta quando a proposta aparece.
- **Seção recolhida com resumo de uma linha** (ex.: "Maria · TRG · 1º Reparc.", "3 em atraso · desde 05/07 · R$ 1.350,00 original", "expira em 22/03/2027 · +30 dias").
- **Estado vazio e erros:** sem proposta, o topo da coluna direita mostra uma ilustração e os 3 passos (cada um leva ao campo; o resumo zerado fica escondido). Ao tentar copiar com algo faltando, o campo treme, fica com borda vermelha e ganha uma frase dizendo o que fazer; o aviso some quando o problema é resolvido.
- **Ao copiar:** confete discreto saindo do botão e o contador do dia pulsa.
- Tudo respeita "reduzir movimento" do sistema. **Nenhuma regra de cálculo nem de texto mudou:** os 41 cenários do teste automático dão os mesmos totais, resumos, textos e avisos da v33 (o teste passou a conferir o resumo financeiro).

## v33 — out/2026
- **Novo produto:** Formação em Psicossomática (12 meses, mesmas regras dos cursos do IBFT), no fim da lista de produtos (o histórico guarda a posição, então nada antigo muda), com frase de objetivo "concluir sua formação em psicossomática". Entra sozinho no "Mais negociados" conforme o uso.
- **Teste automático:** 41 cenários (novo cenário da Psicossomática). Nenhuma regra de cálculo ou de texto mudou.

## v32 — out/2026
- **Aviso de vencimento em fim de semana ou feriado:** se a data de vencimento cair em sábado, domingo ou feriado bancário (nacionais, Carnaval, Sexta-feira Santa e Corpus Christi), aparece um aviso no resumo com o próximo dia útil e o botão "Usar dd/mm", que troca a data e recalcula os valores. É só um alerta: o texto da proposta não muda e nada bloqueia a cópia.
- **Teste automático:** 3 cenários novos (sábado, feriado, dia útil) e o aviso da tela passou a ser conferido.
- **Nenhuma regra de cálculo nem de texto mudou:** os 33 cenários anteriores dão os mesmos totais, resumos e textos da v31.
- **2º reparcelamento vence amanhã:** o vencimento padrão passou de hoje + 7 dias para amanhã. A proposta diz "1ª parcela: vencimento para amanhã, dia dd/mm"; se a data for mudada à mão, o texto acompanha ("vencimento para hoje, dia …" ou "vencimento em dd/mm/aaaa"). No 1º reparcelamento e na quitação, "amanhã" também aparece quando a data é amanhã. A validade ("valem para pagamento até amanhã, dd/mm") acompanha.
- **Importar histórico:** se o navegador ficar sem espaço, o aviso informa quantas propostas antigas ficaram de fora (antes a falha era silenciosa). Exportar e Importar testados: ida e volta, duplicadas, arquivos inválidos, mistos e 400 propostas.
- **Teste automático:** 40 cenários (4 novos de vencimento).

## v31 — out/2026
- **Vencimento com o nome certo:** o campo de data passa a se chamar "Vencimento da quitação" na quitação total e "Vencimento do pagamento" na quitação parcial (no reparcelamento continua "Vencimento da 1ª parcela do acordo"). Os avisos de "falta preencher", a barra de progresso e a checagem antes de copiar usam o mesmo nome.
- **Botão "Nova proposta"** com o azul-marinho do IBFT (degradê navy, texto branco), no tema claro e no escuro.
- **Nenhuma regra de cálculo mudou** (só a mensagem de "falta" em `atualizarSaida`).
- **Rolagem em área de trabalho (desktop ≥ 941px de largura e ≥ 560px de altura):** o cabeçalho fica fixo e cada coluna rola sozinha, lado a lado (sem rolagem dentro de rolagem). A altura das colunas acompanha a janela e o zoom. As bordas de cima e de baixo das colunas esmaecem quando há conteúdo escondido.
- **Barra de copiar** no pé da coluna direita, com total e forma de pagamento, aparece quando o botão "Copiar proposta" sai de vista (e só quando há valores).
- **Histórico com rolagem própria:** a lista mostra 5 propostas por vez (altura medida pelos próprios itens) e as demais ficam na rolagem da lista, com esmaecimento nas bordas; ao chegar ao fim da lista, a rolagem continua na coluna. O rodapé passou para o fim da coluna direita.
- No celular e em telas estreitas, continua uma coluna com a página rolando.

## v30 — out/2026
- **Proposta no formato do modelo (pacote de melhorias):** blocos "Como está hoje" (ou "Como fica em dd/mm" com pagamento futuro), "Desconto(s) que apliquei para você", "Sua proposta" (parcelas, datas, total, formas de pagamento), "Seu acesso" (dias restantes, liberação, extensão), regras do reparcelamento em uma linha, validade ("valores valem para pagamento até dd/mm") e pergunta final "É só responder SIM". Sem CNPJ.
- **Centavos:** o aviso da última parcela saiu do texto do aluno; continua no resumo da tela.
- **Acesso:** expirado sem extensão diz a data de encerramento e que o acordo não altera o prazo; expirado com extensão (ou expirando antes do vencimento) conta os dias a partir do pagamento e não promete liberação automática; aviso de coerência na tela quando o acesso expira antes do vencimento. Quitação só de parcelas a vencer não fala em "liberação".
- **Outros:** quitação parcial avisa que as demais parcelas seguem; livro usa "compra do livro"; 1º reparcelamento (até 11x) ganhou "Se a parcela não couber no seu mês, me fala que eu vejo outra opção com você".
- **Seletor de produto:** o destaque acompanha o mouse; o produto escolhido tem barra azul à esquerda.
- **Nenhuma regra de cálculo mudou:** 33 cenários com totais e resumo idênticos aos da v29.

## v29 — out/2026
- **Abertura adequada ao meio da conversa:** a proposta não começa mais com "Oi, Maria! Aqui é…", porque é enviada depois de conversar com o aluno. O nome entra na primeira frase ("Maria, preparei uma condição especial…"; na quitação sem desconto, "Maria, sua simulação…"). O campo "Seu nome" foi removido.
- **Frase de objetivo por produto:** novo atributo `obj` em `PRODUTOS` (nomes, acessos e ordem inalterados). A abertura passa a ser "…regularizar e voltar a focar no que importa: concluir sua formação e começar a atender." (ONION: "…regularizar e continuar usando o ONION no seu dia a dia."). Livro, acesso expirado sem extensão e quitação parcial mantêm a abertura neutra.
- **Nenhuma regra de cálculo mudou:** os 11 cenários de regressão dão os mesmos totais da v27/v28.

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
