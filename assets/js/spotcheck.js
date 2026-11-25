/**
 * ============================================================================
 * spotcheck.js — تدريب «اكتشف الغلط»
 * ============================================================================
 * ست مشاهد من محطات المطبخ: في كل مشهد حاجات صح وحاجات مخالفة للقواعد
 * الذهبية. المتدرب يعلّم على اللي يشوفه غلط، يضغط «تحقق»، فيظهر له إيه
 * المخالفة، مرتبطة بأنهي قاعدة، وليه، وإيه التصرف الصح.
 *
 * لا يحتوي أي رقم تشغيلي (حرارة/تركيز/زمن/مدة): كل قيمة مرجعها خطة
 * المنشأة المعتمدة وملصق المنتج وتعليمات مسؤول سلامة الغذاء. النتيجة
 * للجلسة دي بس ومش بتتسجل (لا تُحفظ في state.js)، والتدريب مش بديل عن
 * تفتيش مسؤول سلامة الغذاء ولا عن الخطة المعتمدة.
 * ============================================================================
 */

import { createElement } from './utils.js';

/**
 * بيانات المشاهد الست. كل عنصر: نص الملاحظة، هل هي مخالفة، وتفسير المخالفة
 * (القاعدة المرتبطة + السبب + التصرف الصح) — يظهر بعد الضغط على «تحقق».
 * @type {{title:string, situation:string, items:{text:string, violation:boolean, feedback?:string}[]}[]}
 */
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

/**
 * يبني بطاقة مشهد واحدة: ملاحظات تُعلَّم باللمس، زر «تحقق» يكشف النتيجة
 * والتفسير، وزر إعادة. أول «تحقق» فقط هو اللي بيتعّد في نتيجة الجلسة.
 * @param {Object} scene
 * @param {(result:{hit:number, total:number}) => void} onFirstCheck
 * @returns {HTMLElement}
 */
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

/**
 * يبني قسم «اكتشف الغلط» كاملًا: مقدمة + المشاهد الست + سطر نتيجة الجلسة.
 * يُركَّب أسفل قسم الدروس في صفحة التعليم (من education.js).
 * @returns {HTMLElement}
 */
export function buildSpotcheck() {
  const totalViolations = scenes.reduce((n, s) => n + s.items.filter((i) => i.violation).length, 0);
  const firstTry = scenes.map(() => null); // null | {hit, total}
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
