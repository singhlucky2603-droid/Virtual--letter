// ===============================
// DOM ELEMENTS
// ===============================

const senderName = document.getElementById("senderName");
const receiverName = document.getElementById("receiverName");
const letterTitle = document.getElementById("letterTitle");
const letterMessage = document.getElementById("letterMessage");
const photoUpload = document.getElementById("photoUpload");
const musicUpload = document.getElementById("musicUpload");
const audioPlayer = document.getElementById("audioPlayer");

const previewTitle = document.getElementById("previewTitle");
const previewReceiver = document.getElementById("previewReceiver");
const previewSender = document.getElementById("previewSender");
const previewMessage = document.getElementById("previewMessage");
const previewPhotos = document.getElementById("previewPhotos");

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");
const themeSelector = document.getElementById("themeSelector");

const charCount = document.getElementById("charCount");

const saveDraftBtn = document.getElementById("saveDraftBtn");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const whatsappBtn = document.getElementById("whatsappBtn");
const facebookBtn = document.getElementById("facebookBtn");
const telegramBtn = document.getElementById("telegramBtn");
const instagramBtn = document.getElementById("instagramBtn");

const envelope = document.getElementById("envelope");
const themeBtn = document.getElementById("themeBtn");
const heartsContainer = document.getElementById("heartsContainer");
const particlesContainer = document.getElementById("particles");

const letterPreview = document.getElementById("letterPreview");

// ===============================
// LIVE PREVIEW
// ===============================

function updatePreview() {

    previewTitle.textContent =
        letterTitle.value || "My Letter";

    previewReceiver.textContent =
        "To: " + (receiverName.value || "Someone Special");

    previewSender.textContent =
        "From: " + (senderName.value || "You");

    previewMessage.textContent =
        letterMessage.value ||
        "Your beautiful message will appear here...";

    previewMessage.style.fontFamily =
        fontFamily.value;

    previewMessage.style.fontSize =
        fontSize.value + "px";

    charCount.textContent =
        letterMessage.value.length;

    saveToLocalStorage();
}

senderName.addEventListener("input", updatePreview);
receiverName.addEventListener("input", updatePreview);
letterTitle.addEventListener("input", updatePreview);
letterMessage.addEventListener("input", updatePreview);
fontFamily.addEventListener("change", updatePreview);
fontSize.addEventListener("input", updatePreview);

// ===============================
// EMOJI INSERTION
// ===============================

document.querySelectorAll(".emoji").forEach(btn => {

    btn.addEventListener("click", () => {

        letterMessage.value += btn.textContent;

        updatePreview();

    });

});

// ===============================
// PHOTO UPLOAD
// ===============================

photoUpload.addEventListener("change", function () {

    previewPhotos.innerHTML = "";

    const files = this.files;

    for (let i = 0; i < files.length; i++) {

        const reader = new FileReader();

        reader.onload = function (e) {

            const img = document.createElement("img");

            img.src = e.target.result;

            previewPhotos.appendChild(img);

        };

        reader.readAsDataURL(files[i]);

    }

});

// ===============================
// MUSIC UPLOAD
// ===============================

musicUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const url = URL.createObjectURL(file);

        audioPlayer.src = url;

    }

});

// ===============================
// LETTER THEMES
// ===============================

themeSelector.addEventListener("change", () => {

    letterPreview.classList.remove(
        "love",
        "friendship",
        "flowers",
        "pastel",
        "dark"
    );

    letterPreview.classList.add(
        themeSelector.value
    );

});

// ===============================
// DARK MODE
// ===============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "darkMode",
            "enabled"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "darkMode",
            "disabled"
        );

    }

});

// Load Dark Mode

if (
    localStorage.getItem("darkMode")
    === "enabled"
) {

    document.body.classList.add(
        "dark-mode"
    );

    themeBtn.textContent = "☀️";

}

// ===============================
// LOCAL STORAGE SAVE
// ===============================

function saveToLocalStorage() {

    const draft = {

        sender:
            senderName.value,

        receiver:
            receiverName.value,

        title:
            letterTitle.value,

        message:
            letterMessage.value,

        font:
            fontFamily.value,

        size:
            fontSize.value,

        theme:
            themeSelector.value

    };

    localStorage.setItem(
        "virtualLetterDraft",
        JSON.stringify(draft)
    );

}

// ===============================
// LOAD SAVED DRAFT
// ===============================

function loadDraft() {

    const saved =
        localStorage.getItem(
            "virtualLetterDraft"
        );

    if (!saved) return;

    const draft =
        JSON.parse(saved);

    senderName.value =
        draft.sender || "";

    receiverName.value =
        draft.receiver || "";

    letterTitle.value =
        draft.title || "";

    letterMessage.value =
        draft.message || "";

    fontFamily.value =
        draft.font || "Poppins";

    fontSize.value =
        draft.size || 18;

    themeSelector.value =
        draft.theme || "love";

    letterPreview.classList.remove(
        "love",
        "friendship",
        "flowers",
        "pastel",
        "dark"
    );

    letterPreview.classList.add(
        draft.theme || "love"
    );

    updatePreview();

}

loadDraft();
const params = new URLSearchParams(window.location.search);

if (params.get("data")) {

    try {

        const data = JSON.parse(
            decodeURIComponent(
                atob(params.get("data"))
            )
        );

        senderName.value = data.sender || "";
        receiverName.value = data.receiver || "";
        letterTitle.value = data.title || "";
        letterMessage.value = data.message || "";
        themeSelector.value = data.theme || "love";

        updatePreview();

    } catch (e) {
        console.log("Invalid shared letter");
    }

}

// ===============================
// SAVE BUTTON
// ===============================

saveDraftBtn.addEventListener(
    "click",
    () => {

        saveToLocalStorage();

        alert(
            "Draft saved successfully ❤️"
        );

    }
);

// ===============================
// AUTO SAVE
// ===============================

setInterval(() => {

    saveToLocalStorage();

}, 5000);

// ===============================
// COPY SHARE LINK
// ===============================

copyLinkBtn.addEventListener("click", () => {

    const data = {
        sender: senderName.value,
        receiver: receiverName.value,
        title: letterTitle.value,
        message: letterMessage.value,
        theme: themeSelector.value
    };

    const encoded = btoa(
        encodeURIComponent(JSON.stringify(data))
    );

    const shareLink =
        window.location.origin +
        window.location.pathname +
        "?data=" +
        encoded;

    navigator.clipboard.writeText(shareLink);

    alert("Letter link copied successfully ❤️");

});
// ===============================
// SHARE BUTTONS
// ===============================

function generateShareLink() {

    const data = {
        sender: senderName.value,
        receiver: receiverName.value,
        title: letterTitle.value,
        message: letterMessage.value,
        theme: themeSelector.value
    };

    const encoded = btoa(
        encodeURIComponent(
            JSON.stringify(data)
        )
    );

    return (
        window.location.origin +
        window.location.pathname +
        "?data=" +
        encoded
    );
}

// WhatsApp

whatsappBtn.addEventListener("click", () => {

    const shareLink = generateShareLink();

    window.open(
        `https://wa.me/?text=${encodeURIComponent(shareLink)}`
    );

});

// Facebook

facebookBtn.addEventListener("click", () => {

    const shareLink = generateShareLink();

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`
    );

});

// Telegram

telegramBtn.addEventListener("click", () => {

    const shareLink = generateShareLink();

    window.open(
        `https://t.me/share/url?url=${encodeURIComponent(shareLink)}`
    );

});

// Instagram

instagramBtn.addEventListener("click", () => {

    alert(
        "Instagram does not support direct web sharing. Download the letter and upload manually."
    );

});

// ===============================
// DOWNLOAD IMAGE
// ===============================

downloadImageBtn.addEventListener(
    "click",
    () => {

        html2canvas(
            document.getElementById(
                "letterPreview"
            )
        ).then(canvas => {

            const link =
                document.createElement("a");

            link.download =
                "virtual-letter.png";

            link.href =
                canvas.toDataURL();

            link.click();

        });

    }
);

// ===============================
// DOWNLOAD PDF
// ===============================

downloadPdfBtn.addEventListener(
    "click",
    () => {

        html2canvas(
            document.getElementById(
                "letterPreview"
            )
        ).then(canvas => {

            const imgData =
                canvas.toDataURL(
                    "image/png"
                );

            const {
                jsPDF
            } =
                window.jspdf;

            const pdf =
                new jsPDF(
                    "p",
                    "mm",
                    "a4"
                );

            const width =
                190;

            const height =
                (
                    canvas.height *
                    width
                ) /
                canvas.width;

            pdf.addImage(
                imgData,
                "PNG",
                10,
                10,
                width,
                height
            );

            pdf.save(
                "virtual-letter.pdf"
            );

        });

    }
);

// ===============================
// ENVELOPE OPEN ANIMATION
// ===============================

envelope.addEventListener(
    "click",
    () => {

        envelope.classList.toggle(
            "open"
        );

    }
);

// ===============================
// FLOATING HEARTS
// ===============================

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "heart"
    );

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 20 +
        15 +
        "px";

    heart.style.animationDuration =
        Math.random() * 5 +
        5 +
        "s";

    heartsContainer.appendChild(
        heart
    );

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(
    createHeart,
    700
);

// ===============================
// FLOATING PARTICLES
// ===============================

function createParticle() {

    const particle =
        document.createElement("div");

    particle.classList.add(
        "particle"
    );

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        Math.random() * 8 +
        6 +
        "s";

    particlesContainer.appendChild(
        particle
    );

    setTimeout(() => {

        particle.remove();

    }, 12000);

}

setInterval(
    createParticle,
    300
);

// ===============================
// INITIAL PREVIEW
// ===============================

updatePreview();