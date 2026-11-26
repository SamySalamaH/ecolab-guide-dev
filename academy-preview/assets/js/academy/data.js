/**
 * data.js — تحميل ومراجعة بيانات الأكاديمية (JSON) قبل العرض.
 * الروابط نسبية لمكان هذا الملف، فتعمل تحت أي مسار فرعي على GitHub Pages.
 */
const base = new URL('../../data/academy/', import.meta.url);

async function getJSON(name) {
  const res = await fetch(new URL(name, base));
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json();
}

const str = (x) => typeof x === 'string' && x.trim().length > 0;
const arr = (x) => (Array.isArray(x) ? x : []);

/** Drops malformed records instead of crashing; returns {data, warnings}. */
export function validate(raw) {
  const warnings = [];
  const categories = arr(raw.categories).filter((c) => {
    const ok = c && str(c.id) && c.title && str(c.title.ar);
    if (!ok) warnings.push('bad category');
    return ok;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
  const catIds = new Set(categories.map((c) => c.id));

  const lessons = arr(raw.lessons).filter((l) => {
    const ok = l && str(l.id) && str(l.courseId) && l.title && str(l.title.ar);
    if (!ok) warnings.push('bad lesson ' + (l && l.id));
    return ok;
  });
  const CT = ['real-video', 'ai-video', 'text', 'mixed'];
  lessons.forEach((l) => { if (!CT.includes(l.contentType)) { if (l.contentType) warnings.push('bad contentType ' + l.id); l.contentType = l.video ? 'mixed' : 'text'; } });
  const lessonById = new Map(lessons.map((l) => [l.id, l]));

  const courses = arr(raw.courses).filter((c) => {
    const ok = c && str(c.id) && catIds.has(c.categoryId) && c.title && str(c.title.ar);
    if (!ok) warnings.push('bad course ' + (c && c.id));
    return ok;
  }).map((c) => ({ ...c, lessonIds: arr(c.lessonIds).filter((id) => lessonById.has(id)) }));

  const quizzes = arr(raw.quizzes).filter((q) => {
    const ok = q && str(q.id) && Number.isFinite(q.passPercent);
    if (!ok) warnings.push('bad quiz ' + (q && q.id));
    return ok;
  });
  return { categories, courses, lessons, quizzes, warnings };
}

export async function loadAcademyData() {
  const [c, co, l, q] = await Promise.all([getJSON('categories.json'), getJSON('courses.json'), getJSON('lessons.json'), getJSON('quizzes.json')]);
  return validate({ categories: c.categories, courses: co.courses, lessons: l.lessons, quizzes: q.quizzes });
}

/** Expands a quiz's `include` list into one question array; keeps only well-formed questions. */
export function resolveQuestions(quiz, quizzes) {
  const own = arr(quiz.questions);
  const inc = arr(quiz.include).flatMap((id) => { const q = quizzes.find((x) => x.id === id); return q ? arr(q.questions) : []; });
  return [...own, ...inc].filter((q) => q && str(q.id) && str(q.text) && arr(q.options).length >= 2 && q.options.filter((o) => o.correct).length === 1);
}

export function publishedLessons(course, data) {
  return course.lessonIds.map((id) => data.lessons.find((l) => l.id === id)).filter((l) => l && l.status === 'published');
}
