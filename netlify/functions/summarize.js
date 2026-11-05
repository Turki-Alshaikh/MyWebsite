// لا حاجة لـ require('node-fetch') ولا '@netlify/blobs' هنا
exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { repoName, lang = "ar" } = JSON.parse(event.body);
        const GITHUB_USER = "Turki-Alshaikh";
        
        let readmeContent = "";
        
        // استخدام دالة fetch المدمجة في خوادم Netlify (Node 18+)
        const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`);
        
        if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
            readmeContent = readmeContent.substring(0, 1000); 
        } else {
            readmeContent = "لا يوجد ملف README متاح لهذا المشروع.";
        }

        const apiKey = process.env.GEMINI_API_KEY; 
        if (!apiKey) {
            return { 
                statusCode: 200, 
                body: JSON.stringify({ summary: lang === 'ar' ? "مفتاح API غير متوفر في الخادم." : "API Key not found on server." }) 
            };
        }

        const prompt = lang === "ar" 
            ? `أنت خبير تقني. اقرأ ملف README التالي لمشروع "${repoName}" ولخصه في جملة واحدة أو جملتين كحد أقصى باللغة العربية ليكون وصفاً جذاباً في معرض الأعمال. ادخل في صلب الموضوع مباشرة:\n\n${readmeContent}`
            : `You are a tech expert. Summarize this README for project "${repoName}" in max 2 sentences in English for a portfolio. Be direct and professional:\n\n${readmeContent}`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await geminiRes.json();

        if (data.error) {
            return {
                statusCode: 200, 
                body: JSON.stringify({ summary: `رسالة من الذكاء الاصطناعي: ${data.error.message}` })
            };
        }

        let summary = lang === 'ar' ? "تعذر توليد الملخص." : "Failed to generate summary.";
        if (data.candidates && data.candidates.length > 0) {
            summary = data.candidates[0].content.parts[0].text.trim();
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary })
        };
        
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ summary: "حدث خطأ في الخادم الداخلي." }) 
        };
    }
};