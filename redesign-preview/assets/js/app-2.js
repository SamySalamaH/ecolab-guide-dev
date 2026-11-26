const educationModules = [
  {
    id: 'science',
    icon: '🔬',
    title: 'علم النظافة والتطهير',
    defaultOpen: true,
    soilTypes: [
      { icon: '👁️', title: 'اتساخات مرئية', desc: 'بقايا طعام، زيوت، أتربة، كرتون — تُرى بالعين المجردة' },
      { icon: '🦠', title: 'اتساخات غير مرئية', desc: 'داخل مسام الأسطح — تظهر فقط عند الدعك بالصابون الساخن' },
      { icon: '🌿', title: 'اتساخات عضوية', desc: 'من إنسان أو حيوان أو نبات — تُزال بالمنظفات القلوية' },
      { icon: '⛏️', title: 'اتساخات غير عضوية', desc: 'أملاح ومعادن وصدأ — تُزال بالمنظفات الحمضية' }
    ],
    phReference: [
      { ph: '2', type: 'acid', text: 'مادة حمضية لإزالة الأملاح والترسبات الكلسية' },
      { ph: '3', type: 'acid', text: 'مادة حمضية مجففة للأطباق (Rinse Aid)' },
      { ph: '7', type: 'neutral', text: 'صابون مطهر لليدين — لطيف على الجلد' },
      { ph: '7.1', type: 'alkali', text: 'صابون أرضيات — قلويته خفيفة لا تؤثر على السطح' },
      { ph: '7.3', type: 'alkali', text: 'صابون أواني — حرارة المعالجة تزيد صعوبة الاتساخ' },
      { ph: '11', type: 'alkali', text: 'مادة قلوية لغلي فلاتر الزيوت + مزيلة للصبغات' },
      { ph: '13', type: 'alkali', text: 'مادة قلوية لنقع المعدات + ماكينة غسيل الأطباق' },
      { ph: '13.5', type: 'alkali', text: 'مادة رش قلوية للأفران والجريلات (GREASSTRIP)' },
      { ph: '13.5', type: 'alkali', text: 'مادة قلوية مسلك للبالوعات — خطر عالٍ ارتدِ قفازات' }
    ],
    cleaningLevels: [
      { icon: '🧹', title: 'التنظيف', variant: 'info', desc: 'إزالة كل الاتساخات المرئية وغير المرئية — نظافة تامة للسطح' },
      { icon: '🧴', title: 'التطهير', variant: 'warning', desc: 'تنظيف + تقليل البكتيريا باستخدام مطهر معتمد، بالتركيز والمدة المذكورين على ملصقه' },
      { icon: '✅', title: 'التعقيم', variant: 'safe', desc: 'أعلى مستوى من إزالة الأحياء الدقيقة، ويتطلب إجراءً ومنتجاً معتمدين' },
      { icon: '⚗️', title: 'عناصر النظافة', variant: 'brand', desc: 'ماء 💧 + كيماوي 🧪 + حرارة 🌡️ + عامل ميكانيكي 🖐️ + وقت ⏱️' }
    ]
  },
  {
    id: 'stages',
    icon: '📋',
    title: 'مراحل التنظيف الخمس',
    steps: [
      { title: '🧽 التنظيف المبدئي — الأهم', desc: 'إزالة بقايا الطعام والاتساخات المرئية يدوياً بالمقطع والفرشاة قبل أي كيماوي. يُوفّر الوقت والمال ويرفع جودة التنظيف. تنظيف الأطباق قبل دخول الماكينة إلزامي.' },
      { title: '🧪 التنظيف بمواد الكيماويات', desc: 'استخدام كل عناصر النظافة معاً (ماء + حرارة + كيماوي + دعك + وقت) لإذابة الاتساخات تمهيداً للشطف.' },
      { title: '🚿 مرحلة الشطف', desc: 'إزالة بقايا الاتساخات المذابة وبقايا مواد التنظيف بالماء النظيف. درجة حرارة الشطف حسب تعليمات الجهاز وخطة النظافة المعتمدة للمنشأة.' },
      { title: '🔬 التطهير', desc: 'تقليل عدد البكتيريا إلى الحد المسموح به باستخدام المطهر. درجة حرارة المطهر ومدة استبدال المحلول حسب ملصق المنتج وخطة النظافة المعتمدة.' },
      { title: '💨 التجفيف', desc: 'المرحلة النهائية — توضع الأواني مقلوبة على الرفوف لتجف في الهواء. الأدوات ذات اليد تُعلّق على الحوامل. لا تُلمس الأدوات باليد بعد التنظيف.' }
    ]
  },
  {
    id: 'cleaning-types',
    icon: '📅',
    title: 'أنواع النظافة الثلاثة',
    types: [
      { title: '⚡ 1 — نظافة وقتية (أثناء الشغل)', variant: 'info', items: ['تتم أثناء أوقات تصنيع الغذاء والمشروبات', 'لا تعوق حركة إنتاج الغذاء', 'لا تستخدم كيماويات شديدة التركيز أو ذات روائح', 'لا تؤثر على صحة العاملين بالمواد الغذائية', 'يجب استخدام علامات التنبيه والتحذير من الانزلاق', 'لا يحدث تلوث عرضي للمواد الغذائية'] },
      { title: '📋 2 — نظافة عامة (بين الوجبات)', variant: 'warning', items: ['يومياً بشكل منتظم أثناء توقف مؤقت لإنتاج الغذاء', 'بين الوجبات أو بين الورديات', 'تكون بقائمة متابعة (Checklist) لكل وردية', 'تحت إشراف رئيس الوردية', 'يراعى فيها عدم تداول المواد الغذائية'] },
      { title: '🔥 3 — نظافة عميقة (يومية / أسبوعية / شهرية)', variant: 'safe', items: ['توقف تام لحركة إنتاج الغذاء', 'تشمل جميع الأسطح وأماكن التخزين والطهي', 'غالباً تحدث في الوردية الليلية', 'الجزارة: نظافة عميقة فور انتهاء العمل يومياً', 'بجدول يومي وأسبوعي موقّع من المسؤول', 'تشمل السقف والإضاءة والتكييف والأهواد والفلاتر'] }
    ]
  },
  {
    id: 'dishwasher',
    icon: '🍽️',
    title: 'ماكينة غسيل الأطباق — درجات الحرارة',
    tempTable: [
      { stage: 'غسيل أولي', temp: 'حسب تعليمات الجهاز', level: 'low', note: 'تمهيدي فقط — لا كيماوي' },
      { stage: 'غسيل كيميائي', temp: 'حسب تعليمات الجهاز وملصق المنتج', level: 'mid', note: 'بالمادة القلوية المعتمدة للجهاز' },
      { stage: 'شطف نهائي', temp: 'حسب تعليمات الجهاز وخطة المنشأة', level: 'high', note: 'شطف نهائي وتجفيف' },
      { stage: 'بدون مطهر كيماوي', temp: 'حسب خطة المنشأة المعتمدة', level: 'high', note: 'الدرجة والمدة يحددها المسؤول' }
    ],
    warnings: [
      'إذا خرجت حرارة الغسيل عن المدى المحدد في تعليمات الجهاز → قد تبقى بقايا منظف وتسبب تلوثاً كيميائياً. أبلغ المشرف فوراً.',
      'إذا خرجت حرارة الشطف النهائي عن المدى المحدد في تعليمات الجهاز → قد تبقى بقايا مادة التجفيف وتلوّث الأدوات كيميائياً.'
    ],
    manualWashSteps: [
      { label: 'نقع', variant: 'danger', title: 'حوض النقع', desc: 'الأواني شديدة الاتساخ والمحروقة — تُوضع في حوض النقع قبل الغسيل' },
      { label: '1', variant: 'info', title: 'غسيل — حرارة حسب خطة المنشأة', desc: 'بالمنظف القلوي مع الدعك الجيد' },
      { label: '2', variant: 'warning', title: 'شطف — حرارة حسب خطة المنشأة', desc: 'بالماء النظيف لإزالة بقايا المنظف' },
      { label: '3', variant: 'safe', title: 'تطهير — حسب ملصق المطهر', desc: 'مدة استبدال المحلول وبدائل التطهير بالماء الساخن حسب ملصق المنتج وخطة المنشأة المعتمدة' }
    ]
  },
  {
    id: 'equipment',
    icon: '⚙️',
    title: 'نظافة المعدات — كيفية التنظيف',
    goldenRuleAlert: 'قاعدة ذهبية: افصل الكهرباء (فرعي ورئيسي) أو أغلق الغاز قبل أي تنظيف لأي معدة كهربائية أو غازية.',
    equipment: [
      { title: '🔥 فرن الحمل الهوائي (Convection Oven)', steps: ['افصل الكهرباء فرعي ورئيسي', 'أزل الرفوف والأجزاء القابلة للفك', 'رش المادة القلوية على الجدران الداخلية', 'اترك المدة المذكورة على ملصق المنتج ثم امسح واشطف', '⚠️ لا يصل الماء للوحة التحكم أبداً'], tags: ['مادة قلوية رش', 'صابون جميع الأغراض'] },
      { title: '🥩 الجريلة (Grills)', steps: ['افصل الكهرباء + استخدم المقطع والفرشاة للتنظيف الأولي', 'رش مزيل الدهون حسب ملصق المنتج واترك المدة المذكورة عليه', 'ماء ساخن وصابون ثم اشطف', 'استخدم مزيل الأملاح ثم اشطف', 'ضع المادة الزيتية للحماية من الصدأ', 'الدورية: فك جميع الأجزاء بالهندسة حسب جدول المنشأة'], tags: ['مادة قلوية رش', 'صابون', 'مزيل أملاح'] },
      { title: '🍟 قالية الزيت (Dip Fryer)', steps: ['افصل الكهرباء وأزل الرواسب والبقايا', 'ضع الماء والمادة القلوية', 'وصّل الكهرباء واغلِ حسب تعليمات القالية ومنتج الغلي', 'افصل وأفرغ المادة القلوية', 'استخدم الصابون ثم اشطف وجفف', 'الدورية حسب جدول المنشأة'], tags: ['مادة غلي فوارز الزيت', 'صابون'] },
      { title: '🍳 البوتاجاز والبوتاجاز الحسي', steps: ['أغلق الغاز فرعي ورئيسي وافك جميع الأجزاء', 'نظف بمزيل الشحوم الرش ثم نقع الأجزاء المفكوكة', 'اشطف وجفف ثم ركب الأجزاء', 'الحسي: ماء ساخن قليل واسفنجة ناعمة فقط', 'الكهرباء: نظف في مكانها بمزيل الدهون + اسفنجة'], tags: ['مادة قلوية رش', 'مادة نقع الأجزاء', 'صابون'] },
      { title: '🌡️ البانماري (Bain-marie)', steps: ['افصل الكهرباء فرعي ورئيسي', 'أزل الاتساخات المرئية ثم ماء وصابون', 'اشطف ثم مزيل أملاح للسخانات', 'للسخانات المائية: سخّن المياه لتفكيك الأملاح', 'الصيانة من قِبل القسم الهندسي فقط'], tags: ['صابون', 'مزيل أملاح'] },
      { title: '🔪 ماكينة تقطيع اللحوم والخضروات', steps: ['افصل الكهرباء وافك الأجزاء', 'نظف بالماء الساخن والصابون ثم اشطف', 'طهّر الأجزاء الثابتة في مكانها', 'الأجزاء المتحركة: انقعها في محلول مطهر', 'اتركها في المحلول حتى الاستخدام — لا تعيد التركيب بنفسك'], tags: ['صابون', 'مطهر الأسطح'] },
      { title: '🏭 الأهواد والفلاتر (Hoods)', steps: ['فك الفلاتر يومياً بواسطة عامل النظافة', 'فك كشافات الإضاءة بواسطة الهندسة فقط', '⚠️ لا تلمس حساسات ورشاشات جهاز الحريق', 'نقع الفلاتر في المادة القلوية المدة المذكورة على الملصق', 'نظف مجاري الزيوت وجفف قبل التركيب', 'رش المادة القلوية على الهود واترك المدة المذكورة على الملصق'], tags: ['مادة قلوية رش', 'مادة نقع الزيوت', 'صابون'] },
      { title: '🥩 الجزارة — منطقة عالية الخطورة', alert: 'البكتيريا تنمو بسرعة على اللحوم — التنظيف العميق فور انتهاء العمل إلزامي يومياً', steps: ['قائمة تدقيق يومية لجميع الأسطح', 'جميع الأسطح: تنظيف عميق وتطهير يومياً', 'تغيير المطهر الخاص بالأدوات حسب ملصق المنتج وخطة المنشأة', 'تنظيف الأرضيات والبالوعات بتكرار تحدده خطة المنشأة', 'جميع السكاكين في محلول مطهر طوال اليوم'], tags: [] }
    ]
  },
  {
    id: 'hygiene',
    icon: '🚿',
    title: 'النظافة الشخصية',
    infoNote: 'من الممكن أن تكون أنت مصدر التلوث للمادة الغذائية — اتبع هذه التعليمات يومياً',
    items: [
      { icon: '🚿', title: 'الاستحمام يومياً', desc: 'قبل الذهاب للعمل — يُزيل الخلايا الميتة ويقلل البكتيريا' },
      { icon: '🪒', title: 'حلاقة الذقن يومياً', desc: 'يُعطي مظهراً صحياً ويعكس الاهتمام بالنظافة' },
      { icon: '👕', title: 'تغيير الملابس يومياً', desc: 'الملابس تنقل الميكروبات إلى الغذاء — ملابس العمل المخصصة فقط' },
      { icon: '🧢', title: 'غطاء الرأس إلزامي', desc: 'يحمي الأغذية من سقوط الشعر — الشعر يجب أن يكون قصيراً ونظيفاً' },
      { icon: '🧦', title: 'الجوارب القطنية', desc: 'قطن خالص لامتصاص العرق — تغيير يومي بعد العمل' },
      { icon: '🦷', title: 'غسيل الأسنان يومياً', desc: 'النظافة الشخصية الكاملة تعكس احترافيتك في العمل' }
    ]
  },
  {
    id: 'conservation',
    icon: '💡',
    title: 'توفير الكيماويات والطاقة والمياه',
    items: [
      { icon: '📏', text: 'استخدم المعيار المحدد فقط — الزيادة لا تُسرّع التنظيف' },
      { icon: '🌡️', text: 'استخدم الحرارة الموصى بها فقط — رفعها يُهدر الطاقة' },
      { icon: '📦', text: 'استخدم العبوات الأصلية دائماً مع بيانات المنتج' },
      { icon: '🚫', text: 'لا تخفف المواد المحقونة يدوياً — يزيد الاستهلاك ويُقلل الفاعلية' },
      { icon: '🔄', text: 'نقع الأواني: صيني ← أطباق ← أواني ← فلاتر ← شبك بالوعات' },
      { icon: '🧴', text: 'استخدم البخاخات بدلاً من السكب — يوفر المادة ويزيد الفاعلية' },
      { icon: '🔒', text: 'غطِّ أحواض النقع بعد الاستخدام للحفاظ على الحرارة' },
      { icon: '🚫', text: 'ممنوع منعاً باتاً خلط المواد الكيميائية مع بعض' },
      { icon: '🔧', text: 'صيانة المعدات وموارد المياه والصرف دورياً' }
    ]
  },
  {
    id: 'golden-rules',
    icon: '🏅',
    title: '١٣ قاعدة ذهبية لسلامة الغذاء',
    isNew: true,
    infoNote: 'هذه القواعد ملخّص عملي سريع لأهم إجراءات سلامة الغذاء داخل المطبخ — احفظها واطبّقها يومياً في كل وردية.',
    rules: [
      { n: 1, title: '🧼 غسل اليدين', desc: 'بانتظام وبالمدة المحددة في إجراء المنشأة، وعند كل ما يتطلب ذلك.' },
      { n: 2, title: '🌡️ درجات الحرارة الآمنة', desc: 'اعرف حدود الساخن والبارد والمجمّد — تفاصيلها في البطاقات بالأسفل.' },
      { n: 3, title: '🥜 مسببات الحساسية التسعة', desc: 'تعرّف عليها جيداً بالإضافة لأي حساسية أخرى يُخبرك بها الضيف.' },
      { n: 4, title: '🟣 حالات الحساسية', desc: 'استخدم لوح تقطيع وسكين بنفسجي اللون مخصصين فقط لتحضير طعام الضيوف المصابين بالحساسية.' },
      { n: 5, title: '🏷️ الملصقات', desc: 'ضع ملصقاً على كل صنف غذائي يوضّح الاسم، تاريخ التحضير أو الفتح، وتاريخ الانتهاء.' },
      { n: 6, title: '📅 الفحص اليومي', desc: 'تحقّق يومياً من مدة الصلاحية وتاريخ الانتهاء قبل بدء التشغيل في كل وردية.' },
      { n: 7, title: '🧤 ارتداء القفازات', desc: 'إلزامي عند التعامل مع الأطعمة الجاهزة للأكل (RTE) مباشرةً.' },
      { n: 8, title: '❄️ إذابة التجميد', desc: 'داخل الثلاجة أو تحت الماء البارد الجاري فقط، ومدتها حسب خطة سلامة الغذاء المعتمدة.' },
      { n: 9, title: '🧊 تبريد الطعام الساخن', desc: 'استخدم مبرّداً سريعاً (Blast Chiller) أو حمام ثلج — لا تترك الطعام الساخن يبرد ببطء.' },
      { n: 10, title: '🚫 التلوث المتبادل', desc: 'لا تُخزّن الأطعمة النيئة فوق أو بجانب الأطعمة الجاهزة للأكل.' },
      { n: 11, title: '🧊 ترتيب الثلاجة', desc: 'من الأعلى للأسفل بالترتيب الصحيح — التفاصيل في الجدول بالأسفل.' },
      { n: 12, title: '🧽 منشفة الألياف الدقيقة', desc: 'حافظ بها على نظافة وتطهير السطح، واحفظها داخل محلول المطهر بين الاستخدامات.' },
      { n: 13, title: '🎨 الألواح والسكاكين الملونة', desc: 'لون مخصص لكل نوع طعام — الجدول الكامل بالأسفل.' }
    ],
    tempQuick: [
      { icon: '🔥', label: 'ساخن', value: 'حسب الحد المعتمد في خطة سلامة الغذاء', variant: 'hot' },
      { icon: '🧊', label: 'بارد', value: 'حسب الحد المعتمد في خطة سلامة الغذاء', variant: 'cold' },
      { icon: '❄️', label: 'مجمّد', value: 'حسب الحد المعتمد في خطة سلامة الغذاء', variant: 'frozen' }
    ],
    allergens: ['🥛 الحليب', '🥚 البيض', '🐟 السمك', '🦐 المحاريات (القشريات)', '🌰 المكسرات', '🥜 الفول السوداني', '🌾 القمح', '🫘 فول الصويا', '🌱 السمسم'],
    allergyAlert: 'القاعدة 4: في حالات الحساسية، استخدم دائماً لوح تقطيع وسكيناً بنفسجيين مخصصين لتحضير طعام الضيف — بالإضافة لأي حساسية أخرى يُخبرك بها الضيف مباشرة.',
    fridgeOrder: [
      { icon: '🥬', label: 'خضراوات', note: 'أعلى رف — لا تحتاج طهياً', edge: 'top' },
      { icon: '🐟', label: 'سمك', note: 'فوق اللحم والدجاج مباشرة' },
      { icon: '🥩', label: 'لحم', note: 'فوق الدجاج' },
      { icon: '🍗', label: 'دجاج', note: 'أدنى رف دائماً لتفادي التلوث المتبادل', edge: 'bottom' }
    ],
    fridgeNote: 'الترتيب من الأعلى للأسفل يمنع تنقيط سوائل اللحوم النيئة على الأطعمة الأقل نضجاً حرارياً — دجاج دائماً في القاع.',
    cuttingBoards: [
      { color: 'green', name: 'أخضر', use: 'خضراوات وفاكهة' },
      { color: 'red', name: 'أحمر', use: 'لحم نيء' },
      { color: 'yellow', name: 'أصفر', use: 'دواجن نيئة' },
      { color: 'blue', name: 'أزرق', use: 'سمك نيء' },
      { color: 'brown', name: 'بني', use: 'طعام مطبوخ' },
      { color: 'white', name: 'أبيض', use: 'خبز، جبن، وفاكهة حمضية' }
    ]
  },
  {
    id: 'haccp',
    icon: '🛡️',
    title: 'نظام HACCP — المبادئ السبعة',
    isNew: true,
    infoNote: 'HACCP اختصار لـ Hazard Analysis and Critical Control Points — نظام عالمي وقائي لضمان سلامة الغذاء عبر تحديد نقاط الخطر ومراقبتها قبل وصولها للضيف، بدل اكتشاف المشكلة بعد فوات الأوان.',
    principles: [
      { n: 1, title: '🔍 تحليل المخاطر (Hazard Analysis)', desc: 'حدّد كل خطر محتمل بيولوجي أو كيميائي أو فيزيائي في كل مرحلة من مراحل تحضير الطعام.', example: 'بقايا سلك معدني في أواني التنظيف — خطر فيزيائي يجب استبعاده تماماً.' },
      { n: 2, title: '🎯 تحديد نقاط التحكم الحرجة (CCP)', desc: 'حدّد النقاط اللي لو فشلت فيها الرقابة يتحول الخطر لمشكلة فعلية — مثل الطهي أو التبريد.', example: 'درجة حرارة شطف ماكينة الأطباق النهائي قد تكون نقطة تحكم حرجة، والحد يحدده مسؤول سلامة الغذاء.' },
      { n: 3, title: '📏 وضع الحدود الحرجة (Critical Limits)', desc: 'حدّد رقماً أو معياراً واضحاً يفصل بين الآمن وغير الآمن في كل نقطة تحكم.', example: 'حرارة التبريد يجب أن تلتزم بالحد المعتمد في خطة المنشأة — أي قراءة خارجه تتطلب إجراءً تصحيحياً.' },
      { n: 4, title: '📊 المراقبة (Monitoring)', desc: 'راقب نقاط التحكم الحرجة بانتظام وسجّل النتائج لضمان الالتزام بالحدود الموضوعة.', example: 'تسجيل حرارة الثلاجات والفريزرات في جدول متابعة بالتكرار الذي تحدده خطة المنشأة.' },
      { n: 5, title: '🛠️ الإجراءات التصحيحية (Corrective Actions)', desc: 'حدّد مسبقاً ماذا تفعل بالضبط إذا تجاوزت القراءة الحد الحرج.', example: 'لو حرارة الثلاجة ارتفعت عن الحد المسموح، انقل الطعام فوراً وأبلغ المشرف الهندسي.' },
      { n: 6, title: '✅ التحقق (Verification)', desc: 'تأكد دورياً أن النظام كله يعمل فعلياً كما هو مخطط له، عبر مراجعات ومعايرة الأجهزة.', example: 'معايرة الترمومتر بانتظام حسب خطة المنشأة للتأكد من دقة قراءاته.' },
      { n: 7, title: '🗂️ التوثيق وحفظ السجلات (Record Keeping)', desc: 'وثّق كل خطوة سابقة بسجلات واضحة يمكن الرجوع لها عند التدقيق أو حدوث مشكلة.', example: 'سجلات الحرارة اليومية وملصقات تاريخ التحضير والانتهاء (القاعدة 5 و6).' }
    ],
    closingNote: 'تطبيق هذه المبادئ السبعة يوميًا هو ما يحوّل "13 القاعدة الذهبية" من قائمة تذكيرية إلى نظام رقابة حقيقي مستمر داخل قسم Stewarding.'
  }
];
const safetyContent = {
  contamination: [
    { icon: '🦠', title: 'التلوث البيولوجي', desc: 'كائنات حية مجهرية لا ترى بالعين المجردة. الأخطر على صحة الإنسان.', tags: ['بكتيريا', 'فطريات', 'طفيليات', 'فيروسات'], variant: 'danger' },
    { icon: '⚗️', title: 'التلوث الكيميائي', desc: 'مواد كيميائية لا يجب وجودها في الطعام أو على الأسطح الملامسة له.', tags: ['مواد تنظيف', 'مبيدات حشرات', 'مطهرات غير آمنة'], variant: 'safe' },
    { icon: '🔩', title: 'التلوث الفيزيائي (الطبيعي)', desc: 'أجسام غريبة في المادة الغذائية. السلك المستخدم في تنظيف الأواني ممنوع استخدامه لهذا السبب.', tags: ['زجاج', 'خشب', 'معادن', 'بلاستيك', 'شعر'], variant: 'info' }
  ],
  precautions: [
    'فصل الكهرباء فرعي ورئيسي قبل التعامل مع أي معدة كهربائية',
    'إغلاق الغاز فرعي ورئيسي قبل التعامل مع معدات الغاز',
    'السلم في المناطق العالية: استخدم السلم الزوجي فقط — ربط طرفيه معاً',
    'عند نظافة الأفران: قفاز + نظارة + مريلة + غطاء رأس إلزامي',
    'عند نظافة الأرضيات: لوحات التحذير "احذر الانزلاق" إلزامية',
    'عند غلي الأدوات ونقع المعدات: استخدم القفاز الحراري',
    'عند إضافة كيماوي للماء: أضف الماء البارد للكيماوي — لا العكس أبداً',
    'ممنوع منعاً باتاً خلط أي مادتين كيميائيتين مع بعض'
  ],
  precautionsAlert: 'قانون لا استثناء فيه: افصل الكهرباء (فرعي + رئيسي) أو أغلق الغاز قبل أي تنظيف',
  ppe: [
    { icon: '🧤', name: 'قفازات مطاط', when: 'كل الكيماويات' },
    { icon: '👓', name: 'نظارة واقية', when: 'كيماويات عالية' },
    { icon: '😷', name: 'كمامة', when: 'مواد متطايرة' },
    { icon: '👔', name: 'مريلة واقية', when: 'الأفران والجريلات' },
    { icon: '👢', name: 'حذاء مقاوم', when: 'الأرضيات والمطابخ' },
    { icon: '🧢', name: 'غطاء الرأس', when: 'جميع الأوقات' }
  ],
  firstAid: [
    { icon: '👁️', label: 'العين', text: 'اشطف بالماء الجاري النظيف لمدة 15 دقيقة على الأقل — أزل العدسات فوراً إن وجدت' },
    { icon: '🖐️', label: 'الجلد', text: 'أزل الملابس المتأثرة واشطف بالماء والصابون جيداً' },
    { icon: '😮', label: 'الابتلاع', text: 'اشطف الفم — لا تستفز القيء — اتصل بالطوارئ فوراً' },
    { icon: '💨', label: 'الاستنشاق', text: 'انتقل لمكان مفتوح فوراً — هواء نقي — اطلب مساعدة طبية' },
    { icon: '🚫', label: 'ممنوع', text: 'خلط مواد حمضية مع الكلور — ينتج غاز سام' }
  ],
  firstAidNote: 'في حالة أي حادث: ابلغ المشرف فوراً واطلب المساعدة الطبية',
  pestControl: [
    'ضع جدول المكافحة بناءً على مواعيد توقف إنتاج الغذاء',
    'إخلاء الأماكن من المواد الغذائية والأدوات قبل الرش',
    'إبلاغ عن أي شقوق أو فتحات يمكن أن تحتوي حشرات',
    'نظافة ستائر الهواء الهوائية للحد من الحشرات الطائرة',
    'بعد الرش: إزالة آثار المبيدات من الأسطح + تنظيف وتطهير'
  ],
  emergencyContacts: [
    { icon: '🚑', label: 'الإسعاف', number: '123' },
    { icon: '🚒', label: 'المطافئ', number: '180' },
    { icon: '👮', label: 'الشرطة', number: '122' },
    { icon: '☎️', label: 'المشرف المناوب', number: 'داخلي' }
  ]
};
const developerInfo = {
  name: 'Samy Salama',
  whatsappNumber: '+201122901102',
  whatsappUrl: 'https://wa.me/201122901102'
};


const STORAGE_KEY = 'stewardAppPreview:v1:state';
const DEFAULT_STATE = {
  theme: 'dark',        
  fontSize: 'medium',   
  reducedMotion: false, 
  favoriteChemicalIds: 
 ([]),
  recentChemicalIds: 
 ([]),
  recentViews: 
 ([]),
  completedModuleIds: 
 ([]),
  quizScores: 
 ({}),
  unlockedAchievementIds: 
 ([]),
  chatHistory: 
 ([]),
  lastActiveView: 'dashboard',
  installPromptDismissed: false
};
let state = structuredClone(DEFAULT_STATE);
const subscribers = new Set();
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state = { ...structuredClone(DEFAULT_STATE), ...saved };
  } catch (err) {
    console.warn('[state] تعذّر تحميل الحالة المحفوظة، سيتم استخدام القيم الافتراضية.', err);
  }
}
function persistToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[state] تعذّر حفظ الحالة — التغييرات لن تدوم بعد إعادة التحميل.', err);
  }
}
function getState(key) {
  const snapshot = structuredClone(state);
  return key === undefined ? snapshot : snapshot[key];
}
function setState(partialState) {
  state = { ...state, ...partialState };
  persistToStorage();
  notifySubscribers(Object.keys(partialState));
}
function subscribe(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}
function notifySubscribers(changedKeys) {
  subscribers.forEach((callback) => {
    try {
      callback(changedKeys);
    } catch (err) {
      console.error('[state] خطأ داخل أحد المشتركين في تغييرات الحالة:', err);
    }
  });
}
const RECENT_LIMIT = 8;
const CHAT_HISTORY_LIMIT = 40;
function toggleFavoriteChemical(chemicalId) {
  const current = getState('favoriteChemicalIds');
  const isFavorite = current.includes(chemicalId);
  const next = isFavorite
    ? current.filter((id) => id !== chemicalId)
    : [...current, chemicalId];
  setState({ favoriteChemicalIds: next });
  return !isFavorite;
}
function recordRecentChemical(chemicalId) {
  const current = getState('recentChemicalIds');
  const next = [chemicalId, ...current.filter((id) => id !== chemicalId)].slice(0, RECENT_LIMIT);
  setState({ recentChemicalIds: next });
}
function recordRecentView(viewName) {
  const current = getState('recentViews');
  const next = [viewName, ...current.filter((v) => v !== viewName)].slice(0, RECENT_LIMIT);
  setState({ recentViews: next, lastActiveView: viewName });
}
function appendChatMessage(role, content) {
  const current = getState('chatHistory');
  const next = [...current, { role, content, ts: Date.now() }].slice(-CHAT_HISTORY_LIMIT);
  setState({ chatHistory: next });
}
function clearChatHistory() {
  setState({ chatHistory: [] });
}
function markModuleCompleted(moduleId) {
  const current = getState('completedModuleIds');
  if (current.includes(moduleId)) return;
  setState({ completedModuleIds: [...current, moduleId] });
}
function saveQuizScore(moduleId, score, total) {
  const current = getState('quizScores');
  setState({
    quizScores: {
      ...current,
      [moduleId]: { score, total, completedAt: new Date().toISOString() }
    }
  });
}
function unlockAchievement(achievementId) {
  const current = getState('unlockedAchievementIds');
  if (current.includes(achievementId)) return false;
  setState({ unlockedAchievementIds: [...current, achievementId] });
  return true;
}
function resetAllData() {
  state = structuredClone(DEFAULT_STATE);
  persistToStorage();
  notifySubscribers(Object.keys(DEFAULT_STATE));
}
function exportStateAsJSON() {
  return JSON.stringify(state, null, 2);
}
function importStateFromJSON(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return { success: false, error: 'صيغة الملف غير صالحة.' };
    }
    state = { ...structuredClone(DEFAULT_STATE), ...parsed };
    persistToStorage();
    notifySubscribers(Object.keys(DEFAULT_STATE));
    return { success: true };
  } catch (err) {
    return { success: false, error: 'تعذّر قراءة الملف — تأكد أنه ملف تصدير صالح.' };
  }
}
loadFromStorage();


const DEFAULT_VIEW = 'dashboard';
const registeredViews = new Map();
let currentViewName = null;
function registerView(viewName, lifecycle) {
  registeredViews.set(viewName, lifecycle);
}
function parseHash() {
  const raw = location.hash.replace(/^#/, '');
  const [viewName, queryString] = raw.split('?');
  return {
    viewName: viewName && registeredViews.has(viewName) ? viewName : DEFAULT_VIEW,
    params: new URLSearchParams(queryString ?? '')
  };
}
function applyRoute() {
  const { viewName, params } = parseHash();
  if (viewName === currentViewName) return; 
  const previousViewName = currentViewName;
  currentViewName = viewName;
  if (previousViewName && registeredViews.has(previousViewName)) {
    registeredViews.get(previousViewName).onLeave?.();
  }
  document.querySelectorAll('.view').forEach((section) => {
    const isTarget = section.dataset.view === viewName;
    section.hidden = !isTarget;
  });
  document.querySelectorAll('.bottom-nav__item').forEach((navBtn) => {
    const isActive = navBtn.dataset.navTarget === viewName;
    navBtn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (registeredViews.has(viewName)) {
    registeredViews.get(viewName).onEnter?.(params);
  }
  recordRecentView(viewName);
  updateDocumentTitle(viewName);
}
const VIEW_TITLES = {
  dashboard: 'لوحة التحكم',
  chemicals: 'المواد الكيميائية',
  education: 'أكاديمية التعليم',
  safety: 'السلامة والطوارئ',
  ai: 'المساعد',
  settings: 'الإعدادات'
};
function updateDocumentTitle(viewName) {
  const label = VIEW_TITLES[viewName] ?? '';
  document.title = label ? `${label} — دليل الاستيوارد` : 'دليل الاستيوارد';
}
function navigateTo(viewName, params = {}) {
  const query = new URLSearchParams(params).toString();
  location.hash = query ? `${viewName}?${query}` : viewName;
}
function initRouter() {
  window.addEventListener('hashchange', applyRoute);
  applyRoute();
}
