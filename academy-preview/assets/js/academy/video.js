/**
 * video.js — محوّل مزوّدي الفيديو. لا يقبل HTML أو iframe من البيانات أبدًا:
 * فقط معرّف/رابط يُتحقق منه ثم تُبنى العناصر هنا بسمات آمنة ثابتة.
 * مزوّدون مسموحون: youtube (youtube-nocookie.com)، وملف محلي داخل assets/video/.
 */
const YT_ID = /^[A-Za-z0-9_-]{11}$/;
const LOCAL_FILE = /^assets\/video\/[A-Za-z0-9._\/-]+\.(mp4|webm)$/;
const LOCAL_TRACK = /^assets\/video\/[A-Za-z0-9._\/-]+\.vtt$/;

/** @returns {{ok:true,kind:string,embedUrl?:string,src?:string,tracks?:object[]}|{ok:false,reason:string}} */
export function validateVideo(video, subtitles = []) {
  if (!video || typeof video !== 'object') return { ok: false, reason: 'none' };
  if (video.type === 'youtube') {
    if (typeof video.id !== 'string' || !YT_ID.test(video.id)) return { ok: false, reason: 'invalid-id' };
    return { ok: true, kind: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&cc_lang_pref=ar&hl=ar` };
  }
  if (video.type === 'file') {
    if (typeof video.src !== 'string' || !LOCAL_FILE.test(video.src) || video.src.includes('..')) return { ok: false, reason: 'invalid-src' };
    const tracks = (Array.isArray(subtitles) ? subtitles : []).filter((t) => t && typeof t.src === 'string' && LOCAL_TRACK.test(t.src) && !t.src.includes('..') && /^[a-z]{2}$/.test(t.lang || ''));
    return { ok: true, kind: 'file', src: video.src, tracks };
  }
  return { ok: false, reason: 'unsupported-type' };
}

import { icon } from './icons.js';

/** Builds the player node. Nothing loads until the learner presses play. */
export function buildPlayer(video, subtitles, labels, title, contentType = 'text') {
  const wrap = document.createElement('div');
  wrap.className = 'academy-video';
  const res = validateVideo(video, subtitles);
  const msg = (head, sub, ic) => {
    wrap.classList.add('academy-video--empty');
    const box = document.createElement('div'); box.className = 'academy-video__empty';
    const p1 = document.createElement('strong'); p1.textContent = head;
    box.append(icon(ic, { size: 36 }), p1);
    if (sub) { const p2 = document.createElement('span'); p2.className = 'academy-muted'; p2.textContent = sub; box.append(p2); }
    wrap.replaceChildren(box);
  };
  if (!res.ok) {
    if (res.reason === 'none') {
      if (contentType === 'text') msg(labels.textOnly, labels.textOnlySub, 'file-text');
      else msg(labels.noVideo, labels.noVideoSub, 'clapperboard');
    } else msg(labels.badVideo, labels.noVideoSub, 'triangle-alert');
    return wrap;
  }
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'academy-video__play btn btn--primary';
  btn.append(icon('play', { size: 18 }), document.createTextNode(' ' + labels.play));
  btn.addEventListener('click', () => {
    let el;
    if (res.kind === 'youtube') {
      el = document.createElement('iframe');
      el.src = res.embedUrl;
      el.title = title;
      el.loading = 'lazy';
      el.referrerPolicy = 'strict-origin-when-cross-origin';
      el.allow = 'fullscreen; picture-in-picture';
      el.setAttribute('allowfullscreen', '');
      el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
    } else {
      el = document.createElement('video');
      el.controls = true; el.preload = 'none'; el.playsInline = true;
      el.src = res.src;
      res.tracks.forEach((t) => {
        const tr = document.createElement('track');
        tr.kind = 'subtitles'; tr.src = t.src; tr.srclang = t.lang; tr.label = t.label || t.lang;
        el.append(tr);
      });
      el.addEventListener('error', () => { msg(labels.badVideo, labels.noVideoSub, 'triangle-alert'); });
    }
    wrap.replaceChildren(el);
    wrap.classList.add('academy-video--playing');
  });
  wrap.append(btn);
  return wrap;
}
