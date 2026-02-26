export async function onRequestPost({ request, env }) {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        return new Response("Unsupported Media Type", { status: 415 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response("Bad JSON", { status: 400 });
    }

    // honeypot
    if (body.website && String(body.website).trim() !== "") {
        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    }

    const name = String(body.name || "").trim().slice(0, 80);
    const email = String(body.email || "").trim().slice(0, 120);
    const subject = String(body.subject || "Nuevo mensaje desde la web").trim().slice(0, 120);
    const message = String(body.message || "").trim().slice(0, 4000);

    if (!name || !email || !message) {
        return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
            status: 400,
            headers: { "content-type": "application/json" },
        });
    }

    const payload = {
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY,
        template_params: { name, email, subject, message },
    };

    const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!r.ok) {
        const t = await r.text().catch(() => "");
        return new Response(JSON.stringify({ ok: false, error: "Email send failed", detail: t }), {
            status: 502,
            headers: { "content-type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
    });
}