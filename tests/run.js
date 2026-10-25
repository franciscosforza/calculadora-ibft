// Teste automático da Calculadora de Propostas IBFT.
//   npm test               compara com o resultado aprovado (tests/esperado.json) e confere as regras
//   npm run test:atualizar grava o resultado atual como aprovado (use só depois de conferir a mudança)
// Roda a própria index.html numa página simulada (jsdom), com a data fixa em 08/10/2026.
process.env.TZ = 'America/Recife';
const fs = require('fs'), path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const RAIZ = path.join(__dirname, '..');
const ESPERADO = path.join(__dirname, 'esperado.json');
const atualizar = process.argv.includes('--atualizar');
const HOJE = new Date(2026, 9, 8, 12, 0, 0).getTime();   // 08/10/2026 12:00 (hora local)

const falhas = [];
const falha = (onde, msg) => falhas.push(`${onde}: ${msg}`);

// ---------- abre a página com data fixa ----------
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const erros = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/Not implemented/i.test(String(e.message))) erros.push(String(e.message)); });
const dom = new JSDOM(html, {
  url: 'http://localhost/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
  beforeParse(w) {
    const Real = w.Date;
    w.Date = class extends Real { constructor(...a) { if (a.length === 0) super(HOJE); else super(...a); } static now() { return HOJE; } };
    w.matchMedia = q => ({ matches: /reduced-motion/.test(q),   // sem animação nos testes (valores finais na hora)
      media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
  }
});
const w = dom.window;
if (erros.length) falha('carregar a página', 'erro de JavaScript: ' + erros[0]);
const versao = (html.match(/<meta name="versao" content="([^"]+)"/) || [])[1];

// ---------- roda os cenários ----------
let atual;
try { atual = w.eval(fs.readFileSync(path.join(__dirname, 'cenarios.js'), 'utf8')); }
catch (e) { console.error('Não consegui rodar os cenários: ' + e.message); process.exit(1); }
for (const k of Object.keys(atual)) atual[k] = { total: atual[k].total, resumo: atual[k].resumo, txt: atual[k].txt, aviso: atual[k].coer };

// ---------- regras que valem para qualquer texto gerado ----------
for (const [k, v] of Object.entries(atual)) {
  const t = v.txt;
  const proibidos = [[/CNPJ/i, 'CNPJ'], [/ajuste de centavos/i, 'aviso de ajuste de centavos'], [/última fica|a última parcela fica/i, 'valor diferente da última parcela'],
    [/undefined|NaN|\bnull\b|\$\{/, 'valor quebrado (undefined/NaN/null)'], [/XXXX/, 'XXXX'], [/\(DATA[^)]*\)|\(NOME[^)]*\)/, 'campo sem preencher'],
    [/certificado|\bMEC\b|última chance|urgente|inadimpl|devedor|calote/i, 'palavra que o guia manda evitar']];
  const semData = /_sem_datalib$/.test(k);   // cenário que deixa a data de liberação em branco de propósito: o texto avisa com (DATA …)
  for (const [re, nome] of proibidos) if (re.test(t) && !(semData && nome === 'campo sem preencher')) falha(k, 'o texto contém ' + nome);
  if (/\n\n\n/.test(t)) falha(k, 'linhas em branco em excesso');
  if (/[ \t]+\n/.test(t)) falha(k, 'espaço sobrando no fim de linha');
  if ((t.match(/\*/g) || []).length % 2) falha(k, 'asterisco sem par (negrito quebrado)');
  if (!/É só responder \*SIM\*|É só responder \*1\* ou \*2\*/.test(t)) falha(k, 'falta a pergunta final ("SIM" ou "1 ou 2")');
  // proposta com duas opções: as duas aparecem, a opção 1 vem antes, e nada do texto de uma opção só
  if (/^o_/.test(k) && /É só responder \*1\* ou \*2\*/.test(t)) {
    const i1 = t.indexOf('1️⃣ *Quitar à vista'), i2 = t.indexOf('2️⃣ *');
    if (i1 < 0 || i2 < 0 || i1 > i2) falha(k, 'as duas opções não aparecem na ordem 1 → 2');
    if (/Posso te mandar o \*boleto\*|Posso já gerar o seu \*PIX\*|Se a parcela não couber/.test(t)) falha(k, 'texto de opção única misturado na proposta com duas opções');
    if ((t.match(/1️⃣/g) || []).length !== 1 || (t.match(/2️⃣/g) || []).length !== 1) falha(k, 'opção repetida');
  }
  if (/^(Oi|Olá|Bom dia|Boa tarde|Boa noite)\b/i.test(t)) falha(k, 'a proposta começa com saudação (vai no meio da conversa)');
  if (/R\$ NaN|R\$ -/.test(t.replace(/− R\$/g, ''))) falha(k, 'valor negativo ou inválido');
}

// ---------- as parcelas somam o total (centavos) ----------
const somaOk = w.eval(`(()=>{
  let s=12345, rnd=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296;}, ruins=[];
  for(let i=0;i<4000;i++){ const total=Math.round((1+rnd()*9000)*100)/100;
    for(let n=2;n<=12;n++){ const p=planoParcelas(total,n); const c=Math.round(p.base*100)*(n-1)+Math.round(p.ultima*100);
      if(c!==Math.round(total*100)||Math.abs(p.ultima-p.base)>n*0.01+1e-9) ruins.push(total+' em '+n+'x'); } }
  return ruins.slice(0,3);
})()`);
if (somaOk.length) falha('parcelas', 'a soma não fecha com o total: ' + somaOk.join(', '));

// ---------- proposta com duas opções: "Aluno escolheu 1/2" gera exatamente o que foi oferecido ----------
if (w.eval(`typeof duasOpcoes==='function'`)) {
  const opc = w.eval(`(()=>{
    const $=id=>document.getElementById(id), set=(id,v)=>{$(id).value=v;}, H=hojeISO(), d=n=>addDays(H,n), ruins=[];
    const casos=[['rep1',0,3,-95,'450,00',2,6,null],['rep2',1,2,-40,'612,35',3,4,null],['rep1',10,5,-300,'199,00',2,10,'40'],['rep1',0,2,-60,'299,70',0,4,null],
                 ['rep1',20,2,-33,'97,00',3,3,null],['rep2',0,4,-130,'180,00',5,12,'25'],['rep1',0,1,-20,'350,00',4,5,null]];
    casos.forEach((c,ix)=>{
      novaProposta(); set('tipoProposta',c[0]); onTipoChange(); set('produto',String(c[1])); onProdutoChange();
      set('genQtd',String(c[2])); set('genVenc',d(c[3])); set('genVal',c[4]); gerarParcelas(); set('vincQtd',String(c[5])); render();
      parcelasEscolhidas=c[6]; if(c[7]) set('descJurosPerc',c[7]); set('dataLib',d(-100)); render();
      const txtSem=$('saida').value, totSem=totalGeral();
      $('duasOpcoes').checked=true; onDuasOpcoes();
      const q1=opcaoQuitacao().total, tot2=totalGeral(), dv=$('dataVenc').value, txtOpc=$('saida').value;
      if(Math.abs(tot2-totSem)>0.001) ruins.push('caso '+ix+': ligar as 2 opções mudou o parcelamento');
      if(!(q1<tot2)) ruins.push('caso '+ix+': opção 1 não ficou mais barata ('+q1+' x '+tot2+')');
      if(txtOpc.indexOf(brl(q1))<0 || txtOpc.indexOf(brl(tot2))<0) ruins.push('caso '+ix+': valores das opções não aparecem no texto');
      const snap=capturar();
      escolherOpcao(1);
      if(!ehQuit() || Math.abs(totalGeral()-q1)>0.001) ruins.push('caso '+ix+': escolheu 1 deu '+totalGeral()+' em vez de '+q1);
      if($('dataVenc').value!==dv) ruins.push('caso '+ix+': escolheu 1 mudou a data');
      voltar(snap); render();
      escolherOpcao(2);
      if(ehQuit() || Math.abs(totalGeral()-tot2)>0.001) ruins.push('caso '+ix+': escolheu 2 mudou o total');
      if($('saida').value!==txtSem) ruins.push('caso '+ix+': escolheu 2 não gerou o mesmo texto do parcelamento sem as opções');
    });
    novaProposta(); return ruins;
  })()`);
  opc.forEach(r => falha('duas opções', r));
}

// ---------- proposta antiga: "Usar hoje" atualiza a data e passa para atraso as parcelas a vencer que venceram ----------
if (w.eval(`typeof atualizarParaHoje==='function'`)) {
  const ant = w.eval(`(()=>{
    const $=id=>document.getElementById(id), set=(id,v)=>{$(id).value=v;}, ruins=[];
    // hoje = 08/10/2026. 5 em atraso todo dia 05 (05/04 a 05/08) + 4 a vencer; proposta feita para 20/08
    novaProposta(); set('produto','0'); onProdutoChange(); set('genQtd','5'); set('genVenc','2026-04-05'); set('genVal','300,00'); gerarParcelas();
    set('vincQtd','4'); set('dataLib','2026-01-10'); set('dataVenc','2026-08-20'); render();
    if($('coerencia').textContent.indexOf('já passou')<0) ruins.push('1º reparc.: sem aviso de vencimento passado');
    atualizarParaHoje();   // vencem no meio-tempo 05/09 e 05/10 → 7 em atraso, 2 a vencer (próxima 05/11)
    if(atrasos.length!==7) ruins.push('1º reparc.: esperava 7 em atraso, veio '+atrasos.length);
    if($('vincQtd').value!=='2') ruins.push('1º reparc.: esperava 2 a vencer, veio '+$('vincQtd').value);
    if($('vincVenc').value!=='2026-11-05') ruins.push('1º reparc.: próxima a vencer '+$('vincVenc').value);
    if($('genQtd').value!=='7') ruins.push('1º reparc.: quantidade não acompanhou ('+$('genQtd').value+')');
    if($('dataVenc').value!==hojeISO()) ruins.push('1º reparc.: a data não foi para hoje');
    if(!atrasos[6] || atrasos[6].venc!=='2026-10-05' || atrasos[6].valor!=='300,00') ruins.push('1º reparc.: parcela nova errada');
    if($('coerencia').textContent.indexOf('já passou')>=0) ruins.push('1º reparc.: o aviso continuou depois de atualizar');
    // 2º reparcelamento: vai para amanhã; parcela a vencer de 15/09 passa para atraso, a de 15/10 não
    novaProposta(); set('tipoProposta','rep2'); onTipoChange(); set('produto','0'); onProdutoChange();
    set('genQtd','2'); set('genVenc','2026-07-15'); set('genVal','250,00'); gerarParcelas();
    set('vincQtd','3'); set('dataLib','2026-01-10'); set('dataVenc','2026-09-01'); render(); set('vincVenc','2026-09-15'); render();
    atualizarParaHoje();
    if($('dataVenc').value!=='2026-10-09') ruins.push('2º reparc.: esperava amanhã, veio '+$('dataVenc').value);
    if(atrasos.length!==3 || $('vincQtd').value!=='2' || $('vincVenc').value!=='2026-10-15') ruins.push('2º reparc.: parcelas erradas ('+atrasos.length+' em atraso, '+$('vincQtd').value+' a vencer, próxima '+$('vincVenc').value+')');
    // sem parcelas a vencer: só a data muda
    novaProposta(); set('produto','0'); onProdutoChange(); set('genQtd','2'); set('genVenc','2026-08-05'); set('genVal','100,00'); gerarParcelas();
    set('dataLib','2026-01-10'); set('dataVenc','2026-09-01'); render(); atualizarParaHoje();
    if(atrasos.length!==2 || $('dataVenc').value!==hojeISO()) ruins.push('sem a vencer: mudou o que não devia');
    novaProposta(); return ruins;
  })()`);
  ant.forEach(r => falha('vencimento passado', r));
}

// ---------- contador do dia = propostas diferentes copiadas hoje (do histórico) ----------
if (w.eval(`typeof propostasDoDia==='function'`)) {
  const cont = w.eval(`(()=>{
    const $=id=>document.getElementById(id), set=(id,v)=>{$(id).value=v;}, ruins=[];
    historico=[];
    novaProposta(); set('produto','0'); onProdutoChange(); set('genQtd','2'); set('genVenc','2026-08-05'); set('genVal','100,00'); gerarParcelas(); set('dataLib','2026-01-10'); render();
    salvarHist(true,'TEXTO 1'); salvarHist(true,'TEXTO 1');   // copiou a mesma proposta duas vezes
    if(propostasDoDia(hojeISO()).length!==1) ruins.push('a mesma proposta copiada 2x contou '+propostasDoDia(hojeISO()).length);
    salvarHist(false);   // "Nova proposta" com a mesma proposta na tela: continua copiada, com o texto
    const it=propostasDoDia(hojeISO());
    if(it.length!==1 || it[0].x._txt!=='TEXTO 1') ruins.push('Nova proposta apagou a marca de copiada ou o texto');
    set('genVal','120,00'); gerarParcelas(); salvarHist(false);   // outra proposta, não copiada
    if(propostasDoDia(hojeISO()).length!==1) ruins.push('proposta não copiada entrou no contador');
    if($('contTxt').textContent!=='1 proposta hoje') ruins.push('contador mostra "'+$('contTxt').textContent+'"');
    historico.push({_resumo:'antiga',tipoProposta:'rep1',atrasos:[],_ts:Date.now()});   // item de versão antiga (sem _c): conta pela data
    if(propostasDoDia(hojeISO()).length!==2) ruins.push('item antigo do histórico não contou');
    renderHoje(); if($('hojeCorpo').querySelectorAll('.hj-item').length!==2) ruins.push('painel Hoje não lista as propostas');
    historico=[]; novaProposta(); return ruins;
  })()`);
  cont.forEach(r => falha('contador do dia', r));
}

// ---------- campo ligado ao texto: cada campo acha a sua linha na prévia ----------
if (w.eval(`typeof linhasDoGrupo==='function'`)) {
  const lig = w.eval(`(()=>{
    const $=id=>document.getElementById(id), set=(id,v)=>{$(id).value=v;}, ruins=[];
    const confere=(nome,grupos)=>{ const L=$('saida').value.split('\\n');
      grupos.forEach(g=>{ const r=linhasDoGrupo(g,L); if(!r.length) ruins.push(nome+': "'+g+'" não acende nenhuma linha'); }); };
    novaProposta(); set('nomeAluno','Maria'); set('produto','0'); onProdutoChange(); set('genQtd','3'); set('genVenc','2026-07-05'); set('genVal','300,00'); gerarParcelas();
    set('vincQtd','2'); set('dataLib','2026-01-10'); set('extDias','30'); render();
    confere('1º reparc.',['nome','prod','tipo','atraso','vinc','venc','parc','acesso']);
    $('duasOpcoes').checked=true; onDuasOpcoes(); confere('duas opções',['opc','desc','parc','venc']);
    novaProposta(); set('tipoProposta','quit'); onTipoChange(); set('produto','0'); onProdutoChange(); set('genQtd','2'); set('genVenc','2026-08-05'); set('genVal','300,00'); gerarParcelas();
    set('dataLib','2026-01-10'); $('retJuros').checked=true; $('temNegativada').checked=true; render();
    confere('quitação',['prod','atraso','desc','venc','acesso','neg','quitTotal']);
    novaProposta(); return ruins;
  })()`);
  lig.forEach(r => falha('campo ligado ao texto', r));
}

// ---------- confere com o resultado aprovado ----------
if (atualizar) {
  fs.writeFileSync(ESPERADO, JSON.stringify(atual, null, 1) + '\n');
  console.log(`Resultado aprovado atualizado: ${Object.keys(atual).length} cenários (${versao}).`);
} else if (!fs.existsSync(ESPERADO)) {
  falha('esperado.json', 'não existe; rode "npm run test:atualizar" para criá-lo');
} else {
  const esp = JSON.parse(fs.readFileSync(ESPERADO, 'utf8'));
  for (const k of Object.keys(esp)) if (!(k in atual)) falha(k, 'cenário aprovado que sumiu do roteiro');
  for (const k of Object.keys(atual)) {
    if (!(k in esp)) { falha(k, 'cenário novo sem aprovação (rode "npm run test:atualizar" depois de conferir)'); continue; }
    for (const campo of ['total', 'resumo', 'txt', 'aviso']) {
      if (atual[k][campo] === esp[k][campo]) continue;
      const a = String(esp[k][campo]).split('\n'), b = String(atual[k][campo]).split('\n');
      const i = a.findIndex((l, j) => l !== b[j]);
      const j = i < 0 ? a.length : i;
      falha(k, `${campo} mudou${campo === 'total' ? `: era ${esp[k].total}, agora ${atual[k].total}` : ` na linha ${j + 1}:\n      era:   ${a[j] ?? '(fim)'}\n      agora: ${b[j] ?? '(fim)'}`}`);
    }
  }
}

w.close();
const n = Object.keys(atual).length;
if (falhas.length) {
  console.error(`\nTESTE FALHOU (${falhas.length}):\n` + falhas.map(f => '  ✗ ' + f).join('\n') + '\n\nSe a mudança foi proposital e você já conferiu o texto, rode: npm run test:atualizar\n');
  process.exit(1);
}
if (!atualizar) console.log(`Teste ok: ${n} cenários iguais ao aprovado, regras de texto e soma das parcelas conferidas (${versao}).`);
