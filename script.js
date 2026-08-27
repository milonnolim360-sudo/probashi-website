// আপনার প্রদত্ত লিংক এবং ডেটা সংকলন
const initialData = {
    features: [
        { name: "Facebook Page", icon: "fa-brands fa-facebook", url: "https://www.facebook.com/share/1AmwQ6uynF/" },
        { name: "Facebook Group", icon: "fa-solid fa-users", url: "https://www.facebook.com/share/g/1LGXj4cECY/" },
        { name: "Messenger Group", icon: "fa-brands fa-facebook-messenger", url: "https://m.me/j/AbazuYGAWNXaKYj3/?send_source=gc%3Acopy_invite_link_c" },
        { name: "YouTube Channel", icon: "fa-brands fa-youtube", url: "https://www.youtube.com/@Bangladeshprobashifundclubf" },
        { name: "TikTok ID", icon: "fa-brands fa-tiktok", url: "https://tiktok.com/@md.rafik7854" },
        { name: "ESKL Registration", icon: "fa-solid fa-calendar-check", url: "https://www.expatservicesmy.com/ESKLPublicportal/Appointment/BookAppointment" },
        { name: "Operator WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/D09urUItfkdEjiVtqgIbY7?s=cl&p=a&mlu=0" },
        { name: "Worker WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/HcEMStEP3un4uYDBBfH5b0?s=cl&p=a&mlu=0" },
        { name: "Foundation Group", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/Jl7W0RXQjEI7Mhgj5riBhu?s=qt&p=a&ilr=0" },
        { name: "E-Verify Service", icon: "fa-solid fa-shield-halved", url: "https://everify.bdris.gov.bd/" }
    ],
    contacts: [
        { name: "WhatsApp Contact 1", url: "https://wa.me/8801928807515" },
        { name: "WhatsApp Contact 2", url: "https://wa.me/qr/5SBSJ55KMO7CB1" },
        { name: "WhatsApp Contact 3", url: "https://wa.me/message/FQOUHFGB6I3BG1" }
    ],
    videos: [
        "https://www.youtube.com/embed/KumLOhgtgsM",
        "https://www.youtube.com/embed/DXB7gdJUlMw",
        "https://www.youtube.com/embed/I2mc2RXCEIA"
    ]
};

// LocalStorage চেক ও লোড করা
let siteData = JSON.parse(localStorage.getItem("probashiData")) || initialData;

function renderSite() {
    const grid = document.getElementById("featuresGrid");
    grid.innerHTML = "";
    siteData.features.forEach(item => {
        grid.innerHTML += `
            <a href="${item.url}" target="_blank" class="card">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        `;
    });

    const vGrid = document.getElementById("videoGrid");
    vGrid.innerHTML = "";
    siteData.videos.forEach(vUrl => {
        vGrid.innerHTML += `
            <div class="video-card">
                <iframe src="${vUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    });

    const cGroup = document.getElementById("contactButtons");
    cGroup.innerHTML = "";
    siteData.contacts.forEach(c => {
        cGroup.innerHTML += `<a href="${c.url}" target="_blank" class="btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ${c.name}</a>`;
    });
}

// অ্যাডমিন প্যানেল ফাংশনালিটি
function toggleAdminPanel() {
    const modal = document.getElementById("adminModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function checkAdminPassword() {
    const pass = document.getElementById("adminPass").value;
    if(pass === "admin123") {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("adminControls").style.display = "block";
        loadAdminForm();
    } else {
        alert("ভুল পাসওয়ার্ড!");
    }
}

function loadAdminForm() {
    const fBox = document.getElementById("adminFeatureInputs");
    fBox.innerHTML = "";
    siteData.features.forEach((item, idx) => {
        fBox.innerHTML += `
            <label>${item.name} URL:</label>
            <input type="text" id="feat_${idx}" value="${item.url}">
        `;
    });

    const vBox = document.getElementById("adminVideoInputs");
    vBox.innerHTML = "";
    siteData.videos.forEach((vUrl, idx) => {
        vBox.innerHTML += `
            <label>Video ${idx + 1} Embed URL:</label>
            <input type="text" id="vid_${idx}" value="${vUrl}">
        `;
    });
}

function saveData() {
    siteData.features.forEach((item, idx) => {
        const val = document.getElementById(`feat_${idx}`).value;
        if(val) item.url = val;
    });

    siteData.videos.forEach((_, idx) => {
        const val = document.getElementById(`vid_${idx}`).value;
        if(val) siteData.videos[idx] = val;
    });

    localStorage.setItem("probashiData", JSON.stringify(siteData));
    alert("সকল তথ্য সফলভাবে সেভ করা হয়েছে!");
    renderSite();
    toggleAdminPanel();
}

// ইনিশিয়াল লোড
renderSite();
