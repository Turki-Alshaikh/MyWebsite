 tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        cairo: ['Cairo', 'sans-serif'],
                        outfit: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        darkBase: '#030712', 
                        primary: '#38bdf8',   
                        secondary: '#818cf8', 
                        accent: '#c084fc',    
                    },
                    animation: {
                        'blob': 'blob 15s infinite alternate',
                        'float': 'float 6s ease-in-out infinite',
                    },
                    keyframes: {
                        blob: {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-15px)' },
                        }
                    }
                }
            }
        }


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
                projects_title: "أبرز المشاريع",
                mfatihy_role: "المؤسس والمطور الرئيسي", 
                mfatihy_p1: "بناء وتوسيع منصة رقمية مؤتمتة لتوزيع البرمجيات.", 
                mfatihy_p2: "هندسة نظام تسليم آلي متكامل باستخدام تقنيات الـ Webhooks.",
                mystudies_role: "مطور برمجيات", 
                mystudies_p1: "تطوير تطبيق جوال متكامل باستخدام Flutter و Dart بنظام BLOC.", 
                mystudies_p2: "دمج تقنيات الذكاء الاصطناعي (Google ML Kit) لاستخراج نصوص المواعيد آلياً.",
                git_projects: "المشاريع المثبتة على GitHub", 
                loading: "جاري جلب المشاريع من خوادم GitHub...",
                edu_degree: "دبلوم في علوم حاسب", 
                edu_school: "كلية الجبيل الصناعية", 
                edu_cs: "Computer Science",
                edu_date: "تاريخ التخرج: أبريل 2026",
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
                projects_title: "Featured Projects",
                mfatihy_role: "Founder & Lead Developer", 
                mfatihy_p1: "Built and scaled an automated digital software distribution platform.", 
                mfatihy_p2: "Engineered an integrated auto-delivery system via webhooks.",
                mystudies_role: "Software Developer", 
                mystudies_p1: "Developed a cross-platform mobile application using Flutter & Dart (BLoC).", 
                mystudies_p2: "Integrated Google ML Kit (OCR) to automate extraction of exam deadlines.",
                git_projects: "GitHub Pinned Repos", 
                loading: "Fetching pinned repos from GitHub...",
                edu_degree: "Associate Degree in Computer Science", 
                edu_school: "Jubail Industrial College", 
                edu_cs: "Computer Science",
                edu_date: "Graduation: April 2026",
            }
        };

        let currentLang = 'ar';
        
        function toggleLanguage() {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            const htmlTag = document.documentElement;
            htmlTag.lang = currentLang;
            htmlTag.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(translations[currentLang][key]) {
                    el.innerHTML = translations[currentLang][key];
                }
            });
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

        // Dynamic GitHub Fetching
        const GITHUB_USER = 'Turki-Alshaikh';

        async function loadGithubProjects() {
            const grid = document.getElementById('githubGrid');
            let formattedRepos = [];

            try {
                const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USER}`);
                if(!res.ok) throw new Error("Pinned API failed");
                const pinnedRepos = await res.json();
                
                formattedRepos = pinnedRepos.map(r => ({
                    id: Math.random().toString(36).substr(2, 9),
                    name: r.repo,
                    html_url: r.link,
                    description: r.description || '',
                    language: r.language,
                    stargazers_count: r.stars,
                    isPinned: true
                }));

            } catch (error) {
                console.warn("Falling back to standard Github API...", error);
                try {
                    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
                    if(!res.ok) throw new Error("Fallback API failed");
                    let repos = await res.json();
                    
                    repos = repos.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
                    formattedRepos = repos.map(r => ({
                        id: r.id, name: r.name, html_url: r.html_url, description: r.description, 
                        language: r.language, stargazers_count: r.stargazers_count, isPinned: false
                    }));
                } catch(fallbackError) {
                    grid.innerHTML = `<p class="col-span-full text-center text-red-400">Failed to load GitHub projects.</p>`;
                    return;
                }
            }

            if(formattedRepos.length === 0) {
                grid.innerHTML = `<p class="col-span-full text-center text-gray-500/50">No public projects found.</p>`;
                return;
            }

            renderGithubProjects(formattedRepos);
        }

        function renderGithubProjects(repos) {
            const grid = document.getElementById('githubGrid');
            grid.innerHTML = ''; 

            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'glass-card p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300';
                
                if(repo.isPinned) {
                    card.innerHTML += `
                        <div class="absolute top-0 right-0 bg-white/5 text-white/40 text-xs px-3 py-1 rounded-bl-xl border-l border-b border-white/5 rtl:right-auto rtl:left-0 rtl:rounded-bl-none rtl:rounded-br-xl rtl:border-l-0 rtl:border-r transition-colors group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20" title="Pinned Repo">
                            <i class="fa-solid fa-thumbtack transform -rotate-45"></i>
                        </div>
                    `;
                }

                card.innerHTML += `
                    <div class="flex justify-between items-start mb-4 pt-1">
                        <i class="fa-brands fa-github text-3xl text-white/30 group-hover:text-white/70 transition-colors"></i>
                        <a href="${repo.html_url}" target="_blank" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-white truncate" dir="ltr" title="${repo.name}">${repo.name}</h3>
                    
                    <div class="flex-grow mb-5">
                        <p class="text-sm text-gray-400 leading-relaxed min-h-[40px] line-clamp-3">
                            ${repo.description || 'No description provided.'}
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
            setTimeout(loadGithubProjects, 300);
        });
