/**
 * store.js — تخزين تقدّم الأكاديمية محليًا (localStorage).
 * مفتاح مستقل ومُرقَّم الإصدار (لا يلمس مفتاح التطبيق stewardApp:v2:state).
 * كل البيانات على المتصفح والجهاز الحالي فقط، بدون مزامنة.
 * الواجهة (get/set) معزولة هنا حتى يمكن استبدالها لاحقًا بخلفية سحابية.
 */
export const STORAGE_KEY = 'stewardAcademy:v1';

const defaults = () => ({
  v: 1,
  lang: 'ar',
  completed: {},   // lessonId -> ISO date
  quizzes: {},     // quizId -> { score, total, percent, passed, at }
  favorites: [],   // lessonIds
  last: null,      // { courseId, lessonId }
  activity: null   // ISO date of last change
});

let mem = null; // fallback if localStorage is unavailable

function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }

/** Normalizes anything read from storage into a safe state object. */
export function sanitize(raw) {
  const d = defaults();
  if (!isObj(raw) || raw.v !== 1) return d;
  if (raw.lang === 'en' || raw.lang === 'ar') d.lang = raw.lang;
  if (isObj(raw.completed)) {
    for (const [k, val] of Object.entries(raw.completed)) {
      if (typeof val === 'string') d.completed[k] = val;
    }
  }
  if (isObj(raw.quizzes)) {
    for (const [k, q] of Object.entries(raw.quizzes)) {
      if (isObj(q) && Number.isFinite(q.score) && Number.isFinite(q.total) && q.total > 0) {
        d.quizzes[k] = {
          score: q.score, total: q.total,
          percent: Math.round((q.score / q.total) * 100),
          passed: q.passed === true, at: typeof q.at === 'string' ? q.at : null
        };
      }
    }
  }
  if (Array.isArray(raw.favorites)) d.favorites = raw.favorites.filter((x) => typeof x === 'string');
  if (isObj(raw.last) && typeof raw.last.lessonId === 'string' && typeof raw.last.courseId === 'string') {
    d.last = { courseId: raw.last.courseId, lessonId: raw.last.lessonId };
  }
  if (typeof raw.activity === 'string') d.activity = raw.activity;
  return d;
}

export function load() {
  try {
    const txt = localStorage.getItem(STORAGE_KEY);
    if (!txt) return mem ? sanitize(mem) : defaults();
    return sanitize(JSON.parse(txt));
  } catch (_e) {
    return mem ? sanitize(mem) : defaults();
  }
}

function save(state) {
  state.activity = new Date().toISOString();
  mem = state;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_e) { /* quota or private mode: memory only */ }
  return state;
}

export function getLang() { return load().lang; }
export function setLang(lang) { const s = load(); s.lang = lang === 'en' ? 'en' : 'ar'; return save(s); }

export function isCompleted(lessonId) { return Boolean(load().completed[lessonId]); }
/** Only explicit user action marks completion (never video play). */
export function setCompleted(lessonId, done) {
  const s = load();
  if (done) s.completed[lessonId] = new Date().toISOString(); else delete s.completed[lessonId];
  return save(s);
}

export function isFavorite(lessonId) { return load().favorites.includes(lessonId); }
export function toggleFavorite(lessonId) {
  const s = load();
  s.favorites = s.favorites.includes(lessonId) ? s.favorites.filter((x) => x !== lessonId) : [...s.favorites, lessonId];
  save(s);
  return s.favorites.includes(lessonId);
}

export function setLast(courseId, lessonId) { const s = load(); s.last = { courseId, lessonId }; return save(s); }

export function saveQuizResult(quizId, score, total, passed) {
  const s = load();
  s.quizzes[quizId] = { score, total, percent: Math.round((score / total) * 100), passed: Boolean(passed), at: new Date().toISOString() };
  return save(s);
}
export function getQuizResult(quizId) { return load().quizzes[quizId] || null; }

/** Share of a course's published lessons completed. Based on completion records only. */
export function courseProgress(lessonIds) {
  const s = load();
  const total = lessonIds.length;
  const done = lessonIds.filter((id) => s.completed[id]).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function resetAll() {
  mem = null;
  try { localStorage.removeItem(STORAGE_KEY); } catch (_e) { /* ignore */ }
}
