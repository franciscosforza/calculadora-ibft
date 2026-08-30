# Histórico de versões — Calculadora de Propostas IBFT

Registro do que mudou em cada versão da ferramenta. A versão em produção aparece no rodapé da própria calculadora (tela **"Novidades"**). Cada versão publicada tem uma **tag** correspondente neste repositório.

> Os números de versão são criados no Cowork. Algumas versões foram publicadas no GitHub em lote, então uma tag pode reunir versões intermediárias — indicado abaixo com *(inclui …)*.

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
