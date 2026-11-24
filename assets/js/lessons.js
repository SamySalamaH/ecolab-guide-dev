/**
 * ============================================================================
 * lessons.js — دروس تدريبية تفاعلية (ضمن قسم التعليم)
 * ============================================================================
 * ثلاثة دروس عملية: موقف من الشغل، الخطوات وليه، الغلطات الشائعة، واختبار
 * صغير. لا تحتوي أي رقم تشغيلي (حرارة/تركيز/زمن): كل قيمة مرجعها ملصق المنتج
 * وتعليمات الماكينة وخطة المنشأة المعتمدة. التقدّم محفوظ على الجهاز فقط عبر
 * state.js (quizScores) وليس سجل تدريب رسمي.
 * ============================================================================
 */

import { getState, saveQuizScore } from './state.js';
import { createElement, toggleExpandable } from './utils.js';

export const lessonsData = {
  "lessons": [
    {
      "label": "الدرس الأول",
      "title": "ترتيب الغسيل الصح",
      "scenario": "بعد بوفيه كبير، قدامك كمية أطباق وأكواب متسخة وعليها بقايا أكل. تبدأ إزاي؟",
      "scenarioOptions": [
        {
          "text": "أحط كل حاجة في مية الغسيل على طول عشان أخلص بسرعة",
          "correct": false,
          "feedback": "غلط شائع. بقايا الأكل هتبوّظ مية الغسيل من أول دقيقة، واللي هيتغسل بعد كده هيتغسل في مية متسخة. الأول نشيل البقايا."
        },
        {
          "text": "أشيل بقايا الأكل في مكانها وأشطف شطفة سريعة، وبعدين أبدأ الغسيل",
          "correct": true,
          "feedback": "التجهيز الصح بيخلي مية الغسيل تعيش أطول والنتيجة أنضف."
        },
        {
          "text": "أكدس كل حاجة على الرف وأستنى لما الضغط يقل",
          "correct": false,
          "feedback": "التكديس بيجذب حشرات وبيعمل ريحة، والبقايا بتنشف وتلزق أكتر. ابدأ التجهيز على طول."
        }
      ],
      "steps": [
        "شيل بقايا الأكل في المكان المخصص ليها.",
        "اغسل بالمنظف المناسب، بطريقته المكتوبة على ملصقه.",
        "اشطف كويس لحد ما ميفضلش أثر للمنظف.",
        "طهّر بالطريقة المعتمدة في مكانك، من ملصق المنتج أو تعليمات الماكينة.",
        "سيب الأدوات تجف بالهواء على رف نضيف."
      ],
      "why": "كل خطوة ليها سبب: البقايا بتبوّظ المية والمطهر، والشطف بيشيل المنظف الزيادة، والتجفيف بالهواء بيمنع الفوطة ترجّع الجراثيم لأداة نضيفة.",
      "mistakes": [
        "التجفيف بفوطة بدل الهواء.",
        "تكديس الأدوات وهي لسه مبلولة.",
        "الاستمرار في مية غسيل اتعكرت واتملت بقايا.",
        "غسل الأكواب مع الأطباق المليانه دهون في نفس المية."
      ],
      "quiz": [
        {
          "q": "الأطباق اتغسلت واتشطفت. التجفيف الصح يكون إزاي؟",
          "options": [
            {
              "text": "بفوطة نضيفة عشان أخلص بسرعة",
              "correct": false,
              "feedback": "الفوطة مهما كان شكلها نضيف ممكن تنقل جراثيم للأداة."
            },
            {
              "text": "بالهواء على الرف",
              "correct": true,
              "feedback": "التجفيف بالهواء بيخلي الأداة تخلص من غير ما حاجة تلمسها."
            },
            {
              "text": "أرصها مبلولة فوق بعضها",
              "correct": false,
              "feedback": "المية المحبوسة بين الأدوات مكان مناسب لتكاثر الجراثيم."
            }
          ]
        },
        {
          "q": "مية الغسيل اتعكرت وفيها بقايا أكل. تعمل إيه؟",
          "options": [
            {
              "text": "أكمل بيها لحد ما أخلص",
              "correct": false,
              "feedback": "كده إنت بتغسل في مية متسخة ونقلت الوسخ بدل ما تشيله."
            },
            {
              "text": "أضيف شوية منظف زيادة وأكمل",
              "correct": false,
              "feedback": "المنظف الزيادة مش بيصلّح مية متسخة، وبيعمل رغوة وبقايا أكتر."
            },
            {
              "text": "أغيّرها وأجهّز مية جديدة بطريقة المكان المعتمدة",
              "correct": true,
              "feedback": "مية نضيفة وتركيز صح حسب ملصق المنتج."
            }
          ]
        },
        {
          "q": "إيه آخر حاجة لازم تحصل قبل ما الأداة ترجع للاستخدام؟",
          "options": [
            {
              "text": "التطهير بالطريقة المعتمدة وبعدين التجفيف بالهواء",
              "correct": true,
              "feedback": "الغسيل لوحده مش كفاية، والتطهير والتجفيف بالهواء هما الختام."
            },
            {
              "text": "الشطف وخلاص",
              "correct": false,
              "feedback": "الشطف بيشيل المنظف، لكنه مش بديل عن التطهير."
            },
            {
              "text": "المسح بفوطة وتخزينها",
              "correct": false,
              "feedback": "الفوطة بترجع التلوث، والتخزين مبلول بيساعد الجراثيم."
            }
          ]
        }
      ]
    },
    {
      "label": "الدرس الثاني",
      "title": "التنظيف مش التطهير",
      "scenario": "سطح شكله نضيف، وزميلك بيقول: رش المطهر على طول وخلاص، متضيّعش وقت. تتصرف إزاي؟",
      "scenarioOptions": [
        {
          "text": "أرش المطهر على طول، ما دام السطح شكله نضيف",
          "correct": false,
          "feedback": "شكل السطح مش مقياس. الدهون وبقايا الأكل الخفية بتحمي الجراثيم من المطهر. التنظيف الأول."
        },
        {
          "text": "أنضّف الأول بالمنظف المناسب، وبعدين أطبّق المطهر بطريقة ملصقه",
          "correct": true,
          "feedback": "التنظيف بيفتح الطريق، والمطهر بيشتغل صح على سطح نضيف."
        },
        {
          "text": "أمسح بمية وخلاص",
          "correct": false,
          "feedback": "المية لوحدها مش بتشيل الدهون ولا بتطهّر."
        }
      ],
      "steps": [
        "نضّف السطح بالمنظف المناسب عشان تشيل الأوساخ والدهون.",
        "اشطف لو المنتج محتاج شطف، حسب ملصقه.",
        "طبّق المطهر بالتركيز والطريقة المكتوبين على ملصقه هو.",
        "سيب المطهر المدة المكتوبة على ملصقه قبل ما تمسح أو تستخدم السطح."
      ],
      "why": "التنظيف بيشيل الأوساخ، والتطهير بيقلّل الجراثيم على سطح نضيف أصلًا. لو رشيت مطهر على سطح متسخ، الأوساخ بتحمي الجراثيم والمطهر بيضيع. والتركيز وزمن التلامس مالهمش رقم عام: المكتوب على ملصق منتجك هو المرجع.",
      "mistakes": [
        "الاكتفاء برشة مطهر على سطح متسخ.",
        "استخدام منتج واحد لكل المهام.",
        "مسح المطهر فورًا قبل ما يعدّي زمن التلامس المكتوب على ملصقه.",
        "تخمين التركيز بدل قراءة الملصق."
      ],
      "quiz": [
        {
          "q": "إيه اللي بييجي الأول في أي مهمة نظافة؟",
          "options": [
            {
              "text": "التطهير",
              "correct": false,
              "feedback": "التطهير على سطح متسخ مش بيجيب نتيجة."
            },
            {
              "text": "التنظيف",
              "correct": true,
              "feedback": "التنظيف بيشيل الأوساخ الأول."
            },
            {
              "text": "التلميع",
              "correct": false,
              "feedback": "التلميع شكل، مش نظافة ولا تطهير."
            }
          ]
        },
        {
          "q": "التركيز الصح وزمن التلامس للمطهر تجيبهم منين؟",
          "options": [
            {
              "text": "من زميل شاطر",
              "correct": false,
              "feedback": "خبرة الزمايل مهمة، لكن القيم الرسمية مكانها الملصق."
            },
            {
              "text": "من ملصق المنتج نفسه",
              "correct": true,
              "feedback": "الملصق هو المرجع، ومعاه خطة المكان."
            },
            {
              "text": "أخمّنها حسب الرائحة",
              "correct": false,
              "feedback": "الرائحة مش مقياس تركيز أبدًا."
            }
          ]
        },
        {
          "q": "رشيت مطهر على سطح عليه بقايا أكل. إيه المشكلة؟",
          "options": [
            {
              "text": "مفيش مشكلة ما دام رشيت كتير",
              "correct": false,
              "feedback": "الكمية مش بتعوّض؛ الأوساخ بتحمي الجراثيم."
            },
            {
              "text": "الأوساخ بتحمي الجراثيم، ولازم كنت أنضّف الأول",
              "correct": true,
              "feedback": "دي الفكرة كلها: تنضيف الأول، تطهير بعدين."
            },
            {
              "text": "المشكلة إن المطهر مش ملوّن",
              "correct": false,
              "feedback": "لون المنتج ملوش علاقة بالموضوع."
            }
          ]
        }
      ]
    },
    {
      "label": "الدرس الثالث",
      "title": "سلامتك قبل النظافة",
      "scenario": "زميل بيقترح تخلط منتجين مع بعض عشان التنضيفة تبقى أقوى وأسرع. ترد عليه إزاي؟",
      "scenarioOptions": [
        {
          "text": "أوافق، الفكرة عملية",
          "correct": false,
          "feedback": "أخطر غلطة. خلط الكيماويات ممكن يطلّع أبخرة خطيرة حتى لو كل منتج لوحده آمن. ممنوع تمامًا."
        },
        {
          "text": "أرفض تمامًا: ممنوع خلط أي منتجين، وكل منتج يتستخدم لوحده بطريقة ملصقه",
          "correct": true,
          "feedback": "مفيش خلطة عبقرية في الكيماويات. اللي مش مكتوب على الملصق، ميتعملش."
        },
        {
          "text": "أخلط كمية صغيرة بس للتجربة",
          "correct": false,
          "feedback": "الكمية الصغيرة مش بتحميك. الخطر في التفاعل نفسه."
        }
      ],
      "steps": [
        "اقرا ملصق المنتج قبل أول استخدام.",
        "البس معدات الوقاية اللي الملصق طالبها، زي القفازات ونظارة الحماية.",
        "استخدم كل منتج لوحده، وممنوع الخلط نهائيًا.",
        "لو كيماوي اتسكب أو لمس جلدك أو عينك، اتبع ورقة بيانات المنتج وبلّغ المسؤول فورًا.",
        "خزّن الكيماويات في مكانها المخصص، بعيد عن الأكل والأدوات."
      ],
      "why": "الكيماويات بتنضف كويس لأنها قوية، ونفس القوة ممكن تأذيك أو تأذي زمايلك. الملصق وورقة البيانات مكتوبين عشان يحميوك، مش رفاهية.",
      "mistakes": [
        "الشغل بإيد عريانة.",
        "خلط منتجين مع بعض.",
        "إخراج الزجاج المكسور من الحوض بإيدك.",
        "تخزين الكيماويات جنب الأكل."
      ],
      "quiz": [
        {
          "q": "كيماوي دخل عينك. أول تصرف؟",
          "options": [
            {
              "text": "أدعك عيني وأكمل شغل",
              "correct": false,
              "feedback": "الدعك بيزود الأذى."
            },
            {
              "text": "اتبع تعليمات الإسعاف في ورقة بيانات المنتج وأبلغ المسؤول فورًا",
              "correct": true,
              "feedback": "التصرف السريع الصح بيحمي نظرك."
            },
            {
              "text": "أستنى لما الحرقان يعدي لوحده",
              "correct": false,
              "feedback": "التأخير ممكن يكلّفك كتير."
            }
          ]
        },
        {
          "q": "ليه خلط منتجين ممنوع حتى لو الاتنين آمنين لوحدهم؟",
          "options": [
            {
              "text": "عشان التوفير",
              "correct": false,
              "feedback": "الموضوع أمان، مش توفير."
            },
            {
              "text": "عشان ممكن يحصل تفاعل يطلّع أبخرة أو مواد خطيرة",
              "correct": true,
              "feedback": "الخطر في التفاعل نفسه."
            },
            {
              "text": "عشان النتيجة بتبقى أضعف",
              "correct": false,
              "feedback": "مش الضعف المشكلة، الخطر."
            }
          ]
        },
        {
          "q": "فيه زجاج مكسور جوه حوض مليان مية. تطلعه إزاي؟",
          "options": [
            {
              "text": "بإيدي بسرعة وأنا فاهم",
              "correct": false,
              "feedback": "إيدك في مية مش شايف فيها حاجة، والزجاج بيجرح من غير ما تحس. ممنوع."
            },
            {
              "text": "أفرّغ الحوض الأول وبعدين أشيله بأداة مناسبة مش بإيدي",
              "correct": true,
              "feedback": "شوف اللي بتلمسه، واستخدم أداة."
            },
            {
              "text": "أسيبه لحد ما المية تفضى لوحدها",
              "correct": false,
              "feedback": "سيب الخطر مستني مش حل."
            }
          ]
        }
      ]
    }
  ],
  "teacher": [
    {
      "q": "«درجة الحرارة أو التركيز المظبوط كام؟»",
      "a": "مفيش رقم واحد يصلح لكل مكان وكل منتج. إجابتك في ٣ حاجات: ملصق المنتج، تعليمات الماكينة، والخطة المعتمدة في منشأتك. مش لاقيهم أو مش متأكد؟ اسأل مسؤول سلامة الغذاء. المعلّم مش بيخترع أرقام."
    },
    {
      "q": "«ليه منجففش الأطباق بفوطة؟»",
      "a": "عشان الفوطة مهما كان شكلها نضيف، سطحها بيلمّ جراثيم مع الاستخدام، وأول ما تلمس الطبق النضيف بترجّعها له تاني. التجفيف بالهواء بيخلّي الأداة تخلص من غير ما حاجة تلمسها."
    },
    {
      "q": "«إيه الفرق بين التنظيف والتطهير؟»",
      "a": "التنظيف يعني تشيل الأوساخ والدهون من السطح. التطهير يعني تقلّل الجراثيم على سطح نضيف خلاص. رش مطهر على سطح متسخ زي ما تدهّن الحيطة قبل ما تكنسها: الشغل بيروح."
    }
  ]
};

const LESSON_KEYS = ['lesson-1', 'lesson-2', 'lesson-3'];

function optionButtons(options, onPick) {
  const wrap = createElement('div', { class: 'lesson-opts' });
  const feedback = createElement('p', { class: 'lesson-feedback', hidden: 'hidden', 'aria-live': 'polite' });
  const buttons = options.map((o, i) =>
    createElement('button', { class: 'lesson-opt', type: 'button' }, [o.text])
  );
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (options[j].correct) b.classList.add('lesson-opt--correct');
        else if (j === i) b.classList.add('lesson-opt--wrong');
        else b.classList.add('lesson-opt--dim');
      });
      feedback.hidden = false;
      feedback.replaceChildren(
        createElement('strong', {}, [options[i].correct ? 'صح. ' : 'غلط. ']),
        options[i].feedback
      );
      onPick?.(options[i].correct);
    });
    wrap.appendChild(btn);
  });
  return [wrap, feedback];
}

function buildScenario(lesson) {
  const box = createElement('div', {});
  const render = () => {
    const [wrap, feedback] = optionButtons(lesson.scenarioOptions);
    const retry = createElement('button', { class: 'lesson-retry', type: 'button' }, ['جرّب تاني']);
    retry.addEventListener('click', render);
    box.replaceChildren(wrap, feedback, retry);
  };
  render();
  return [
    createElement('h3', { class: 'lesson-h' }, ['الموقف']),
    createElement('p', { class: 'lesson-p' }, [lesson.scenario]),
    box
  ];
}

function buildQuiz(lesson, key, scoreLine) {
  const box = createElement('div', {});
  const render = () => {
    let answered = 0;
    let score = 0;
    const result = createElement('p', { class: 'lesson-score', hidden: 'hidden' });
    const retake = createElement('button', { class: 'lesson-retry', type: 'button', hidden: 'hidden' }, ['أعد الاختبار']);
    retake.addEventListener('click', render);
    const blocks = lesson.quiz.map((q) => {
      const [wrap, feedback] = optionButtons(q.options, (ok) => {
        answered += 1;
        if (ok) score += 1;
        if (answered === lesson.quiz.length) {
          result.hidden = false;
          retake.hidden = false;
          result.textContent = 'نتيجتك: ' + score + ' من ' + lesson.quiz.length;
          const prev = getState('quizScores')[key];
          if (!prev || score > prev.score) saveQuizScore(key, score, lesson.quiz.length);
          scoreLine();
        }
      });
      return createElement('div', {}, [createElement('p', { class: 'lesson-q' }, [q.q]), wrap, feedback]);
    });
    box.replaceChildren(...blocks, result, retake);
  };
  render();
  return box;
}

function bestText(key) {
  const s = getState('quizScores')[key];
  return s ? 'أفضل نتيجة محفوظة على جهازك: ' + s.score + ' من ' + s.total : '';
}

function buildLesson(lesson, idx, onProgress) {
  const key = LESSON_KEYS[idx];
  const bodyId = 'lesson-body-' + (idx + 1);
  const best = createElement('p', { class: 'lesson-best' }, [bestText(key)]);
  const scoreLine = () => { best.textContent = bestText(key); onProgress(); };

  const header = createElement('button', {
    class: 'accordion__header', type: 'button', 'aria-expanded': 'false', 'aria-controls': bodyId
  }, [
    createElement('span', { class: 'accordion__icon', 'aria-hidden': 'true' }, ['🎯']),
    createElement('span', { class: 'accordion__title' }, [lesson.label + ': ' + lesson.title]),
    createElement('span', { class: 'accordion__chevron', 'aria-hidden': 'true' }, ['▾'])
  ]);
  const inner = createElement('div', { class: 'accordion__body-inner' }, [
    ...buildScenario(lesson),
    createElement('h3', { class: 'lesson-h' }, ['الخطوات الصح']),
    createElement('ol', { class: 'lesson-list' }, lesson.steps.map((s) => createElement('li', {}, [s]))),
    createElement('h3', { class: 'lesson-h' }, ['ليه؟']),
    createElement('p', { class: 'lesson-p' }, [lesson.why]),
    createElement('h3', { class: 'lesson-h' }, ['غلطات شائعة']),
    createElement('ul', { class: 'lesson-list' }, lesson.mistakes.map((s) => createElement('li', {}, [s]))),
    createElement('h3', { class: 'lesson-h' }, ['اختبر نفسك']),
    buildQuiz(lesson, key, scoreLine),
    best
  ]);
  const body = createElement('div', { class: 'accordion__body', id: bodyId, 'data-open': 'false' }, [inner]);
  header.addEventListener('click', (e) => {
    e.stopPropagation(); // لا تُحسب الدروس ضمن وحدات الأكاديمية التسع
    toggleExpandable(header, body);
  });
  return createElement('div', { class: 'accordion__item' }, [
    createElement('h2', { style: 'font-size:inherit' }, [header]),
    body
  ]);
}

/** يبني قسم "دروس تدريبية تفاعلية" الذي يوضع أعلى قسم التعليم. */
export function buildLessonsSection() {
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
    teacher
  ]);
}
