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
    w.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
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
  if (!/É só responder \*SIM\*/.test(t)) falha(k, 'falta a pergunta final com "SIM"');
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
