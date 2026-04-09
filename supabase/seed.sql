-- ============================================================
-- UrduNazm — Seed Data
-- Run this AFTER the migration (001_initial.sql)
-- ============================================================

-- ==================== CATEGORIES ====================
insert into public.categories (name_en, name_ur, slug) values
  ('Ghazal', 'غزل', 'ghazal'),
  ('Nazm', 'نظم', 'nazm'),
  ('Rubai', 'رباعی', 'rubai'),
  ('Qita', 'قطعہ', 'qita'),
  ('Marsiya', 'مرثیہ', 'marsiya');

-- ==================== POETS ====================
insert into public.poets (name_en, name_ur, slug, bio_en, bio_ur, born, died, era) values
(
  'Mirza Ghalib',
  'مرزا غالب',
  'mirza-ghalib',
  'Mirza Asadullah Baig Khan, known by his pen name Ghalib, is considered the greatest Urdu poet of all time. His ghazals explore love, loss, philosophy, and the human condition with unmatched depth and wit.',
  'مرزا اسد اللہ بیگ خان، جو اپنے قلمی نام غالب سے مشہور ہیں، اردو کے سب سے عظیم شاعر مانے جاتے ہیں۔ ان کی غزلیں محبت، فلسفے اور انسانی کیفیات کی بے مثال عکاسی کرتی ہیں۔',
  '1797', '1869', 'Classical'
),
(
  'Allama Iqbal',
  'علامہ اقبال',
  'allama-iqbal',
  'Sir Muhammad Iqbal, known as Allama Iqbal, was a philosopher, poet, and politician. He is regarded as the spiritual father of Pakistan. His poetry inspires self-discovery, spiritual awakening, and the pursuit of excellence.',
  'سر محمد اقبال، جو علامہ اقبال کے نام سے مشہور ہیں، ایک فلسفی، شاعر اور سیاستدان تھے۔ انہیں پاکستان کا روحانی باپ سمجھا جاتا ہے۔ ان کی شاعری خودی، روحانی بیداری اور کمال کی تلاش کی ترغیب دیتی ہے۔',
  '1877', '1938', 'Modern'
),
(
  'Faiz Ahmed Faiz',
  'فیض احمد فیض',
  'faiz-ahmed-faiz',
  'Faiz Ahmed Faiz was a revolutionary poet who blended romantic imagery with political resistance. A Nobel Prize nominee, his verses became anthems of protest movements across South Asia.',
  'فیض احمد فیض ایک انقلابی شاعر تھے جنہوں نے رومانوی تصویر کشی کو سیاسی مزاحمت سے ملایا۔ نوبل انعام کے نامزد، ان کے اشعار جنوبی ایشیا بھر میں احتجاجی تحریکوں کے ترانے بن گئے۔',
  '1911', '1984', 'Modern'
),
(
  'Mir Taqi Mir',
  'میر تقی میر',
  'mir-taqi-mir',
  'Mir Taqi Mir is known as the God of Urdu poetry. His ghazals are celebrated for their simplicity, emotional depth, and the melancholic beauty of unrequited love.',
  'میر تقی میر کو اردو شاعری کا خدا کہا جاتا ہے۔ ان کی غزلیں سادگی، جذباتی گہرائی اور ناکام محبت کے درد کی خوبصورتی کے لیے مشہور ہیں۔',
  '1723', '1810', 'Classical'
),
(
  'Ahmed Faraz',
  'احمد فراز',
  'ahmed-faraz',
  'Ahmed Faraz was one of the most celebrated modern Urdu poets. Known for his romantic and revolutionary poetry, his mushaira performances drew massive audiences across the world.',
  'احمد فراز جدید اردو کے سب سے مشہور شعراء میں سے ایک تھے۔ رومانوی اور انقلابی شاعری کے لیے مشہور، ان کے مشاعرے دنیا بھر میں ہزاروں سامعین کو اپنی طرف کھینچتے تھے۔',
  '1931', '2008', 'Modern'
),
(
  'Parveen Shakir',
  'پروین شاکر',
  'parveen-shakir',
  'Parveen Shakir was one of the most prominent female Urdu poets. Her poetry captures the feminine experience with grace, boldness, and lyrical beauty. Her debut collection Khushbu became iconic.',
  'پروین شاکر اردو کی سب سے نمایاں خواتین شاعرات میں سے ایک تھیں۔ ان کی شاعری نسائی تجربے کو وقار، جرات اور نغمگی سے بیان کرتی ہے۔ ان کا پہلا مجموعہ "خوشبو" ایک علامت بن گیا۔',
  '1952', '1994', 'Modern'
);

-- ==================== POEMS ====================

-- Helper: get poet and category IDs
-- Ghalib poems
insert into public.poems (title_en, title_ur, content_ur, content_en, poet_id, category_id, slug, featured) values
(
  'Hazaron Khwahishen',
  'ہزاروں خواہشیں',
  'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے
بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے

ڈرے کیوں میرا قاتل کیا رہے گا اس کی گردن پر
وہ خون جو چشمِ تر سے عمر بھر یوں دم بدم نکلے

نکلنا خُلد سے آدم کا سُنتے آئے تھے لیکن
بہت بے آبرو ہو کر تیرے کوچے سے ہم نکلے',
  'A thousand desires, each worth dying for
Many of my wishes did come true, but even so, fell short

Why should my killer worry about being blamed?
For the blood that flowed from tearful eyes, drop by drop, a lifetime long

We had always heard of Adam''s exile from paradise
But far more disgraced were we, when we left your lane',
  (select id from public.poets where slug = 'mirza-ghalib'),
  (select id from public.categories where slug = 'ghazal'),
  'hazaron-khwahishen',
  true
),
(
  'Dil-e-Nadaan',
  'دلِ نادان',
  'دلِ نادان تجھے ہوا کیا ہے
آخر اس درد کی دوا کیا ہے

ہم ہیں مشتاق اور وہ بیزار
یا الٰہی یہ ماجرا کیا ہے

میں بھی منہ میں زبان رکھتا ہوں
کاش پوچھو کہ مدعا کیا ہے',
  'O naive heart, what has happened to you?
What, after all, is the cure for this pain?

I am eager and she is indifferent
O God, what is this tale?

I too have a tongue in my mouth
If only you would ask what I desire',
  (select id from public.poets where slug = 'mirza-ghalib'),
  (select id from public.categories where slug = 'ghazal'),
  'dil-e-nadaan',
  false
),

-- Iqbal poems
(
  'Lab Pe Aati Hai Dua',
  'لب پہ آتی ہے دعا',
  'لب پہ آتی ہے دعا بن کے تمنا میری
زندگی شمع کی صورت ہو خدایا میری

دور دنیا کا مرے دم سے اندھیرا ہو جائے
ہر جگہ میرے چمکنے سے اُجالا ہو جائے',
  'A prayer forms on my lips as my heart''s desire
May my life be like a candle''s light, O God

May the darkness of the world vanish through me
May every place light up from my glow',
  (select id from public.poets where slug = 'allama-iqbal'),
  (select id from public.categories where slug = 'nazm'),
  'lab-pe-aati-hai-dua',
  true
),
(
  'Khudi Ka Sirr-e-Nihan',
  'خودی کا سرِ نہاں',
  'خودی کا سرِّ نہاں لا الٰہ الا اللہ
خودی ہے تیغ فساں لا الٰہ الا اللہ

یہ دور اپنے براہیم کی تلاش میں ہے
صنم کدہ ہے جہاں لا الٰہ الا اللہ',
  'The secret of the self is: there is no god but God
The self is a sharpened sword: there is no god but God

This age is searching for its Abraham
The world is a house of idols: there is no god but God',
  (select id from public.poets where slug = 'allama-iqbal'),
  (select id from public.categories where slug = 'ghazal'),
  'khudi-ka-sirr-e-nihan',
  false
),

-- Faiz poems
(
  'Mujh Se Pehli Si Mohabbat',
  'مجھ سے پہلی سی محبت',
  'مجھ سے پہلی سی محبت میری محبوب نہ مانگ
میں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات
تیرا غم ہے تو غمِ دہر کا جھگڑا کیا ہے
تیری صورت سے ہے عالم میں بہاروں کو ثبات',
  'Do not ask me, beloved, for that love again
I had thought that if you exist, then life is radiant
If I have your sorrow, what quarrel have I with the world''s grief?
Your face gives permanence to the springs of this world',
  (select id from public.poets where slug = 'faiz-ahmed-faiz'),
  (select id from public.categories where slug = 'ghazal'),
  'mujh-se-pehli-si-mohabbat',
  true
),
(
  'Hum Dekhenge',
  'ہم دیکھیں گے',
  'ہم دیکھیں گے
لازم ہے کہ ہم بھی دیکھیں گے
وہ دن کہ جس کا وعدہ ہے
جو لوحِ ازل میں لکھا ہے

جب ظلم و ستم کے کوہِ گراں
روئی کی طرح اُڑ جائیں گے
ہم محکوموں کے پاؤں تلے
جب دھرتی دھڑ دھڑ دھڑکے گی',
  'We shall see
It is certain that we too shall see
That day which has been promised
Which is written on the tablet of eternity

When the mountains of tyranny and oppression
Will blow away like wisps of cotton
Under the feet of us, the oppressed
When the earth will throb and quake',
  (select id from public.poets where slug = 'faiz-ahmed-faiz'),
  (select id from public.categories where slug = 'nazm'),
  'hum-dekhenge',
  true
),

-- Mir Taqi Mir poems
(
  'Ulti Ho Gayin Sab Tadbeerein',
  'الٹی ہو گئیں سب تدبیریں',
  'الٹی ہو گئیں سب تدبیریں کچھ نہ دوا نے کام کیا
دیکھا اس بیماریِ دل نے آخر کام تمام کیا

مت کہہ آگے آگے دیکھ آگے کیا ہوتا ہے
دل ہے میر بے بس دل اس کی دل شکنی اعظام کیا',
  'All remedies have turned futile, no medicine has worked
See what this sickness of the heart has finally done

Do not say: wait and see what happens next
Mir, the helpless heart — what regard does she have for breaking it?',
  (select id from public.poets where slug = 'mir-taqi-mir'),
  (select id from public.categories where slug = 'ghazal'),
  'ulti-ho-gayin-sab-tadbeerein',
  false
),
(
  'Dikhai Diye Yun',
  'دکھائی دیے یوں',
  'دکھائی دیے یوں کہ بے خود کیا
ہمیں آپ سے بھی جدا کر چلے

جفائیں کر کے بے وفائی سے
ابھی کچھ عنایتیں باقی ہیں',
  'You revealed yourself in such a way that I lost my senses
You separated me even from myself

Having been cruel and faithless
There are still some more favors left to bestow',
  (select id from public.poets where slug = 'mir-taqi-mir'),
  (select id from public.categories where slug = 'ghazal'),
  'dikhai-diye-yun',
  false
),

-- Ahmed Faraz poems
(
  'Ranjish Hi Sahi',
  'رنجش ہی سہی',
  'رنجش ہی سہی دل ہی دکھانے کے لیے آ
آ پھر سے مجھے چھوڑ کے جانے کے لیے آ

پہلے سے مراسم نہ سہی پھر بھی کبھی تو
رسمِ دنیا ہی نبھانے کے لیے آ

کس کس کو بتائیں گے جدائی کا سبب ہم
تو مجھ سے خفا ہے تو زمانے کے لیے آ',
  'Let there be bitterness — come, even if just to break my heart
Come once more, even if to leave me again

Even if we share no bond, then at least sometime
Come to keep up appearances for the world

To how many can I explain the reason for our parting?
You are angry with me — so come at least for the world''s sake',
  (select id from public.poets where slug = 'ahmed-faraz'),
  (select id from public.categories where slug = 'ghazal'),
  'ranjish-hi-sahi',
  true
),
(
  'Ab Ke Hum Bichde',
  'اب کے ہم بچھڑے',
  'اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں
جس طرح سوکھے ہوئے پھول کتابوں میں ملیں',
  'If we part now, perhaps we shall meet only in dreams
The way dried flowers are found pressed between the pages of books',
  (select id from public.poets where slug = 'ahmed-faraz'),
  (select id from public.categories where slug = 'ghazal'),
  'ab-ke-hum-bichde',
  false
),

-- Parveen Shakir poems
(
  'Khushbu',
  'خوشبو',
  'اک لڑکی جو پھولوں کی مانند نازک تھی
بارش کے بعد مٹی کی خوشبو میں ڈھلی
ایسے ڈھلی کے خود ہی خوشبو بن گئی

وہ اب نہیں مگر خوشبو ابھی بھی ہے',
  'A girl who was delicate as flowers
Dissolved in the fragrance of earth after rain
Dissolved so completely that she became the fragrance itself

She is no more, but the fragrance still remains',
  (select id from public.poets where slug = 'parveen-shakir'),
  (select id from public.categories where slug = 'nazm'),
  'khushbu',
  true
),
(
  'Mera Dard Nighahi',
  'میرا درد نگاہی',
  'تم نے دیکھا نہیں اور میں نے سنا ہے اکثر
پہلی ملاقات میں چہرے بہت اچھے لگتے ہیں

اس لیے میں نے تمہیں دیکھا ہی نہیں
ورنہ مجھ سے بچھڑنا تمہیں مشکل ہوتا',
  'You haven''t noticed, but I have often heard
That faces seem so lovely at first meeting

That is why I never looked at you
Otherwise, leaving me would have been difficult for you',
  (select id from public.poets where slug = 'parveen-shakir'),
  (select id from public.categories where slug = 'ghazal'),
  'mera-dard-nighahi',
  false
);

-- ==================== SAMPLE BLOG POST ====================
insert into public.blogs (title_en, title_ur, content_en, excerpt_en, slug, category, author_name, published, published_at) values
(
  'Understanding the Ghazal: Form, History, and Masters',
  'غزل کو سمجھنا: ہیئت، تاریخ اور اساتذہ',
  'The ghazal is one of the most beloved poetic forms in Urdu literature. Originating from 7th-century Arabic poetry, the ghazal found its true home in the Persian and later Urdu literary traditions. Each couplet (sher) in a ghazal is an independent unit of meaning, yet the entire poem is unified by a common meter (behr) and rhyme scheme (radif and qafiya). The opening couplet (matla) establishes the rhyme, and the final couplet (maqta) traditionally contains the poet''s pen name. Masters like Ghalib, Mir, and Faiz elevated the ghazal to extraordinary heights, each bringing their unique voice to this timeless form.',
  'A deep dive into the most beloved poetic form of Urdu literature — its structure, history, and the masters who perfected it.',
  'understanding-the-ghazal',
  'Poetry Analysis',
  'UrduNazm',
  true,
  now()
);
