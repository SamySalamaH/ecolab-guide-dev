/**
 * quiz.js — محرّك اختبارات قابل لإعادة الاستخدام (اختيار من متعدد، إجابة واحدة).
 * لا يكشف الإجابة قبل التسليم. نتيجة محلية فقط، وليست شهادة مهنية.
 */
import { saveQuizResult } from './store.js';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Pure scoring helper (unit-testable). answers: {questionId: optionId} */
export function scoreQuiz(questions, answers) {
  let score = 0;
  questions.forEach((q) => {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    if (chosen && chosen.correct) score++;
  });
  return { score, total: questions.length };
}

export function isPassed(score, total, passPercent) { return total > 0 && (score / total) * 100 >= passPercent; }

/** Mounts a quiz into container. t = label dictionary. */
export function mountQuiz(container, quiz, questions, t, onDone) {
  function renderForm() {
    container.replaceChildren();
    const qs = quiz.shuffle ? shuffle(questions).map((q) => ({ ...q, options: shuffle(q.options) })) : questions;
    const form = document.createElement('form');
    form.className = 'academy-quiz';
    form.noValidate = true;
    qs.forEach((q, qi) => {
      const fs = document.createElement('fieldset');
      fs.className = 'academy-quiz__q';
      const lg = document.createElement('legend');
      lg.textContent = `${qi + 1}. ${q.text}`;
      fs.append(lg);
      q.options.forEach((o) => {
        const lab = document.createElement('label');
        lab.className = 'academy-quiz__opt';
        const inp = document.createElement('input');
        inp.type = 'radio'; inp.name = q.id; inp.value = o.id;
        const span = document.createElement('span');
        span.textContent = o.text;
        lab.append(inp, span);
        fs.append(lab);
      });
      form.append(fs);
    });
    const msg = document.createElement('p');
    msg.className = 'academy-quiz__msg'; msg.setAttribute('role', 'alert');
    const submit = document.createElement('button');
    submit.type = 'submit'; submit.className = 'btn btn--primary'; submit.textContent = t.submit;
    form.append(msg, submit);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const answers = {};
      qs.forEach((q) => { const c = form.querySelector(`input[name="${q.id}"]:checked`); if (c) answers[q.id] = c.value; });
      if (Object.keys(answers).length < qs.length) { msg.textContent = t.answerAll; return; }
      const { score, total } = scoreQuiz(qs, answers);
      const passed = isPassed(score, total, quiz.passPercent);
      saveQuizResult(quiz.id, score, total, passed);
      renderResult(qs, answers, score, total, passed);
      onDone && onDone({ score, total, passed });
    });
    container.append(form);
  }

  function renderResult(qs, answers, score, total, passed) {
    container.replaceChildren();
    const box = document.createElement('div');
    box.className = 'academy-quiz__result';
    box.setAttribute('role', 'status');
    const h = document.createElement('h3');
    h.textContent = `${t.score}: ${score} / ${total} (${Math.round((score / total) * 100)}%)`;
    const p = document.createElement('p');
    p.textContent = passed ? t.passed : t.failed.replace('{n}', String(quiz.passPercent));
    p.className = passed ? 'academy-quiz__pass' : 'academy-quiz__fail';
    box.append(h, p);
    const note = document.createElement('p');
    note.className = 'academy-muted'; note.textContent = t.notCert;
    box.append(note);
    qs.forEach((q, qi) => {
      const item = document.createElement('div');
      item.className = 'academy-quiz__review';
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      const correct = q.options.find((o) => o.correct);
      const ok = chosen && chosen.correct;
      const title = document.createElement('strong');
      title.textContent = `${ok ? '✅' : '❌'} ${qi + 1}. ${q.text}`;
      const a1 = document.createElement('p');
      a1.textContent = `${t.yourAnswer}: ${chosen ? chosen.text : '-'}`;
      item.append(title, a1);
      if (!ok) {
        const a2 = document.createElement('p');
        a2.textContent = `${t.correctAnswer}: ${correct.text}`;
        item.append(a2);
      }
      const why = (chosen && chosen.feedback) || correct.feedback;
      if (why) { const e = document.createElement('p'); e.className = 'academy-muted'; e.textContent = why; item.append(e); }
      box.append(item);
    });
    const retry = document.createElement('button');
    retry.type = 'button'; retry.className = 'btn btn--ghost'; retry.textContent = t.retry;
    retry.addEventListener('click', renderForm);
    box.append(retry);
    container.append(box);
    box.scrollIntoView({ block: 'start' });
  }

  renderForm();
}
