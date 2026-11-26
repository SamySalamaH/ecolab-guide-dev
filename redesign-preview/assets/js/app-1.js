function normalizeText(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '')   
    .replace(/[أإآا]/g, 'ا')          
    .replace(/ى/g, 'ي')                
    .replace(/ة/g, 'ه')                
    .replace(/\s+/g, ' ')
    .trim();
}
function getDangerLabel(danger) {
  const labels = { low: 'منخفضة', med: 'متوسطة', high: 'عالية' };
  return labels[danger] ?? 'غير محددة';
}
function getDangerVariant(danger) {
  const variants = { low: 'safe', med: 'warning', high: 'danger' };
  return variants[danger] ?? 'safe';
}
function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (key === 'class') {
      el.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'html') {
      el.innerHTML = value; 
    } else {
      el.setAttribute(key, value);
    }
  });
  children.forEach((child) => {
    el.append(child instanceof Node ? child : document.createTextNode(child));
  });
  return el;
}
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}
function renderSimpleMarkdown(text) {
  let safe = escapeHTML(text);
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  safe = safe.replace(/`(.+?)`/g, '<code>$1</code>');
  safe = safe
    .split('\n\n')
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
  return safe;
}
let toastRegionEl = null;
function showToast(message, variant = 'default', duration = 2600) {
  if (!toastRegionEl) {
    toastRegionEl = document.getElementById('toastRegion');
  }
  if (!toastRegionEl) return;
  const toast = createElement(
    'div',
    {
      class: `toast${variant !== 'default' ? ` toast--${variant}` : ''}`,
      role: 'status',
      'aria-live': 'polite'
    },
    [message]
  );
  toastRegionEl.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error('Clipboard API غير متاحة');
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      return true;
    } catch {
      return false;
    }
  }
}
function debounce(fn, delay = 200) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
function formatTime(timestamp) {
  return new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(
    new Date(timestamp)
  );
}
function isOffline() {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}
function toggleExpandable(triggerEl, bodyEl, forceState) {
  const nowExpanded = forceState ?? triggerEl.getAttribute('aria-expanded') !== 'true';
  triggerEl.setAttribute('aria-expanded', String(nowExpanded));
  bodyEl.dataset.open = String(nowExpanded);
  return nowExpanded;
}


const chemicals = [
  { id: 1, nameEn: 'SOLID POWER XL', nameAr: 'سوليد باور اكس ال', desc: 'منظف غسالات الأطباق الصلبة (أوتوماتيك)', category: ['dish'], danger: 'high', dilution: 'جرعة تلقائية عبر Dispenser الغسالة — اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'لا يخفف يدوياً — Dispenser الغسالة فقط', ppe: [{ icon: '🧤', label: 'قفازات مطاط' }, { icon: '👓', label: 'نظارة واقية' }], usage: 'يوضع في غسالة الأطباق الأوتوماتيك. فعّال ضد الدهون والبقايا الصلبة.', storage: 'بارد وجاف — بعيداً عن المواد الحمضية.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة وأزل العدسات فوراً' }, { icon: '🖐️', text: 'الجلد: ماء وصابون جيداً' }, { icon: '😮', text: 'الابتلاع: لا تستفز القيء — اتصل بالطوارئ' }], hazard: 'قلوي قوي — حروق الجلد والعين عند التركيز العالي' },
  { id: 2, nameEn: 'SOLID BRILLIANCE', nameAr: 'سوليد برييلنس', desc: 'مجفف غسالات الأطباق الصلبة', category: ['dish'], danger: 'med', dilution: 'تلقائي عبر Dispenser الغسالة', dilutionNote: 'لا يخفف يدوياً', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'مادة شطف ومجفف للأطباق — يمنع آثار المياه ويُلمّع.', storage: 'بعيداً عن الحرارة والرطوبة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء فوراً' }, { icon: '🖐️', text: 'الجلد: ماء وصابون' }], hazard: 'مهيج للجلد والعين' },
  { id: 3, nameEn: 'SOLITAIRE', nameAr: 'سوليتير', desc: 'مادة الغسيل اليدوي للأواني', category: ['dish'], danger: 'med', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'مناسب للاستخدام اليدوي المباشر', ppe: [{ icon: '🧤', label: 'قفازات' }], usage: 'سائل غسيل يدوي لطيف — يُرغّد جيداً ويزيل الدهون.', storage: 'من 0 لـ50°م — بعيداً عن الشمس. (مرجع: صحيفة أمان بنفس الاسم — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة بالماء' }, { icon: '🖐️', text: 'الجلد: اغسل بالماء 15 دقيقة' }], hazard: 'مهيج للجلد والعين في العبوة المركزة' },
  { id: 4, nameEn: 'SOLID SILVER POWER', nameAr: 'سيلفر باور', desc: 'مادة نقع أدوات المائدة (السيلفر)', category: ['dish'], danger: 'med', dilution: 'حسب تعليمات الجهاز في حوض النقع', dilutionNote: 'يستخدم في حوض النقع', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }, { icon: '💨', label: 'تهوية' }], usage: 'متخصص لنقع وتنظيف أدوات المائدة الفضية والاستانلس ستيل.', storage: 'مكان جاف وبارد.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة بالماء' }, { icon: '🖐️', text: 'الجلد: ماء وصابون' }], hazard: 'مهيج معتدل' },
  { id: 5, nameEn: 'SUPER TRUMP', nameAr: 'سوبر ترامب', desc: 'منظف غسالات الأطباق السائلة', category: ['dish'], danger: 'high', dilution: 'يُضخ تلقائياً عبر الجهاز', dilutionNote: 'لا يُستخدم يدوياً — قلوي قوي جداً', ppe: [{ icon: '🧤', label: 'قفازات مطاط' }, { icon: '👓', label: 'نظارة' }, { icon: '👕', label: 'ملابس واقية' }], usage: 'منظف سائل قوي لغسالات الأطباق التجارية.', storage: 'بعيداً عن المواد الحمضية والحرارة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري' }, { icon: '🖐️', text: 'الجلد: أزل الملابس واغسل فوراً' }, { icon: '😮', text: 'الابتلاع: لا تستفز القيء — طواري' }], hazard: 'قلوي قوي — خطر حروق' },
  { id: 6, nameEn: 'RINSE DRY', nameAr: 'رينز دراي', desc: 'مجفف غسالات الأطباق السائلة', category: ['dish'], danger: 'med', dilution: 'يُجرع تلقائياً عبر الغسالة', dilutionNote: 'لا يخفف يدوياً', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'مادة شطف سائلة — تمنع آثار المياه وتُسرّع التجفيف.', storage: 'بعيداً عن الحرارة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء' }], hazard: 'مهيج معتدل للجلد والعين' },
  { id: 7, nameEn: 'OASIS 146', nameAr: 'أواسيس 146', desc: 'مطهر أسطح متعدد الأغراض', category: ['sanitize'], danger: 'high', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: '150–400 ppm بشرائط قياس (رقم سامي؛ ورقة المورد كانت 200–400 وسامي قال إنها غلطة طباعة) — حسب ملصق العبوة وخطة المكان', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'مطهر أسطح وأدوات يُستخدم بعد الغسل. الأسطح: يُرش ويُترك يجف بدون شطف. الأواني: الحوض الثالث دقيقة على الأقل ثم تجفيف هوائي. التركيز 150–400 جزء في المليون (ppm) ويُتابَع بشرائط القياس بشكل دوري — حسب ملصق العبوة وخطة المكان.', storage: 'من 0 لـ50°م — بعيداً عن الشمس. (مرجع: صحيفة أمان أمريكية بنفس الاسم — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '😮', text: 'الابتلاع: اشطف الفم + طواري' }], hazard: '⛔ العبوة المركزة كاوية — حروق للجلد والعين' },
  { id: 8, nameEn: 'OASIS 137', nameAr: 'أواسيس 137', desc: 'منظف متعدد الأغراض', category: ['sanitize'], danger: 'med', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'التخفيف حسب ملصق العبوة ونوع الاستخدام', ppe: [{ icon: '🧤', label: 'قفازات' }], usage: 'منظف متعدد الأغراض لأسطح المطبخ.', storage: 'من -10 لـ50°م. (مرجع: صحيفة أمان Oasis 133 — نفس المنتج باسم مختلف حسب سامي — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء' }, { icon: '🖐️', text: 'الجلد: اغسل بالماء' }], hazard: 'مهيج للعين في العبوة المركزة' },
  { id: 9, nameEn: 'SANICHLOR', nameAr: 'سانيكلور', desc: 'مطهر الخضروات والفاكهة (أقراص)', category: ['sanitize'], danger: 'med', dilution: 'قرص واحد لكل 5 لتر ماء = 100 ppm — اترك الخضار والفاكهة 5 دقائق ثم اشطفها', dilutionNote: 'الجرعة من ورقة استخدام المورد (إيكولاب) وأكدها سامي، ومش من جدول النشرة الأوروبية القديم. تُتابَع بالتركيز 100 ppm — حسب ملصق العبوة وخطة المكان. اشطف الخضار بماء شرب بعد الغسيل', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '💨', label: 'تهوية جيدة' }], usage: 'أقراص كلور لتطهير ماء غسيل الخضروات والفاكهة — كل قرص 500 مجم مادة فعالة. يجب الشطف جيداً بعد الاستخدام.', storage: 'من 0 لـ40°م في العبوة الأصلية مغلقة. (من صحيفة الأمان البريطانية اللي بعتها — وهي لسوق أجنبي برضه — ملصق العبوة عندك هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة على الأقل' }, { icon: '😮', text: 'الابتلاع: لا تستفز القيء — طواري' }, { icon: '💨', text: 'الاستنشاق: انتقل لمكان مفتوح' }], hazard: '⛔ لا تخلطه مع مواد حمضية أو أمونيا أو أي منتج آخر — غاز سام' },
  { id: 10, nameEn: 'ENFORCE', nameAr: 'إنفورس', desc: 'منظف الأرضيات', category: ['floor'], danger: 'high', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'التخفيف حسب ملصق العبوة', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }, { icon: '👞', label: 'حذاء مقاوم' }], usage: 'منظف قوي للأرضيات — يزيل الدهون والأوساخ الصعبة في المطابخ.', storage: 'مكان جاف — بعيداً عن الأحماض والتجمد.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '🖐️', text: 'الجلد: اشطف 15 دقيقة + طواري' }], hazard: '⛔ كاوي ويحتوي كلور (هيبوكلوريت) — لا تخلطه مع أحماض أو أمونيا — الأرضية زلقة أثناء الاستخدام' },
  { id: 11, nameEn: 'LIME-AWAY EXTRA', nameAr: 'لايم أواي إكسترا', desc: 'مزيل الأملاح والترسبات الكلسية', category: ['descale'], danger: 'high', dilution: 'حسب شدة الترسبات — راجع ملصق المنتج', dilutionNote: '⛔ حمضي قوي — لا تخلطه مع الكلور أبداً', ppe: [{ icon: '🧤', label: 'قفازات سميكة' }, { icon: '👓', label: 'نظارة' }, { icon: '👕', label: 'ملابس واقية' }, { icon: '💨', label: 'تهوية كافية' }], usage: 'يزيل الأملاح والترسبات الكلسية من الغسالات وأجهزة البخار والاستانلس ستيل.', storage: 'بعيداً عن القلويات والكلور — مُقفل جيداً.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '🖐️', text: 'الجلد: أزل الملابس + اشطف فوراً' }, { icon: '😮', text: 'الابتلاع: لا تستفز القيء — طواري فوراً' }], hazard: '⛔ حمضي قوي — حروق شديدة. لا تخلطه مع الكلور' },
  { id: 12, nameEn: 'GREASESTRIP PLUS', nameAr: 'جريس ستريب بلاس', desc: 'مزيل الشحوم القوي للأفران والجريلات', category: ['degreaser'], danger: 'high', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'التخفيف حسب ملصق العبوة', ppe: [{ icon: '🧤', label: 'قفازات سميكة' }, { icon: '👓', label: 'نظارة' }, { icon: '👕', label: 'أكمام طويلة' }, { icon: '💨', label: 'تهوية جيدة' }], usage: 'مزيل شحوم متخصص للمطابخ التجارية — شفاطات الهواء والأفران والأسطح شديدة الاتساخ. pH 12.5', storage: 'من 0 لـ50°م — بعيداً عن المواد الحمضية. (مرجع: صحيفة أمان بنفس الاسم — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '🖐️', text: 'الجلد: اشطف 15 دقيقة + طواري' }, { icon: '💨', text: 'الاستنشاق: هواء نقي' }], hazard: '⛔ قلوي كاوي — حروق للجلد وضرر دائم للعين' },
  { id: 13, nameEn: 'AB CLEAN & SMOOTH', nameAr: 'أنتي باكتيريال كلين أند سموث', desc: 'صابون اليد المضاد للبكتيريا', category: ['hand'], danger: 'low', dilution: 'جاهز للاستخدام — بدون تخفيف', dilutionNote: 'يُوضع على اليدين مباشرة', ppe: [{ icon: '✅', label: 'لا يحتاج PPE' }], usage: 'صابون يدين مضاد للبكتيريا. مناسب للاستخدام المتكرر في المطبخ والخدمة.', storage: 'من 5 لـ45°م. (مرجع: صحيفة أمان بنفس الاسم — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء إذا دخل' }], hazard: 'آمن — مهيج طفيف للعين فقط' },
  { id: 14, nameEn: 'INSTANT HAND SANITIZER', nameAr: 'أنستانت هاند سانيتايزر', desc: 'معقم اليدين الفوري', category: ['hand'], danger: 'low', dilution: 'جاهز للاستخدام — بدون شطف', dilutionNote: 'افرك اليدين حتى يجف تلقائياً', ppe: [{ icon: '✅', label: 'لا يحتاج PPE' }], usage: 'معقم يدين كحولي — بدون ماء. مدة الاستخدام وفاعليته حسب ملصق المنتج.', storage: '⚠️ قابل للاشتعال — بعيداً عن الحرارة والنار. درجة الحرارة حسب ملصق العبوة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء' }, { icon: '😮', text: 'الابتلاع بكمية كبيرة: طواري' }], hazard: '⚠️ قابل للاشتعال — بعيداً عن النار والحرارة' },
  { id: 15, nameEn: 'DECARBONIZER MXP', nameAr: 'ديكاربونايزر', desc: 'مادة نقع الأواني المحروقة', category: ['dish'], danger: 'high', dilution: 'يُخفف في حوض النقع حسب التعليمات', dilutionNote: 'لا يُستخدم مباشرة بدون تخفيف', ppe: [{ icon: '🧤', label: 'قفازات سميكة' }, { icon: '👓', label: 'نظارة' }, { icon: '💨', label: 'تهوية' }], usage: 'لإزالة الترسبات والمحترقات الصعبة من الأواني — نقع ثم شطف جيد.', storage: 'بارد وجاف — مُقفل.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري' }, { icon: '🖐️', text: 'الجلد: اشطف فوراً' }, { icon: '😮', text: 'الابتلاع: طواري فوراً' }], hazard: 'خطر عالٍ — يُسبب حروق كيميائية' },
  { id: 16, nameEn: 'ECO CLIN TABS', nameAr: 'ايكوكلين تاب', desc: 'منظف ماكينات غسيل الأكواب (أقراص)', category: ['dish'], danger: 'med', dilution: 'حسب تعليمات الجهاز وملصق العبوة', dilutionNote: '⚠️ لا تلمس الأقراص بيدين مبللتين', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'أقراص منظفة لماكينات غسيل الأكواب — موزونة بدقة وسهلة الاستخدام.', storage: 'مكان جاف بعيداً عن الرطوبة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة بالماء' }, { icon: '🖐️', text: 'الجلد: ماء وصابون' }], hazard: 'مهيج للعين في العبوة المركزة' },
  { id: 17, nameEn: 'CHROMOL', nameAr: 'كروومول', desc: 'ملمع الاستانلس ستيل', category: ['other'], danger: 'low', dilution: 'مباشر بدون تخفيف — امسح بقطعة ناعمة', dilutionNote: 'نظّف السطح بالمنظف متعدد الأغراض أولاً، ورش المادة على القماشة أو السطح، ولمّع في اتجاه تكوين الستانلس (with the grain) ولا تشطف بعدها — حسب ملصق العبوة وخطة المكان', ppe: [{ icon: '🧤', label: 'قفازات خفيفة' }], usage: 'ملمع وحافظ للأسطح الاستانلس ستيل — يُزيل البصمات ويكوّن طبقة حماية.', storage: 'بعيداً عن الحرارة.', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء' }], hazard: 'آمن نسبياً — تجنب استنشاق البخار' },
  { id: 18, nameEn: 'DIP-IT XP', nameAr: 'ديب إت إكس بي', desc: 'مزيل بقع الشاي والقهوة', category: ['dish'], danger: 'high', dilution: 'ملعقتان كبيرتان (30 جم) لكل 4 لتر ماء بدرجة 60–70°م', dilutionNote: 'انقع الأطباق والأكواب حتى زوال البقع ثم اشطف جيداً أو أدخلها دورة غسالة كاملة. 60–70°م ماء ساخن: انتبه للقفازات وللرذاذ — حسب ملصق العبوة وخطة المكان', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'متخصص لإزالة بقع الشاي والقهوة من الأكواب والفناجين والأطباق.', storage: 'مكان جاف وبارد.', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '🖐️', text: 'الجلد: اشطف 15 دقيقة + طواري' }], hazard: '⛔ كاوي في العبوة المركزة — ضرر دائم للعين وحروق للجلد' },
  { id: 19, nameEn: 'MIKRO QUAT', nameAr: 'مايكرو كوات', desc: 'مطهر ومزيل الروائح الكريهة', category: ['sanitize', 'floor'], danger: 'high', dilution: 'اتبع ملصق العبوة وخطة النظافة المعتمدة بالفندق', dilutionNote: 'للأرضيات والحوائط والأسطح بعد تنظيفها (مش للبالوعات): رش بالبخاخ أو جهاز الحقن، اتركه 10 دقائق للتفاعل ثم امسحه بالمساحة — حسب ملصق العبوة وخطة المكان', ppe: [{ icon: '🧤', label: 'قفازات' }, { icon: '👓', label: 'نظارة' }], usage: 'مطهر أرضيات ومزيل روائح كريهة. نظّف المكان أولاً، ثم رش الأرضيات أو الحوائط أو الأسطح، واتركه 10 دقائق، ثم امسحه. حسب ملصق العبوة وخطة المكان.', storage: 'من 0 لـ50°م. (مرجع: صحيفة أمان بنفس الاسم — ملصق العبوة هو المؤكد)', firstAid: [{ icon: '👁️', text: 'العين: اشطف 15 دقيقة + طواري فوراً' }, { icon: '🖐️', text: 'الجلد: اشطف 15 دقيقة + طواري' }], hazard: '⛔ كاوي في العبوة المركزة — ضرر دائم للعين وحروق للجلد' },
  { id: 20, nameEn: 'PATHWAYS', nameAr: 'باثوايز', desc: 'معالج مياه الصرف الصحي', category: ['other'], danger: 'low', dilution: 'حسب التعليمات — يُصب مباشرة في البالوعة', dilutionNote: 'يُستخدم دورياً للصيانة الوقائية', ppe: [{ icon: '🧤', label: 'قفازات' }], usage: 'بكتيريا حية وإنزيمات تُحلّل الدهون في مواسير الصرف — يمنع الانسداد ويقضي على الروائح.', storage: 'بارد — لا يُجمّد.', firstAid: [{ icon: '👁️', text: 'العين: اشطف بالماء' }], hazard: 'آمن — منتج بيولوجي طبيعي' }
];
const categoryMeta = {
  all: { label: 'الكل' },
  dish: { label: 'غسيل أطباق' },
  sanitize: { label: 'تطهير' },
  floor: { label: 'أرضيات' },
  descale: { label: 'إزالة أملاح' },
  degreaser: { label: 'مزيل شحوم' },
  hand: { label: 'العناية باليد' },
  other: { label: 'أخرى' }
};
