let rootEl__education = null;
function init__education() {
  rootEl__education = document.querySelector('[data-view="education"]');
  if (!rootEl__education || rootEl__education.dataset.initialized === 'true') return;
  rootEl__education.dataset.initialized = 'true';
  rootEl__education.innerHTML = '';
  const lessonsSection = buildLessonsSection();
  lessonsSection.appendChild(buildSpotcheck());
  rootEl__education.appendChild(lessonsSection);
  const accordion = createElement('div', { class: 'accordion' });
  educationModules.forEach((mod) => accordion.appendChild(buildAccordionItem(mod)));
  rootEl__education.appendChild(accordion);
  bindDelegatedEvents__education();
}
function buildAccordionItem(mod) {
  const bodyId = `edu-body-${mod.id}`;
  const isOpen = Boolean(mod.defaultOpen);
  const isCompleted = getState('completedModuleIds').includes(mod.id);
  const titleChildren = [mod.title];
  if (mod.isNew) {
    titleChildren.push(createElement('span', { class: 'accordion__badge-new' }, ['جديد']));
  }
  if (isCompleted) {
    titleChildren.push(createElement('span', { class: 'badge badge--brand', style: 'margin-inline-start:auto' }, ['✅ مكتمل']));
  }
  const header = createElement(
    'button',
    {
      class: 'accordion__header',
      type: 'button',
      'aria-expanded': isOpen ? 'true' : 'false',
      'aria-controls': bodyId,
      'data-module-id': mod.id
    },
    [
      createElement('span', { class: 'accordion__icon', 'aria-hidden': 'true' }, [mod.icon]),
      createElement('span', { class: 'accordion__title' }, titleChildren),
      createElement('span', { class: 'accordion__chevron', 'aria-hidden': 'true' }, ['▾'])
    ]
  );
  const bodyInner = createElement('div', { class: 'accordion__body-inner' }, buildModuleContent(mod));
  const body = createElement(
    'div',
    { class: 'accordion__body', id: bodyId, 'data-open': isOpen ? 'true' : 'false' },
    [bodyInner]
  );
  return createElement('div', { class: 'accordion__item', 'data-module-id': mod.id }, [
    createElement('h2', { style: 'font-size:inherit' }, [header]),
    body
  ]);
}
function buildModuleContent(mod) {
  switch (mod.id) {
    case 'science': return buildScienceModule(mod);
    case 'stages': return buildStagesModule(mod);
    case 'cleaning-types': return buildCleaningTypesModule(mod);
    case 'dishwasher': return buildDishwasherModule(mod);
    case 'equipment': return buildEquipmentModule(mod);
    case 'hygiene': return buildHygieneModule(mod);
    case 'conservation': return buildConservationModule(mod);
    case 'golden-rules': return buildGoldenRulesModule(mod);
    case 'haccp': return buildHaccpModule(mod);
    default: return [];
  }
}
function buildScienceModule(mod) {
  const soilGrid = createElement(
    'div',
    { class: 'info-grid' },
    mod.soilTypes.map((s) =>
      createElement('div', { class: 'info-card' }, [
        createElement('div', { class: 'info-card__icon', 'aria-hidden': 'true' }, [s.icon]),
        createElement('div', { class: 'info-card__title' }, [s.title]),
        createElement('div', { class: 'info-card__desc' }, [s.desc])
      ])
    )
  );
  const phBar = createElement('div', { class: 'ph-scale' }, [
    createElement('div', { class: 'ph-scale__bar', role: 'img', 'aria-label': 'مقياس pH من 1 إلى 14' }),
    createElement(
      'div',
      { class: 'ph-scale__numbers', 'aria-hidden': 'true' },
      Array.from({ length: 14 }, (_, i) => {
        const n = i + 1;
        return n === 7
          ? createElement('span', { class: 'ph-scale__numbers-neutral' }, [String(n)])
          : createElement('span', {}, [String(n)]);
      })
    ),
    createElement('div', { class: 'ph-scale__labels' }, [
      createElement('span', {}, ['حمضي قوي — يُزيل الأملاح']),
      createElement('span', {}, ['محايد pH 7 — آمن تماماً']),
      createElement('span', {}, ['قلوي قوي — يُزيل الدهون'])
    ])
  ]);
  const phRefList = createElement(
    'div',
    { class: 'ph-ref-list' },
    mod.phReference.map((ref) =>
      createElement('div', { class: 'ph-ref-item' }, [
        createElement('span', { class: `ph-ref-item__badge ph-ref-item__badge--${ref.type}` }, [`pH ${ref.ph}`]),
        createElement('span', { class: 'ph-ref-item__text' }, [ref.text])
      ])
    )
  );
  const levelsGrid = createElement(
    'div',
    { class: 'info-grid' },
    mod.cleaningLevels.map((lvl) =>
      createElement('div', { class: `info-card info-card--${lvl.variant}` }, [
        createElement('div', { class: 'info-card__icon', 'aria-hidden': 'true' }, [lvl.icon]),
        createElement('div', { class: 'info-card__title' }, [lvl.title]),
        createElement('div', { class: 'info-card__desc' }, [lvl.desc])
      ])
    )
  );
  return [
    soilGrid,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['مقياس pH — اختر المنظف الصحيح']),
    phBar,
    phRefList,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['الفرق بين التنظيف والتطهير والتعقيم']),
    levelsGrid
  ];
}
function buildStagesModule(mod) {
  return [buildStepsFlow(mod.steps)];
}
function buildStepsFlow(steps) {
  return createElement(
    'ol',
    { class: 'steps-flow' },
    steps.map((step, i) =>
      createElement('li', { class: 'step-item' }, [
        createElement(
          'div',
          { class: `step-item__number${step.variant ? ` step-item__number--${step.variant}` : ''}`, 'aria-hidden': 'true' },
          [step.label ?? String(i + 1)]
        ),
        createElement('div', { class: 'step-item__content' }, [
          createElement('div', { class: 'step-item__title' }, [step.title]),
          createElement('div', { class: 'step-item__desc' }, [step.desc])
        ])
      ])
    )
  );
}
function buildCleaningTypesModule(mod) {
  return mod.types.map((type) =>
    createElement('div', { class: 'equip-card' }, [
      createElement('div', { class: 'equip-card__title' }, [type.title]),
      createElement(
        'ul',
        { class: 'equip-card__steps' },
        type.items.map((item) => createElement('li', {}, [item]))
      )
    ])
  );
}
function buildDishwasherModule(mod) {
  const table = createElement('table', { class: 'data-table' }, [
    createElement('caption', { class: 'u-visually-hidden' }, ['درجات حرارة ماكينة غسيل الأطباق حسب المرحلة']),
    createElement('tr', {}, [
      createElement('th', { scope: 'col' }, ['المرحلة']),
      createElement('th', { scope: 'col' }, ['الحرارة']),
      createElement('th', { scope: 'col' }, ['الهدف'])
    ]),
    ...mod.tempTable.map((row) =>
      createElement('tr', {}, [
        createElement('th', { scope: 'row' }, [row.stage]),
        createElement('td', { 'data-temp': row.level }, [row.temp]),
        createElement('td', { style: 'font-size:11px' }, [row.note])
      ])
    )
  ]);
  const warnings = mod.warnings.map((w) =>
    createElement('div', { class: 'alert-box alert-box--warning' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['⚠️']),
      createElement('div', {}, [w])
    ])
  );
  return [
    table,
    ...warnings,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['الحوض الثلاثي — الغسيل اليدوي']),
    buildStepsFlow(mod.manualWashSteps.map((s) => ({ ...s, label: s.label })))
  ];
}
function buildEquipmentModule(mod) {
  const alertBox = createElement('div', { class: 'alert-box alert-box--danger' }, [
    createElement('span', { 'aria-hidden': 'true' }, ['🔴']),
    createElement('div', {}, [createElement('strong', {}, ['قاعدة ذهبية: ']), mod.goldenRuleAlert.replace('قاعدة ذهبية: ', '')])
  ]);
  const equipmentCards = mod.equipment.map((eq) => {
    const children = [createElement('div', { class: 'equip-card__title' }, [eq.title])];
    if (eq.alert) {
      children.push(
        createElement('div', { class: 'alert-box alert-box--danger', style: 'margin:8px 0' }, [
          createElement('span', { 'aria-hidden': 'true' }, ['⛔']),
          createElement('div', {}, [eq.alert])
        ])
      );
    }
    children.push(
      createElement('ul', { class: 'equip-card__steps' }, eq.steps.map((s) => createElement('li', {}, [s])))
    );
    if (eq.tags.length > 0) {
      children.push(
        createElement('div', { class: 'equip-card__tags' }, eq.tags.map((t) => createElement('span', { class: 'badge badge--neutral' }, [t])))
      );
    }
    return createElement('div', { class: 'equip-card' }, children);
  });
  return [alertBox, ...equipmentCards];
}
function buildHygieneModule(mod) {
  return [
    createElement('div', { class: 'alert-box alert-box--info' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['💡']),
      createElement('div', {}, [mod.infoNote])
    ]),
    createElement(
      'div',
      { class: 'info-grid' },
      mod.items.map((item) =>
        createElement('div', { class: 'info-card' }, [
          createElement('div', { class: 'info-card__icon', 'aria-hidden': 'true' }, [item.icon]),
          createElement('div', { class: 'info-card__title' }, [item.title]),
          createElement('div', { class: 'info-card__desc' }, [item.desc])
        ])
      )
    )
  ];
}
function buildConservationModule(mod) {
  return [
    createElement(
      'ul',
      { class: 'safety-list' },
      mod.items.map((item) =>
        createElement('li', {}, [
          createElement('span', { class: 'safety-list__icon', 'aria-hidden': 'true' }, [item.icon]),
          createElement('span', {}, [item.text])
        ])
      )
    )
  ];
}
function buildGoldenRulesModule(mod) {
  const rulesGrid1 = createElement(
    'div',
    { class: 'rule-grid' },
    mod.rules.slice(0, 6).map(buildRuleCard)
  );
  const rulesGrid2 = createElement(
    'div',
    { class: 'rule-grid' },
    mod.rules.slice(6).map(buildRuleCard)
  );
  const tempQuickGrid = createElement(
    'div',
    { class: 'info-grid' },
    mod.tempQuick.map((t) =>
      createElement('div', { class: 'info-card' }, [
        createElement('div', { class: 'info-card__icon', 'aria-hidden': 'true' }, [t.icon]),
        createElement('div', { class: 'info-card__title' }, [t.label]),
        createElement('div', { class: 'info-card__desc' }, [t.value])
      ])
    )
  );
  const allergenGrid = createElement(
    'div',
    { class: 'allergen-grid' },
    mod.allergens.map((a) => {
      const [icon, ...labelParts] = a.split(' ');
      return createElement('div', { class: 'allergen-badge' }, [
        createElement('span', { class: 'allergen-badge__icon', 'aria-hidden': 'true' }, [icon]),
        createElement('span', { class: 'allergen-badge__label' }, [labelParts.join(' ')])
      ]);
    })
  );
  const fridgeOrder = createElement(
    'div',
    { class: 'fridge-order' },
    mod.fridgeOrder.map((tier) =>
      createElement('div', { class: 'fridge-tier' }, [
        createElement('span', { class: 'fridge-tier__icon', 'aria-hidden': 'true' }, [tier.icon]),
        createElement('div', { style: 'flex:1' }, [
          createElement('div', { class: 'fridge-tier__label' }, [tier.label]),
          createElement('div', { class: 'fridge-tier__note' }, [tier.note])
        ]),
        tier.edge
          ? createElement('span', { class: 'fridge-tier__arrow', 'aria-hidden': 'true' }, [tier.edge === 'top' ? 'الأعلى' : 'الأسفل'])
          : ''
      ].filter(Boolean))
    )
  );
  const boardGrid = createElement(
    'div',
    { class: 'info-grid' },
    mod.cuttingBoards.map((b) =>
      createElement('div', { class: 'info-card' }, [
        createElement('div', {
          'aria-hidden': 'true',
          style: `width:28px;height:28px;border-radius:var(--radius-sm);background:${b.color};margin-bottom:6px`
        }),
        createElement('div', { class: 'info-card__title' }, [b.name]),
        createElement('div', { class: 'info-card__desc' }, [b.use])
      ])
    )
  );
  return [
    createElement('div', { class: 'alert-box alert-box--info' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['📌']),
      createElement('div', {}, [mod.infoNote])
    ]),
    createElement('h3', { class: 'accordion__subheading' }, ['القواعد 1 – 6']),
    rulesGrid1,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['القواعد 7 – 13']),
    rulesGrid2,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['درجات الحرارة الآمنة (القاعدة 2)']),
    tempQuickGrid,
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['مسببات الحساسية التسعة (القاعدة 3)']),
    allergenGrid,
    createElement('div', { class: 'alert-box alert-box--warning' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🟣']),
      createElement('div', {}, [mod.allergyAlert])
    ]),
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['ترتيب الثلاجة من الأعلى للأسفل (القاعدة 11)']),
    fridgeOrder,
    createElement('div', { style: 'font-size:12px;color:var(--content-muted)' }, [mod.fridgeNote]),
    createElement('hr', { class: 'accordion__divider' }),
    createElement('h3', { class: 'accordion__subheading' }, ['الألواح والسكاكين الملونة (القاعدة 13)']),
    boardGrid
  ];
}
function buildRuleCard(rule) {
  return createElement('div', { class: 'rule-card' }, [
    createElement('div', { class: 'rule-card__number', 'aria-hidden': 'true' }, [String(rule.n)]),
    createElement('div', {}, [
      createElement('div', { class: 'rule-card__title' }, [rule.title]),
      createElement('div', { class: 'rule-card__desc' }, [rule.desc])
    ])
  ]);
}
function buildHaccpModule(mod) {
  const grid = createElement(
    'div',
    { class: 'haccp-grid' },
    mod.principles.map((p) =>
      createElement('div', { class: 'haccp-card' }, [
        createElement('div', { class: 'haccp-card__number', 'aria-hidden': 'true' }, [String(p.n)]),
        createElement('div', {}, [
          createElement('div', { class: 'haccp-card__title' }, [p.title]),
          createElement('div', { class: 'haccp-card__desc' }, [p.desc]),
          createElement('div', { class: 'haccp-card__example' }, [createElement('strong', {}, ['مثال: ']), p.example])
        ])
      ])
    )
  );
  return [
    createElement('div', { class: 'alert-box alert-box--info' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🛡️']),
      createElement('div', {}, [
        createElement('strong', {}, ['HACCP']),
        ` ${mod.infoNote.replace(/^HACCP\s*/, '')}`
      ])
    ]),
    grid,
    createElement('div', { style: 'font-size:12px;color:var(--content-muted);margin-top:12px' }, [mod.closingNote])
  ];
}
function bindDelegatedEvents__education() {
  rootEl__education.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion__header');
    if (!header) return;
    handleAccordionToggle(header);
  });
}
function handleAccordionToggle(header) {
  const moduleId = header.dataset.moduleId;
  const item = header.closest('.accordion__item');
  const body = item.querySelector('.accordion__body');
  const nowOpen = toggleExpandable(header, body);
  if (nowOpen) {
    const wasAlreadyCompleted = getState('completedModuleIds').includes(moduleId);
    markModuleCompleted(moduleId);
    if (!wasAlreadyCompleted) {
      checkAndUnlockAchievements();
    }
  }
}
function checkAndUnlockAchievements() {
  const completedCount = getState('completedModuleIds').length;
  const totalModules = educationModules.length;
  if (completedCount >= 1 && unlockAchievement('first-module')) {
    showToast('🏆 إنجاز جديد: أول وحدة تعليمية مكتملة!', 'success');
  }
  if (completedCount >= Math.ceil(totalModules / 2) && unlockAchievement('halfway-there')) {
    showToast('🏆 إنجاز جديد: أكملت نصف الأكاديمية!', 'success');
  }
  if (completedCount === totalModules && unlockAchievement('academy-master')) {
    showToast('🏆 إنجاز ذهبي: أكملت كل وحدات الأكاديمية!', 'success');
  }
}
registerView('education', {
  onEnter: () => init__education()
});


let rootEl__safety = null;
function init__safety() {
  rootEl__safety = document.querySelector('[data-view="safety"]');
  if (!rootEl__safety || rootEl__safety.dataset.initialized === 'true') return;
  rootEl__safety.dataset.initialized = 'true';
  rootEl__safety.innerHTML = '';
  rootEl__safety.appendChild(buildEmergencyBlock());
  rootEl__safety.appendChild(buildContaminationBlock());
  rootEl__safety.appendChild(buildPrecautionsBlock());
  rootEl__safety.appendChild(buildPPEBlock());
  rootEl__safety.appendChild(buildFirstAidBlock());
  rootEl__safety.appendChild(buildPestControlBlock());
  rootEl__safety.appendChild(buildDeveloperFooter());
  bindDelegatedEvents__safety();
}
function buildEmergencyBlock() {
  return createElement('div', { class: 'safety-block', 'data-no-print': '' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🚨']),
      ' وضع الطوارئ'
    ]),
    createElement('div', { class: 'emergency-sos' }, [
      createElement(
        'button',
        { class: 'emergency-sos__button', type: 'button', id: 'sosButton', 'aria-label': 'إظهار أرقام الطوارئ' },
        ['SOS']
      ),
      createElement('div', { style: 'font-size:12px;color:var(--content-muted)' }, ['اضغط لعرض أرقام الاتصال السريع'])
    ]),
    createElement(
      'div',
      { class: 'emergency-contacts' },
      safetyContent.emergencyContacts.map((c) =>
        createElement('div', { class: 'emergency-contact' }, [
          createElement('span', { 'aria-hidden': 'true' }, [c.icon]),
          createElement('span', {}, [c.label]),
          createElement('span', { class: 'emergency-contact__number' }, [c.number])
        ])
      )
    )
  ]);
}
function buildContaminationBlock() {
  return createElement('div', { class: 'safety-block' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🦠']),
      ' أنواع التلوث الغذائي'
    ]),
    ...safetyContent.contamination.map((c) =>
      createElement('div', { class: 'contam-card' }, [
        createElement('div', { class: 'contam-card__title' }, [
          createElement('span', { 'aria-hidden': 'true' }, [c.icon]),
          c.title
        ]),
        createElement('div', { class: 'contam-card__desc' }, [c.desc]),
        createElement(
          'div',
          { class: 'contam-card__examples' },
          c.tags.map((t) => createElement('span', { class: `badge badge--${c.variant}` }, [t]))
        )
      ])
    )
  ]);
}
function buildPrecautionsBlock() {
  return createElement('div', { class: 'safety-block' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['⚡']),
      ' الاحتياطات الأمنية'
    ]),
    createElement('div', { class: 'alert-box alert-box--danger' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🔴']),
      createElement('div', {}, [createElement('strong', {}, ['قانون لا استثناء فيه: ']), safetyContent.precautionsAlert.replace('قانون لا استثناء فيه: ', '')])
    ]),
    createElement(
      'ul',
      { class: 'safety-list' },
      safetyContent.precautions.map((p) =>
        createElement('li', {}, [
          createElement('span', { class: 'safety-list__icon', 'aria-hidden': 'true' }, ['⚠️']),
          createElement('span', {}, [p])
        ])
      )
    )
  ]);
}
function buildPPEBlock() {
  return createElement('div', { class: 'safety-block' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🦺']),
      ' معدات الحماية الشخصية (PPE)'
    ]),
    createElement(
      'div',
      { class: 'ppe-full-grid' },
      safetyContent.ppe.map((item) =>
        createElement('div', { class: 'ppe-full-item' }, [
          createElement('div', { class: 'ppe-full-item__icon', 'aria-hidden': 'true' }, [item.icon]),
          createElement('div', { class: 'ppe-full-item__name' }, [item.name]),
          createElement('div', { class: 'ppe-full-item__when' }, [item.when])
        ])
      )
    )
  ]);
}
function buildFirstAidBlock() {
  return createElement('div', { class: 'safety-block' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🚑']),
      ' إسعافات أولية — كيماويات'
    ]),
    createElement('div', { class: 'alert-box alert-box--info' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['💡']),
      createElement('div', {}, [safetyContent.firstAidNote])
    ]),
    createElement(
      'ul',
      { class: 'safety-list' },
      safetyContent.firstAid.map((item) =>
        createElement('li', {}, [
          createElement('span', { class: 'safety-list__icon', 'aria-hidden': 'true' }, [item.icon]),
          createElement('div', {}, [createElement('strong', {}, [`${item.label}: `]), item.text])
        ])
      )
    )
  ]);
}
function buildPestControlBlock() {
  return createElement('div', { class: 'safety-block' }, [
    createElement('h2', { class: 'safety-block__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🪲']),
      ' مكافحة الحشرات'
    ]),
    createElement(
      'ul',
      { class: 'safety-list' },
      safetyContent.pestControl.map((p) =>
        createElement('li', {}, [
          createElement('span', { class: 'safety-list__icon', 'aria-hidden': 'true' }, ['📅']),
          createElement('span', {}, [p])
        ])
      )
    )
  ]);
}
function buildDeveloperFooter() {
  return createElement('footer', { class: 'dev-footer', 'data-no-print': '' }, [
    createElement('div', {}, ['تم التطوير بواسطة']),
    createElement('div', { class: 'dev-footer__name' }, [developerInfo.name]),
    createElement(
      'a',
      {
        href: developerInfo.whatsappUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'dev-footer__whatsapp'
      },
      ['💬 تواصل عبر واتساب']
    ),
    createElement('div', {}, [developerInfo.whatsappNumber])
  ]);
}
function bindDelegatedEvents__safety() {
  rootEl__safety.addEventListener('click', (e) => {
    if (e.target.closest('#sosButton')) {
      document.querySelector('.emergency-contacts')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('اتصل مباشرة بأقرب رقم من القائمة', 'default', 3200);
    }
  });
}
registerView('safety', {
  onEnter: () => init__safety()
});


let rootEl__settings = null;
const THEME_OPTIONS = [
  { value: 'dark', label: '🌙 داكن' },
  { value: 'light', label: '☀️ فاتح' }
];
const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'صغير' },
  { value: 'medium', label: 'متوسط' },
  { value: 'large', label: 'كبير' },
  { value: 'xlarge', label: 'كبير جداً' }
];
function init__settings() {
  rootEl__settings = document.querySelector('[data-view="settings"]');
  if (!rootEl__settings || rootEl__settings.dataset.initialized === 'true') return;
  rootEl__settings.dataset.initialized = 'true';
  rootEl__settings.innerHTML = '';
  rootEl__settings.appendChild(buildAppearanceGroup());
  rootEl__settings.appendChild(buildDataManagementGroup());
  rootEl__settings.appendChild(buildAboutGroup());
  bindDelegatedEvents__settings();
}
function buildAppearanceGroup() {
  const currentTheme = getState('theme');
  const currentFontSize = getState('fontSize');
  const reducedMotion = getState('reducedMotion');
  return createElement('div', { class: 'settings-group' }, [
    createElement('div', { class: 'view-header' }, [
      createElement('div', { class: 'view-header__eyebrow' }, ['المظهر'])
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['المظهر العام']),
        createElement('div', { class: 'settings-row__desc' }, ['اختر بين الوضع الداكن والفاتح'])
      ]),
      createElement(
        'div',
        { class: 'theme-picker', role: 'group', 'aria-label': 'اختيار المظهر' },
        THEME_OPTIONS.map((opt) =>
          createElement(
            'button',
            {
              class: 'theme-picker__option',
              type: 'button',
              'data-theme-option': opt.value,
              'aria-pressed': opt.value === currentTheme ? 'true' : 'false'
            },
            [opt.label]
          )
        )
      )
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['حجم الخط']),
        createElement('div', { class: 'settings-row__desc' }, ['يؤثر على كل نصوص التطبيق'])
      ])
    ]),
    createElement(
      'div',
      { class: 'font-size-picker', role: 'group', 'aria-label': 'اختيار حجم الخط' },
      FONT_SIZE_OPTIONS.map((opt) =>
        createElement(
          'button',
          {
            class: 'font-size-picker__option',
            type: 'button',
            'data-font-size-option': opt.value,
            'aria-pressed': opt.value === currentFontSize ? 'true' : 'false'
          },
          [opt.label]
        )
      )
    ),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['تقليل الحركة']),
        createElement('div', { class: 'settings-row__desc' }, ['إيقاف الانتقالات والحركات الزخرفية'])
      ]),
      createElement('label', { class: 'switch' }, [
        createElement('input', {
          type: 'checkbox',
          class: 'switch__input',
          id: 'reducedMotionToggle',
          ...(reducedMotion ? { checked: 'true' } : {})
        }),
        createElement('span', { class: 'switch__track' }),
        createElement('span', { class: 'switch__thumb' })
      ])
    ])
  ]);
}
function buildDataManagementGroup() {
  return createElement('div', { class: 'settings-group' }, [
    createElement('div', { class: 'view-header' }, [
      createElement('div', { class: 'view-header__eyebrow' }, ['البيانات'])
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['تصدير البيانات']),
        createElement('div', { class: 'settings-row__desc' }, ['احفظ نسخة من مفضلاتك وتقدّمك'])
      ]),
      createElement('button', { class: 'btn btn--sm', type: 'button', id: 'exportDataBtn' }, ['⬇️ تصدير'])
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['استيراد البيانات']),
        createElement('div', { class: 'settings-row__desc' }, ['استعادة نسخة محفوظة سابقاً'])
      ]),
      createElement('button', { class: 'btn btn--sm', type: 'button', id: 'importDataBtn' }, ['⬆️ استيراد']),
      createElement('input', { type: 'file', accept: 'application/json', id: 'importFileInput', class: 'u-visually-hidden' })
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['إعادة ضبط كل البيانات']),
        createElement('div', { class: 'settings-row__desc' }, ['حذف المفضلة والتقدّم والمحادثات نهائياً'])
      ]),
      createElement('button', { class: 'btn btn--sm btn--danger', type: 'button', id: 'resetDataBtn' }, ['🗑️ إعادة ضبط'])
    ])
  ]);
}
function buildAboutGroup() {
  return createElement('div', { class: 'settings-group' }, [
    createElement('div', { class: 'view-header' }, [
      createElement('div', { class: 'view-header__eyebrow' }, ['حول التطبيق'])
    ]),
    createElement('div', { class: 'settings-row' }, [
      createElement('div', { class: 'settings-row__meta' }, [
        createElement('div', { class: 'settings-row__label' }, ['دليل الاستيوارد']),
        createElement('div', { class: 'settings-row__desc' }, ['تطبيق ويب تقدّمي (PWA) — يعمل بالكامل بدون إنترنت'])
      ])
    ])
  ]);
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
function applyFontSize(fontSize) {
  document.documentElement.setAttribute('data-font-size', fontSize);
}
function bindDelegatedEvents__settings() {
  rootEl__settings.addEventListener('click', (e) => {
    const themeOption = e.target.closest('[data-theme-option]');
    if (themeOption) {
      const theme = themeOption.dataset.themeOption;
      setState({ theme });
      applyTheme(theme);
      rootEl__settings.querySelectorAll('[data-theme-option]').forEach((btn) =>
        btn.setAttribute('aria-pressed', btn.dataset.themeOption === theme ? 'true' : 'false')
      );
      return;
    }
    const fontSizeOption = e.target.closest('[data-font-size-option]');
    if (fontSizeOption) {
      const fontSize = fontSizeOption.dataset.fontSizeOption;
      setState({ fontSize });
      applyFontSize(fontSize);
      rootEl__settings.querySelectorAll('[data-font-size-option]').forEach((btn) =>
        btn.setAttribute('aria-pressed', btn.dataset.fontSizeOption === fontSize ? 'true' : 'false')
      );
      return;
    }
    if (e.target.closest('#exportDataBtn')) {
      handleExport();
      return;
    }
    if (e.target.closest('#importDataBtn')) {
      rootEl__settings.querySelector('#importFileInput').click();
      return;
    }
    if (e.target.closest('#resetDataBtn')) {
      handleReset();
    }
  });
  rootEl__settings.querySelector('#reducedMotionToggle').addEventListener('change', (e) => {
    setState({ reducedMotion: e.target.checked });
    document.documentElement.style.setProperty(
      '--duration-base',
      e.target.checked ? '0.01ms' : ''
    );
  });
  rootEl__settings.querySelector('#importFileInput').addEventListener('change', handleImportFileSelected);
}
function handleExport() {
  const json = exportStateAsJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = createElement('a', { href: url, download: 'steward-app-backup.json' });
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast('تم تصدير البيانات', 'success');
}
function handleImportFileSelected(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const result = importStateFromJSON(String(reader.result));
    if (result.success) {
      showToast('تم استيراد البيانات بنجاح', 'success');
      applyTheme(getState('theme'));
      applyFontSize(getState('fontSize'));
      rootEl__settings.dataset.initialized = 'false';
      init__settings();
    } else {
      showToast(result.error, 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}
function handleReset() {
  const confirmed = window.confirm('هل أنت متأكد؟ سيتم حذف كل المفضلة والتقدّم والمحادثات نهائياً.');
  if (!confirmed) return;
  resetAllData();
  applyTheme(getState('theme'));
  applyFontSize(getState('fontSize'));
  rootEl__settings.dataset.initialized = 'false';
  init__settings();
  showToast('تمت إعادة ضبط كل البيانات', 'success');
}
registerView('settings', {
  onEnter: () => init__settings()
});
