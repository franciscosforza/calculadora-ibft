# Calculadora de Propostas — Financeiro IBFT

Ferramenta interna do Financeiro IBFT para montar **propostas de reparcelamento e quitação** de forma rápida e padronizada, prontas para copiar e colar no Kommo.

## 🔗 Acesso

A calculadora fica disponível em:

**https://franciscosforza.github.io/calculadora-ibft/**

É só abrir o link no navegador — não precisa instalar nada. Recomenda-se salvar nos favoritos.

## ✨ O que ela faz

- **Tipos de proposta:** 1º Reparcelamento, 2º Reparcelamento e Quitação (total ou parcial).
- **Cálculo automático de encargos:** multa de 2% + juros de 2% ao mês (pró-rata por dia corrido), idêntico ao Asaas — inclusive o truncamento de centavos.
- **Geração de parcelas:** informa quantidade, vencimento da mais antiga e valor; as parcelas mensais aparecem automaticamente e ficam editáveis.
- **Atualização para a data de pagamento:** ao escolher a data de vencimento da 1ª parcela, os valores em atraso são recalculados até essa data.
- **Descontos da quitação:** isenção de juros/multa, desconto nas parcelas a vencer (até 10%) e na dívida negativada (piso de R$ 500), conforme o cenário.
- **Desconto nos juros** no reparcelamento, para negociar dívidas antigas.
- **Acesso e extensão:** calcula a expiração (liberação + 12 meses) e a extensão concedida.
- **Proposta pronta:** texto formatado para o Kommo, com pré-visualização (como o aluno vê), edição manual e botão de copiar.

## 🆘 Como usar

Há um botão **"❓ Como usar"** no topo da própria ferramenta, com instruções de cada seção.

## 🔄 Atualizações

Qualquer ajuste é publicado substituindo o arquivo `index.html` neste repositório. Em cerca de 1 minuto, todos os atendentes passam a usar a versão nova — basta recarregar a página (na primeira vez, Ctrl+F5).

## ⚠️ Observações

- A ferramenta roda inteiramente no navegador de cada pessoa; não há servidor nem dados compartilhados. Cada atendente trabalha de forma independente.
- As regras de cálculo e desconto seguem a política vigente do Financeiro IBFT e devem ser sempre conferidas contra a situação real do aluno antes do envio.

## 🗂️ Histórico de versões

A versão atual aparece no rodapé da ferramenta (clique nela para ver a tela **"Novidades"** com o detalhe de cada versão). Cada versão publicada também tem uma **tag** no Git com o resumo do que mudou (`git tag -n99`).

| Versão | Data | Resumo |
|---|---|---|
| **v23** | jul/2026 | Redesenho visual completo (fontes Inter + Space Grotesk, tipografia, menus estilizados, botão Copiar dourado, contraste, animações, layout responsivo). Cálculos inalterados. |
| v22 | jul/2026 | Correção: no reparcelamento com desconto nos juros com só parcelas em atraso, o valor total aparecia duplicado. |
| v21 | jul/2026 | "Condição especial" só quando há desconto/isenção; parcela a vencer preenchida automaticamente; histórico guarda todas as propostas; refino visual. |
| v20 | jul/2026 | Visual premium; desconto nos juros mostra valor cheio → descontos → valor final; quitação parcial pode retirar juros. *(inclui v19: botão "🧹 limpar" por seção)* |
| v18 | jul/2026 | Correção na edição manual da data das parcelas em atraso. |
| v17 | jun/2026 | Correção nos vencimentos de dia 31/último dia do mês; novo produto BF (vitalício). |
| v16 | jun/2026 | Botão "Regras", seletor de zoom, modo escuro corrigido. *(inclui v14 e v15: fluxo do 2º reparcelamento, recolher seções, progresso, tooltips, contador do dia)* |
| v13 | jun/2026 | Ícones nas seções, validação de coerência, pesquisa no histórico. |
| v12 | jun/2026 | Texto mais persuasivo (CTA, % de economia). *(inclui v11: reformulação da proposta de quitação)* |
| v9–v10 | jun/2026 | Base validada contra o Asaas: encargos, quitação, multi-produto, acesso & extensão, prévia WhatsApp, tema escuro. |

> Observação: os números de versão são criados no Cowork; alguns foram publicados no GitHub em lote, por isso uma tag pode reunir versões intermediárias (indicado acima).

## 🛠️ Publicação e manutenção

O arquivo-fonte (sempre a versão mais recente) fica no Google Drive, em `07_Paineis_e_Ferramentas/Calculadora de Reparcelamento IBFT.html`. O clone de trabalho fica **fora** do Drive, em `C:\Users\citrg\repos\calculadora-ibft`, para não haver conflito com a pasta `.git`.

Para publicar uma versão nova (feito pelo Claude Code a partir do guia `PUBLICAR_no_GitHub_via_Code.md`):

```bash
cd C:\Users\citrg\repos\calculadora-ibft
git pull
# copiar a fonte por cima de index.html
git add index.html
git commit -m "Calculadora vNN — <resumo>"
git tag -a vNN -m "vNN (mmm/aaaa) — <o que mudou>"
git push && git push --tags
```

Autenticação: na 1ª vez em cada computador, o **Git Credential Manager** abre o navegador para logar como `franciscosforza`; depois fica salvo. Isso permite publicar de qualquer dispositivo.

---

_Uso interno — Financeiro IBFT._
