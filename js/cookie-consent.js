(() => {
    const STORAGE_KEY = "cookieConsent_v1";

    // Ajusta aquí tu ID de GTM (ya está en tu HTML)
    const GTM_ID = "GTM-T8RSJ7GH";

    const el = document.getElementById("cookie-consent");
    if (!el) return;

    const btnAccept = document.getElementById("cookie-accept");
    const btnReject = document.getElementById("cookie-reject");
    const btnSettings = document.getElementById("cookie-settings");
    const prefs = document.getElementById("cookie-prefs");
    const chkAnalytics = document.getElementById("cookie-analytics");
    const btnSave = document.getElementById("cookie-save");
    const btnCancel = document.getElementById("cookie-cancel");

    const getConsent = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch {
            return null;
        }
    };

    const setConsent = (value) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    };

    const hideBanner = () => {
        el.classList.remove("is-visible");
    };

    const showBanner = () => {
        el.classList.add("is-visible");
    };

    const loadGTM = () => {
        // Evita doble carga
        if (window.__gtmLoaded) return;
        window.__gtmLoaded = true;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
        document.head.appendChild(s);
    };

    const applyConsent = (consent) => {
        // consent = { necessary: true, analytics: boolean, ts: number }
        if (consent?.analytics) loadGTM();
    };

    // UI
    const openPrefs = () => {
        prefs.hidden = false;
        if (chkAnalytics) chkAnalytics.focus();
    };
    const closePrefs = () => {
        prefs.hidden = true;
    };

    // Init
    const existing = getConsent();
    if (!existing) {
        // Primera visita
        showBanner();
    } else {
        applyConsent(existing);
    }

    // Eventos
    btnAccept?.addEventListener("click", () => {
        const consent = { necessary: true, analytics: true, ts: Date.now() };
        setConsent(consent);
        applyConsent(consent);
        hideBanner();
    });

    btnReject?.addEventListener("click", () => {
        const consent = { necessary: true, analytics: false, ts: Date.now() };
        setConsent(consent);
        hideBanner();
    });

    btnSettings?.addEventListener("click", () => {
        if (prefs.hidden) openPrefs();
        else closePrefs();
    });

    btnCancel?.addEventListener("click", () => {
        closePrefs();
    });

    btnSave?.addEventListener("click", () => {
        const consent = {
            necessary: true,
            analytics: !!chkAnalytics?.checked,
            ts: Date.now(),
        };
        setConsent(consent);
        applyConsent(consent);
        hideBanner();
    });
})();