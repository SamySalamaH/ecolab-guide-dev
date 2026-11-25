function buildLessonsSection() {
  const progress = createElement('p', { class: 'lessons__progress' });
  const updateProgress = () => {
    const scores = getState('quizScores');
    const n = LESSON_KEYS.filter((k) => scores[k]).length;
    progress.textContent = 'تقدمك: أكملت اختبار ' + n + ' من ' + LESSON_KEYS.length + ' دروس (محفوظ على جهازك فقط)';
  };
  updateProgress();
  const lessons = lessonsData.lessons.map((l, i) => buildLesson(l, i, updateProgress));
  const teacher = createElement('div', { class: 'lessons__teacher' }, [
    createElement('h3', { class: 'lesson-h' }, ['أسلوب المعلّم: إزاي بيرد على الأسئلة']),
    createElement('p', { class: 'lesson-p' }, ['أمثلة لطريقة الشرح: ببساطة، ويقولك تلاقي القيمة الرسمية فين، وميخترعش أرقام.']),
    ...lessonsData.teacher.map((t) =>
      createElement('div', { class: 'lesson-qa' }, [
        createElement('p', { class: 'lesson-qa__q' }, [t.q]),
        createElement('p', { class: 'lesson-qa__a' }, [t.a])
      ])
    )
  ]);
  return createElement('section', { class: 'lessons', 'aria-label': 'دروس تدريبية تفاعلية' }, [
    createElement('h2', { class: 'lessons__title' }, ['دروس تدريبية للاستيوارد']),
    createElement('p', { class: 'lesson-p' }, ['موقف من الشغل، تتصرف إزاي، الخطوات وليه، الغلطات الشائعة، واختبار صغير.']),
    createElement('div', { class: 'lessons__notice' }, [
      createElement('strong', {}, ['مش بديل عن الخطة المعتمدة. ']),
      'الدروس أداة تعلّم مساعدة، لا تغني عن خطة سلامة الغذاء المعتمدة في المنشأة، ولا عن ملصق المنتج وورقة بياناته، ولا عن تعليمات مسؤول سلامة الغذاء. أي قيمة تشغيلية مرجعها ملصق المنتج وتعليمات مكانك المعتمدة.'
    ]),
    progress,
    createElement('div', { class: 'accordion' }, lessons),
    teacher,
    buildDecisions()
  ]);
}


const scenes = [
  {
    title: 'المشهد ١: الثلاجة قبل التشغيل',
    situation: 'أول الوردية، فتحت ثلاجة الخط تجهّز خاماتك. شوف اللي قدامك:',
    items: [
      {
        text: 'صينية فراخ نيّ على رف فوق سلطة جاهزة للأكل',
        violation: true,
        feedback: 'القاعدة ١٠ و١١: النيّ ميتخزنش فوق ولا جنب الأكل الجاهز — التنقيط بيلوّثه من غير ما حد ياخد باله. التصرف الصح: النيّ في أدنى رف دائمًا، بالترتيب المعتمد في مكانك.'
      },
      {
        text: 'علبة صوص مفتوحة من غير ملصق ولا اسم',
        violation: true,
        feedback: 'القاعدة ٥: أي صنف خرج من عبوته أو اتجهّز لازم عليه ملصق واضح فيه اسمه على الأقل، وباقي بيانات الملصق (تاريخ التحضير والانتهاء) حسب نظام مكانك. من غير ملصق، محدش يعرف هو إيه ولا فاضل له قد إيه.'
      },
      {
        text: 'علبة ملصقها بتاريخ انتهاء فات',
        violation: true,
        feedback: 'القاعدة ٦: الفحص اليومي قبل التشغيل معناه إن أي صنف فات تاريخه مايستخدمش: يتسحب فورًا ويتبلّغ بيه، والتصرف فيه حسب إجراء المكان.'
      },
      {
        text: 'أكل مغطى، معمول له ملصق، ومرصوص في مكانه الصح',
        violation: false
      }
    ]
  },
  {
    title: 'المشهد ٢: التذويب والتبريد',
    situation: 'لفيت على المطبخ قبل التجهيز، ودي اللي عينك وقعت عليها:',
    items: [
      {
        text: 'فرخة متجمدة بتسيح على الرخامة في حرارة المطبخ',
        violation: true,
        feedback: 'القاعدة ٨: التذويب على الرخامة غلط مهما كنت مستعجل: بره بيسخن لدرجة بتخلي البكتيريا تشتغل والجواه لسه متجمد. التصرف الصح: التذويب بإحدى الطرق المعتمدة في خطة مكانك — والثلاجة هي الأسلم.'
      },
      {
        text: 'حلة شوربة كبيرة سخنة متسيبة على الرف لحد ما تبرد لوحدها',
        violation: true,
        feedback: 'القاعدة ٩: الأكل السخن مايتسابش يبرد ببطء — بيفضل فترة طويلة في درجة حرارة خطر. التصرف الصح: التبريد السريع بطريقة مكانك المعتمدة: تقسيم في أواني ضحلة، أو مبرّد سريع، أو حمام ثلج، حسب الخطة.'
      },
      {
        text: 'لحمة بتسيح في الثلاجة، في علبة مقفولة، على أدنى رف',
        violation: false
      },
      {
        text: 'أكل اتبرد بالطريقة المعتمدة ودخل الثلاجة بملصقه',
        violation: false
      }
    ]
  },
  {
    title: 'المشهد ٣: خط التجهيز والألواح',
    situation: 'وقت التجهيز، واقف جنب خط الإنتاج وبتتفرج على الشغل:',
    items: [
      {
        text: 'زميل قطّع فراخ نيّ على لوح، ومن غير ما يغسله كمّل تقطيع طماطم للسلطة',
        violation: true,
        feedback: 'القاعدة ١٠ و١٣: نفس اللوح من نيّ لجاهز من غير غسيل وتطهير = تلوث متبادل على المباشر. لكل نوع أكل لوحه ولونه حسب نظام الألوان المعتمد في مكانك، وبين أي نوعين: غسيل وتطهير.'
      },
      {
        text: 'طلب حساسية اتجهّز على اللوح والسكينة المخصصين لطلبات الحساسية، بعيد عن باقي الخط',
        violation: false
      },
      {
        text: 'زميل رجع من رمي المهملات ومسك خضار التجهيز على طول',
        violation: true,
        feedback: 'القاعدة ١: أي مهمة متسخة — مهملات، مسح أرضيات، كيماويات — معناها غسيل إيدين بطريقة المكان المعتمدة قبل لمس الأكل أو أي أداة بتلمسه.'
      },
      {
        text: 'كل لوح وسكينة راجعين مكانهم بعد الغسيل، كل لون في حتته',
        violation: false
      }
    ]
  },
  {
    title: 'المشهد ٤: منطقة الغسيل',
    situation: 'عدّيت على أحواض الغسيل والأسطح اللي حواليها:',
    items: [
      {
        text: 'فوطة المايكروفايبر متروكة معصورة على الرخامة بين استخدام واستخدام',
        violation: true,
        feedback: 'القاعدة ١٢: الفوطة بين الاستخدامات مكانها جوه محلول المطهر، مش على السطح: اللي متروكة بره بتجمّع الوسخ وبتنقله لأول سطح تلمسه. والتركيز حسب ملصق المطهر.'
      },
      {
        text: 'نفس الفوطة اتمسح بيها تنقيط فراخ نيّ، وبعدين اتمسح بيها سطح تجهيز سلطة',
        violation: true,
        feedback: 'القاعدة ١٢: فوطة أسطح اللحوم النيّة بتتفصل عن فوطة أي حاجة تانية — نفس الفوطة بين النيّ والجاهز بتنقل التلوث بنفسها.'
      },
      {
        text: 'جردل محلول المطهر على الأرض جنب الحوض',
        violation: true,
        feedback: 'القاعدة ١٢: عبوة المحلول بتتخزن مرفوعة عن الأرض وبحيث متلوثش أكل ولا أدوات ولا مفارش — الأرض مش مكانها.'
      },
      {
        text: 'فوطة نضيفة مركونة في محلول المطهر، بتطلع وقت الاستخدام وترجع له',
        violation: false
      }
    ]
  },
  {
    title: 'المشهد ٥: خط التقديم والبوفيه',
    situation: 'البوفيه شغال والأطباق بتطلع للضيوف:',
    items: [
      {
        text: 'واحد بيرصّ شرايح الخبز والجارنش على الأطباق الجاهزة بإيده من غير قفاز ولا ملقط',
        violation: true,
        feedback: 'القاعدة ٧: الأكل الجاهز للأكل مايتلمسش بالإيد المجردة أبدًا: ملقط أو قفاز مخصوص للمهمة دي، حسب نظام مكانك.'
      },
      {
        text: 'زميل لابس قفاز، رد على موبايله، وبعدين كمّل رصّ الأكل بنفس القفاز',
        violation: true,
        feedback: 'القاعدة ٧ مع القاعدة ١: القفاز لمهمة واحدة بس، وأي حاجة بره الشغل — موبايل، فلوس، مهملات — معناها تشيل القفاز، تغسل إيدك، وتلبس واحد نضيف.'
      },
      {
        text: 'كل طبق على البوفيه ليه معلقته الخاصة، والأكل متغطي',
        violation: false
      },
      {
        text: 'زميلة غسلت إيدها ولبست قفاز نضيف قبل ما تلمس الأكل الجاهز',
        violation: false
      }
    ]
  },
  {
    title: 'المشهد ٦: المخزن الجاف بعد الاستلام',
    situation: 'التوريد وصل الصبح وإنت بترصّ المخزن:',
    items: [
      {
        text: 'شكارة أرز اتفضّت في علبة تخزين من غير أي ملصق',
        violation: true,
        feedback: 'القاعدة ٥: أي خامة خرجت من عبوتها الأصلية لازم اسمها على العلبة الجديدة، وباقي بيانات الملصق حسب نظام مكانك — وإلا بعد فترة محدش هيعرف إيه اللي جواها ولا من إمتى.'
      },
      {
        text: 'كراتين توريد متروكة على الأرض لحد ما حد يفضّي',
        violation: true,
        feedback: 'الأكل والخامات ميتخزنوش على الأرض: الرفوف المرتفعة بتحمي من الرطوبة والاتساخ والحشرات وبتخلي الأرضية تتنضف — زي ما اتشرح في درس الاستلام والتخزين.'
      },
      {
        text: 'التوريد الجديد اترصّ ورا القديم، عشان الأقدم يتسحب الأول',
        violation: false
      },
      {
        text: 'كيس معكرونة مفتوح ومتهتري متسيب كده على الرف',
        violation: true,
        feedback: 'أي عبوة مفتوحة أو متهترية مش مكانها الرف: ممكن تكون اتلوثت أو دخلتها حشرات. تتسحب وتتبلّغ، والتصرف فيها حسب إجراء المكان.'
      }
    ]
  }
];
function buildScene(scene, onFirstCheck) {
  const box = createElement('div', {});
  const render = () => {
    const itemButtons = scene.items.map((item) =>
      createElement('button', { class: 'spotcheck-item', type: 'button', 'aria-pressed': 'false' }, [
        createElement('span', { class: 'spotcheck-item__text' }, [item.text]),
        createElement('span', { class: 'spotcheck-item__mark', 'aria-hidden': 'true' }, [])
      ])
    );
    const feedbackList = createElement('div', { class: 'spotcheck-feedback', hidden: 'hidden' });
    const result = createElement('p', { class: 'lesson-score', hidden: 'hidden' });
    itemButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const picked = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', picked ? 'false' : 'true');
        btn.classList.toggle('spotcheck-item--picked', !picked);
      });
    });
    const check = createElement('button', { class: 'lesson-retry spotcheck__check', type: 'button' }, ['تحقق']);
    const retry = createElement('button', { class: 'lesson-retry', type: 'button', hidden: 'hidden' }, ['جرّب المشهد تاني']);
    retry.addEventListener('click', render);
    check.addEventListener('click', () => {
      let hit = 0;
      const total = scene.items.filter((it) => it.violation).length;
      scene.items.forEach((item, j) => {
        const btn = itemButtons[j];
        const picked = btn.getAttribute('aria-pressed') === 'true';
        const mark = btn.querySelector('.spotcheck-item__mark');
        btn.disabled = true;
        btn.classList.remove('spotcheck-item--picked');
        if (item.violation && picked) {
          hit++;
          btn.classList.add('spotcheck-item--hit');
          mark.textContent = ' ✅ مخالفة';
        } else if (item.violation) {
          btn.classList.add('spotcheck-item--miss');
          mark.textContent = ' ⚠️ مخالفة فاتتك';
        } else if (picked) {
          btn.classList.add('spotcheck-item--false');
          mark.textContent = ' ❌ دي سليمة';
        } else {
          btn.classList.add('lesson-opt--dim');
          mark.textContent = ' ✔️ سليمة';
        }
      });
      result.hidden = false;
      result.textContent = 'لقطت ' + hit + ' من ' + total + ' مخالفة في المشهد ده.';
      feedbackList.hidden = false;
      feedbackList.replaceChildren(
        ...scene.items
          .filter((it) => it.violation)
          .map((it) => createElement('p', { class: 'lesson-feedback' }, [it.feedback]))
      );
      check.disabled = true;
      retry.hidden = false;
      onFirstCheck?.({ hit, total });
    });
    box.replaceChildren(
      createElement('div', { class: 'lesson-opts spotcheck-items' }, itemButtons),
      check,
      feedbackList,
      result,
      retry
    );
  };
  render();
  return createElement('div', { class: 'lesson-decision spotcheck-scene' }, [
    createElement('p', { class: 'lesson-qa__q' }, [scene.title]),
    createElement('p', { class: 'lesson-p' }, [scene.situation]),
    box
  ]);
}
function buildSpotcheck() {
  const totalViolations = scenes.reduce((n, s) => n + s.items.filter((i) => i.violation).length, 0);
  const firstTry = scenes.map(() => null); 
  const score = createElement('p', { class: 'lesson-score', hidden: 'hidden' });
  const updateScore = () => {
    const done = firstTry.filter((r) => r !== null);
    if (!done.length) return;
    score.hidden = false;
    const hit = done.reduce((n, r) => n + r.hit, 0);
    score.textContent =
      'من أول محاولة في كل مشهد لقطت ' + hit + ' من ' + totalViolations +
      ' مخالفة (تدريب الجلسة دي، مش بيتسجل)';
  };
  const cards = scenes.map((scene, i) =>
    buildScene(scene, (result) => {
      if (firstTry[i] === null) {
        firstTry[i] = result;
        updateScore();
      }
    })
  );
  return createElement('div', { class: 'lessons__decisions spotcheck' }, [
    createElement('h3', { class: 'lesson-h' }, ['اكتشف الغلط: افحص محطتك بعين مسؤول السلامة']),
    createElement('p', { class: 'lesson-p' }, [
      'ست مشاهد من المطبخ: في كل مشهد حاجات صح وحاجات مخالفة للقواعد الذهبية. علّم على اللي تشوفه غلط، وبعدين اضغط «تحقق»: هتعرف إيه المخالفة، مرتبطة بأنهي قاعدة، وليه، وإيه التصرف الصح حسب تعليمات مكانك. التدريب ده للجلسة دي بس ومش بيتسجل، ومش بديل عن تفتيش مسؤول سلامة الغذاء ولا عن الخطة المعتمدة.'
    ]),
    ...cards,
    score
  ]);
}


let searchQuery = '';
let activeCategory = 'all';
const expandedCardIds = new Set();
let rootEl__chemicals = null;
function init__chemicals() {
  rootEl__chemicals = document.querySelector('[data-view="chemicals"]');
  if (!rootEl__chemicals || rootEl__chemicals.dataset.initialized === 'true') return;
  rootEl__chemicals.dataset.initialized = 'true';
  rootEl__chemicals.innerHTML = '';
  rootEl__chemicals.appendChild(createElement('h1', { class: 'u-visually-hidden' }, ['المواد الكيميائية']));
  rootEl__chemicals.appendChild(buildToolbar());
  rootEl__chemicals.appendChild(createElement('div', { class: 'stats-bar', id: 'chemStatsBar' }));
  rootEl__chemicals.appendChild(createElement('div', { class: 'cards-list', id: 'chemCardsList' }));
  bindDelegatedEvents__chemicals();
  renderList();
}
function buildToolbar() {
  const searchInput = createElement('input', {
    type: 'search',
    class: 'field__input field__input--with-icon',
    id: 'chemSearchInput',
    placeholder: 'ابحث عن مادة، استخدام، أو خطر...',
    'aria-label': 'بحث في المواد الكيميائية'
  });
  const filterChips = Object.entries(categoryMeta).map(([key, meta]) =>
    createElement(
      'button',
      {
        class: 'chip',
        type: 'button',
        'data-category': key,
        'aria-pressed': key === activeCategory ? 'true' : 'false'
      },
      [meta.label]
    )
  );
  return createElement('div', { class: 'toolbar' }, [
    createElement('div', { class: 'field__control-wrap' }, [
      createElement('span', { class: 'field__icon', 'aria-hidden': 'true' }, ['🔍']),
      searchInput
    ]),
    createElement('div', { class: 'toolbar__filters u-scroll-x', role: 'group', 'aria-label': 'تصفية حسب الفئة' }, filterChips)
  ]);
}
function bindDelegatedEvents__chemicals() {
  const searchInput = rootEl__chemicals.querySelector('#chemSearchInput');
  searchInput.addEventListener(
    'input',
    debounce((e) => {
      searchQuery = e.target.value;
      renderList();
    }, 180)
  );
  rootEl__chemicals.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-category]');
    if (chip) {
      activeCategory = chip.dataset.category;
      rootEl__chemicals.querySelectorAll('[data-category]').forEach((btn) => {
        btn.setAttribute('aria-pressed', btn.dataset.category === activeCategory ? 'true' : 'false');
      });
      renderList();
      return;
    }
    const toggleBtn = e.target.closest('.card__toggle');
    if (toggleBtn) {
      handleCardToggle(toggleBtn);
      return;
    }
    const favoriteBtn = e.target.closest('[data-action="favorite"]');
    if (favoriteBtn) {
      handleFavoriteClick(favoriteBtn);
      return;
    }
    const copyBtn = e.target.closest('[data-action="copy"]');
    if (copyBtn) {
      handleCopyClick(copyBtn);
      return;
    }
    const relatedBtn = e.target.closest('[data-action="open-related"]');
    if (relatedBtn) {
      openChemicalById(Number(relatedBtn.dataset.chemId));
    }
  });
}
function getFilteredChemicals() {
  const normalizedQuery = normalizeText(searchQuery);
  return chemicals.filter((chem) => {
    const matchesCategory = activeCategory === 'all' || chem.category.includes(activeCategory);
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = normalizeText(
      [chem.nameAr, chem.nameEn, chem.desc, chem.usage, chem.hazard].join(' ')
    );
    return haystack.includes(normalizedQuery);
  });
}
function renderList() {
  const filtered = getFilteredChemicals();
  const listEl = rootEl__chemicals.querySelector('#chemCardsList');
  const statsEl = rootEl__chemicals.querySelector('#chemStatsBar');
  statsEl.textContent = `${filtered.length} من ${chemicals.length} مادة`;
  listEl.innerHTML = '';
  if (filtered.length === 0) {
    listEl.appendChild(buildEmptyState());
    return;
  }
  const favorites = getState('favoriteChemicalIds');
  filtered.forEach((chem) => {
    listEl.appendChild(buildChemicalCard(chem, favorites.includes(chem.id)));
  });
}
function buildEmptyState() {
  return createElement('div', { class: 'empty-state' }, [
    createElement('div', { class: 'empty-state__icon', 'aria-hidden': 'true' }, ['🔍']),
    createElement('div', {}, ['لا توجد نتائج مطابقة']),
    createElement('div', { class: 'u-visually-hidden' }, ['جرّب كلمة بحث أخرى أو غيّر الفئة المختارة'])
  ]);
}
function buildChemicalCard(chem, isFavorite) {
  const bodyId = `chem-body-${chem.id}`;
  const isExpanded = expandedCardIds.has(chem.id);
  const dangerVariant = getDangerVariant(chem.danger);
  const card = createElement('article', {
    class: `card${isExpanded ? ' card--expanded' : ''}`,
    'data-chem-id': chem.id
  });
  card.appendChild(createElement('div', { class: `card__accent-strip card__accent-strip--${dangerVariant}` }));
  card.appendChild(
    createElement('div', { class: 'card__header' }, [
      createElement(
        'button',
        {
          class: 'card__toggle',
          type: 'button',
          'aria-expanded': isExpanded ? 'true' : 'false',
          'aria-controls': bodyId,
          'data-chem-id': chem.id
        },
        [
          createElement('div', { class: 'card__title-group' }, [
            createElement('div', { class: 'card__title' }, [chem.nameEn]),
            createElement('div', { class: 'card__description' }, [chem.nameAr]),
            createElement('div', { class: 'card__subtitle' }, [chem.desc])
          ]),
          createElement('span', { class: 'card__chevron', 'aria-hidden': 'true' }, ['▾'])
        ]
      ),
      createElement(
        'button',
        {
          class: `btn btn--icon btn--ghost${isFavorite ? ' btn--primary' : ''}`,
          type: 'button',
          'data-action': 'favorite',
          'data-chem-id': chem.id,
          'aria-pressed': isFavorite ? 'true' : 'false',
          'aria-label': isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'
        },
        [isFavorite ? '★' : '☆']
      )
    ])
  );
  card.appendChild(buildCardBody(chem, bodyId, isExpanded, dangerVariant));
  return card;
}
function buildCardBody(chem, bodyId, isExpanded, dangerVariant) {
  const relatedChemicals = chemicals
    .filter((c) => c.id !== chem.id && c.category.some((cat) => chem.category.includes(cat)))
    .slice(0, 4);
  const bodyInner = createElement('div', { class: 'card__body-inner' }, [
    createElement('div', { class: 'status-pill' }, [
      createElement('span', { class: `status-pill__dot status-pill__dot--${dangerVariant}` }),
      `مستوى الخطورة: ${getDangerLabel(chem.danger)}`
    ]),
    createElement('div', { class: 'card__section' }, [
      createElement('div', { class: 'card__section-label' }, ['الاستخدام']),
      createElement('div', { class: 'card__section-value' }, [chem.usage])
    ]),
    createElement('div', { class: 'card__section card__section--full' }, [
      createElement('div', { class: 'card__section-label' }, ['التخفيف']),
      createElement('div', { class: 'chem-card__dilution-box' }, [
        createElement('span', { 'aria-hidden': 'true' }, ['🧪']),
        createElement('div', {}, [
          createElement('div', { class: 'chem-card__dilution-ratio' }, [chem.dilution]),
          createElement('div', { style: 'font-size:12px;color:var(--content-muted);margin-top:2px' }, [chem.dilutionNote])
        ])
      ])
    ]),
    createElement('div', { class: 'card__section card__section--full' }, [
      createElement('div', { class: 'card__section-label' }, ['معدات الحماية المطلوبة (PPE)']),
      createElement(
        'div',
        { class: 'chem-card__ppe-row' },
        chem.ppe.map((item) =>
          createElement('span', { class: 'chem-card__ppe-item' }, [`${item.icon} ${item.label}`])
        )
      )
    ]),
    createElement('div', { class: 'card__section card__section--full' }, [
      createElement('div', { class: 'card__section-label' }, ['الإسعافات الأولية']),
      createElement(
        'div',
        { class: 'u-flex-col u-gap-2' },
        chem.firstAid.map((item) =>
          createElement('div', { class: 'chem-card__firstaid-item' }, [
            createElement('span', { 'aria-hidden': 'true' }, [item.icon]),
            createElement('span', {}, [item.text])
          ])
        )
      )
    ]),
    createElement('div', { class: 'card__section' }, [
      createElement('div', { class: 'card__section-label' }, ['التخزين']),
      createElement('div', { class: 'card__section-value' }, [chem.storage])
    ]),
    createElement('div', { class: 'card__section' }, [
      createElement('div', { class: 'card__section-label' }, ['تحذير']),
      createElement('div', { class: 'card__section-value', style: 'color:var(--status-danger)' }, [chem.hazard])
    ]),
    createElement('div', { class: 'card__actions card__section--full' }, [
      createElement(
        'button',
        { class: 'btn btn--sm btn--ghost', type: 'button', 'data-action': 'copy', 'data-chem-id': chem.id },
        ['📋 نسخ التفاصيل']
      )
    ])
  ]);
  if (relatedChemicals.length > 0) {
    bodyInner.appendChild(
      createElement('div', { class: 'card__section card__section--full' }, [
        createElement('div', { class: 'card__section-label' }, ['مواد ذات صلة']),
        createElement(
          'div',
          { class: 'chem-card__related' },
          relatedChemicals.map((rel) =>
            createElement(
              'button',
              { class: 'chip', type: 'button', 'data-action': 'open-related', 'data-chem-id': rel.id },
              [rel.nameEn]
            )
          )
        )
      ])
    );
  }
  return createElement(
    'div',
    { class: 'card__body', id: bodyId, 'data-open': isExpanded ? 'true' : 'false' },
    [bodyInner]
  );
}
function handleCardToggle(toggleBtn) {
  const chemId = Number(toggleBtn.dataset.chemId);
  const card = toggleBtn.closest('.card');
  const body = card.querySelector('.card__body');
  const willExpand = !expandedCardIds.has(chemId);
  const nowExpanded = toggleExpandable(toggleBtn, body, willExpand);
  if (nowExpanded) {
    expandedCardIds.add(chemId);
    recordRecentChemical(chemId);
  } else {
    expandedCardIds.delete(chemId);
  }
  card.classList.toggle('card--expanded', nowExpanded);
}
function handleFavoriteClick(favoriteBtn) {
  const chemId = Number(favoriteBtn.dataset.chemId);
  const isNowFavorite = toggleFavoriteChemical(chemId);
  favoriteBtn.setAttribute('aria-pressed', String(isNowFavorite));
  favoriteBtn.setAttribute('aria-label', isNowFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة');
  favoriteBtn.textContent = isNowFavorite ? '★' : '☆';
  favoriteBtn.classList.toggle('btn--primary', isNowFavorite);
  showToast(isNowFavorite ? 'أُضيفت للمفضلة' : 'أُزيلت من المفضلة', 'success');
}
async function handleCopyClick(copyBtn) {
  const chemId = Number(copyBtn.dataset.chemId);
  const chem = chemicals.find((c) => c.id === chemId);
  if (!chem) return;
  const text = [
    `${chem.nameAr} / ${chem.nameEn}`,
    `الاستخدام: ${chem.usage}`,
    `التخفيف: ${chem.dilution}`,
    `الخطورة: ${getDangerLabel(chem.danger)}`,
    `التحذير: ${chem.hazard}`,
    `التخزين: ${chem.storage}`
  ].join('\n');
  const success = await copyToClipboard(text);
  showToast(success ? 'تم نسخ التفاصيل' : 'تعذّر النسخ', success ? 'success' : 'error');
}
function openChemicalById(chemId) {
  expandedCardIds.add(chemId);
  activeCategory = 'all';
  searchQuery = '';
  if (rootEl__chemicals) {
    rootEl__chemicals.querySelector('#chemSearchInput').value = '';
    renderList();
    requestAnimationFrame(() => {
      const card = rootEl__chemicals.querySelector(`[data-chem-id="${chemId}"]`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
registerView('chemicals', {
  onEnter: () => init__chemicals()
});


let rootEl__dashboard = null;
let unsubscribeFromState = null;
function init__dashboard() {
  rootEl__dashboard = document.querySelector('[data-view="dashboard"]');
  if (!rootEl__dashboard) return;
  if (rootEl__dashboard.dataset.initialized !== 'true') {
    rootEl__dashboard.dataset.initialized = 'true';
    bindDelegatedEvents__dashboard();
    unsubscribeFromState = subscribe(() => renderDynamicSections());
  }
  render();
}
function render() {
  rootEl__dashboard.innerHTML = '';
  rootEl__dashboard.appendChild(createElement('h1', { class: 'u-visually-hidden' }, ['لوحة التحكم الرئيسية']));
  rootEl__dashboard.appendChild(buildHeroPanel());
  rootEl__dashboard.appendChild(buildQuickActions());
  rootEl__dashboard.appendChild(createElement('div', { id: 'dashDynamicSections' }));
  renderDynamicSections();
}
function buildHeroPanel() {
  return createElement('div', { class: 'hero-panel' }, [
    createElement('div', { class: 'hero-panel__kicker' }, ['دليل شخصي للاستيوارد']),
    createElement('div', { class: 'hero-panel__title' }, ['دليلك للتشغيل الآمن']),
    createElement('div', { class: 'hero-panel__desc' }, [
      'مرجع فوري للمواد الكيميائية وإجراءات السلامة، وإجابات جاهزة للأسئلة التشغيلية الشائعة — كل ذلك يعمل بدون إنترنت.'
    ]),
    createElement('div', { class: 'hero-panel__actions' }, [
      createElement('button', { class: 'btn btn--primary', type: 'button', 'data-goto': 'chemicals' }, ['🧪 تصفح المواد']),
      createElement('button', { class: 'btn btn--ghost', type: 'button', 'data-goto': 'ai' }, ['🤖 اسأل المساعد'])
    ])
  ]);
}
function buildQuickActions() {
  const actions = [
    { icon: '📚', label: 'الأكاديمية', view: 'education' },
    { icon: '🚨', label: 'الطوارئ', view: 'safety' },
    { icon: '🤖', label: 'المساعد', view: 'ai' },
    { icon: '⚙️', label: 'الإعدادات', view: 'settings' }
  ];
  return createElement('div', {}, [
    createElement('div', { class: 'section-heading' }, ['إجراءات سريعة']),
    createElement(
      'div',
      { class: 'quick-actions' },
      actions.map((a) =>
        createElement('button', { class: 'quick-action', type: 'button', 'data-goto': a.view }, [
          createElement('span', { class: 'quick-action__icon', 'aria-hidden': 'true' }, [a.icon]),
          createElement('span', {}, [a.label])
        ])
      )
    )
  ]);
}
function renderDynamicSections() {
  const container = rootEl__dashboard?.querySelector('#dashDynamicSections');
  if (!container) return;
  container.innerHTML = '';
  container.appendChild(buildStatsGrid());
  container.appendChild(buildRecentSection());
  container.appendChild(buildFavoritesSection());
  container.appendChild(buildProgressSection());
}
function buildStatsGrid() {
  const favoritesCount = getState('favoriteChemicalIds').length;
  const completedCount = getState('completedModuleIds').length;
  const totalModules = educationModules.length;
  const stats = [
    { value: String(chemicals.length), label: 'مادة كيميائية', hint: 'قاعدة بيانات كاملة' },
    { value: String(favoritesCount), label: 'في المفضلة', hint: 'وصول سريع' },
    { value: `${completedCount}/${totalModules}`, label: 'وحدات مكتملة', hint: 'تقدّم الأكاديمية' }
  ];
  return createElement(
    'div',
    { class: 'dashboard-grid' },
    stats.map((s) =>
      createElement('div', { class: 'dashboard-card' }, [
        createElement('div', { class: 'dashboard-card__value' }, [s.value]),
        createElement('div', { class: 'dashboard-card__label' }, [s.label]),
        createElement('div', { class: 'dashboard-card__hint' }, [s.hint])
      ])
    )
  );
}
function buildRecentSection() {
  const recentIds = getState('recentChemicalIds');
  if (recentIds.length === 0) return createElement('div');
  const recentChemicals = recentIds
    .map((id) => chemicals.find((c) => c.id === id))
    .filter(Boolean)
    .slice(0, 5);
  return createElement('div', {}, [
    createElement('div', { class: 'section-heading' }, ['شوهد مؤخراً']),
    createElement(
      'div',
      { class: 'recent-list' },
      recentChemicals.map((chem) =>
        createElement('button', { class: 'recent-item', type: 'button', 'data-open-chem': chem.id }, [
          createElement('span', { 'aria-hidden': 'true' }, ['🧪']),
          createElement('div', { class: 'recent-item__meta' }, [
            createElement('div', { class: 'recent-item__title' }, [chem.nameEn]),
            createElement('div', { class: 'recent-item__sub' }, [chem.desc])
          ])
        ])
      )
    )
  ]);
}
function buildFavoritesSection() {
  const favoriteIds = getState('favoriteChemicalIds');
  if (favoriteIds.length === 0) return createElement('div');
  const favoriteChemicals = favoriteIds.map((id) => chemicals.find((c) => c.id === id)).filter(Boolean);
  return createElement('div', {}, [
    createElement('div', { class: 'section-heading' }, ['المفضلة']),
    createElement(
      'div',
      { class: 'recent-list' },
      favoriteChemicals.map((chem) =>
        createElement('button', { class: 'recent-item', type: 'button', 'data-open-chem': chem.id }, [
          createElement('span', { 'aria-hidden': 'true' }, ['⭐']),
          createElement('div', { class: 'recent-item__meta' }, [
            createElement('div', { class: 'recent-item__title' }, [chem.nameEn]),
            createElement('div', { class: 'recent-item__sub' }, [chem.desc])
          ])
        ])
      )
    )
  ]);
}
function buildProgressSection() {
  const completedCount = getState('completedModuleIds').length;
  const totalModules = educationModules.length;
  const percentage = Math.round((completedCount / totalModules) * 100);
  return createElement('div', {}, [
    createElement('div', { class: 'section-heading' }, ['تقدّم الأكاديمية']),
    createElement('div', { class: 'dashboard-card', style: 'margin:0 var(--space-4) var(--space-4)' }, [
      createElement('div', { class: 'u-flex u-justify-between u-items-center u-gap-2' }, [
        createElement('span', { class: 'dashboard-card__label' }, [`${completedCount} من ${totalModules} وحدة`]),
        createElement('span', { class: 'dashboard-card__value', style: 'font-size:16px' }, [`${percentage}%`])
      ]),
      createElement('div', { class: 'progress-bar', style: 'margin-top:8px' }, [
        createElement('div', { class: 'progress-bar__fill', style: `transform:scaleX(${percentage / 100})` })
      ])
    ])
  ]);
}
function bindDelegatedEvents__dashboard() {
  rootEl__dashboard.addEventListener('click', (e) => {
    const gotoBtn = e.target.closest('[data-goto]');
    if (gotoBtn) {
      navigateTo(gotoBtn.dataset.goto);
      return;
    }
    const openChemBtn = e.target.closest('[data-open-chem]');
    if (openChemBtn) {
      const chemId = Number(openChemBtn.dataset.openChem);
      navigateTo('chemicals');
      requestAnimationFrame(() => openChemicalById(chemId));
    }
  });
}
registerView('dashboard', {
  onEnter: () => init__dashboard(),
  onLeave: () => {
  }
});
