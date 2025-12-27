// --- 0. بيانات المشاريع ---
const projectsData = {
    'mystudies': {
        title: "myStudies (Graduation Project)",
        descEn: "A comprehensive academic assistant application for Jubail Industrial College students. Features include schedule management, GPA calculation, and academic calendar integration.",
        descAr: "تطبيق مساعد أكاديمي شامل لطلاب كلية الجبيل الصناعية. تشمل الميزات إدارة الجدول الدراسي، حساب المعدل التراكمي (GPA)، وربط التقويم الأكاديمي.",
        link: "https://github.com/Turki-Alshaikh/MyStudies---Graduation-project",
        images: ["img/info.jpg" , "img/dashboard.png", "img/calendar.png", "img/gpa.png"]
    },
    'familyfeud': {
        title: "Family Feud",
        descEn: "Interactive web game for family gatherings. Includes an Admin Panel for adding custom questions and a settings menu to customize game colors and sounds.",
        descAr: "لعبة ويب تفاعلية للتجمعات العائلية. تتضمن لوحة تحكم (Admin Panel) لإضافة أسئلة مخصصة، وقائمة إعدادات لتخصيص ألوان اللعبة والأصوات.",
        link: "https://familyfeud25mfatihy.netlify.app/",
        images: ["img/familyfued main.png", "img/familyfued in game.png", "img/familyfued game settings.png", "img/familyfuedadmin.png"]
    },
    'mfatihy': {
        title: "Mfatihy Store",
        descEn: "An automated e-commerce platform for selling digital keys. Built to handle secure transactions and instant delivery via email/SMS.",
        descAr: "منصة تجارة إلكترونية مؤتمتة لبيع المفاتيح الرقمية. صممت للتعامل مع المدفوعات الآمنة والتسليم الفوري عبر البريد الإلكتروني والرسائل النصية.",
        link: "https://mfatihy.com",
        images: ["img/Mfatihylogo.webp"]
    },
    'khaliya': {
        title: "Khaliya & Majalat Games",
        descEn: "A collection of interactive group games including 'Letter Race' and 'Fields'. Inspired by popular TV shows, these games achieved significant commercial success with over 1,713 sales.",
        descAr: "حزمة ألعاب جماعية تفاعلية تشمل 'سباق الحروف (خلية)' و 'مجالات'. مستوحاة من برامج تلفزيونية شهيرة، حققت نجاحاً تجارياً كبيراً وأكثر من 1713 مبيعات.",
        link: "https://mfatihy.com", 
        images: ["img/khaliya_main.png", "img/khaliya_game.png"] 
    },
    'different': {
        title: "The Odd One Out (المختلف)",
        descEn: "A social intelligence game where players receive a word except for one 'Odd One Out'. Players must use vague hints to identify the outsider without revealing the secret word.",
        descAr: "لعبة ذكاء اجتماعي يحصل فيها اللاعبون على كلمة سرية ما عدا لاعب واحد 'المختلف'. يجب على اللاعبين استخدام تلميحات لكشف المختلف دون فضح الكلمة.",
        link: "https://mfatihy.com",
        images: ["img/different_main.png", "img/different_game.png"]
    },
    'imposter': {
        title: "Imposter Game (الامبوستر)",
        descEn: "A thrilling social deduction game. Players complete tasks while trying to identify the 'Imposter' among them who is trying to sabotage the mission.",
        descAr: "لعبة استنتاج اجتماعي مثيرة. يقوم اللاعبون بمهام بينما يحاولون كشف 'الامبوستر' المتخفي بينهم والذي يحاول تخريب المهمة.",
        link: "https://mfatihy.com",
        images: ["img/imposter_main.png", "img/imposter_game.png"]
    },
    'footballxo': {
        title: "Football Tic Tac Toe (كورة XO)",
        descEn: "A strategic twist on the classic Tic Tac Toe. Combine your football knowledge with strategy to win the grid against your opponent.",
        descAr: "نسخة استراتيجية مطورة من لعبة 'إكس أو' الكلاسيكية بطابع كروي. ادمج معلوماتك الرياضية مع الاستراتيجية للفوز بالمربعات ضد خصمك.",
        link: "https://mfatihy.com",
        images: ["img/footballxo_main.png", "img/footballxo_game.png"]
    }
};

// --- 1. منطق التخرج ---
const graduationDate = new Date('2026-06-01');
const today = new Date();
const isGraduated = today >= graduationDate;

// --- 2. إدارة الحالة ---
let currentLang = localStorage.getItem('lang') || 'en';
let isDark = localStorage.getItem('theme') !== 'light'; 

document.addEventListener('DOMContentLoaded', () => {
    if (isDark) {
        document.body.classList.add('dark');
        document.querySelector('.theme-btn i').classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark');
        document.querySelector('.theme-btn i').classList.replace('fa-sun', 'fa-moon');
    }
    applyLanguage(currentLang);
});

// --- 3. الوظائف الأساسية ---
function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.opacity = '0';
        setTimeout(() => sec.scrollTop = 0, 300);
    });
    const target = document.getElementById(id);
    target.classList.add('active');
    setTimeout(() => target.style.opacity = '1', 10);
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const navMap = {'home': 0, 'projects': 1, 'skills': 2, 'contact': 3};
    document.querySelectorAll('.nav-item')[navMap[id]].classList.add('active');
}

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark');
    const icon = document.querySelector('.theme-btn i');
    if (document.body.classList.contains('dark')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(currentLang);
    localStorage.setItem('lang', currentLang);
}

function applyLanguage(lang) {
    const html = document.documentElement;
    const btn = document.getElementById('langBtn');
    const btnPrimary = document.querySelector('.btn-primary');

    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    btn.innerText = lang === 'en' ? 'AR' : 'EN';
    
    if(window.innerWidth >= 768) {
        btnPrimary.style.alignSelf = 'flex-start';
    } else {
        btnPrimary.style.alignSelf = 'center';
    }

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Update modal if open
    const modal = document.getElementById('projectModal');
    if(modal.style.display === 'flex' && currentProjectId) {
        const data = projectsData[currentProjectId];
        document.getElementById('modalDesc').innerText = lang === 'en' ? data.descEn : data.descAr;
    }
}

// --- 4. وظائف المودال (Popup) ---
let currentProjectId = null;

function openProject(id) {
    currentProjectId = id;
    const data = projectsData[id];
    const modal = document.getElementById('projectModal');
    
    // Set Content
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerText = currentLang === 'en' ? data.descEn : data.descAr;
    document.getElementById('modalLink').href = data.link;
    
    // Setup Gallery
    const mainImg = document.getElementById('mainImage');
    const thumbsContainer = document.getElementById('thumbsContainer');
    
    mainImg.src = data.images[0]; 
    thumbsContainer.innerHTML = ''; 

    data.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.className = index === 0 ? 'thumb active' : 'thumb';
        thumb.onclick = function() {
            changeMainImage(imgSrc, this);
        };
        thumbsContainer.appendChild(thumb);
    });

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden'; 
}

function closeProject() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        currentProjectId = null;
    }, 200);
    document.body.style.overflow = ''; 
}

function changeMainImage(src, thumbElement) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumbElement.classList.add('active');
}

// --- 5. النصوص والترجمات ---
const translations = {
    en: {
        logoName: "TURKI ALSHAIKH",
        hello: "Hello, I'm",
        name: "TURKI ALSHAIKH",
        role: isGraduated ? "Computer Science Graduate & Entrepreneur" : "Computer Science Student & Entrepreneur",
        bio: isGraduated 
             ? "Computer Science Graduate from Jubail Industrial College. Integrating advanced software development with e-commerce strategies. Founder of 'Mfatihy' digital store and developer of commercially successful interactive games."
             : "Computer Science student at Jubail Industrial College (Class of 2026). Integrating advanced software development with e-commerce strategies. Founder of 'Mfatihy' digital store and developer of commercially successful interactive games.",
        exploreBtn: "View Projects",
        
        projectsTitle: "Featured Projects",
        secPersonal: "Personal & Business Projects",
        secGames: "Interactive Games (Developed by Me)",

        proj1Desc: "A personal academic assistant application developed for Jubail Industrial College students to manage schedules and tasks efficiently (Graduation Project).",
        proj3Desc: "An interactive web-based game tailored for family gatherings, simulating the famous TV show experience with custom features.",
        proj4Title: "Mfatihy Store",
        proj4Desc: "A fully operational e-commerce platform specializing in digital software licenses (Windows & Office) with automated delivery.",
        proj2Title: "Letter Race Cell and Fields Game",
        proj2Desc: "Letter Race Cell  Fields The Letter Race game from the popular Letters and Thousands show  and Letters with Aziz show Achieved commercial success with over 1,713 sales.",
        projDiffTitle: "The Odd One Out",
        projDiffDesc: "A group intelligence game to discover the odd one out via hints.",
        projImpTitle: "Imposter Game",
        projImpDesc: "Social deduction game to find the hidden imposter among the crew.",
        projXoTitle: "Football XO",
        projXoDesc: "Strategic Tic Tac Toe with a football theme twist.",

        skillsTitle: "Technical & Soft Skills",
        skillDev: "Software Development",
        skillAI: "Artificial Intelligence",
        aiIntegr: "AI Integration",
        promptEng: "Prompt Engineering",
        aiTools: "AI Tools Handling",
        
        skillBusiness: "Business & Management",
        ecomManage: "E-Commerce Management",
        clientComm: "Client Communication",
        custSupport: "Customer Support",
        
        skillTools: "Tools & Software",
        toolPs: "Photoshop",
        toolOffice: "MS Office Suite",
        
        contactTitle: "Let's Connect",
        contactDesc: "Actively seeking Coop training or full-time opportunities. Ready to leverage my technical expertise and business acumen to drive success in your team.",
        visitBtn: "Visit Project",

        navHome: "Home",
        navProjects: "Projects",
        navSkills: "Skills",
        navContact: "Contact"
    },
    ar: {
        logoName: "تركي الشيخ",
        hello: "مرحباً، أنا",
        name: "تركي الشيخ",
        role: isGraduated ? "خريج علوم حاسب | رائد أعمال" : "طالب علوم حاسب | رائد أعمال",
        bio: isGraduated
             ? "حاصل على بكالوريوس علوم الحاسب الآلي من كلية الجبيل الصناعية. أمتلك خبرة عملية تدمج بين الحلول التقنية المتقدمة واستراتيجيات التجارة الإلكترونية. مؤسس منصة 'مفاتيحي' الرقمية، ومطور مستقل لألعاب تفاعلية حققت نجاحاً تجارياً ملموساً."
             : "طالب بكالوريوس علوم الحاسب الآلي في كلية الجبيل الصناعية (دفعة 2026). أمتلك خبرة عملية تدمج بين الحلول التقنية المتقدمة واستراتيجيات التجارة الإلكترونية. مؤسس منصة 'مفاتيحي' الرقمية، ومطور مستقل لألعاب تفاعلية حققت نجاحاً تجارياً ملموساً.",
        exploreBtn: "تصفح مشاريعي",
        
        projectsTitle: "أبرز الإنجازات والمشاريع",
        secPersonal: "مشاريع شخصية وتجارية",
        secGames: "ألعاب تفاعلية من تطويري",

        proj1Desc: "تطبيق مساعد أكاديمي متكامل تم تطويره لطلاب كلية الجبيل الصناعية لتنظيم الجداول والمهام الدراسية (مشروع التخرج).",
        proj3Desc: "نسخة ويب تفاعلية من البرنامج الشهير 'فاميلي فيود'، صممت خصيصاً لإدارة المسابقات في التجمعات العائلية.",
        proj4Title: "منصة مفاتيحي",
        proj4Desc: "متجر إلكتروني متكامل متخصص في حلول البرمجيات والمفاتيح الرقمية (Windows & Office) مع نظام تسليم آلي.",
        proj2Title: "لعبة خلية سباق الحروف و مجالات",
        proj2Desc: "لعبه سباق الحروف من البرنامج الشهير حروف والوف و حروف مع عزيز'. حققت انتشاراً واسعاً وأكثر من 1713 عملية شراء ناجحة.",
        projDiffTitle: "لعبة المختلف",
        projDiffDesc: "لعبة ذكاء جماعية تعتمد على التلميحات لكشف الشخص المختلف.",
        projImpTitle: "لعبة الامبوستر",
        projImpDesc: "لعبة استنتاج اجتماعي لكشف الدخيل (الامبوستر) بين المجموعة.",
        projXoTitle: "كورة XO",
        projXoDesc: "لعبة إكس أو باستراتيجية وتحديات كروية ممتعة.",

        skillsTitle: "المهارات والخبرات",
        skillDev: "تطوير البرمجيات والأنظمة",
        skillAI: "الذكاء الاصطناعي",
        aiIntegr: "التكامل مع الذكاء الاصطناعي",
        promptEng: "هندسة الأوامر (Prompt Eng)",
        aiTools: "استخدام أدوات الذكاء الاصطناعي",
        
        skillBusiness: "إدارة الأعمال والتواصل",
        ecomManage: "إدارة المتاجر الإلكترونية",
        clientComm: "التواصل الفعال مع العملاء",
        custSupport: "دعم العملاء",
        
        skillTools: "الأدوات والبرامج",
        toolPs: "فوتوشوب (Photoshop)",
        toolOffice: "حزمة مايكروسوفت أوفيس",
        
        contactTitle: "لنعمل سوياً",
        contactDesc: "أتطلع لفرص التدريب التعاوني (Coop) أو التوظيف. مستعد لتوظيف خبراتي التقنية ومهاراتي في ريادة الأعمال للمساهمة في نجاح فريقكم.",
        visitBtn: "زيارة المشروع",

        navHome: "الرئيسية",
        navProjects: "المشاريع",
        navSkills: "المهارات",
        navContact: "تواصل"
    }
};