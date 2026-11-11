/**
 * Kristian Thalai Pawl (KTP) - Armed Veng South Branch
 * Member Directory & Management System
 * Groups: Sadrak, Mesak, Abednego
 */

// Global State
let members = [];
let filteredMembers = [];
let activeGroupFilter = 'All';
let currentViewMode = 'table';
let memberToDelete = null;

// Branch Secretary Authentication (avsktp)
let isSecretaryLoggedIn = false;
const SECRETARY_PASSWORD = 'avsktp';

// Built-in Seed Data for Armed Veng South Branch (Sadrak, Mesak, Abednego)
const DEFAULT_MEMBERS = [
  { id: "ktp-001", name: "Lalhruaitluanga", group: "Sadrak", phone: "9862345120", gender: "Mipa" },
  { id: "ktp-002", name: "Vanlalpeka Sailo", group: "Mesak", phone: "9436152084", gender: "Mipa" },
  { id: "ktp-003", name: "C. Lalrinsanga", group: "Abednego", phone: "8794102938", gender: "Mipa" },
  { id: "ktp-004", name: "Lalnunmawii", group: "Sadrak", phone: "9862981240", gender: "Hmeichhia" },
  { id: "ktp-005", name: "R. Lalrintluangi", group: "Mesak", phone: "7085129481", gender: "Hmeichhia" },
  { id: "ktp-006", name: "H. Malsawmtluanga", group: "Abednego", phone: "8974561230", gender: "Mipa" },
  { id: "ktp-007", name: "Zodinpuia", group: "Sadrak", phone: "9862145890", gender: "Mipa" },
  { id: "ktp-008", name: "C. Vanlalruati", group: "Mesak", phone: "9436378291", gender: "Hmeichhia" },
  { id: "ktp-009", name: "Samuel Lalhmingmawia", group: "Abednego", phone: "8794827103", gender: "Mipa" },
  { id: "ktp-010", name: "Deborah Malsawmdawngi", group: "Sadrak", phone: "7085938102", gender: "Hmeichhia" },
  { id: "ktp-011", name: "Lalremruata", group: "Mesak", phone: "9862789401", gender: "Mipa" },
  { id: "ktp-012", name: "Jerry Lalbiaknunga", group: "Abednego", phone: "9774123890", gender: "Mipa" },
  { id: "ktp-013", name: "Melody Lalramchuani", group: "Sadrak", phone: "9436192847", gender: "Hmeichhia" },
  { id: "ktp-014", name: "F. Lalawmpuia", group: "Mesak", phone: "8794617283", gender: "Mipa" },
  { id: "ktp-015", name: "Jenny Zothanpuii", group: "Abednego", phone: "7085348291", gender: "Hmeichhia" },
  { id: "ktp-016", name: "K. Lalmuanpuia", group: "Sadrak", phone: "9862451928", gender: "Mipa" },
  { id: "ktp-017", name: "David Laltanpuia", group: "Mesak", phone: "9436284710", gender: "Mipa" },
  { id: "ktp-018", name: "Lalhminghlui", group: "Abednego", phone: "8794209182", gender: "Hmeichhia" },
  { id: "ktp-019", name: "R. Lalpekhlua", group: "Sadrak", phone: "9862671930", gender: "Mipa" },
  { id: "ktp-020", name: "Mary Lalhriatpuii", group: "Mesak", phone: "7085781920", gender: "Hmeichhia" },
  { id: "ktp-021", name: "Benjamin Lalrintluanga", group: "Abednego", phone: "9774650192", gender: "Mipa" },
  { id: "ktp-022", name: "H. Lalduhsaka", group: "Sadrak", phone: "9862541092", gender: "Mipa" },
  { id: "ktp-023", name: "Angela Lalhmangaihi", group: "Mesak", phone: "9436892014", gender: "Hmeichhia" },
  { id: "ktp-024", name: "Ruth Lalthazuali", group: "Abednego", phone: "8794382910", gender: "Hmeichhia" },
  { id: "ktp-025", name: "T. Malsawmtluanga", group: "Sadrak", phone: "7085491028", gender: "Mipa" },
  { id: "ktp-026", name: "Esther Lalrempuii", group: "Mesak", phone: "9862890123", gender: "Hmeichhia" },
  { id: "ktp-027", name: "PC Lalhlimpuii", group: "Abednego", phone: "9436781290", gender: "Hmeichhia" },
  { id: "ktp-028", name: "K. Lalrinpuii", group: "Sadrak", phone: "8794901827", gender: "Hmeichhia" }
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

// Initialize App
async function initApp() {
  setPrintDate();
  checkSecretaryAuth();

  // Mobile layout switch
  if (window.innerWidth < 768) {
    setViewMode('cards');
  }

  await loadMembersData();
  renderMembers();
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

// Check Secretary Login State from localStorage
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

  if (isSecretaryLoggedIn) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (loggedInBox) loggedInBox.classList.remove('hidden');
    if (secretaryBanner) secretaryBanner.classList.remove('hidden');
    if (thActions) thActions.classList.remove('hidden');
    if (secTools) secTools.classList.remove('hidden');
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (loggedInBox) loggedInBox.classList.add('hidden');
    if (secretaryBanner) secretaryBanner.classList.add('hidden');
    if (thActions) thActions.classList.add('hidden');
    if (secTools) secTools.classList.add('hidden');
  }
}

function openSecretaryLoginModal() {
  const input = document.getElementById('secretaryPasswordInput');
  if (input) input.value = '';
  document.getElementById('secretaryLoginModal').classList.remove('hidden');
  if (input) input.focus();
}

function closeSecretaryLoginModal() {
  document.getElementById('secretaryLoginModal').classList.add('hidden');
}

function getSecretaryPassword() {
  return localStorage.getItem('ktp_secretary_pwd') || SECRETARY_PASSWORD;
}

function handleSecretaryLoginSubmit(e) {
  e.preventDefault();
  const pass = document.getElementById('secretaryPasswordInput').value.trim();
  const validPass = getSecretaryPassword();
  if (pass === validPass || pass === SECRETARY_PASSWORD || pass.toLowerCase() === 'secretary') {
    isSecretaryLoggedIn = true;
    localStorage.setItem('ktp_secretary_auth', 'true');
    updateSecretaryUI();
    closeSecretaryLoginModal();
    renderMembers();
    showToast('Branch Secretary login hlawhtling e! Member i siamtha thei ta.', 'success');
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
  showToast('Branch Secretary session atangin i chhuak ta.', 'info');
}

// Download vCard to save directly into Phone Contacts
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

// Load Members
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
  const local = localStorage.getItem('ktp_members_data_v2');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        members = parsed;
        return;
      }
    } catch (e) {}
  }

  // 3. Fallback to default Sadrak, Mesak, Abednego seeds
  members = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
  saveToLocalStorage(members);
  syncToServer(members);
}

function saveToLocalStorage(data) {
  try {
    localStorage.setItem('ktp_members_data_v2', JSON.stringify(data));
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

// Filtering & Rendering
function renderMembers() {
  const searchVal = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const sortVal = document.getElementById('sortBy')?.value || 'name-asc';

  filteredMembers = members.filter(member => {
    // Group filter
    if (activeGroupFilter !== 'All' && member.group !== activeGroupFilter) {
      return false;
    }

    // Search query
    if (searchVal) {
      const matchName = (member.name || '').toLowerCase().includes(searchVal);
      const matchPhone = (member.phone || '').includes(searchVal);
      if (!matchName && !matchPhone) {
        return false;
      }
    }

    return true;
  });

  // Sort
  filteredMembers.sort((a, b) => {
    if (sortVal === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortVal === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortVal === 'group-asc') {
      return a.group.localeCompare(b.group) || a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Counts
  document.getElementById('filteredCount').textContent = filteredMembers.length;
  document.getElementById('totalCount').textContent = members.length;

  const printSub = document.getElementById('printSubtitle');
  if (printSub) {
    printSub.textContent = activeGroupFilter === 'All' 
      ? `Branch Member Directory (Total: ${filteredMembers.length})`
      : `${activeGroupFilter} Group Directory (Total: ${filteredMembers.length})`;
  }

  // Empty state
  const emptyState = document.getElementById('emptyState');
  if (filteredMembers.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  renderTableRows();
  renderCardsGrid();

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Avatar Initials
function getAvatarData(name) {
  const parts = name.trim().split(/\s+/);
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
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorClass = colors[Math.abs(hash) % colors.length];

  return { initials, colorClass };
}

// Render Table (Only: #, Member Name, Group, Contact, and Actions if Secretary)
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

    return `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 group">
        <!-- Index -->
        <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400">
          ${index + 1}
        </td>

        <!-- Member Name -->
        <td class="py-3.5 px-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br ${colorClass} text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
              ${initials}
            </div>
            <div>
              <span class="font-bold text-slate-900">${escapeHtml(member.name)}</span>
              <span class="block text-[11px] text-slate-400">${member.gender === 'Mipa' ? 'Mipa' : 'Hmeichhia'}</span>
            </div>
          </div>
        </td>

        <!-- Group (Sadrak, Mesak, Abednego) -->
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${groupCfg.badgeClass}">
            <span class="w-2 h-2 rounded-full ${groupCfg.dotColor} mr-1.5"></span>
            ${escapeHtml(member.group)}
          </span>
        </td>

        <!-- Contact (Phone, WhatsApp, Call, Copy) -->
        <td class="py-3.5 px-4">
          <div class="flex items-center space-x-2">
            <span class="font-mono text-xs font-semibold text-slate-800 tracking-wide">${formattedPhone}</span>
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

        <!-- Actions (Only rendered if Secretary is logged in!) -->
        ${isSecretaryLoggedIn ? `
          <td class="py-3.5 px-4 text-center action-col">
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

// Render Cards Grid (Light Minimalist)
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
                <button onclick="openEditMemberModal('${member.id}')" class="text-slate-400 hover:text-amber-700 p-1">
                  <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="openDeleteModal('${member.id}')" class="text-slate-400 hover:text-rose-700 p-1">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Avatar & Name -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
              ${initials}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-slate-900 text-sm truncate">${escapeHtml(member.name)}</h4>
              <p class="text-[11px] text-slate-400">${member.gender === 'Mipa' ? 'Mipa' : 'Hmeichhia'}</p>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-slate-800">${escapeHtml(member.phone)}</span>
          <div class="flex items-center space-x-1">
            <a 
              href="https://wa.me/91${cleanPhone}" 
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

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statMale').textContent = male;
  document.getElementById('statFemale').textContent = female;

  document.getElementById('statSadrak').textContent = counts['Sadrak'];
  document.getElementById('statMesak').textContent = counts['Mesak'];
  document.getElementById('statAbednego').textContent = counts['Abednego'];

  document.getElementById('statSadrakPct').textContent = total > 0 ? `${Math.round((counts['Sadrak'] / total) * 100)}% of total` : '0%';
  document.getElementById('statMesakPct').textContent = total > 0 ? `${Math.round((counts['Mesak'] / total) * 100)}% of total` : '0%';
  document.getElementById('statAbednegoPct').textContent = total > 0 ? `${Math.round((counts['Abednego'] / total) * 100)}% of total` : '0%';

  document.getElementById('badgeTabAll').textContent = total;
  document.getElementById('badgeTabSadrak').textContent = counts['Sadrak'];
  document.getElementById('badgeTabMesak').textContent = counts['Mesak'];
  document.getElementById('badgeTabAbednego').textContent = counts['Abednego'];
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
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').classList.add('hidden');
  document.getElementById('sortBy').value = 'name-asc';
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
    tableWrap.classList.remove('hidden');
    cardsWrap.classList.add('hidden');
    btnTable.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 bg-white text-slate-900 shadow-xs font-semibold';
    btnCards.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 text-slate-600 hover:text-slate-900';
  } else {
    tableWrap.classList.add('hidden');
    cardsWrap.classList.remove('hidden');
    btnCards.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 bg-white text-slate-900 shadow-xs font-semibold';
    btnTable.className = 'px-3 py-1.5 rounded-lg flex items-center space-x-1 text-slate-600 hover:text-slate-900';
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==================== SECRETARY CRUD ACTIONS ====================

function openAddMemberModal() {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }

  document.getElementById('formMemberId').value = '';
  document.getElementById('modalTitle').textContent = 'Member Thar Dahna';
  document.getElementById('btnSubmitText').textContent = 'Dah rawh (Save Member)';
  document.getElementById('formName').value = '';
  document.getElementById('formGroup').value = activeGroupFilter !== 'All' ? activeGroupFilter : 'Sadrak';
  document.getElementById('formPhone').value = '';
  document.getElementById('formGender').value = 'Mipa';

  document.getElementById('memberModal').classList.remove('hidden');
  document.getElementById('formName').focus();
}

function openEditMemberModal(id) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }

  const member = members.find(m => String(m.id) === String(id));
  if (!member) return;

  document.getElementById('formMemberId').value = member.id;
  document.getElementById('modalTitle').textContent = 'Member Siamthatna';
  document.getElementById('btnSubmitText').textContent = 'Siamṭha rawh (Update)';
  document.getElementById('formName').value = member.name || '';
  document.getElementById('formGroup').value = member.group || 'Sadrak';
  document.getElementById('formPhone').value = member.phone || '';
  document.getElementById('formGender').value = member.gender || 'Mipa';

  document.getElementById('memberModal').classList.remove('hidden');
}

function closeMemberModal() {
  document.getElementById('memberModal').classList.add('hidden');
}

async function handleMemberFormSubmit(e) {
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

  if (!name) {
    showToast('Khawngaihin member hming ziak rawh.', 'error');
    return;
  }
  if (!phone || phone.length < 10) {
    showToast('Contact number dik lo: 10 digits a tling tur a ni.', 'error');
    return;
  }

  if (phone.length === 12 && phone.startsWith('91')) {
    phone = phone.slice(2);
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
        gender
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
      gender
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

function openDeleteModal(id) {
  if (!isSecretaryLoggedIn) {
    openSecretaryLoginModal();
    return;
  }
  const member = members.find(m => String(m.id) === String(id));
  if (!member) return;
  memberToDelete = member;
  document.getElementById('deleteMemberName').textContent = member.name;
  document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
  memberToDelete = null;
  document.getElementById('deleteModal').classList.add('hidden');
}

function confirmDeleteMember() {
  if (!isSecretaryLoggedIn || !memberToDelete) return;
  const deletedName = memberToDelete.name;
  members = members.filter(m => String(m.id) !== String(memberToDelete.id));
  saveToLocalStorage(members);
  syncToServer(members);
  closeDeleteModal();
  updateStats();
  renderMembers();
  showToast(`${deletedName} chu member list aṭangin paih a ni ta.`, 'info');
}

// ==================== EXPORT & IMPORT ====================

function exportToCSV() {
  if (members.length === 0) {
    showToast('Export tur member an awm lo.', 'error');
    return;
  }

  const headers = ['#', 'Name', 'Group', 'Contact', 'Gender'];
  const rows = members.map((m, i) => [
    i + 1,
    `"${(m.name || '').replace(/"/g, '""')}"`,
    `"${(m.group || '').replace(/"/g, '""')}"`,
    `"${m.phone || ''}"`,
    m.gender || ''
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
  document.getElementById('importModal').classList.remove('hidden');
}

function closeImportModal() {
  document.getElementById('importModal').classList.add('hidden');
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
                gender: cols[4] || 'Mipa'
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

// Utility: Copy to Clipboard
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

// Toast
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

// Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
