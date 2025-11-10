AOS.init({
  duration: 800,
  once: true
});

// Telegram-Konfiguration
const BOT_TOKEN = "HIER_DEIN_TELEGRAM_BOT_TOKEN";
const CHAT_ID = "HIER_DEINE_CHAT_ID";

const form = document.getElementById("terminForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hidden");
    feedback.textContent = "Sende Termin...";

    const msg = `
🛞 *Neuer Termin*:
👤 Name: ${document.getElementById("name").value}
📏 Größe: ${document.getElementById("groesse").value}
⚙️ Felge: ${document.getElementById("felge").value}
💬 Nachricht: ${document.getElementById("nachricht").value}
📞 Kontakt: ${document.getElementById("kontaktinfo").value}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: msg,
          parse_mode: "Markdown"
        })
      });
      feedback.textContent = "Termin erfolgreich gesendet! ✅";
      form.reset();
    } catch (err) {
      feedback.textContent = "Fehler beim Senden ❌";
    }
  });
}
