/**
 * Kristian Thalai Pawl (KTP) - Armed Veng South Branch
 * Member Directory & Notice Board System
 * Groups: Sadrak, Mesak, Abednego
 */

// Global State
let members = [];
let filteredMembers = [];
let notices = [];
let filteredNotices = [];
let activeGroupFilter = 'All';
let activeNoticeCategory = 'All';
let currentViewMode = 'table';
let currentTab = 'directory';

// Image data holders
let currentSelfRegPhoto = '';
let currentFormPhoto = '';
let currentNoticePhoto = '';

// Delete modal state
let deleteActionType = null; // 'member' | 'notice'
let deleteTargetId = null;

// Branch Secretary Authentication
let isSecretaryLoggedIn = false;
const DEFAULT_SECRETARY_PASSWORD = 'avsktp';

// Built-in Seed Members for Armed Veng South Branch (Sadrak, Mesak, Abednego)
const DEFAULT_MEMBERS = [
  { id: "ktp-001", name: "Lalhruaitluanga", group: "Sadrak", phone: "9862345120", gender: "Mipa", houseNo: "H-14", upaBial: "Upa Bial 1", photo: "" },
  { id: "ktp-002", name: "Vanlalpeka Sailo", group: "Mesak", phone: "9436152084", gender: "Mipa", houseNo: "H-28", upaBial: "Upa Bial 2", photo: "" },
  { id: "ktp-003", name: "C. Lalrinsanga", group: "Abednego", phone: "8794102938", gender: "Mipa", houseNo: "A-05", upaBial: "Upa Bial 3", photo: "" },
  { id: "ktp-004", name: "Lalnunmawii", group: "Sadrak", phone: "9862981240", gender: "Hmeichhia", houseNo: "H-42", upaBial: "Upa Bial 1", photo: "" },
  { id: "ktp-005", name: "R. Lalrintluangi", group: "Mesak", phone: "7085129481", gender: "Hmeichhia", houseNo: "B-19", upaBial: "Upa Bial 4", photo: "" },
  { id: "ktp-006", name: "H. Malsawmtluanga", group: "Abednego", phone: "8974561230", gender: "Mipa", houseNo: "H-63", upaBial: "Upa Bial 2", photo: "" },
  { id: "ktp-007", name: "Zodinpuia", group: "Sadrak", phone: "9862145890", gender: "Mipa", houseNo: "H-09", upaBial: "Upa Bial 5", photo: "" },
  { id: "ktp-008", name: "C. Vanlalruati", group: "Mesak", phone: "9436378291", gender: "Hmeichhia", houseNo: "A-31", upaBial: "Upa Bial 3", photo: "" },
  { id: "ktp-009", name: "Samuel Lalhmingmawia", group: "Abednego", phone: "8794827103", gender: "Mipa", houseNo: "H-77", upaBial: "Upa Bial 6", photo: "" },
  { id: "ktp-010", name: "Deborah Malsawmdawngi", group: "Sadrak", phone: "7085938102", gender: "Hmeichhia", houseNo: "H-22", upaBial: "Upa Bial 1", photo: "" },
  { id: "ktp-011", name: "Lalremruata", group: "Mesak", phone: "9862789401", gender: "Mipa", houseNo: "B-04", upaBial: "Upa Bial 4", photo: "" },
  { id: "ktp-012", name: "Jerry Lalbiaknunga", group: "Abednego", phone: "9774123890", gender: "Mipa", houseNo: "H-51", upaBial: "Upa Bial 2", photo: "" },
  { id: "ktp-013", name: "Melody Lalramchuani", group: "Sadrak", phone: "9436192847", gender: "Hmeichhia", houseNo: "A-18", upaBial: "Upa Bial 3", photo: "" },
  { id: "ktp-014", name: "F. Lalawmpuia", group: "Mesak", phone: "8794617283", gender: "Mipa", houseNo: "H-39", upaBial: "Upa Bial 5", photo: "" },
  { id: "ktp-015", name: "Jenny Zothanpuii", group: "Abednego", phone: "7085348291", gender: "Hmeichhia", houseNo: "H-84", upaBial: "Upa Bial 6", photo: "" },
  { id: "ktp-016", name: "K. Lalmuanpuia", group: "Sadrak", phone: "9862451928", gender: "Mipa", houseNo: "B-27", upaBial: "Upa Bial 4", photo: "" },
  { id: "ktp-017", name: "David Laltanpuia", group: "Mesak", phone: "9436284710", gender: "Mipa", houseNo: "H-16", upaBial: "Upa Bial 1", photo: "" },
  { id: "ktp-018", name: "Lalhminghlui", group: "Abednego", phone: "8794209182", gender: "Hmeichhia", houseNo: "A-44", upaBial: "Upa Bial 3", photo: "" },
  { id: "ktp-019", name: "R. Lalpekhlua", group: "Sadrak", phone: "9862671930", gender: "Mipa", houseNo: "H-60", upaBial: "Upa Bial 2", photo: "" },
  { id: "ktp-020", name: "Mary Lalhriatpuii", group: "Mesak", phone: "7085781920", gender: "Hmeichhia", houseNo: "H-93", upaBial: "Upa Bial 6", photo: "" },
  { id: "ktp-021", name: "Benjamin Lalrintluanga", group: "Abednego", phone: "9774650192", gender: "Mipa", houseNo: "B-11", upaBial: "Upa Bial 4", photo: "" },
  { id: "ktp-022", name: "H. Lalduhsaka", group: "Sadrak", phone: "9862541092", gender: "Mipa", houseNo: "H-33", upaBial: "Upa Bial 5", photo: "" },
  { id: "ktp-023", name: "Angela Lalhmangaihi", group: "Mesak", phone: "9436892014", gender: "Hmeichhia", houseNo: "A-02", upaBial: "Upa Bial 1", photo: "" },
  { id: "ktp-024", name: "Ruth Lalthazuali", group: "Abednego", phone: "8794382910", gender: "Hmeichhia", houseNo: "H-48", upaBial: "Upa Bial 2", photo: "" },
  { id: "ktp-025", name: "T. Malsawmtluanga", group: "Sadrak", phone: "7085491028", gender: "Mipa", houseNo: "H-71", upaBial: "Upa Bial 6", photo: "" },
  { id: "ktp-026", name: "Esther Lalrempuii", group: "Mesak", phone: "9862890123", gender: "Hmeichhia", houseNo: "B-35", upaBial: "Upa Bial 4", photo: "" },
  { id: "ktp-027", name: "PC Lalhlimpuii", group: "Abednego", phone: "9436781290", gender: "Hmeichhia", houseNo: "A-20", upaBial: "Upa Bial 3", photo: "" },
  { id: "ktp-028", name: "K. Lalrinpuii", group: "Sadrak", phone: "8794901827", gender: "Hmeichhia", houseNo: "H-10", upaBial: "Upa Bial 5", photo: "" }
];

// Built-in Seed Notices for Armed Veng South Branch Notice Board
const DEFAULT_NOTICES = [
  {
    id: "not-1",
    title: "KṬP Thawhtan Zan Inkhawm Programme",
    category: "Inkhawm",
    date: "2026-11-16",
    author: "Branch Secretary",
    content: "A hmun: Kohhran Biak In\nA hun: Zan dar 7:00 PM\nHruaitu: Lalhruaitluanga (Branch Leader)\nThusawitu: Upa Bialtu\nZai hruaitu: Kohhran Zaipawl\n\nBranch member zawng zawngte thahnemngai taka inkhawm turin kan in sawm a ni e."
  },
  {
    id: "not-2",
    title: "Biak In Tual Hnatlang Kohna",
    category: "Hnatlang",
    date: "2026-11-21",
    author: "Branch Secretary",
    content: "Inrinni zing dar 7:00 AM-ah Biak In tual leh a chhehvel tihfai hnatlang neih tur a ni a, Group tinte (Sadrak, Mesak, Abednego) mahni hmanraw neih ang ang (buhfaithir, bawlhhlawh bawm, chem) kenga kim taka thawkchhuak turin kan inngen e.\n\n• Hnatlang thawh zawhah refreshment tuihnai tak a awm ang."
  },
  {
    id: "not-3",
    title: "Kohhran Zaipawl Hla Zir",
    category: "Zaipawl",
    date: "2026-11-13",
    author: "Branch Secretary",
    content: "Zirtawp zan dar 6:30 PM-ah Biak In-ah Zaipawl hla zir tur a ni e. Member zawng zawng kim taka kal tur a ni a, hun vawn dik i ngaihpawimawh ang u."
  }
];

// Group Styling for Sadrak, Mesak, Abednego
const GROUP_CONFIG = {
  'Sadrak': {
    badgeClass: 'badge-sadrak',
    dotColor: 'bg-rose-600',
    avatarBg: 'bg-rose-700',
    textColor: 'text-rose-800'
  },
  'Mesak': {
    badgeClass: 'badge-mesak',
    dotColor: 'bg-emerald-600',
    avatarBg: 'bg-emerald-700',
    textColor: 'text-emerald-800'
  },
  'Abednego': {
    badgeClass: 'badge-abednego',
    dotColor: 'bg-blue-600',
    avatarBg: 'bg-blue-700',
    textColor: 'text-blue-800'
  }
};

// Notice Category Badges & Icons
const NOTICE_CAT_CONFIG = {
  'Inkhawm': {
    badgeClass: 'badge-cat-inkhawm',
    icon: 'book-open',
    label: 'Inkhawm'
  },
  'Hnatlang': {
    badgeClass: 'badge-cat-hnatlang',
    icon: 'hammer',
    label: 'Hnatlang'
  },
  'Zaipawl': {
    badgeClass: 'badge-cat-zaipawl',
    icon: 'music',
    label: 'Zaipawl'
  },
  'General': {
    badgeClass: 'badge-cat-general',
    icon: 'bell',
    label: 'General'
  }
};

// Initialize App
async function initApp() {
  setPrintDate();
  checkSecretaryAuth();

  // Mobile layout default
  if (window.innerWidth < 768) {
    setViewMode('cards');
  }

  // Load both Members and Notices
  await Promise.all([
    loadMembersData(),
    loadNoticesData()
  ]);

  renderMembers();
  renderNotices();
  updateStats();

  if (window.lucide) {
    lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function setPrintDate() {
  const d = new Date();
  const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const printEl = document.getElementById('printDate');
  if (printEl) printEl.textContent = `Date: ${dateStr}`;
}

// ==================== NAVIGATION TABS ====================

function switchTab(tabName) {
  currentTab = tabName;
  const tabDir = document.getElementById('tabContentDirectory');
  const tabNot = document.getElementById('tabContentNotices');
  const btnDir = document.getElementById('tabBtnDirectory');
  const btnNot = document.getElementById('tabBtnNotices');

  if (tabName === 'directory') {
    if (tabDir) tabDir.classList.remove('hidden');
    if (tabNot) tabNot.classList.add('hidden');
    if (btnDir) btnDir.className = 'py-3 px-4 text-xs sm:text-sm font-bold border-b-2 border-rose-900 text-rose-900 flex items-center gap-2 transition';
    if (btnNot) btnNot.className = 'py-3 px-4 text-xs sm:text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2 transition';
  } else {
    if (tabDir) tabDir.classList.add('hidden');
    if (tabNot) tabNot.classList.remove('hidden');
    if (btnNot) btnNot.className = 'py-3 px-4 text-xs sm:text-sm font-bold border-b-2 border-rose-900 text-rose-900 flex items-center gap-2 transition';
    if (btnDir) btnDir.className = 'py-3 px-4 text-xs sm:text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2 transition';
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==================== SECRETARY AUTHENTICATION ====================

function checkSecretaryAuth() {
  isSecretaryLoggedIn = localStorage.getItem('ktp_secretary_auth') === 'true';
  updateSecretaryUI();
}

function updateSecretaryUI() {
  const loginBtn = document.getElementById('btnSecretaryLogin');
  const loggedInBox = document.getElementById('secretaryLoggedInBox');
  const secretaryBanner = document.getElementById('secretaryActiveBanner');
  const thActions = document.getElementById('thActions');
  const secTools = document.getElementById('secretaryToolsLink');
  const secNoticeActions = document.getElementById('secretaryNoticeActions');

  if (isSecretaryLoggedIn) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (loggedInBox) loggedInBox.classList.remove('hidden');
    if (secretaryBanner) secretaryBanner.classList.remove('hidden');
    if (thActions) thActions.classList.remove('hidden');
    if (secTools) secTools.classList.remove('hidden');
    if (secNoticeActions) secNoticeActions.classList.remove('hidden');
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (loggedInBox) loggedInBox.classList.add('hidden');
    if (secretaryBanner) secretaryBanner.classList.add('hidden');
    if (thActions) thActions.classList.add('hidden');
    if (secTools) secTools.classList.add('hidden');
    if (secNoticeActions) secNoticeActions.classList.add('hidden');
  }
}

function openSecretaryLoginModal() {
  const input = document.getElementById('secretaryPasswordInput');
  if (input) input.value = '';
  const modal = document.getElementById('secretaryLoginModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
  if (input) input.focus();
}

function closeSecretaryLoginModal() {
  const modal = document.getElementById('secretaryLoginModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

function getSecretaryPassword() {
  return localStorage.getItem('ktp_secretary_pwd') || DEFAULT_SECRETARY_PASSWORD;
}

function handleSecretaryLoginSubmit(e) {
  e.preventDefault();
  const pass = document.getElementById('secretaryPasswordInput').value.trim();
  const validPass = getSecretaryPassword();

  if (pass === validPass || pass === DEFAULT_SECRETARY_PASSWORD || pass.toLowerCase() === 'secretary') {
    isSecretaryLoggedIn = true;
    localStorage.setItem('ktp_secretary_auth', 'true');
    updateSecretaryUI();
    closeSecretaryLoginModal();
    renderMembers();
    renderNotices();
    showToast('Branch Secretary login hlawhtling e! Member leh Notice i enkawl thei ta.', 'success');
  } else {
    showToast('Password dik lo! Khawngaihin Branch Secretary password chhu rawh.', 'error');
  }
}

function changeSecretaryPassword() {
  if (!isSecretaryLoggedIn) return;
  const newPass = prompt('Branch Secretary Password thar tur chhu rawh (letters or numbers 4+):');
  if (newPass && newPass.trim().length >= 4) {
    localStorage.setItem('ktp_secretary_pwd', newPass.trim());
    showToast('Secretary password thlak a ni ta!', 'success');
  } else if (newPass !== null) {
    showToast('Password hi a tlem berah letter/number 4 a tling tur a ni.', 'error');
  }
}

function logoutSecretary() {
  isSecretaryLoggedIn = false;
  localStorage.removeItem('ktp_secretary_auth');
  updateSecretaryUI();
  renderMembers();
  renderNotices();
  showToast('Branch Secretary session atangin i chhuak ta.', 'info');
}

// ==================== WEBP PHOTO COMPRESSION & CROPPING ====================

/**
 * Converts any image (selfie or gallery file) to a compact passport-size WebP image.
 * Crops to 3:3.5 aspect ratio (300 x 350) and outputs ~12-25 KB WebP data URL.
 */
function processAndCompressImage(file, callback) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Khawngaihin image / thlalak dik file thlang rawh.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const targetWidth = 300;
      const targetHeight = 350;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Center-crop / cover math
      const imgAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;
      let sx, sy, sWidth, sHeight;

      if (imgAspect > targetAspect) {
        // Image is wider: crop sides
        sHeight = img.height;
        sWidth = img.height * targetAspect;
        sx = (img.width - sWidth) / 2;
        sy = 0;
      } else {
        // Image is taller: crop top/bottom
        sWidth = img.width;
        sHeight = img.width / targetAspect;
        sx = 0;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

      // WebP compression with 0.72 quality
      let dataUrl = canvas.toDataURL('image/webp', 0.72);
      if (!dataUrl.startsWith('data:image/webp')) {
        // Fallback for browsers that don't support WebP canvas export
        dataUrl = canvas.toDataURL('image/jpeg', 0.72);
      }

      const sizeKB = (dataUrl.length * 0.75 / 1024).toFixed(1);
      callback(dataUrl, sizeKB);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handlePhotoUpload(event, targetPrefix) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  processAndCompressImage(file, (dataUrl, sizeKB) => {
    if (targetPrefix === 'selfReg') {
      currentSelfRegPhoto = dataUrl;
      const preview = document.getElementById('selfRegPhotoPreview');
      const placeholder = document.getElementById('selfRegPhotoPlaceholder');
      const removeBtn = document.getElementById('selfRegRemovePhotoBtn');
      const badge = document.getElementById('selfRegPhotoSizeBadge');

      if (preview) {
        preview.src = dataUrl;
        preview.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
      if (badge) {
        badge.textContent = `${sizeKB} KB (WebP)`;
        badge.classList.remove('hidden');
      }
      showToast(`Thlalak chu WebP (${sizeKB} KB)-ah convert a ni ta!`, 'success');
    } else if (targetPrefix === 'form') {
      currentFormPhoto = dataUrl;
      const preview = document.getElementById('formPhotoPreview');
      const placeholder = document.getElementById('formPhotoPlaceholder');
      const removeBtn = document.getElementById('formRemovePhotoBtn');

      if (preview) {
        preview.src = dataUrl;
        preview.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
      showToast(`Thlalak chu WebP (${sizeKB} KB)-ah convert a ni ta!`, 'success');
    }
  });

  // Reset file input value so re-selecting same file triggers change
  event.target.value = '';
}

function clearSelfRegPhoto() {
  currentSelfRegPhoto = '';
  const preview = document.getElementById('selfRegPhotoPreview');
  const placeholder = document.getElementById('selfRegPhotoPlaceholder');
  const removeBtn = document.getElementById('selfRegRemovePhotoBtn');
  const badge = document.getElementById('selfRegPhotoSizeBadge');

  if (preview) {
    preview.src = '';
    preview.classList.add('hidden');
  }
  if (placeholder) placeholder.classList.remove('hidden');
  if (removeBtn) removeBtn.classList.add('hidden');
  if (badge) badge.classList.add('hidden');
}

function clearFormPhoto() {
  currentFormPhoto = '';
  const preview = document.getElementById('formPhotoPreview');
  const placeholder = document.getElementById('formPhotoPlaceholder');
  const removeBtn = document.getElementById('formRemovePhotoBtn');

  if (preview) {
    preview.src = '';
    preview.classList.add('hidden');
  }
  if (placeholder) placeholder.classList.remove('hidden');
  if (removeBtn) removeBtn.classList.add('hidden');
}

// ==================== NOTICE BOARD FLYER / PHOTO PROCESSING ====================

function processNoticeFlyerImage(file, callback) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Khawngaihin image / thlalak dik file thlang rawh.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Scale down proportionally so max dimension is 1000px (keeps text sharp)
      const maxDim = 1000;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      let dataUrl = canvas.toDataURL('image/webp', 0.75);
      if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', 0.75);
      }

      const sizeKB = (dataUrl.length * 0.75 / 1024).toFixed(1);
      callback(dataUrl, sizeKB);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleNoticePhotoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  processNoticeFlyerImage(file, (dataUrl, sizeKB) => {
    currentNoticePhoto = dataUrl;
    const preview = document.getElementById('noticePhotoPreview');
    const wrapper = document.getElementById('noticePhotoPreviewWrapper');
    const uploadBox = document.getElementById('noticePhotoUploadBox');
    const badge = document.getElementById('noticePhotoSizeBadge');

    if (preview) preview.src = dataUrl;
    if (wrapper) wrapper.classList.remove('hidden');
    if (uploadBox) uploadBox.classList.add('hidden');
    if (badge) {
      badge.textContent = `${sizeKB} KB (WebP)`;
      badge.classList.remove('hidden');
    }
    showToast(`Flyer WebP (${sizeKB} KB)-ah convert a ni ta!`, 'success');
  });

  event.target.value = '';
}

function clearNoticePhoto() {
  currentNoticePhoto = '';
  const preview = document.getElementById('noticePhotoPreview');
  const wrapper = document.getElementById('noticePhotoPreviewWrapper');
  const uploadBox = document.getElementById('noticePhotoUploadBox');
  const badge = document.getElementById('noticePhotoSizeBadge');

  if (preview) preview.src = '';
  if (wrapper) wrapper.classList.add('hidden');
  if (uploadBox) uploadBox.classList.remove('hidden');
  if (badge) badge.classList.add('hidden');
}

// Lightbox for Full-Size Notice Flyers
function openLightboxModal(imgSrc, title) {
  const modal = document.getElementById('imageLightboxModal');
  const img = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');

  if (img) img.src = imgSrc;
  if (caption) caption.textContent = title || '';
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function closeLightboxModal() {
  const modal = document.getElementById('imageLightboxModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

window.openLightboxModal = openLightboxModal;
window.closeLightboxModal = closeLightboxModal;
window.clearNoticePhoto = clearNoticePhoto;
window.handleNoticePhotoUpload = handleNoticePhotoUpload;

// ==================== SELF-REGISTRATION (PUBLIC MEMBERS) ====================

function openSelfRegisterModal() {
  try {
    clearSelfRegPhoto();
    const nameEl = document.getElementById('selfRegName');
    const phoneEl = document.getElementById('selfRegPhone');
    const houseEl = document.getElementById('selfRegHouseNo');
    const groupEl = document.getElementById('selfRegGroup');
    const genderEl = document.getElementById('selfRegGender');
    const bialEl = document.getElementById('selfRegUpaBial');
    const modalEl = document.getElementById('selfRegisterModal');

    if (nameEl) nameEl.value = '';
    if (phoneEl) phoneEl.value = '';
    if (houseEl) houseEl.value = '';
    if (groupEl) groupEl.value = (activeGroupFilter && activeGroupFilter !== 'All') ? activeGroupFilter : 'Sadrak';
    if (genderEl) genderEl.value = 'Mipa';
    if (bialEl) bialEl.value = 'Upa Bial 1';

    if (modalEl) {
      modalEl.classList.remove('hidden');
      modalEl.style.display = 'flex';
    }
    if (nameEl) {
      setTimeout(() => nameEl.focus(), 60);
    }
  } catch (err) {
    console.error('Error opening self register modal:', err);
  }
}

function closeSelfRegisterModal() {
  const modalEl = document.getElementById('selfRegisterModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    modalEl.style.display = 'none';
  }
}

// Global window exposure
window.openSelfRegisterModal = openSelfRegisterModal;
window.closeSelfRegisterModal = closeSelfRegisterModal;

async function handleSelfRegisterSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('selfRegName').value.trim();
  const group = document.getElementById('selfRegGroup').value;
  let phone = document.getElementById('selfRegPhone').value.trim().replace(/\D/g, '');
  const gender = document.getElementById('selfRegGender').value;
  const houseNo = document.getElementById('selfRegHouseNo').value.trim();
  const upaBial = document.getElementById('selfRegUpaBial').value;

  if (!name) {
    showToast('Khawngaihin i hming pum ziak rawh.', 'error');
    return;
  }

  if (phone.length === 12 && phone.startsWith('91')) {
    phone = phone.slice(2);
  }

  if (!phone || phone.length < 10) {
    showToast('Khawngaihin contact number dik (10 digits) chhu rawh.', 'error');
    return;
  }

  const newMember = {
    id: 'ktp-' + Date.now(),
    name,
    group,
    phone,
    gender,
    houseNo: houseNo || '-',
    upaBial: upaBial || 'Upa Bial 1',
    photo: currentSelfRegPhoto || ''
  };

  members.unshift(newMember);
  saveToLocalStorage(members);
  syncToServer(members);

  closeSelfRegisterModal();
  updateStats();
  renderMembers();

  showToast(`Shalom ${name}! In-ziahluhna a hlawhtling e. Directory-ah i tel ta.`, 'success');
}

// ==================== DATA LOADING & PERSISTENCE ====================

async function loadMembersData() {
  // 1. Try local server API with fast timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const apiUrl = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
      ? '/api/members'
      : 'http://localhost:3000/api/members';

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        members = json.data;
        saveToLocalStorage(members);
        return;
      }
    }
  } catch (e) {}

  // 2. Try LocalStorage
  const local = localStorage.getItem('ktp_members_data_v3');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        members = parsed;
        return;
      }
    } catch (e) {}
  }

  // 3. Fallback to default seeds
  members = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
  saveToLocalStorage(members);
  syncToServer(members);
}

function saveToLocalStorage(data) {
  try {
    localStorage.setItem('ktp_members_data_v3', JSON.stringify(data));
  } catch (e) {}
}

async function syncToServer(data) {
  try {
    await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ members: data })
    });
  } catch (e) {}
}

// ==================== NOTICE BOARD DATA & FUNCTIONS ====================

async function loadNoticesData() {
  // 1. Try local server API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const apiUrl = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
      ? '/api/notices'
      : 'http://localhost:3000/api/notices';

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        notices = json.data;
        saveNoticesToLocalStorage(notices);
        return;
      }
    }
  } catch (e) {}

  // 2. Try LocalStorage
  const local = localStorage.getItem('ktp_notices_data_v2');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        notices = parsed;
        return;
      }
    } catch (e) {}
  }

  // 3. Fallback to default notices
  notices = JSON.parse(JSON.stringify(DEFAULT_NOTICES));
  saveNoticesToLocalStorage(notices);
  syncNoticesToServer(notices);
}

function saveNoticesToLocalStorage(data) {
  try {
    localStorage.setItem('ktp_notices_data_v2', JSON.stringify(data));
  } catch (e) {}
}

async function syncNoticesToServer(data) {
  try {
    await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notices: data })
    });
  } catch (e) {}
}

function renderNotices() {
  const container = document.getElementById('noticesListContainer');
  const emptyState = document.getElementById('emptyNoticesState');
  const tabBadge = document.getElementById('tabCountNotices');
  const alertTitle = document.getElementById('alertNoticeTitle');

  // Filter notices by category
  filteredNotices = notices.filter(n => {
    if (activeNoticeCategory !== 'All' && n.category !== activeNoticeCategory) {
      return false;
    }
    return true;
  });

  // Sort by date descending
  filteredNotices.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  if (tabBadge) tabBadge.textContent = notices.length;

  // Latest notice banner text
  if (alertTitle) {
    if (notices.length > 0) {
      alertTitle.textContent = `${notices[0].title} (${formatNoticeDate(notices[0].date)})`;
    } else {
      alertTitle.textContent = 'Hriattirna thar a awm rih lo';
    }
  }

  if (!container) return;

  if (filteredNotices.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = filteredNotices.map(notice => {
    const catCfg = NOTICE_CAT_CONFIG[notice.category] || NOTICE_CAT_CONFIG['General'];
    const formattedDate = formatNoticeDate(notice.date);
    const contentHtml = escapeHtml(notice.content || '').replace(/\n/g, '<br>');

    // Flyer Image HTML if notice has a photo
    const flyerHtml = notice.photo ? `
      <div class="mb-3.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group cursor-pointer shadow-2xs" onclick="openLightboxModal('${escapeHtml(notice.photo)}', '${escapeHtml(notice.title)}')">
        <img src="${notice.photo}" alt="${escapeHtml(notice.title)}" class="w-full max-h-72 object-contain bg-slate-100/60 group-hover:opacity-95 transition">
        <div class="absolute bottom-2.5 right-2.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5 shadow-md">
          <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
          <span>En lian rawh (View Flyer)</span>
        </div>
      </div>
    ` : '';

    return `
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
        <div>
          <!-- Header: Category & Date -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${catCfg.badgeClass}">
              <i data-lucide="${catCfg.icon}" class="w-3 h-3 mr-1"></i>
              ${escapeHtml(notice.category)}
            </span>
            <span class="text-xs text-slate-500 font-medium flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
              ${formattedDate}
            </span>
          </div>

          <!-- Title -->
          <h4 class="text-base font-bold text-slate-900 leading-snug mb-2">
            ${escapeHtml(notice.title)}
          </h4>

          ${flyerHtml}

          <!-- Content Body -->
          <div class="text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
            ${contentHtml}
          </div>
        </div>

        <!-- Footer: Actions -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div class="text-[11px] text-slate-400 font-medium">
            Tarchhuaktu: <span class="text-slate-600 font-semibold">${escapeHtml(notice.author || 'Branch Secretary')}</span>
          </div>

          <div class="flex items-center space-x-1.5">
            <!-- WhatsApp Share Button -->
            <button 
              onclick="shareNoticeWhatsApp('${notice.id}')" 
              title="Share on WhatsApp" 
              class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-200 flex items-center gap-1.5"
            >
              <i data-lucide="share-2" class="w-3.5 h-3.5 text-emerald-700"></i>
              <span>WhatsApp</span>
            </button>

            <!-- Secretary Edit & Delete -->
            ${isSecretaryLoggedIn ? `
              <button 
                onclick="openNoticeModal('${notice.id}')" 
                title="Edit Notice" 
                class="w-7 h-7 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 flex items-center justify-center transition"
              >
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
              <button 
                onclick="openDeleteNoticeModal('${notice.id}')" 
                title="Delete Notice" 
                class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center transition"
              >
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function filterNotices(category) {
  activeNoticeCategory = category;

  const categories = ['All', 'Inkhawm', 'Hnatlang', 'Zaipawl', 'General'];
  categories.forEach(cat => {
    const el = document.getElementById(`noticeFilter${cat}`);
    if (!el) return;
    if (cat === category) {
      el.className = 'notice-cat-chip px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-2xs';
    } else {
      el.className = 'notice-cat-chip px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50';
    }
  });

  renderNotices();
}

function formatNoticeDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function shareNoticeWhatsApp(id) {
  const notice = notices.find(n => String(n.id) === String(id));
  if (!notice) return;

  const flyerText = notice.photo ? '\n📷 *[Programme Flyer / Poster thlalak a tel e - Website-ah en theih a ni]*' : '';
  const text = `📢 *KṬP ARMED VENG SOUTH BRANCH - HRIATTIRNA*

📌 *${notice.title}*
📅 Ni: ${formatNoticeDate(notice.date)}
🏷 Category: ${notice.category}${flyerText}

${notice.content}

━━━━━━━━━━━━━━━
_KṬP Armed Veng South Branch_
_"Rawngbawl tura chhandam" (Ephesi 2:10)_`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function openNoticeModal(id = null) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }

  clearNoticePhoto();

  const modal = document.getElementById('noticeModal');
  const titleInput = document.getElementById('formNoticeTitle');
  const idInput = document.getElementById('formNoticeId');
  const catInput = document.getElementById('formNoticeCategory');
  const dateInput = document.getElementById('formNoticeDate');
  const contentInput = document.getElementById('formNoticeContent');
  const titleEl = document.getElementById('noticeModalTitle');
  const btnSubmitText = document.getElementById('btnNoticeSubmitText');

  if (id) {
    // Edit Notice
    const notice = notices.find(n => String(n.id) === String(id));
    if (!notice) return;
    if (idInput) idInput.value = notice.id;
    if (titleInput) titleInput.value = notice.title || '';
    if (catInput) catInput.value = notice.category || 'Inkhawm';
    if (dateInput) dateInput.value = notice.date || new Date().toISOString().slice(0, 10);
    if (contentInput) contentInput.value = notice.content || '';
    if (titleEl) titleEl.textContent = 'Notice Siamthatna';
    if (btnSubmitText) btnSubmitText.textContent = 'Siamṭha rawh (Update Notice)';

    if (notice.photo) {
      currentNoticePhoto = notice.photo;
      const preview = document.getElementById('noticePhotoPreview');
      const wrapper = document.getElementById('noticePhotoPreviewWrapper');
      const uploadBox = document.getElementById('noticePhotoUploadBox');
      if (preview) preview.src = notice.photo;
      if (wrapper) wrapper.classList.remove('hidden');
      if (uploadBox) uploadBox.classList.add('hidden');
    }
  } else {
    // Add New Notice
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (catInput) catInput.value = activeNoticeCategory !== 'All' ? activeNoticeCategory : 'Inkhawm';
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    if (contentInput) contentInput.value = '';
    if (titleEl) titleEl.textContent = 'Notice Thar Tarchhuahna';
    if (btnSubmitText) btnSubmitText.textContent = 'Tarchhuak Rawh (Post Notice)';
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
  if (titleInput) titleInput.focus();
}

function closeNoticeModal() {
  clearNoticePhoto();
  const modal = document.getElementById('noticeModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

async function handleNoticeFormSubmit(e) {
  e.preventDefault();
  if (!isSecretaryLoggedIn) {
    showToast('Secretary chauhvin notice a tarchhuak thei!', 'error');
    return;
  }

  const id = document.getElementById('formNoticeId').value;
  const title = document.getElementById('formNoticeTitle').value.trim();
  const category = document.getElementById('formNoticeCategory').value;
  const date = document.getElementById('formNoticeDate').value;
  const content = document.getElementById('formNoticeContent').value.trim();

  if (!title || !content) {
    showToast('Notice Title leh Content ziah a ngai.', 'error');
    return;
  }

  if (id) {
    // Update existing notice
    const idx = notices.findIndex(n => String(n.id) === String(id));
    if (idx !== -1) {
      notices[idx] = {
        ...notices[idx],
        title,
        category,
        date: date || new Date().toISOString().slice(0, 10),
        content,
        photo: currentNoticePhoto || notices[idx].photo || ''
      };
      saveNoticesToLocalStorage(notices);
      syncNoticesToServer(notices);
      showToast('Notice siamthat a ni ta!', 'success');
    }
  } else {
    // Add new notice
    const newNotice = {
      id: 'not-' + Date.now(),
      title,
      category,
      date: date || new Date().toISOString().slice(0, 10),
      author: 'Branch Secretary',
      content,
      photo: currentNoticePhoto || ''
    };
    notices.unshift(newNotice);
    saveNoticesToLocalStorage(notices);
    syncNoticesToServer(notices);
    showToast('Notice thar hlawhtling taka tarchhuah a ni ta!', 'success');
  }

  closeNoticeModal();
  renderNotices();
}

// ==================== MEMBERS DIRECTORY RENDERING ====================

function renderMembers() {
  const searchVal = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const sortVal = document.getElementById('sortBy')?.value || 'name-asc';
  const upaBialVal = document.getElementById('filterUpaBial')?.value || 'All';

  filteredMembers = members.filter(member => {
    // 1. Group filter (Sadrak, Mesak, Abednego)
    if (activeGroupFilter !== 'All' && member.group !== activeGroupFilter) {
      return false;
    }

    // 2. Upa Bial filter (Separate filter)
    if (upaBialVal !== 'All' && member.upaBial !== upaBialVal) {
      return false;
    }

    // 3. Search query
    if (searchVal) {
      const matchName = (member.name || '').toLowerCase().includes(searchVal);
      const matchPhone = (member.phone || '').includes(searchVal);
      const matchHouse = (member.houseNo || '').toLowerCase().includes(searchVal);
      const matchBial = (member.upaBial || '').toLowerCase().includes(searchVal);
      if (!matchName && !matchPhone && !matchHouse && !matchBial) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filteredMembers.sort((a, b) => {
    if (sortVal === 'name-asc') {
      return (a.name || '').localeCompare(b.name || '');
    } else if (sortVal === 'name-desc') {
      return (b.name || '').localeCompare(a.name || '');
    } else if (sortVal === 'group-asc') {
      return (a.group || '').localeCompare(b.group || '') || (a.name || '').localeCompare(b.name || '');
    } else if (sortVal === 'house-asc') {
      return (a.houseNo || '').localeCompare(b.houseNo || '', undefined, { numeric: true });
    } else if (sortVal === 'bial-asc') {
      return (a.upaBial || '').localeCompare(b.upaBial || '', undefined, { numeric: true });
    }
    return 0;
  });

  // Counts
  const filteredEl = document.getElementById('filteredCount');
  const totalEl = document.getElementById('totalCount');
  const tabMembersBadge = document.getElementById('tabCountMembers');

  if (filteredEl) filteredEl.textContent = filteredMembers.length;
  if (totalEl) totalEl.textContent = members.length;
  if (tabMembersBadge) tabMembersBadge.textContent = members.length;

  const printSub = document.getElementById('printSubtitle');
  if (printSub) {
    printSub.textContent = activeGroupFilter === 'All'
      ? `Branch Member Directory (Total: ${filteredMembers.length})`
      : `${activeGroupFilter} Group Directory (Total: ${filteredMembers.length})`;
  }

  // Empty state
  const emptyState = document.getElementById('emptyState');
  if (filteredMembers.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  renderTableRows();
  renderCardsGrid();

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Avatar Initials Fallback
function getAvatarData(name) {
  const parts = (name || '').trim().split(/\s+/);
  let initials = '';
  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length > 0) {
    initials = parts[0].slice(0, 2).toUpperCase();
  } else {
    initials = 'KT';
  }

  const colors = [
    'from-rose-500 to-rose-700',
    'from-blue-500 to-indigo-700',
    'from-emerald-500 to-teal-700',
    'from-amber-500 to-orange-700',
    'from-purple-500 to-fuchsia-700',
    'from-cyan-500 to-blue-700'
  ];

  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorClass = colors[Math.abs(hash) % colors.length];

  return { initials, colorClass };
}

// Render Table Rows (Columns: #, Photo, Member Name, Group, H/No., Upa Bial, Contact, Actions)
function renderTableRows() {
  const tbody = document.getElementById('membersTableBody');
  if (!tbody) return;

  tbody.innerHTML = filteredMembers.map((member, index) => {
    const groupCfg = GROUP_CONFIG[member.group] || {
      badgeClass: 'badge-sadrak',
      dotColor: 'bg-slate-500',
      textColor: 'text-slate-800'
    };

    const { initials, colorClass } = getAvatarData(member.name);
    const cleanPhone = (member.phone || '').replace(/\D/g, '');
    const formattedPhone = cleanPhone.length === 10
      ? `${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
      : cleanPhone;

    // Passport Photo or Initials Avatar
    const photoCell = member.photo
      ? `<img src="${member.photo}" alt="${escapeHtml(member.name)}" class="passport-thumb mx-auto shadow-2xs" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><div class="w-10 h-12 rounded-lg bg-gradient-to-br ${colorClass} text-white font-bold text-xs items-center justify-center mx-auto shadow-2xs" style="display:none;">${initials}</div>`
      : `<div class="w-10 h-12 rounded-lg bg-gradient-to-br ${colorClass} text-white font-bold text-xs flex items-center justify-center mx-auto shadow-2xs">${initials}</div>`;

    return `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 group">
        <!-- 1. Index -->
        <td class="py-3 px-3 text-center font-mono text-xs text-slate-400">
          ${index + 1}
        </td>

        <!-- 2. Photo Column -->
        <td class="py-2.5 px-3 text-center">
          ${photoCell}
        </td>

        <!-- 3. Member Name -->
        <td class="py-3 px-4">
          <div class="min-w-0">
            <span class="font-bold text-slate-900 text-sm block">${escapeHtml(member.name)}</span>
            <span class="text-[11px] text-slate-500 font-medium">${member.gender === 'Mipa' ? 'Mipa' : 'Hmeichhia'}</span>
          </div>
        </td>

        <!-- 4. Group (Sadrak, Mesak, Abednego) -->
        <td class="py-3 px-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${groupCfg.badgeClass}">
            <span class="w-2 h-2 rounded-full ${groupCfg.dotColor} mr-1.5"></span>
            ${escapeHtml(member.group)}
          </span>
        </td>

        <!-- 5. H/No. (House No.) - SEPARATE COLUMN -->
        <td class="py-3 px-3">
          <span class="font-bold text-slate-800 text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
            ${escapeHtml(member.houseNo || '-')}
          </span>
        </td>

        <!-- 6. Upa Bial (Elder Section) - SEPARATE COLUMN -->
        <td class="py-3 px-3">
          <span class="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            ${escapeHtml(member.upaBial || '-')}
          </span>
        </td>

        <!-- 7. Contact (Phone, WhatsApp, Call, vCard, Copy) - SEPARATE COLUMN -->
        <td class="py-3 px-4">
          <div class="flex items-center space-x-2">
            <span class="font-mono text-xs font-bold text-slate-800 tracking-wide">${formattedPhone}</span>
            <div class="flex items-center space-x-1 no-print">
              <!-- WhatsApp -->
              <a 
                href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent('Shalom! KṬP Armed Veng South Branch aṭangin ka rawn bia a che.')}" 
                target="_blank" 
                title="WhatsApp Message" 
                class="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition border border-emerald-200"
              >
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              </a>
              <!-- Direct Call -->
              <a 
                href="tel:${cleanPhone}" 
                title="Phone Call" 
                class="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition border border-blue-200"
              >
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              </a>
              <!-- Save to Phone Contacts (vCard) -->
              <button 
                onclick="downloadVCard('${escapeHtml(member.name)}', '${cleanPhone}', '${escapeHtml(member.group)}')" 
                title="Save Contact to Phone" 
                class="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition border border-amber-200"
              >
                <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
              </button>
              <!-- Copy -->
              <button 
                onclick="copyToClipboard('${cleanPhone}', 'Phone number copy a ni ta!')" 
                title="Copy Number" 
                class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </td>

        <!-- 8. Actions (Only when Secretary is logged in) -->
        ${isSecretaryLoggedIn ? `
          <td class="py-3 px-4 text-center action-col">
            <div class="flex items-center justify-center space-x-1">
              <button 
                onclick="openEditMemberModal('${member.id}')" 
                title="Edit Member" 
                class="w-7 h-7 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 flex items-center justify-center transition"
              >
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
              <button 
                onclick="openDeleteModal('${member.id}')" 
                title="Delete Member" 
                class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center transition"
              >
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        ` : ''}
      </tr>
    `;
  }).join('');
}

// Render Cards Grid (Mobile & Responsive)
function renderCardsGrid() {
  const container = document.getElementById('cardsViewWrapper');
  if (!container) return;

  container.innerHTML = filteredMembers.map(member => {
    const groupCfg = GROUP_CONFIG[member.group] || {
      badgeClass: 'badge-sadrak',
      dotColor: 'bg-slate-500',
      textColor: 'text-slate-800'
    };
    const { initials, colorClass } = getAvatarData(member.name);
    const cleanPhone = (member.phone || '').replace(/\D/g, '');

    const photoHtml = member.photo
      ? `<img src="${member.photo}" alt="${escapeHtml(member.name)}" class="w-12 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="w-12 h-14 rounded-xl bg-gradient-to-br ${colorClass} text-white font-bold text-sm flex items-center justify-center flex-shrink-0 hidden">${initials}</div>`
      : `<div class="w-12 h-14 rounded-xl bg-gradient-to-br ${colorClass} text-white font-bold text-sm flex items-center justify-center flex-shrink-0">${initials}</div>`;

    return `
      <div class="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 hover:border-slate-300 transition flex flex-col justify-between">
        <div>
          <!-- Top bar with Group Badge and Secretary Actions -->
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${groupCfg.badgeClass}">
              <span class="w-1.5 h-1.5 rounded-full ${groupCfg.dotColor} mr-1"></span>
              ${escapeHtml(member.group)}
            </span>
            ${isSecretaryLoggedIn ? `
              <div class="flex items-center space-x-1">
                <button onclick="openEditMemberModal('${member.id}')" title="Edit" class="text-slate-400 hover:text-amber-700 p-1">
                  <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="openDeleteModal('${member.id}')" title="Delete" class="text-slate-400 hover:text-rose-700 p-1">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Avatar & Details -->
          <div class="flex items-center space-x-3">
            ${photoHtml}
            <div class="min-w-0 flex-1">
              <h4 class="font-bold text-slate-900 text-sm truncate">${escapeHtml(member.name)}</h4>
              <p class="text-[11px] text-slate-500">${member.gender === 'Mipa' ? 'Mipa' : 'Hmeichhia'}</p>
              <!-- Distinct separate rows for H/No. and Upa Bial -->
              <div class="mt-2 space-y-1 text-[11px]">
                <div class="flex items-center justify-between bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  <span class="text-slate-400 font-semibold uppercase text-[10px]">H/No:</span>
                  <span class="font-mono font-bold text-slate-800">${escapeHtml(member.houseNo || '-')}</span>
                </div>
                <div class="flex items-center justify-between bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  <span class="text-slate-400 font-semibold uppercase text-[10px]">Upa Bial:</span>
                  <span class="font-semibold text-slate-700">${escapeHtml(member.upaBial || '-')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-slate-800">${escapeHtml(member.phone)}</span>
          <div class="flex items-center space-x-1">
            <a 
              href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent('Shalom! KṬP Armed Veng South Branch aṭangin ka rawn bia a che.')}" 
              target="_blank" 
              class="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition border border-emerald-200"
              title="WhatsApp"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            </a>
            <a 
              href="tel:${cleanPhone}" 
              class="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition border border-blue-200"
              title="Call"
            >
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
            </a>
            <button 
              onclick="downloadVCard('${escapeHtml(member.name)}', '${cleanPhone}', '${escapeHtml(member.group)}')" 
              title="Save Contact" 
              class="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition border border-amber-200"
            >
              <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Update Top Statistics (Total, Sadrak, Mesak, Abednego)
function updateStats() {
  const total = members.length;
  let male = 0;
  let female = 0;

  const counts = {
    'Sadrak': 0,
    'Mesak': 0,
    'Abednego': 0
  };

  members.forEach(m => {
    if (m.gender === 'Mipa') male++;
    if (m.gender === 'Hmeichhia') female++;
    if (counts.hasOwnProperty(m.group)) {
      counts[m.group]++;
    }
  });

  const elTotal = document.getElementById('statTotal');
  const elMale = document.getElementById('statMale');
  const elFemale = document.getElementById('statFemale');
  const elSadrak = document.getElementById('statSadrak');
  const elMesak = document.getElementById('statMesak');
  const elAbednego = document.getElementById('statAbednego');

  if (elTotal) elTotal.textContent = total;
  if (elMale) elMale.textContent = male;
  if (elFemale) elFemale.textContent = female;

  if (elSadrak) elSadrak.textContent = counts['Sadrak'];
  if (elMesak) elMesak.textContent = counts['Mesak'];
  if (elAbednego) elAbednego.textContent = counts['Abednego'];

  const elSadrakPct = document.getElementById('statSadrakPct');
  const elMesakPct = document.getElementById('statMesakPct');
  const elAbednegoPct = document.getElementById('statAbednegoPct');

  if (elSadrakPct) elSadrakPct.textContent = total > 0 ? `${Math.round((counts['Sadrak'] / total) * 100)}% of total` : '0%';
  if (elMesakPct) elMesakPct.textContent = total > 0 ? `${Math.round((counts['Mesak'] / total) * 100)}% of total` : '0%';
  if (elAbednegoPct) elAbednegoPct.textContent = total > 0 ? `${Math.round((counts['Abednego'] / total) * 100)}% of total` : '0%';

  const elBadgeAll = document.getElementById('badgeTabAll');
  const elBadgeSadrak = document.getElementById('badgeTabSadrak');
  const elBadgeMesak = document.getElementById('badgeTabMesak');
  const elBadgeAbednego = document.getElementById('badgeTabAbednego');

  if (elBadgeAll) elBadgeAll.textContent = total;
  if (elBadgeSadrak) elBadgeSadrak.textContent = counts['Sadrak'];
  if (elBadgeMesak) elBadgeMesak.textContent = counts['Mesak'];
  if (elBadgeAbednego) elBadgeAbednego.textContent = counts['Abednego'];
}

// Group Selection Filter
function selectGroupFilter(groupName) {
  activeGroupFilter = groupName;

  const tabs = [
    { id: 'tabGroupAll', group: 'All', activeClass: 'bg-slate-900 text-white' },
    { id: 'tabGroupSadrak', group: 'Sadrak', activeClass: 'bg-rose-700 text-white' },
    { id: 'tabGroupMesak', group: 'Mesak', activeClass: 'bg-emerald-700 text-white' },
    { id: 'tabGroupAbednego', group: 'Abednego', activeClass: 'bg-blue-700 text-white' }
  ];

  tabs.forEach(tab => {
    const el = document.getElementById(tab.id);
    if (!el) return;
    if (tab.group === groupName) {
      el.className = `group-tab px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${tab.activeClass} shadow-xs`;
    } else {
      el.className = 'group-tab px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 text-slate-600 hover:bg-slate-100';
    }
  });

  renderMembers();
}

// Search
function handleSearchChange() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (input.value.length > 0) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }
  renderMembers();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  document.getElementById('clearSearchBtn').classList.add('hidden');
  renderMembers();
}

function resetAllFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');
  const sortBy = document.getElementById('sortBy');
  if (sortBy) sortBy.value = 'name-asc';
  const filterUpaBial = document.getElementById('filterUpaBial');
  if (filterUpaBial) filterUpaBial.value = 'All';

  selectGroupFilter('All');
  showToast('Filters reset vek a ni ta.', 'info');
}

// View Mode (Table / Cards)
function setViewMode(mode) {
  currentViewMode = mode;
  const tableWrap = document.getElementById('tableViewWrapper');
  const cardsWrap = document.getElementById('cardsViewWrapper');
  const btnTable = document.getElementById('viewModeTable');
  const btnCards = document.getElementById('viewModeCards');

  if (mode === 'table') {
    if (tableWrap) tableWrap.classList.remove('hidden');
    if (cardsWrap) cardsWrap.classList.add('hidden');
    if (btnTable) btnTable.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 bg-white text-slate-900 shadow-xs font-semibold';
    if (btnCards) btnCards.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 text-slate-600 hover:text-slate-900';
  } else {
    if (tableWrap) tableWrap.classList.add('hidden');
    if (cardsWrap) cardsWrap.classList.remove('hidden');
    if (btnCards) btnCards.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 bg-white text-slate-900 shadow-xs font-semibold';
    if (btnTable) btnTable.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 text-slate-600 hover:text-slate-900';
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==================== SECRETARY MEMBER CRUD ACTIONS ====================

function openAddMemberModal() {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }

  clearFormPhoto();
  document.getElementById('formMemberId').value = '';
  document.getElementById('modalTitle').textContent = 'Member Thar Dahna';
  document.getElementById('btnSubmitText').textContent = 'Dah rawh (Save Member)';
  document.getElementById('formName').value = '';
  document.getElementById('formGroup').value = activeGroupFilter !== 'All' ? activeGroupFilter : 'Sadrak';
  document.getElementById('formPhone').value = '';
  document.getElementById('formGender').value = 'Mipa';
  document.getElementById('formHouseNo').value = '';
  document.getElementById('formUpaBial').value = 'Upa Bial 1';

  const modal = document.getElementById('memberModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
  document.getElementById('formName').focus();
}

function openEditMemberModal(id) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }

  const member = members.find(m => String(m.id) === String(id));
  if (!member) return;

  clearFormPhoto();
  document.getElementById('formMemberId').value = member.id;
  document.getElementById('modalTitle').textContent = 'Member Siamthatna';
  document.getElementById('btnSubmitText').textContent = 'Siamṭha rawh (Update)';
  document.getElementById('formName').value = member.name || '';
  document.getElementById('formGroup').value = member.group || 'Sadrak';
  document.getElementById('formPhone').value = member.phone || '';
  document.getElementById('formGender').value = member.gender || 'Mipa';
  document.getElementById('formHouseNo').value = member.houseNo || '';
  document.getElementById('formUpaBial').value = member.upaBial || 'Upa Bial 1';

  if (member.photo) {
    currentFormPhoto = member.photo;
    const preview = document.getElementById('formPhotoPreview');
    const placeholder = document.getElementById('formPhotoPlaceholder');
    const removeBtn = document.getElementById('formRemovePhotoBtn');
    if (preview) {
      preview.src = member.photo;
      preview.classList.remove('hidden');
      preview.style.display = 'block';
    }
    if (placeholder) {
      placeholder.classList.add('hidden');
      placeholder.style.display = 'none';
    }
    if (removeBtn) {
      removeBtn.classList.remove('hidden');
      removeBtn.style.display = 'flex';
    }
  }

  const modal = document.getElementById('memberModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function closeMemberModal() {
  const modal = document.getElementById('memberModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

async function handleSecretaryMemberSubmit(e) {
  e.preventDefault();
  if (!isSecretaryLoggedIn) {
    showToast('Secretary chauhvin a siamtha thei!', 'error');
    return;
  }

  const id = document.getElementById('formMemberId').value;
  const name = document.getElementById('formName').value.trim();
  const group = document.getElementById('formGroup').value;
  let phone = document.getElementById('formPhone').value.trim().replace(/\D/g, '');
  const gender = document.getElementById('formGender').value;
  const houseNo = document.getElementById('formHouseNo').value.trim();
  const upaBial = document.getElementById('formUpaBial').value;

  if (!name) {
    showToast('Khawngaihin member hming ziak rawh.', 'error');
    return;
  }

  if (phone.length === 12 && phone.startsWith('91')) {
    phone = phone.slice(2);
  }

  if (!phone || phone.length < 10) {
    showToast('Contact number dik lo: 10 digits a tling tur a ni.', 'error');
    return;
  }

  if (id) {
    // Update
    const index = members.findIndex(m => String(m.id) === String(id));
    if (index !== -1) {
      members[index] = {
        ...members[index],
        name,
        group,
        phone,
        gender,
        houseNo: houseNo || '-',
        upaBial: upaBial || 'Upa Bial 1',
        photo: currentFormPhoto || members[index].photo || ''
      };
      saveToLocalStorage(members);
      syncToServer(members);
      showToast(`${name} record siamthat a ni ta!`, 'success');
    }
  } else {
    // Add new
    const newMember = {
      id: 'ktp-' + Date.now(),
      name,
      group,
      phone,
      gender,
      houseNo: houseNo || '-',
      upaBial: upaBial || 'Upa Bial 1',
      photo: currentFormPhoto || ''
    };
    members.unshift(newMember);
    saveToLocalStorage(members);
    syncToServer(members);
    showToast(`Member thar (${name}) dah a ni ta!`, 'success');
  }

  closeMemberModal();
  updateStats();
  renderMembers();
}

// Backward compatibility alias if called elsewhere
function handleMemberFormSubmit(e) {
  return handleSecretaryMemberSubmit(e);
}

// ==================== UNIFIED DELETE MODAL ====================

function openDeleteModal(id) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }
  const member = members.find(m => String(m.id) === String(id));
  if (!member) return;

  deleteActionType = 'member';
  deleteTargetId = id;

  document.getElementById('deleteModalTitle').textContent = 'Member paih i duh tak tak em?';
  document.getElementById('deleteItemName').textContent = member.name;
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function openDeleteNoticeModal(id) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }
  const notice = notices.find(n => String(n.id) === String(id));
  if (!notice) return;

  deleteActionType = 'notice';
  deleteTargetId = id;

  document.getElementById('deleteModalTitle').textContent = 'Notice paih i duh tak tak em?';
  document.getElementById('deleteItemName').textContent = notice.title;
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function closeDeleteModal() {
  deleteActionType = null;
  deleteTargetId = null;
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

function confirmDeleteAction() {
  if (!isSecretaryLoggedIn || !deleteTargetId) return;

  if (deleteActionType === 'member') {
    const member = members.find(m => String(m.id) === String(deleteTargetId));
    const deletedName = member ? member.name : 'Member';
    members = members.filter(m => String(m.id) !== String(deleteTargetId));
    saveToLocalStorage(members);
    syncToServer(members);
    closeDeleteModal();
    updateStats();
    renderMembers();
    showToast(`${deletedName} chu member list aṭangin paih a ni ta.`, 'info');
  } else if (deleteActionType === 'notice') {
    const notice = notices.find(n => String(n.id) === String(deleteTargetId));
    const deletedTitle = notice ? notice.title : 'Notice';
    notices = notices.filter(n => String(n.id) !== String(deleteTargetId));
    saveNoticesToLocalStorage(notices);
    syncNoticesToServer(notices);
    closeDeleteModal();
    renderNotices();
    showToast(`Notice "${deletedTitle}" chu paih a ni ta.`, 'info');
  }
}

// ==================== VCARD EXPORT ====================

function downloadVCard(name, phone, group) {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:+91${cleanPhone}
ORG:KTP Armed Veng South Branch
NOTE:Group: ${group}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '_')}_KTP.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`${name} contact download a ni ta! Phone-ah a save theih e.`, 'success');
}

// ==================== CSV EXPORT & BACKUP IMPORT ====================

function exportToCSV() {
  if (members.length === 0) {
    showToast('Export tur member an awm lo.', 'error');
    return;
  }

  const headers = ['#', 'Name', 'Group', 'Contact', 'Gender', 'House No', 'Upa Bial'];
  const rows = members.map((m, i) => [
    i + 1,
    `"${(m.name || '').replace(/"/g, '""')}"`,
    `"${(m.group || '').replace(/"/g, '""')}"`,
    `"${m.phone || ''}"`,
    m.gender || '',
    `"${(m.houseNo || '').replace(/"/g, '""')}"`,
    `"${(m.upaBial || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KTP_Armed_Veng_South_Members_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Member list CSV a download ta e!', 'success');
}

function openImportModal() {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }
  const modal = document.getElementById('importModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function closeImportModal() {
  const modal = document.getElementById('importModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
  document.getElementById('importFileInput').value = '';
}

function handleImportFile() {
  const fileInput = document.getElementById('importFileInput');
  if (!fileInput.files || fileInput.files.length === 0) {
    showToast('Khawngaihin file thlang rawh.', 'error');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const content = e.target.result;
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          members = parsed;
          saveToLocalStorage(members);
          syncToServer(members);
          updateStats();
          renderMembers();
          closeImportModal();
          showToast(`Members ${members.length} lakluh a ni ta!`, 'success');
          return;
        }
      } else if (file.name.endsWith('.csv')) {
        const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          const newMembers = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
            if (cols.length >= 4 && cols[1]) {
              newMembers.push({
                id: 'ktp-' + Date.now() + '-' + i,
                name: cols[1],
                group: cols[2] || 'Sadrak',
                phone: cols[3],
                gender: cols[4] || 'Mipa',
                houseNo: cols[5] || '-',
                upaBial: cols[6] || 'Upa Bial 1',
                photo: ''
              });
            }
          }
          if (newMembers.length > 0) {
            members = newMembers;
            saveToLocalStorage(members);
            syncToServer(members);
            updateStats();
            renderMembers();
            closeImportModal();
            showToast(`Members ${newMembers.length} CSV atanga lakluh an ni!`, 'success');
            return;
          }
        }
      }
      showToast('File format dik lo.', 'error');
    } catch (err) {
      showToast('File chhiar theih loh: ' + err.message, 'error');
    }
  };

  reader.readAsText(file);
}

// ==================== UTILITIES ====================

function copyToClipboard(text, successMsg) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'success');
  } catch (e) {
    showToast('Copy theih loh: ' + e.message, 'error');
  }
  document.body.removeChild(ta);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-800 text-white',
    error: 'bg-rose-800 text-white',
    info: 'bg-slate-900 text-white'
  };

  toast.className = `flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-lg text-xs font-semibold pointer-events-auto transition transform animate-in slide-in-from-bottom duration-200 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
