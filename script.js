
document.getElementById('year').innerText = new Date().getFullYear();

const translations = {
    ar: {
        hero_name: "تركي الشيخ",
        hero_title_1: "خريج علوم حاسب",
        hero_title_2: "أخصائي تقنية معلومات",
        location: "جدة، المملكة العربية السعودية",
        about_title: "نبذة عني",
        about_p1: `خريج علوم حاسب بشغف كبير تجاه تطوير البرمجيات، الشبكات، والبنية التحتية لتقنية المعلومات. أدمج بين المهارات التقنية القوية وعقلية الأعمال، وهو ما تُرجم عملياً بتأسيس وتطوير منصة <a href="https://mfatihy.com/" target="_blank" class="text-primary hover:text-white font-bold transition-colors">مفاتيحي (Mfatihy)</a>.`,
        about_p2: "أمتلك مهارة عالية في برمجة البايثون، تطوير واجهات الويب، إدارة قواعد البيانات، وتوظيف أدوات الذكاء الاصطناعي لتسريع حل المشكلات التقنية وتحسين سير العمل.",
        skills_title: "التقنيات والأدوات",
        skills_prog: "البرمجة",
        skills_fw: "أطر العمل والهيكلة",
        skills_tech: "الدعم الفني",
        skills_db: "قواعد البيانات والسحابة",
        skills_ai: "الذكاء الاصطناعي والأتمتة",
        skills_sys: "تحليل الأنظمة",
        projects_title: "أبرز المشاريع",
        mfatihy_role: "المؤسس والمطور الرئيسي",
        mfatihy_desc: "بناء وتوسيع منصة رقمية مؤتمتة لتوزيع البرمجيات مع هندسة نظام تسليم آلي متكامل.",
        mystudies_title: "MyStudies",
        mystudies_role: "مشروع التخرج",
        mystudies_desc: "تطبيق جوال متكامل لإدارة الجداول والمواعيد الجامعية، مدمج بالذكاء الاصطناعي (OCR) لاستخراج النصوص آلياً.",
        deskfolders_title: "DeskFoldersPro",
        deskfolders_desc: "أداة ذكية لتنظيم ملفات سطح المكتب تلقائياً بضغطة زر لنظام ويندوز.",
        athan_title: "AthanWidget",
        athan_desc: "ويدجت احترافي لعرض مواقيت الصلاة بشكل أنيق ومباشر على سطح المكتب.",
        view_project: "عرض المشروع",
        github_stats_title: "إحصائيات GitHub",
        git_projects: "مستودعات GitHub",
        loading: "جاري جلب المشاريع من خوادم GitHub...",
        no_projects: "لا توجد مشاريع حالياً.",
        edu_degree: "دبلوم في علوم حاسب",
        edu_school: "كلية الجبيل الصناعية",
        edu_cs: "Computer Science",
        edu_date: "تاريخ التخرج: أبريل 2026",
        visit_store: "الدخول للمتجر",
        ms_store: "تحميل من المتجر",
    },
    en: {
        hero_name: "Turki Alshaikh",
        hero_title_1: "CS Graduate",
        hero_title_2: "IT Specialist",
        location: "Jeddah, Saudi Arabia",
        about_title: "About Me",
        about_p1: `Dedicated Computer Science graduate with a strong technical foundation in software development and IT infrastructure. I possess a unique blend of technical skills and business acumen, demonstrated by successfully founding and automating <a href="https://mfatihy.com/" target="_blank" class="text-primary hover:text-white font-bold transition-colors">Mfatihy</a>.`,
        about_p2: "Highly skilled in Python scripting, front-end development, database management, and leveraging AI tools to accelerate problem-solving and optimize workflows.",
        skills_title: "Tech Stack & Tools",
        skills_prog: "Programming",
        skills_fw: "Frameworks & Architecture",
        skills_tech: "Technical Support",
        skills_db: "Databases & Cloud",
        skills_ai: "AI & Automation",
        skills_sys: "System Analysis",
        projects_title: "Featured Projects",
        mfatihy_role: "Founder & Lead Developer",
        mfatihy_desc: "Built and scaled an automated digital software distribution platform with integrated auto-delivery via webhooks.",
        mystudies_title: "MyStudies",
        mystudies_role: "Graduation Project",
        mystudies_desc: "A cross-platform mobile application for academic scheduling, integrating Google ML Kit (OCR) for automated deadline extraction.",
        deskfolders_title: "DeskFoldersPro",
        deskfolders_desc: "A smart desktop application to automatically organize files on Windows with a single click.",
        athan_title: "AthanWidget",
        athan_desc: "A professional and elegant desktop widget for displaying live prayer times on Windows.",
        view_project: "View Project",
        github_stats_title: "GitHub Stats",
        git_projects: "GitHub Repositories",
        loading: "Fetching repos from GitHub...",
        no_projects: "No projects found.",
        edu_degree: "Associate Degree in Computer Science",
        edu_school: "Jubail Industrial College",
        edu_cs: "Computer Science",
        edu_date: "Graduation: April 2026",
        visit_store: "Visit Store",
        ms_store: "Microsoft Store",
    }
};

// جلب اللغة المحفوظة من المتصفح أو جعل العربية هي الافتراضية
let currentLang = localStorage.getItem('preferredLang') || 'ar';

// دالة لتطبيق اللغة على الموقع
function applyLanguage() {
    const htmlTag = document.documentElement;
    htmlTag.lang = currentLang;
    htmlTag.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // تحديث عنوان التبويب
    document.title = currentLang === 'ar' 
        ? "تركي الشيخ | أخصائي تقنية معلومات ومطور برمجيات" 
        : "Turki Alshaikh | IT Specialist & Software Developer";

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // نحدث جميع النصوص باستثناء الاسم لأنه يحتاج أنيميشن
        if (translations[currentLang][key] && key !== 'hero_name') {
            el.innerHTML = translations[currentLang][key];
        }
    });

    if (globalRepos.length > 0) {
        renderGithubProjects(globalRepos);
    }
}

// دالة تبديل اللغة (عند الضغط على الزر)
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('preferredLang', currentLang); // حفظ الاختيار في المتصفح للأبد
    applyLanguage();

    // تشغيل أنيميشن الكتابة للاسم عند تغيير اللغة
    const heroNameEl = document.querySelector('[data-i18n="hero_name"]');
    if(heroNameEl) {
        typeEffect(heroNameEl, translations[currentLang]['hero_name'], 60);
    }
}

// Active Dot Navigation based on Normal Scroll
const sections = document.querySelectorAll('section');
const navDots = document.querySelectorAll('.nav-dot');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-target') === current) {
            dot.classList.add('active');
        }
    });
});
let globalRepos = [];

// تعديل دالة تبديل اللغة
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const htmlTag = document.documentElement;
    htmlTag.lang = currentLang;
    htmlTag.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // إعادة رسم المشاريع لتحديث رسالة "الوصف غير متاح" في حال تغيير اللغة
    if (globalRepos.length > 0) {
        renderGithubProjects(globalRepos);
    }
}

const GITHUB_USER = 'Turki-Alshaikh';

async function loadGithubProjects() {
    const grid = document.getElementById('githubGrid');

    try {
        // جلب المشاريع مرتبة حسب الأحدث
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`);
        if (!res.ok) throw new Error("GitHub API failed");

        let repos = await res.json();
        globalRepos = repos.filter(r => !r.fork); // تخزين المشاريع الأساسية (بدون النسخ المنسوخة)

        if (globalRepos.length === 0) {
            grid.innerHTML = `<p class="col-span-full text-center text-gray-500/50" data-i18n="no_projects">لا توجد مشاريع حالياً.</p>`;
            return;
        }

        // رسم البطاقات مباشرة وعرض وصف About
        renderGithubProjects(globalRepos);

    } catch (error) {
        grid.innerHTML = `<p class="col-span-full text-center text-red-400">فشل في جلب المشاريع من GitHub.</p>`;
    }
}

function renderGithubProjects(repos) {
    const grid = document.getElementById('githubGrid');
    grid.innerHTML = '';

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300';

        // استخراج الوصف من قسم About في GitHub، أو وضع رسالة افتراضية
        const fallbackText = currentLang === 'ar' ? "لا يوجد وصف متاح لهذا المشروع." : "No description available for this project.";
        const projectDescription = repo.description || fallbackText;

        card.innerHTML += `
            <div class="flex justify-between items-start mb-4 pt-1">
                <i class="fa-brands fa-github text-3xl text-white/30 group-hover:text-white/70 transition-colors"></i>
                <a href="${repo.html_url}" target="_blank" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all">
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </a>
            </div>
            <h3 class="text-xl font-bold mb-3 text-white truncate" dir="ltr" title="${repo.name}">${repo.name}</h3>
            
            <div class="flex-grow mb-5">
<p class="text-sm text-gray-400 leading-relaxed min-h-[40px]">
    ${projectDescription}
</p>
            </div>
            
            <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-500" dir="ltr">
                <span class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5">
                    <i class="fa-solid fa-circle text-[8px] ${repo.language ? 'text-primary/70' : 'text-gray-600'}"></i>
                    ${repo.language || 'Code'}
                </span>
                <span class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:text-yellow-500/80 transition-colors">
                    <i class="fa-solid fa-star"></i>
                    ${repo.stargazers_count}
                </span>
            </div>
        `;

        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // تطبيق اللغة المحفوظة فور فتح الموقع
    applyLanguage();

    // تشغيل أنيميشن الكتابة للاسم
    const heroNameEl = document.querySelector('[data-i18n="hero_name"]');
    if(heroNameEl) {
        typeEffect(heroNameEl, translations[currentLang]['hero_name'], 60);
    }

    setTimeout(loadGithubProjects, 300);
});

// دالة أنيميشن الكتابة السريعة
function typeEffect(element, text, speed) {
    element.innerHTML = '';
    let i = 0;
    clearInterval(element.typingInterval); // إيقاف أي كتابة سابقة لتجنب التداخل
    element.typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(element.typingInterval);
        }
    }, speed);
}