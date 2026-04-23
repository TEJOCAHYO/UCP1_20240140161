const memberForm = document.getElementById('memberForm');
const memberList = document.getElementById('memberList');
const infoMessage = document.getElementById('infoMessage');
let members = [];

function loadMembers() {
  const saved = localStorage.getItem('techCommunityMembers');
  members = saved ? JSON.parse(saved) : [];
}

function saveMembers() {
  localStorage.setItem('techCommunityMembers', JSON.stringify(members));
}

function renderMembers() {
  if (!memberList) return;
  memberList.innerHTML = '';
  if (members.length === 0) {
    memberList.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Belum ada anggota terdaftar.</td></tr>';
    return;
  }
  members.forEach((member, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${member.studyProgram}</td>
      <td>${member.interest}</td>
    `;
    memberList.appendChild(row);
  });
}

function resetForm() {
  if (!memberForm) return;
  memberForm.reset();
}

function addMember(event) {
  event.preventDefault();
  if (!memberForm) return;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const studyProgram = document.getElementById('studyProgram').value;
  const interest = document.getElementById('interest').value;
  const comment = document.getElementById('comment').value.trim();

  if (!name || !email || !phone || !studyProgram || !interest) {
    showMessage('Lengkapi semua kolom yang diperlukan.', 'danger');
    return;
  }

  members.push({ name, email, phone, studyProgram, interest, comment, date: new Date().toLocaleDateString() });
  saveMembers();
  renderMembers();
  resetForm();
  showMessage('Data anggota berhasil ditambahkan.', 'success');
}

function showMessage(text, type) {
  if (!infoMessage) return;
  infoMessage.className = `alert alert-${type}`;
  infoMessage.textContent = text;
  setTimeout(() => {
    infoMessage.className = 'alert alert-info';
    infoMessage.textContent = 'Gunakan formulir di bawah untuk mendaftar sebagai anggota.';
  }, 3500);
}

window.addEventListener('DOMContentLoaded', () => {
  loadMembers();
  renderMembers();
});
