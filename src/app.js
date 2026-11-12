// Troca de idioma (inglês por padrão). O HTML já traz o inglês, então a página funciona sem JavaScript e é o que
// buscadores e plataformas leem; aqui fica o português, e o inglês é guardado a partir do próprio HTML.

const PT = {
  'bar.label': "Portfólio · 2026",
  'hero.role': "Desenvolvedor Full Stack · Automação de processos · Integrações",
  'hero.lead': "Transformo rotinas manuais em software confiável: sistemas web, aplicativos e integrações com os equipamentos e serviços que a operação já usa, do levantamento à produção.",
  'hero.meta': "Rio Grande do Sul, Brasil · Disponível para projetos e trabalho remoto",
  'cv.label': "Currículo (PDF)",
  'radar.kind': "Em destaque · projeto público · código aberto",
  'radar.live': "Ver ao vivo",
  'radar.code': "Código",
  'radar.arch': "Arquitetura e decisões",
  'radar.desc': "Os dados públicos de tempo e hidrologia do Brasil estão espalhados em portais difíceis de ler. O Radar reúne as fontes oficiais (CEMADEN, Defesa Civil RS, ANA) e um modelo de previsão em um mapa ao vivo do estado do Rio Grande do Sul, com os 497 municípios. Mostra o que está acontecendo agora (chuva acumulada, nível dos rios) e o que deve vir (previsão de chuva para as próximas 6 e 24 horas), junto com a suscetibilidade do terreno a inundações e deslizamentos (movimento de massa) nos municípios em que o Serviço Geológico publicou cartas. Onde não há pluviômetro, uma estimativa por modelo cobre a lacuna e aparece identificada como estimativa; o que falta de dado aparece como falta, nunca como “sem chuva”.",
  'sec.others': "Outros projetos",
  'o.rejoga.tag': "em produção · código privado",
  'o.rejoga.d': "Marketplace de boardgames para o mercado brasileiro: anúncios, pedidos, logística, notificações, suporte, mediação e painel administrativo.",
  's.rest': "APIs REST",
  'o.rejoga.visit': "Visitar rejoga.com.br",
  'o.ind.t': "Sistemas para o setor industrial",
  'o.ind.tag': "código privado",
  'o.ind.d': "Sistemas sob medida para a operação de uma indústria: automação de processos, rastreabilidade com QR Code, integração entre sistemas web, leitores e impressoras de etiquetas, e aplicativos móveis para rotinas operacionais.",
  's.hw': "Integrações com hardware",
  'sec.exp': "Experiência",
  'exp1.when': "2022 – 2026",
  'exp1.role': "Técnico de Sistemas Sênior",
  'exp1.company': "· Setor industrial",
  'exp1.desc': "Soluções sob medida para setores específicos: automação de processos, integração de sistemas e manutenção de sistemas críticos usados diariamente.",
  'exp2.when': "Projeto privado em produção",
  'exp2.role': "Desenvolvedor Full Stack",
  'exp2.desc': "Desenvolvimento e evolução de um marketplace de boardgames: front-end em React e Tailwind CSS, back-end em Node.js com APIs REST, e pagamentos e logística integrados.",
  'sec.stack': "Stack",
  'stack.lang': "Linguagens",
  'stack.front': "Front-end e mobile",
  'stack.back': "Back-end",
  'stack.infra': "Dados e infraestrutura",
  'footer.text': "Feito à mão, com HTML, CSS e JavaScript, sem frameworks.",
  'nav.top': "Início",
  'nav.radar': "Radar",
  'nav.projects': "Projetos",
  'nav.exp': "Experiência",
  'nav.stack': "Stack",
  'who.alt': "Retrato de Lucas de Mélo Berra",
  'radar.open': "Abrir o Radar de Chuva RS",
  'radar.img_alt': "Mapa do Rio Grande do Sul com a chuva por município e contornos luminosos nos rios em risco",
  'nav.label': "Seções da página",
  'radar.h': "Radar de Chuva RS"
};

const TITULO = {
  pt: 'Lucas de Mélo Berra · Desenvolvedor Full Stack',
  en: 'Lucas de Mélo Berra · Full Stack Developer',
};
const DESCRICAO = {
  pt: 'Portfólio de Lucas de Mélo Berra, desenvolvedor Full Stack que transforma rotinas manuais em software confiável: sistemas web, aplicativos e integrações.',
  en: 'Portfolio of Lucas de Mélo Berra, Full Stack developer who turns manual routines into dependable software: web systems, mobile apps and integrations.',
};

// O currículo muda junto com o idioma: em português só o PDF em português, em inglês só o em inglês.
const CURRICULO = {
  pt: 'assets/curriculo-lucas-berra-pt.pdf',
  en: 'assets/resume-lucas-berra-en.pdf',
};

// Guarda o inglês que já está no HTML, para poder voltar a ele.
const EN = {};
document.querySelectorAll('[data-i18n]').forEach((el) => {
  EN[el.dataset.i18n] ??= el.textContent;
});

// "alt:who.alt;aria-label:radar.open" -> [["alt","who.alt"], ["aria-label","radar.open"]]
const pares = (el) => el.dataset.i18nAttr.split(';').map((p) => p.split(':'));
const ATRIBUTOS_EN = new Map();
document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
  ATRIBUTOS_EN.set(el, Object.fromEntries(pares(el).map(([attr]) => [attr, el.getAttribute(attr)])));
});

const CHAVE = 'portfolio-idioma';
const lembrar = (lang) => {
  try { localStorage.setItem(CHAVE, lang); } catch { /* navegação privada */ }
};
const lembrado = () => {
  try { return localStorage.getItem(CHAVE); } catch { return null; }
};

function aplicar(lang) {
  const en = lang === 'en';
  document.documentElement.lang = en ? 'en' : 'pt-BR';
  document.title = TITULO[lang];
  document.querySelector('meta[name="description"]').setAttribute('content', DESCRICAO[lang]);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const chave = el.dataset.i18n;
    el.textContent = (en ? EN[chave] : PT[chave]) ?? EN[chave];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    for (const [attr, chave] of pares(el)) {
      el.setAttribute(attr, (en ? undefined : PT[chave]) ?? ATRIBUTOS_EN.get(el)[attr]);
    }
  });
  document.getElementById('cv').setAttribute('href', CURRICULO[lang]);
  document.querySelectorAll('.idioma button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
}

document.querySelector('.idioma').addEventListener('click', (ev) => {
  const botao = ev.target.closest('button[data-lang]');
  if (!botao) return;
  aplicar(botao.dataset.lang);
  lembrar(botao.dataset.lang);
});

// ---------- menu flutuante: mostra em que seção a pessoa está e leva a qualquer uma ----------
const trilha = document.querySelector('.trilha');
const itens = [...trilha.querySelectorAll('a')];
const secoes = itens.map((a) => document.querySelector(a.getAttribute('href')));
let agendado = false;

function atualizarTrilha() {
  agendado = false;
  // só aparece depois que a pessoa começa a rolar, para não poluir a primeira tela
  trilha.classList.toggle('visivel', scrollY > 240);
  const referencia = innerHeight * 0.4;
  let atual = 0;
  secoes.forEach((secao, i) => {
    if (secao.getBoundingClientRect().top <= referencia) atual = i;
  });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) atual = secoes.length - 1;
  itens.forEach((a, i) => (i === atual ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
}
addEventListener(
  'scroll',
  () => {
    if (!agendado) {
      agendado = true;
      requestAnimationFrame(atualizarTrilha);
    }
  },
  { passive: true },
);
addEventListener('resize', atualizarTrilha);
atualizarTrilha();

// Inglês por padrão; ?lang=pt compartilha a versão em português; a escolha do visitante é lembrada.
const pedido = new URLSearchParams(location.search).get('lang');
const inicial = ['pt', 'en'].includes(pedido) ? pedido : lembrado();
if (inicial === 'pt') aplicar('pt');
