/**
 * academy/index.js — عرض "أكاديمية الستيوارد" داخل الدليل.
 * يُسجَّل كعرض #academy. التنقل الداخلي عبر معاملات الـ hash:
 *   #academy                 الرئيسية
 *   #academy?v=course&c=ID   تفاصيل كورس
 *   #academy?v=lesson&l=ID   درس
 *   #academy?v=quiz&q=ID     اختبار
 *   #academy?v=progress      تقدّمي
 *   #academy?v=cert&c=ID     شهادة
 */
import { registerView } from '../router.js';
import { createElement as h } from '../utils.js';
import { STR } from './i18n.js';
import { loadAcademyData, resolveQuestions, publishedLessons } from './data.js';
import * as store from './store.js';
import { buildPlayer } from './video.js';
import { mountQuiz } from './quiz.js';

let root = null;
let data = null;
let loadError = false;
let lang = 'ar';
let bound = false;
const filters = { q: '', cat: 'all', level: 'all' };

const T = () => STR[lang];
const tr = (o) => (o && (o[lang] || o.ar)) || '';
const link = (params) => '#academy' + (params ? '?' + new URLSearchParams(params).toString() : '');

function a(href, cls, children) { return h('a', { href, class: cls }, children); }

function params() {
  const raw = location.hash.replace(/^#/, '');
  const [name, qs] = raw.split('?');
  return { name, p: new URLSearchParams(qs || '') };
}

function pubCourses() { return data.courses.filter((c) => c.status === 'published' && publishedLessons(c, data).length > 0); }

function shell(children, backTo) {
  const t = T();
  const bar = h('div', { class: 'academy-bar academy-no-print' }, [
    backTo ? a(backTo, 'btn btn--ghost btn--sm', ['← ' + t.back]) : h('span'),
    h('div', { class: 'academy-bar__right' }, [
      a(link({ v: 'progress' }), 'btn btn--ghost btn--sm', [t.progress]),
      h('button', { type: 'button', class: 'btn btn--ghost btn--sm', 'data-act': 'lang' }, [t.langBtn])
    ])
  ]);
  root.setAttribute('dir', t.dir);
  root.setAttribute('lang', lang);
  root.replaceChildren(h('div', { class: 'academy' }, [bar, ...children]));
}

function courseCard(c) {
  const t = T();
  const lessons = publishedLessons(c, data);
  const prog = store.courseProgress(lessons.map((l) => l.id));
  return h('article', { class: 'academy-card' }, [
    h('div', { class: 'academy-card__top' }, [
      h('span', { class: 'academy-badge' }, [t.levels[c.level] || '']),
      h('span', { class: 'academy-muted' }, [`${lessons.length} ${t.lessons}`])
    ]),
    h('h3', { class: 'academy-card__title' }, [a(link({ v: 'course', c: c.id }), '', [tr(c.title)])]),
    h('p', { class: 'academy-muted' }, [tr(c.description)]),
    h('div', { class: 'academy-progress', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(prog.percent), 'aria-label': tr(c.title) }, [
      h('span', { class: 'academy-progress__bar', style: `width:${prog.percent}%` })
    ])
  ]);
}

/* ---------- Home ---------- */
function renderHome() {
  const t = T();
  const courses = pubCourses();
  const last = store.load().last;
  const hero = h('section', { class: 'academy-hero' }, [
    h('p', { class: 'academy-eyebrow' }, ['STEWARDING ACADEMY']),
    h('h1', {}, [t.name]),
    h('p', { class: 'academy-tagline' }, [t.tagline]),
    h('p', {}, [t.intro]),
    h('div', { class: 'academy-actions' }, [
      a(courses[0] ? link({ v: 'course', c: courses[0].id }) : '#academy', 'btn btn--primary', [t.start]),
      h('a', { href: '#academy-courses', class: 'btn btn--ghost', 'data-act': 'jump' }, [t.explore])
    ]),
    last && data.lessons.find((l) => l.id === last.lessonId)
      ? h('p', {}, [a(link({ v: 'lesson', l: last.lessonId }), 'academy-link', ['↩ ' + t.resume])]) : ''
  ].filter(Boolean));

  const counts = {};
  courses.forEach((c) => { counts[c.categoryId] = (counts[c.categoryId] || 0) + 1; });
  const cats = h('section', { 'aria-labelledby': 'ac-cats' }, [
    h('h2', { id: 'ac-cats' }, [t.cats]),
    h('div', { class: 'academy-grid' }, data.categories.map((c) => {
      const n = counts[c.id] || 0;
      return h('button', { type: 'button', class: 'academy-cat', 'data-act': 'cat', 'data-cat': c.id }, [
        h('span', { class: 'academy-cat__icon', 'aria-hidden': 'true' }, [c.icon || '📘']),
        h('strong', {}, [tr(c.title)]),
        h('span', { class: 'academy-muted' }, [tr(c.description)]),
        h('span', { class: n ? 'academy-badge' : 'academy-badge academy-badge--soon' }, [n ? `${n} ${t.coursesCount}` : t.soon])
      ]);
    }))
  ]);

  const filtered = courses.filter((c) => {
    if (filters.cat !== 'all' && c.categoryId !== filters.cat) return false;
    if (filters.level !== 'all' && c.level !== filters.level) return false;
    const q = filters.q.trim().toLowerCase();
    if (q && !(`${tr(c.title)} ${c.title.ar} ${(c.title.en || '')} ${tr(c.description)}`.toLowerCase().includes(q))) return false;
    return true;
  });
  const search = h('input', { type: 'search', class: 'academy-input', id: 'ac-search', value: filters.q, 'aria-label': t.search, placeholder: t.search, 'data-act': 'search' });
  const catSel = h('select', { class: 'academy-input', 'aria-label': t.cats, 'data-act': 'catsel' }, [
    h('option', { value: 'all' }, [t.all]), ...data.categories.map((c) => h('option', { value: c.id }, [tr(c.title)]))]);
  catSel.value = filters.cat;
  const lvlSel = h('select', { class: 'academy-input', 'aria-label': t.level, 'data-act': 'lvlsel' }, [
    h('option', { value: 'all' }, [t.allLevels]), ...Object.entries(t.levels).map(([k, v]) => h('option', { value: k }, [v]))]);
  lvlSel.value = filters.level;
  const list = h('section', { id: 'academy-courses', 'aria-labelledby': 'ac-feat' }, [
    h('h2', { id: 'ac-feat' }, [t.featured]),
    h('div', { class: 'academy-filters' }, [search, catSel, lvlSel]),
    filtered.length
      ? h('div', { class: 'academy-grid' }, filtered.map(courseCard))
      : h('p', { class: 'academy-empty' }, [courses.length ? t.noResults : t.noCourses])
  ]);

  const recent = courses.filter((c) => c.addedAt).sort((x, y) => (y.addedAt > x.addedAt ? 1 : -1)).slice(0, 3);
  const recentSec = recent.length ? h('section', {}, [h('h2', {}, [t.recent]), h('div', { class: 'academy-grid' }, recent.map(courseCard))]) : '';

  const pathKeys = ['beginner', 'intermediate', 'advanced', 'supervisor'];
  const paths = h('section', {}, [
    h('h2', {}, [t.paths]),
    h('div', { class: 'academy-grid' }, pathKeys.map((k) => {
      const cs = courses.filter((c) => c.level === k);
      return h('div', { class: 'academy-path' }, [
        h('strong', {}, [t.levels[k]]),
        cs.length ? h('ul', {}, cs.map((c) => h('li', {}, [a(link({ v: 'course', c: c.id }), 'academy-link', [tr(c.title)])])))
          : h('p', { class: 'academy-muted' }, [t.pathEmpty])
      ]);
    }))
  ]);

  const quizCourse = courses.find((c) => c.quizId);
  const check = quizCourse ? h('section', {}, [
    h('h2', {}, [t.check]),
    h('p', { class: 'academy-muted' }, [tr(quizCourse.title)]),
    a(link({ v: 'quiz', q: quizCourse.quizId }), 'btn btn--ghost', [t.takeQuiz])]) : '';

  const info = h('section', { class: 'academy-info' }, [
    h('h2', {}, [t.about]), h('p', {}, [t.mission]), h('p', { class: 'academy-muted' }, [t.disclaimer]), h('p', { class: 'academy-muted' }, [t.localNote])
  ]);
  shell([hero, cats, list, recentSec, paths, check, info].filter(Boolean));
}

/* ---------- Course ---------- */
function renderCourse(id) {
  const t = T();
  const c = data.courses.find((x) => x.id === id && x.status === 'published');
  if (!c) return renderNotFound();
  const lessons = publishedLessons(c, data);
  const prog = store.courseProgress(lessons.map((l) => l.id));
  const quiz = data.quizzes.find((q) => q.id === c.quizId);
  const qr = quiz ? store.getQuizResult(quiz.id) : null;
  const eligible = prog.total > 0 && prog.done === prog.total && qr && qr.passed;
  shell([
    h('header', {}, [
      h('span', { class: 'academy-badge' }, [t.levels[c.level] || '']),
      h('h1', {}, [tr(c.title)]), h('p', {}, [tr(c.description)]),
      h('p', { class: 'academy-muted' }, [`${prog.done} / ${prog.total} ${t.lessons} ${t.done}`]),
      h('div', { class: 'academy-progress' }, [h('span', { class: 'academy-progress__bar', style: `width:${prog.percent}%` })])
    ]),
    c.objectives && c.objectives.ar ? h('section', {}, [h('h2', {}, [t.objectives]), h('ul', {}, c.objectives.ar.map((o) => h('li', {}, [o])))]) : '',
    h('section', {}, [h('h2', {}, [t.lessons]),
      h('ol', { class: 'academy-lessons' }, lessons.map((l) => h('li', {}, [
        a(link({ v: 'lesson', l: l.id }), 'academy-lessonlink', [`${store.isCompleted(l.id) ? '✅ ' : ''}${tr(l.title)}`]),
        store.isFavorite(l.id) ? h('span', { 'aria-label': t.favorites }, [' ★']) : ''
      ].filter(Boolean))))]),
    quiz ? h('section', {}, [h('h2', {}, [t.courseQuiz]),
      qr ? h('p', { class: 'academy-muted' }, [`${t.score}: ${qr.score}/${qr.total} (${qr.percent}%)`]) : '',
      a(link({ v: 'quiz', q: quiz.id }), 'btn btn--ghost', [t.takeQuiz])].filter(Boolean)) : '',
    h('section', {}, [h('h2', {}, [t.cert]),
      eligible ? a(link({ v: 'cert', c: c.id }), 'btn btn--primary', [t.cert]) : h('p', { class: 'academy-muted' }, [t.certLocked])]),
    h('p', { class: 'academy-muted' }, [t.disclaimer])
  ].filter(Boolean), link());
  store.setLast(c.id, lessons[0].id);
}

/* ---------- Lesson ---------- */
function renderLesson(id) {
  const t = T();
  const l = data.lessons.find((x) => x.id === id && x.status === 'published');
  const c = l && data.courses.find((x) => x.id === l.courseId && x.status === 'published');
  if (!l || !c) return renderNotFound();
  const siblings = publishedLessons(c, data);
  const i = siblings.findIndex((x) => x.id === l.id);
  const prev = siblings[i - 1], next = siblings[i + 1];
  const body = (l.body && l.body.ar) || {};
  const done = store.isCompleted(l.id), fav = store.isFavorite(l.id);
  const quiz = data.quizzes.find((q) => q.id === l.quizId);
  const rel = (l.related || []).map((rid) => siblings.find((x) => x.id === rid)).filter(Boolean);
  const ar = { dir: 'rtl', lang: 'ar' };
  const section = (title, node) => h('section', {}, [h('h2', {}, [title]), node]);

  const quizBox = h('div', { id: 'academy-quiz-box' });
  shell([
    h('header', {}, [
      h('p', { class: 'academy-muted' }, [`${tr(c.title)} · ${i + 1}/${siblings.length}`]),
      h('h1', {}, [tr(l.title)])
    ]),
    buildPlayer(l.video, l.subtitles, t, tr(l.title)),
    h('div', { class: 'academy-actions' }, [
      h('button', { type: 'button', class: 'btn ' + (done ? 'btn--ghost' : 'btn--primary'), 'data-act': 'done', 'data-lesson': l.id, 'aria-pressed': done ? 'true' : 'false' }, [done ? '✅ ' + t.undo : t.markDone]),
      h('button', { type: 'button', class: 'btn btn--ghost', 'data-act': 'fav', 'data-lesson': l.id, 'aria-pressed': fav ? 'true' : 'false' }, [fav ? '★ ' + t.unfav : '☆ ' + t.fav])
    ]),
    h('div', { ...ar, class: 'academy-body' }, [
      l.objectives && l.objectives.ar ? section(t.objectives, h('ul', {}, l.objectives.ar.map((x) => h('li', {}, [x])))) : '',
      body.scenario ? section(t.scenario, h('p', {}, [body.scenario])) : '',
      l.keyPoints && l.keyPoints.ar ? section(t.keyPoints, h('ol', {}, l.keyPoints.ar.map((x) => h('li', {}, [x])))) : '',
      body.why ? section(t.why, h('p', {}, [body.why])) : '',
      body.mistakes ? section(t.mistakes, h('ul', {}, body.mistakes.map((x) => h('li', {}, [x])))) : ''
    ].filter(Boolean)),
    quiz ? section(t.quiz, quizBox) : '',
    h('nav', { class: 'academy-pager academy-no-print', 'aria-label': tr(c.title) }, [
      prev ? a(link({ v: 'lesson', l: prev.id }), 'btn btn--ghost', ['← ' + t.prev + ': ' + tr(prev.title)]) : h('span'),
      next ? a(link({ v: 'lesson', l: next.id }), 'btn btn--primary', [t.next + ': ' + tr(next.title) + ' →']) : a(link({ v: 'course', c: c.id }), 'btn btn--primary', [tr(c.title)])
    ]),
    rel.length ? section(t.related, h('ul', {}, rel.map((r) => h('li', {}, [a(link({ v: 'lesson', l: r.id }), 'academy-link', [tr(r.title)])])))) : '',
    h('p', { class: 'academy-muted' }, [t.disclaimer])
  ].filter(Boolean), link({ v: 'course', c: c.id }));
  store.setLast(c.id, l.id);
  if (quiz) {
    const qs = resolveQuestions(quiz, data.quizzes);
    const box = root.querySelector('#academy-quiz-box');
    if (qs.length) mountQuiz(box, quiz, qs, t, () => {}); else box.textContent = t.empty;
  }
}

/* ---------- Quiz ---------- */
function renderQuiz(id) {
  const t = T();
  const quiz = data.quizzes.find((q) => q.id === id);
  const qs = quiz ? resolveQuestions(quiz, data.quizzes) : [];
  if (!quiz || !qs.length) return renderNotFound();
  const back = quiz.scope === 'course' ? link({ v: 'course', c: quiz.refId }) : link({ v: 'lesson', l: quiz.refId });
  const box = h('div');
  shell([h('h1', {}, [tr(quiz.title)]), h('p', { class: 'academy-muted' }, [`${qs.length} · ${quiz.passPercent}%`]), box], back);
  mountQuiz(box, quiz, qs, t, () => {});
}

/* ---------- Progress ---------- */
function renderProgress() {
  const t = T();
  const s = store.load();
  const courses = pubCourses();
  const favs = s.favorites.map((id) => data.lessons.find((l) => l.id === id && l.status === 'published')).filter(Boolean);
  const qrs = Object.entries(s.quizzes).filter(([id]) => data.quizzes.some((q) => q.id === id));
  shell([
    h('h1', {}, [t.progress]),
    h('p', { class: 'academy-muted' }, [t.localNote]),
    h('p', {}, [`${t.lastActivity}: ${s.activity ? new Date(s.activity).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-GB') : t.none}`]),
    h('section', {}, [h('h2', {}, [t.courses]), courses.length ? h('div', { class: 'academy-grid' }, courses.map(courseCard)) : h('p', { class: 'academy-empty' }, [t.noCourses])]),
    h('section', {}, [h('h2', {}, [t.quizResults]), qrs.length
      ? h('ul', {}, qrs.map(([id, r]) => { const q = data.quizzes.find((x) => x.id === id); return h('li', {}, [`${tr(q.title)}: ${r.score}/${r.total} (${r.percent}%) ${r.passed ? '✅' : ''}`]); }))
      : h('p', { class: 'academy-muted' }, [t.none])]),
    h('section', {}, [h('h2', {}, [t.favorites]), favs.length
      ? h('ul', {}, favs.map((l) => h('li', {}, [a(link({ v: 'lesson', l: l.id }), 'academy-link', [tr(l.title)])])))
      : h('p', { class: 'academy-muted' }, [t.noFav])]),
    h('button', { type: 'button', class: 'btn btn--danger', 'data-act': 'reset' }, [t.reset])
  ], link());
}

/* ---------- Certificate ---------- */
function renderCert(id) {
  const t = T();
  const c = data.courses.find((x) => x.id === id && x.status === 'published');
  if (!c) return renderNotFound();
  const lessons = publishedLessons(c, data);
  const prog = store.courseProgress(lessons.map((l) => l.id));
  const qr = store.getQuizResult(c.quizId);
  if (!(prog.total > 0 && prog.done === prog.total && qr && qr.passed)) {
    shell([h('h1', {}, [t.cert]), h('p', { class: 'academy-empty' }, [t.certLocked])], link({ v: 'course', c: c.id }));
    return;
  }
  const date = new Date(qr.at || Date.now()).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  const nameEl = h('strong', { class: 'academy-cert__name', id: 'academy-cert-name' }, ['______________']);
  const input = h('input', { type: 'text', class: 'academy-input', maxlength: '60', 'aria-label': t.certName, placeholder: t.certName, 'data-act': 'certname' });
  shell([
    h('div', { class: 'academy-no-print' }, [h('h1', {}, [t.cert]), input,
      h('button', { type: 'button', class: 'btn btn--primary', 'data-act': 'print' }, [t.print])]),
    h('section', { class: 'academy-cert', 'aria-label': t.certTitle }, [
      h('p', { class: 'academy-eyebrow' }, [t.name]),
      h('h2', {}, [t.certTitle]), h('p', { dir: 'rtl', lang: 'ar' }, [t.certTitleAr]),
      h('p', {}, [t.certBody]), nameEl, h('p', {}, [t.certDid]),
      h('h3', {}, [tr(c.title)]),
      h('p', {}, [`${t.certDate}: ${date}`]),
      h('p', { class: 'academy-muted' }, [`${t.score}: ${qr.percent}% · ${prog.done}/${prog.total} ${t.lessons}`]),
      h('p', { class: 'academy-muted' }, [t.certNote])
    ])
  ], link({ v: 'course', c: c.id }));
}

function renderNotFound() { shell([h('p', { class: 'academy-empty' }, [T().notFound])], link()); }

/* ---------- Router + events ---------- */
function render() {
  if (!root) return;
  if (loadError) { root.replaceChildren(h('p', { class: 'academy-empty', role: 'alert' }, [STR.ar.loadError])); return; }
  if (!data) { root.replaceChildren(h('p', { class: 'academy-empty', role: 'status' }, [STR.ar.loading])); return; }
  lang = store.getLang();
  const { p } = params();
  const v = p.get('v');
  if (v === 'course') renderCourse(p.get('c'));
  else if (v === 'lesson') renderLesson(p.get('l'));
  else if (v === 'quiz') renderQuiz(p.get('q'));
  else if (v === 'progress') renderProgress();
  else if (v === 'cert') renderCert(p.get('c'));
  else renderHome();
  document.title = `${T().name} — دليل الاستيوارد`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function onClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (act === 'lang') { store.setLang(lang === 'ar' ? 'en' : 'ar'); render(); }
  else if (act === 'done') { store.setCompleted(el.dataset.lesson, el.getAttribute('aria-pressed') !== 'true'); render(); }
  else if (act === 'fav') { store.toggleFavorite(el.dataset.lesson); render(); }
  else if (act === 'cat') { filters.cat = el.dataset.cat; render(); document.getElementById('academy-courses')?.scrollIntoView(); }
  else if (act === 'jump') { e.preventDefault(); document.getElementById('academy-courses')?.scrollIntoView(); }
  else if (act === 'print') window.print();
  else if (act === 'reset') { if (window.confirm(T().resetConfirm)) { store.resetAll(); render(); } }
}
function onInput(e) {
  const el = e.target;
  if (el.dataset.act === 'search') { filters.q = el.value; render(); const n = root.querySelector('#ac-search'); n && (n.focus(), n.setSelectionRange(n.value.length, n.value.length)); }
  else if (el.dataset.act === 'certname') { const n = root.querySelector('#academy-cert-name'); n.textContent = el.value.trim() || '______________'; }
}
function onChange(e) {
  const el = e.target;
  if (el.dataset.act === 'catsel') { filters.cat = el.value; render(); }
  else if (el.dataset.act === 'lvlsel') { filters.level = el.value; render(); }
}

async function init() {
  root = document.querySelector('[data-view="academy"]');
  if (!root) return;
  if (!bound) {
    bound = true;
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onChange);
    window.addEventListener('hashchange', () => { if (!root.hidden) render(); });
  }
  render();
  if (!data && !loadError) {
    try { data = await loadAcademyData(); if (data.warnings.length) console.warn('[academy] skipped invalid records:', data.warnings); }
    catch (err) { console.warn('[academy] load failed', err); loadError = true; }
    render();
  }
}

registerView('academy', { onEnter: () => init() });
