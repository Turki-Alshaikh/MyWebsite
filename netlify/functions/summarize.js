exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { repoName } = JSON.parse(event.body);
        const GITHUB_USER = "Turki-Alshaikh";
        
        // 1. جلب ملف README
        let readmeContent = "";
        const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`);
        
        if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
            readmeContent = readmeContent.substring(0, 1000); // تقليل الحجم لضمان قبوله في Gemini
        } else {
            readmeContent = "لا يوجد ملف README متاح لهذا المشروع.";
        }

        // 2. التحقق من وجود مفتاح API
        const apiKey = process.env.GEMINI_API_KEY; 
        if (!apiKey) {
            console.error("CRITICAL: GEMINI_API_KEY is missing!");
            return { 
                statusCode: 200, 
                body: JSON.stringify({ summary: "مفتاح API غير متوفر في الخادم." }) 
            };
        }

        const prompt = `أنت مساعد ذكي لمطور برمجيات. اقرأ ملف README التالي لمشروع "${repoName}" ولخصه في جملة واحدة أو جملتين كحد أقصى باللغة العربية ليكون وصفاً جذاباً في معرض الأعمال (Portfolio). لا تستخدم مقدمات، أعطني الوصف التقني والتسويقي مباشرة:\n\n${readmeContent}`;

        // 3. الاتصال بـ Gemini
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await geminiRes.json();

        // 4. التقاط رسالة الخطأ من Gemini إن وجدت
        if (data.error) {
            console.error(`Gemini API Error for ${repoName}:`, data.error.message);
            return {
                statusCode: 200, 
                body: JSON.stringify({ summary: `رسالة من الذكاء الاصطناعي: ${data.error.message}` })
            };
        }

        // 5. استخراج النص بأمان
        let summary = "تعذر توليد الملخص.";
        if (data.candidates && data.candidates.length > 0) {
            summary = data.candidates[0].content.parts[0].text.trim();
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary })
        };
        
    } catch (error) {
        console.error("Internal Server Error:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ summary: "حدث خطأ في الخادم." }) 
        };
    }
};