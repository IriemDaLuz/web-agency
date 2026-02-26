document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const statusBox = document.getElementById("form-status");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (this.website && this.website.value !== "") return;

        const btn = form.querySelector("button");
        const originalHTML = btn ? btn.innerHTML : "";

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = "Enviando...";
        }

        statusBox.className = "form-status";
        statusBox.textContent = "";

        try {
            const payload = {
                name: form.name.value,
                email: form.email.value,
                subject: form.subject.value || "Nuevo mensaje desde la web",
                message: form.message.value,
                website: form.website.value,
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Error en el envío");
            }

            // Mostrar éxito
            statusBox.textContent = "Mensaje enviado correctamente. Te responderemos lo antes posible.";
            statusBox.classList.add("show", "success");

            form.reset();

        } catch (error) {
            console.error(error);

            // Mostrar error
            statusBox.textContent = "Hubo un error al enviar el mensaje. Inténtalo de nuevo.";
            statusBox.classList.add("show", "error");

        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }
        }
    });
});