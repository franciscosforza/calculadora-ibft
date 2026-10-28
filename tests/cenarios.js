// Roteiro de cenários da calculadora. É lido como texto e executado dentro da página pelo run.js (data fixa: 08/10/2026).
// Para incluir um cenário novo: acrescente uma entrada em S e rode "npm run test:atualizar" depois de conferir o texto.
(()=>{
window.confirm=()=>true; window.alert=()=>{};
const H=hojeISO(), d=n=>addDays(H,n), $=id=>document.getElementById(id), set=(id,v)=>{$(id).value=v;};
const chk=(id,v)=>{$(id).checked=v;};
const base=(tipo,prod,q,dv,val)=>{ set('tipoProposta',tipo);onTipoChange(); set('produto',String(prod));onProdutoChange(); if(q){set('genQtd',String(q));set('genVenc',d(dv));set('genVal',val);gerarParcelas();} };
const S={
 r1_modelo(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('nomeAluno','Maria'); set('dataLib',d(-200));set('extDias','30');render(); },
 r1_sem_ext(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=6; set('dataLib',d(-200));render(); },
 r1_expirado_sem_ext(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=5; set('dataLib',d(-400));render(); },
 r1_expirado_com_ext(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=5; set('dataLib',d(-400)); set('extDias','45');render(); },
 r1_sem_datalib(){ base('rep1',0,2,-40,'300,00'); parcelasEscolhidas=4; render(); },
 r1_expira_hoje(){ base('rep1',0,2,-40,'300,00'); parcelasEscolhidas=4; set('dataLib',addMonths(H,-12)); set('extDias','30'); render(); },
 r2_expira_antes_venc(){ base('rep2',0,2,-40,'300,00'); parcelasEscolhidas=4; set('dataLib',addMonths(H,-12)); set('extDias','30'); render(); },
 r1_desc_juros_1grupo(){ base('rep1',10,5,-300,'199,00'); set('descJurosPerc','40'); parcelasEscolhidas=10; set('dataLib',d(-30)); render(); },
 r1_desc_juros_2grupos(){ base('rep1',0,2,-60,'299,70'); set('vincQtd','4');render(); set('descJurosPerc','100'); parcelasEscolhidas=6; set('dataLib',d(-150)); render(); },
 r1_2x_1atraso(){ base('rep1',12,1,-15,'109,45'); parcelasEscolhidas=2; set('dataLib',d(-60)); render(); },
 r1_12x_atraso_antigo(){ base('rep1',0,6,-500,'299,70'); parcelasEscolhidas=12; set('dataLib',d(-560)); set('extDias','60'); render(); },
 r1_dia31(){ base('rep1',12,4,-60,'250,00'); set('dataVenc','2026-10-31'); parcelasEscolhidas=4; set('dataLib','2026-01-01'); render(); },
 r2_trg(){ base('rep2',1,2,-40,'612,35'); parcelasEscolhidas=4; set('nomeAluno','JOÃO PEDRO'); set('dataLib',d(-100)); set('extDias','30'); render(); },
 r2_onion(){ base('rep2',20,2,-40,'97,00'); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 r2_cruza_vinc(){ base('rep2',0,2,-40,'300,00'); set('vincQtd','3');render(); set('vincVenc',d(3)); parcelasEscolhidas=5; set('dataLib',d(-100)); render(); },
 r1_onion_ext(){ base('rep1',20,2,-33,'97,00'); set('vincQtd','3');render(); parcelasEscolhidas=3; set('dataLib',d(-120));set('extDias','15');render(); },
 r1_onion_expirado(){ base('rep1',20,2,-33,'97,00'); parcelasEscolhidas=2; set('dataLib',d(-500));render(); },
 r1_vital(){ base('rep1',18,3,-70,'197,00'); parcelasEscolhidas=3; render(); },
 r1_livro_so_vencer(){ base('rep1',17,0); set('vincQtd','3');set('vincVal','120,00');vincValManual=true;render(); parcelasEscolhidas=2; render(); },
 q_atraso_sem_desc(){ base('quit',0,2,-50,'299,70'); set('nomeAluno','ana'); set('dataLib',d(-100)); set('extDias','30'); render(); },
 q_atraso_juros_multa(){ base('quit',0,3,-80,'299,70'); chk('retJuros',true); chk('retMulta',true); set('dataLib',d(-100)); render(); },
 q_atraso_venc_geral(){ base('quit',0,2,-50,'299,70'); set('vincQtd','6');render(); chk('retJuros',true); set('descVincPerc','10'); set('descGeralPerc','5'); set('dataLib',d(-100)); set('extDias','30'); render(); },
 q_so_neg_piso(){ base('quit',5,2,-200,'400,00'); toggleTodasNeg(); set('descNegPerc','60'); set('dataLib',d(-300)); render(); },
 q_so_neg_sem_desc(){ base('quit',0,1,-200,'400,00'); toggleTodasNeg(); chk('isentarJurosNeg',false); set('dataLib',d(-300)); render(); },
 q_neg_atr_venc(){ base('quit',0,4,-150,'380,00'); atrasos[0].negativada=true;atrasos[1].negativada=true; set('vincQtd','3');render(); chk('retJuros',true); set('descVincPerc','10'); set('dataLib',d(-200)); render(); },
 q_so_vencer(){ base('quit',0,0); set('vincQtd','5');set('vincVal','299,70');vincValManual=true;render(); set('descVincPerc','10'); set('dataLib',d(-150)); render(); },
 q_futuro_cruza_vital(){ base('quit',7,1,-20,'350,00'); set('vincQtd','4');render(); set('dataVenc',d(40)); set('vincVenc',d(10)); chk('retJuros',true); chk('retMulta',true); set('descVincPerc','10'); set('tipoAcesso','vital'); render(); },
 q_parcial_multi_juros(){ base('quit',4,0); chk('quitTotal',false);render(); set('genQtd','2');set('genVenc',d(-61));set('genVal','299,90');gerarParcelas(); chk('retJuros',true); addProdutoExtra(); updProdutoExtra(0,'6'); render(); },
 q_parcial_sem_benef(){ base('quit',0,0); chk('quitTotal',false);render(); set('genQtd','2');set('genVenc',d(-35));set('genVal','299,70');gerarParcelas(); set('nomeAluno','Carla'); render(); },
 q_expirado_sem_ext(){ base('quit',0,2,-50,'299,70'); chk('retJuros',true); set('dataLib',d(-450)); render(); },
 q_expirado_com_ext(){ base('quit',0,2,-50,'299,70'); set('dataLib',d(-450)); set('extDias','30'); render(); },
 q_onion(){ base('quit',20,2,-50,'97,00'); chk('retJuros',true); set('dataLib',d(-100)); set('extDias','15'); render(); },
 venc_sabado(){ base('rep1',0,2,-40,'300,00'); set('dataVenc','2026-10-31'); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 venc_feriado_finados(){ base('quit',0,2,-40,'300,00'); set('dataVenc','2026-11-02'); set('dataLib',d(-100)); render(); },
 venc_dia_util(){ base('rep1',0,2,-40,'300,00'); set('dataVenc','2026-10-27'); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 r2_venc_hoje(){ base('rep2',0,2,-40,'300,00'); set('dataVenc',d(0)); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 r2_venc_manual_5dias(){ base('rep2',0,2,-40,'300,00'); set('dataVenc',d(5)); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 r1_venc_amanha(){ base('rep1',0,2,-40,'300,00'); set('dataVenc',d(1)); parcelasEscolhidas=3; set('dataLib',d(-100)); render(); },
 q_venc_amanha(){ base('quit',0,2,-40,'300,00'); set('dataVenc',d(1)); set('dataLib',d(-100)); render(); },
 r1_psicossomatica(){ base('rep1',21,3,-70,'250,00'); set('nomeAluno','Lúcia'); parcelasEscolhidas=5; set('dataLib',d(-150)); render(); },
 q_parcial_2prod(){ base('quit',0,0); chk('quitTotal',false); render(); set('nomeAluno','Rosana'); set('genQtd','1');set('genVenc',d(-17));set('genVal','194,00');gerarParcelas(); addProdutoExtra(); updProdutoExtra(0,'21'); addAtraso(); atrasos[1]={valor:'195,00',venc:d(-9),negativada:false,prod:21}; render(); },
 q_parcial_2prod_varias_juros(){ base('quit',0,0); chk('quitTotal',false); render(); set('genQtd','3');set('genVenc',d(-75));set('genVal','299,70');gerarParcelas(); addProdutoExtra(); updProdutoExtra(0,'21');
   for(let k=0;k<4;k++){ addAtraso(); atrasos[3+k]={valor:'250,00',venc:addMonths(d(-110),k),negativada:false,prod:21}; } chk('retJuros',true); render(); },
 q_parcial_2prod_sem_marcar(){ base('quit',0,0); chk('quitTotal',false); render(); set('genQtd','2');set('genVenc',d(-40));set('genVal','299,70');gerarParcelas(); addProdutoExtra(); updProdutoExtra(0,'21'); render(); },
 q_parcial_um_prod_2datas(){ base('quit',0,0); chk('quitTotal',false); render(); set('genQtd','2');set('genVenc',d(-70));set('genVal','299,70');gerarParcelas(); atrasos[1].venc=d(-10); render(); },

 // ---- proposta com duas opções (v36) ----
 o_r1_modelo(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('nomeAluno','Maria'); set('dataLib',d(-200));set('extDias','30'); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_so_atraso(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=5; set('dataLib',d(-200)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_so_vencer(){ base('rep1',0,0); set('vincQtd','4');set('vincVal','299,70');vincValManual=true;render(); parcelasEscolhidas=4; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_1atraso_2x(){ base('rep1',12,1,-15,'109,45'); parcelasEscolhidas=2; set('dataLib',d(-60)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_12x(){ base('rep1',0,6,-200,'299,70'); set('vincQtd','6');render(); parcelasEscolhidas=12; set('dataLib',d(-250)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r2_amanha(){ base('rep2',1,2,-40,'612,35'); set('vincQtd','3');render(); parcelasEscolhidas=4; set('nomeAluno','JOÃO PEDRO'); set('dataLib',d(-100)); set('extDias','30'); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r2_venc_manual(){ base('rep2',0,2,-40,'300,00'); set('dataVenc',d(5)); parcelasEscolhidas=3; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_desc_juros_rep(){ base('rep1',10,5,-300,'199,00'); set('vincQtd','2');render(); set('descJurosPerc','40'); parcelasEscolhidas=10; set('dataLib',d(-30)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_sem_desconto(){ base('rep1',0,2,-60,'299,70'); parcelasEscolhidas=4; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); chk('retJuros',false); set('descVincPerc','0'); render(); },
 o_r1_multa_e_geral(){ base('rep1',0,3,-80,'299,70'); set('vincQtd','3');render(); parcelasEscolhidas=6; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); chk('retMulta',true); set('descGeralPerc','5'); render(); },
 o_r1_onion(){ base('rep1',20,2,-33,'97,00'); set('vincQtd','3');render(); parcelasEscolhidas=3; set('dataLib',d(-120));set('extDias','15'); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_vital(){ base('rep1',18,3,-70,'197,00'); parcelasEscolhidas=3; $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_livro(){ base('rep1',17,2,-40,'59,90'); parcelasEscolhidas=2; $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_expirado_sem_ext(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=5; set('dataLib',d(-400)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_expirado_com_ext(){ base('rep1',0,3,-95,'450,00'); parcelasEscolhidas=5; set('dataLib',d(-400)); set('extDias','45'); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_futuro_cruza(){ base('rep1',0,1,-20,'350,00'); set('vincQtd','4');render(); set('dataVenc',d(20)); set('vincVenc',d(10)); parcelasEscolhidas=5; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_sabado(){ base('rep1',0,2,-40,'300,00'); set('dataVenc','2026-10-31'); parcelasEscolhidas=3; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r2_expira_antes(){ base('rep2',0,2,-40,'300,00'); parcelasEscolhidas=4; set('dataLib',addMonths(H,-12)); set('extDias','30'); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_sem_datalib(){ base('rep1',0,2,-40,'300,00'); parcelasEscolhidas=4; $('duasOpcoes').checked=true; onDuasOpcoes(); },
 o_r1_escolheu1(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('nomeAluno','Maria'); set('dataLib',d(-200));set('extDias','30'); $('duasOpcoes').checked=true; onDuasOpcoes(); escolherOpcao(1); },
 o_r2_escolheu1(){ base('rep2',1,2,-40,'612,35'); set('vincQtd','3');render(); parcelasEscolhidas=4; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); escolherOpcao(1); },
 o_r2_escolheu2(){ base('rep2',1,2,-40,'612,35'); set('vincQtd','3');render(); parcelasEscolhidas=4; set('dataLib',d(-100)); $('duasOpcoes').checked=true; onDuasOpcoes(); escolherOpcao(2); },
 o_ligado_em_quitacao(){ base('rep1',0,2,-40,'300,00'); $('duasOpcoes').checked=true; onDuasOpcoes(); setTipo('quit'); set('dataLib',d(-100)); render(); },

 // ---- aviso de negativação no reparcelamento (v36): só texto ----
 n_r1_neg(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('dataLib',d(-200)); chk('temNegativada',true); render(); },
 n_r2_neg(){ base('rep2',1,2,-40,'612,35'); parcelasEscolhidas=4; set('dataLib',d(-100)); chk('temNegativada',true); render(); },
 n_r1_neg_opc(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('dataLib',d(-200)); chk('temNegativada',true); render(); $('duasOpcoes').checked=true; onDuasOpcoes(); },
 n_r1_neg_opc_escolheu1(){ base('rep1',0,3,-95,'450,00'); set('vincQtd','2');render(); parcelasEscolhidas=6; set('dataLib',d(-200)); chk('temNegativada',true); render(); $('duasOpcoes').checked=true; onDuasOpcoes(); escolherOpcao(1); },
 n_quit_atraso_com_flag(){ base('quit',0,2,-50,'299,70'); chk('retJuros',true); set('dataLib',d(-100)); chk('temNegativada',true); render(); },
 q_parcial_cartao(){ base('quit',0,0); chk('quitTotal',false); render(); set('genQtd','2');set('genVenc',d(-35));set('genVal','299,70');gerarParcelas(); set('nomeAluno','Carla'); chk('cartOferta',true); cartaoParc=6; render(); },
 q_parcial_cartao_juros_2prod(){ base('quit',0,0); chk('quitTotal',false); render(); set('genQtd','3');set('genVenc',d(-75));set('genVal','299,70');gerarParcelas(); chk('retJuros',true); addProdutoExtra(); updProdutoExtra(0,'21'); atrasos[2].prod=21; chk('cartOferta',true); cartaoParc=12; render(); },
 q_parcial_cartao_desligado_na_total(){ base('quit',0,2,-40,'300,00'); chk('quitTotal',false); render(); chk('cartOferta',true); cartaoParc=4; chk('quitTotal',true); set('dataLib',d(-100)); render(); },
 q_livro(){ base('quit',17,2,-30,'59,90'); render(); },
};
const out={};
for(const k in S){ novaProposta(); S[k](); out[k]={total:brl(totalGeral()),resumo:document.getElementById('resumo').textContent,txt:$('saida').value,coer:$('coerencia').textContent}; }
novaProposta();
return out;
})()
