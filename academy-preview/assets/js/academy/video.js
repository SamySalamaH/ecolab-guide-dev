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

/** Builds the player node. Nothing loads until the learner presses play. */
export function buildPlayer(video, subtitles, labels, title) {
  const wrap = document.createElement('div');
  wrap.className = 'academy-video';
  const res = validateVideo(video, subtitles);
  if (!res.ok) {
    wrap.classList.add('academy-video--empty');
    const p = document.createElement('p');
    p.className = 'academy-video__msg';
    p.textContent = res.reason === 'none' ? labels.noVideo : labels.badVideo;
    wrap.append(p);
    return wrap;
  }
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'academy-video__play btn btn--primary';
  btn.textContent = labels.play;
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
      el.addEventListener('error', () => { wrap.replaceChildren(Object.assign(document.createElement('p'), { className: 'academy-video__msg', textContent: labels.badVideo })); });
    }
    wrap.replaceChildren(el);
  });
  wrap.append(btn);
  return wrap;
}
