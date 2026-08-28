// আপনার সম্পূর্ণ ১৩টি ফিচার ও ৬টি ভিডিওর ডিফল্ট স্ট্রাকচার
const defaultData = {
    features: [
        { id: 1, name: "Facebook Page", icon: "fa-brands fa-facebook-f", url: "https://www.facebook.com/share/1AmwQ6uynF/" },
        { id: 2, name: "Facebook Group", icon: "fa-solid fa-users", url: "https://www.facebook.com/share/g/1LGXj4cECY/" },
        { id: 3, name: "Messenger Group", icon: "fa-brands fa-facebook-messenger", url: "https://m.me/j/AbazuYGAWNXaKYj3/?send_source=gc%3Acopy_invite_link_c" },
        { id: 4, name: "YouTube Channel", icon: "fa-brands fa-youtube", url: "https://www.youtube.com/@Bangladeshprobashifundclubf" },
        { id: 5, name: "TikTok ID", icon: "fa-brands fa-tiktok", url: "mailto:tiktok.com/@md.rafik7854" },
        { id: 6, name: "ESKL Registration", icon: "fa-solid fa-address-card", url: "https://www.expatservicesmy.com/ESKLPublicportal/Appointment/BookAppointment" },
        { id: 7, name: "Operator WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/D09urUItfkdEjiVtqgIbY7?s=cl&p=a&mlu=0" },
        { id: 8, name: "Worker WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/HcEMStEP3un4uYDBBfH5b0?s=cl&p=a&mlu=0" },
        { id: 9, name: "Foundation Group", icon: "fa-brands fa-whatsapp", url: "https://chat.whatsapp.com/Jl7W0RXQjEI7Mhgj5riBhu?s=qt&p=a&ilr=0" },
        { id: 10, name: "Information Group", icon: "fa-solid fa-user-group", url: "" },
        { id: 11, name: "E-Verify Service", icon: "fa-solid fa-shield-halved", url: "https://everify.bdris.gov.bd/" },
        { id: 12, name: "Bkash", icon: "fa-solid fa-wallet", url: "" },
        { id: 13, name: "Contact Us", icon: "fa-solid fa-envelope", url: "https://wa.me/8801928807515" }
    ],
    contacts: [
        { name: "WhatsApp Contact 1", url: "https://wa.me/8801928807515" },
        { name: "WhatsApp Contact 2", url: "https://wa.me/qr/5SBSJ55KMO7CB1" },
        { name: "WhatsApp Contact 3", url: "https://wa.me/message/FQOUHFGB6I3BG1" }
    ],
    videos: [
        { title: "Video 1", url: "https://www.youtube.com/embed/DXB7gdJUlMw" },
        { title: "Video 2 (Shorts)", url: "https://www.youtube.com/embed/Uvav8yUb93c" },
        { title: "Video 3", url: "https://www.youtube.com/embed/KumLOhgtgsM" },
        { title: "Video 4", url: "https://www.youtube.com/embed/I2mc2RXCEIA" },
        { title: "Video 5 (Shorts)", url: "https://www.youtube.com/embed/AKapV127nJg" },
        { title: "Video 6", url: "https://www.youtube.com/embed/KumLOhgtgsM" }
    ]
};

let appData = JSON.parse(localStorage.getItem("probashiData_v2")) || defaultData;

function renderPage() {
    // Render 13 Features
    const grid = document.getElementById("featuresGrid");
    grid.innerHTML = "";
    appData.features.forEach(item => {
        grid.innerHTML += `
            <a href="${item.url || '#'}" target="${item.url ? '_blank' : '_self'}" class="card">
                <div class="badge-num">${item.id}</div>
                <div class="icon-holder">
                    <i class="${item.icon}"></i>
                </div>
                <span>${item.name}</span>
            </a>
        `;
    });

    // Render 6 Videos
    const vGrid = document.getElementById("videoGrid");
    vGrid.innerHTML = "";
    appData.videos.forEach(v => {
        vGrid.innerHTML += `
            <div class="video-card">
                <iframe src="${v.url}" frameborder="0" allowfullscreen></iframe>
                <div class="video-title">${v.title}</div>
            </div>
        `;
    });

    // Render Contacts
    const cGroup = document.getElementById("contactButtons");
    cGroup.innerHTML = "";
    appData.contacts.forEach(c => {
        cGroup.innerHTML += `<a href="${c.url}" target="_blank" class="btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ${c.name}</a>`;
    });
}

// Admin Modal Handling
function toggleAdminPanel() {
    const modal = document.getElementById("adminModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function checkAdminPassword() {
    const pass = document.getElementById("adminPass").value;
    if (pass === "admin123") {
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
    appData.features.forEach((item, idx) => {
        fBox.innerHTML += `
            <label><b>(${item.id}) ${item.name}</b> Link:</label>
            <input type="text" id="feat_link_${idx}" value="${item.url}">
        `;
    });

    const vBox = document.getElementById("adminVideoInputs");
    vBox.innerHTML = "";
    appData.videos.forEach((v, idx) => {
        vBox.innerHTML += `
            <label><b>${v.title}</b> Embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID):</label>
            <input type="text" id="vid_link_${idx}" value="${v.url}">
        `;
    });
}

function saveData() {
    appData.features.forEach((_, idx) => {
        appData.features[idx].url = document.getElementById(`feat_link_${idx}`).value;
    });

    appData.videos.forEach((_, idx) => {
        appData.videos[idx].url = document.getElementById(`vid_link_${idx}`).value;
    });

    localStorage.setItem("probashiData_v2", JSON.stringify(appData));
    alert("আপনার সব পরিবর্তন সফলভাবে সেভ করা হয়েছে!");
    renderPage();
    toggleAdminPanel();
}

renderPage();
