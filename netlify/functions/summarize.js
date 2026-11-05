const fetch = require('node-fetch');
const { getStore } = require('@netlify/blobs');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const { repoName, lang = "ar" } = JSON.parse(event.body);
        const GITHUB_USER = "Turki-Alshaikh";
        
        // 1. الاتصال بقاعدة بيانات Netlify (السيرفر)
        const store = getStore("project_summaries");
        const cacheKey = `${repoName}_${lang}`; // مفتاح الحفظ (مثال: MyWebsite_ar أو MyWebsite_en)
        
        // 2. التحقق مما إذا كان الملخص محفوظاً من قبل
        const cachedSummary = await store.get(cacheKey);
        if (cachedSummary) {
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ summary: cachedSummary })
            };
        }

        // 3. إذا لم يكن محفوظاً، جلب معلومات المشروع من GitHub
        let readmeContent = "";
        const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`);
        if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8').substring(0, 1500); 
        } else {
            readmeContent = "لا يوجد ملف README.";
        }

        // 4. إعداد طلب الذكاء الاصطناعي بناءً على اللغة المطلوبة
        const apiKey = process.env.GEMINI_API_KEY; 
        const prompt = lang === "ar" 
            ? `أنت خبير تقني. لخص ملف README التالي لمشروع "${repoName}" في جملتين كحد أقصى باللغة العربية ليكون وصفاً في سيرة ذاتية. ادخل في صلب الموضوع مباشرة:\n\n${readmeContent}`
            : `You are a tech expert. Summarize this README for project "${repoName}" in max 2 sentences in English for a portfolio. Be direct and professional:\n\n${readmeContent}`;

        // 5. الاتصال بـ Gemini
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await geminiRes.json();

        // في حال وجود ضغط على السيرفر
        if (data.error) {
            return { statusCode: 200, body: JSON.stringify({ summary: `Error: ${data.error.message}` }) };
        }

        let summary = lang === "ar" ? "تعذر توليد الملخص." : "Failed to generate summary.";
        if (data.candidates && data.candidates.length > 0) {
            summary = data.candidates[0].content.parts[0].text.trim();
            
            // 6. حفظ الملخص بنجاح في سيرفر Netlify للأبد!
            await store.set(cacheKey, summary);
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary })
        };
        
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ summary: "Internal Server Error." }) };
    }
};