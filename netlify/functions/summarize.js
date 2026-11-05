exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { repoName } = JSON.parse(event.body);
        const GITHUB_USER = "Turki-Alshaikh";
        
        // 1. جلب ملف README من GitHub
        let readmeContent = "";
        const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`);
        
        if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            // GitHub يرسل النص مشفراً بـ Base64، نقوم بفك تشفيره هنا
            readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
            // نأخذ أول 1500 حرف فقط لتقليل حجم الطلب على Gemini
            readmeContent = readmeContent.substring(0, 1500); 
        } else {
            readmeContent = "لا يوجد ملف README متاح لهذا المشروع.";
        }

        // 2. إرسال النص إلى Gemini للتلخيص
        const apiKey = process.env.GEMINI_API_KEY; 
        const prompt = `أنت مساعد ذكي لمطور برمجيات. اقرأ ملف README التالي لمشروع "${repoName}" ولخصه في جملة واحدة أو جملتين كحد أقصى باللغة العربية ليكون وصفاً جذاباً في معرض الأعمال (Portfolio). لا تستخدم مقدمات مثل "هذا المشروع عبارة عن" أو "الملخص هو"، أعطني الوصف التقني والتسويقي مباشرة:\n\n${readmeContent}`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await geminiRes.json();
        const summary = data.candidates[0].content.parts[0].text.trim();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary })
        };
    } catch (error) {
        console.error(error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "فشل في توليد النبذة" }) 
        };
    }
};