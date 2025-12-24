// Sélection des éléments
const form = document.getElementById('formulaire');
const nameInput = document.getElementById('name');
const firstnameInput = document.getElementById('firstname');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const tableBody = document.querySelector('#dataTable tbody');

// Regex améliorées → support complet Unicode
const textRegex = /^[\p{L}\s'-]{3,}$/u;
const phoneRegex = /^\+33\s?[0-9](?:\s?\d{2}){4}$/;

// Soumission du formulaire
form.addEventListener("submit", (event) => {
      event.preventDefault();
    clearFieldErrors();

    let hasError = false;

    const nameValue = nameInput.value.trim();
    const firstnameValue = firstnameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    const phoneValue = phoneInput.value.trim();

    // Nom
    if (!textRegex.test(nameValue)) {
      showFieldError(nameInput, "Nom invalide (3 lettres minimum)");
      hasError = true;
    } else highlightValidField(nameInput);

    // Prénom
    if (!textRegex.test(firstnameValue)) {
      showFieldError(firstnameInput, "Prénom invalide (3 lettres minimum)");
      hasError = true;
    } else highlightValidField(firstnameInput);

    // Âge
    if (isNaN(age) || age < 1 || age > 120) {
      showFieldError(ageInput, "Âge entre 1 et 120");
      hasError = true;
    } else highlightValidField(ageInput);

    // Téléphone + anti-doublon
    if (!phoneRegex.test(phoneValue)) {
      showFieldError(phoneInput, "Numéro FR valide requis");
      hasError = true;
    } else if (existsPhone(phoneValue)) {
      showFieldError(phoneInput, "Numéro déjà enregistré !");
      hasError = true;
    } else highlightValidField(phoneInput);

    // Ajout si OK ✅
    if (!hasError) {
      addRowToTable(nameValue, firstnameValue, age, phoneValue);
      showSuccessMessage();
      resetFormCompletely();
    }
});


/* ─────────── FONCTIONS UTILITAIRES ─────────── */

function existsPhone(phone) {
    const rows = document.querySelectorAll('#dataTable tbody tr');
    return [...rows].some(row => row.cells[3].textContent.trim() === phone);
}

function addRowToTable(nom, prenom, age, tel) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nom}</td>
      <td>${prenom}</td>
      <td>${age}</td>
      <td>${tel}</td>
      <td class="text-center">
        <button class="btn btn-danger btn-sm btn-delete">🗑️</button>
      </td>`;
    tableBody.appendChild(row);

    row.querySelector(".btn-delete").addEventListener("click", () => {
      row.remove();
    });
}

function showSuccessMessage() {
    const msg = document.createElement("div");
    msg.className = "alert alert-success mt-3";
    msg.textContent = "✅ Données ajoutées avec succès !";
    form.insertAdjacentElement("beforebegin", msg);
    setTimeout(() => msg.remove(), 3000);
}

function showFieldError(input, message) {
    const error = document.createElement("small");
    error.className = "text-danger d-block mt-1 field-error";
    error.textContent = message;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    input.insertAdjacentElement("afterend", error);
}

function clearFieldErrors() {
    document.querySelectorAll(".field-error").forEach(e => e.remove());
    document.querySelectorAll("input").forEach(input => {
      input.classList.remove("is-invalid", "is-valid");
      input.removeAttribute("aria-invalid");
    });
}

function highlightValidField(input) {
    input.classList.add("is-valid");
    input.setAttribute("aria-invalid", "false");
}

function resetFormCompletely() {
    form.reset();
    clearFieldErrors();
}
// ─── Trier le tableau par âge ───
document.getElementById('trierParAge').addEventListener('click', () => {
    const tbody = document.querySelector('#dataTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Tri par âge (colonne 2)
    rows.sort((a, b) => parseInt(a.cells[2].textContent) - parseInt(b.cells[2].textContent));

    // Réinjecter les lignes triées
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
});



/* ─────────── TIRAGE PAR TRANCHE / ORGANISATION ─────────── */

document.getElementById('tirageTranchesBtn').addEventListener('click', () => {
    const tbody = document.querySelector('#dataTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length === 0) return alert("Aucun participant !");

    const tranches = {
        ' Moins de 5 ans': [],
        ' 5 à 10 ans': [],
        ' 10 à 15 ans': [],
        ' Plus de 15 ans': []
    };

    rows.forEach(row => {
        const age = parseInt(row.cells[2].textContent);
        if (age < 5) tranches[' Moins de 5 ans'].push(row);
        else if (age <= 10) tranches[' 5 à 10 ans'].push(row);
        else if (age <= 15) tranches[' 10 à 15 ans'].push(row);
        else tranches[' Plus de 15 ans'].push(row);
    });

    // Supprimer anciennes classes
    rows.forEach(r => r.classList.remove('table-success'));

    document.querySelectorAll('.alert-info').forEach(e => e.remove());

  const gagnantsTableBody = document.querySelector('#gagnantsTable tbody');
  gagnantsTableBody.innerHTML = ''; // Réinitialise les anciens gagnants

  const gagnants = Object.entries(tranches).map(([label, groupe]) => {
    if (groupe.length === 0) return `${label} : Aucun participant`;
    const winner = groupe[Math.floor(Math.random() * groupe.length)];
    winner.classList.add('table-success');

    const gagnantRow = document.createElement('tr');
    gagnantRow.innerHTML = `
      <td>${label}</td>
      <td>${winner.cells[1].textContent}</td>
      <td>${winner.cells[0].textContent}</td>
      <td>${winner.cells[3].textContent}</td>`;
    gagnantsTableBody.appendChild(gagnantRow);

    return `${label} : 🏆 ${winner.cells[1].textContent} ${winner.cells[0].textContent}`;
  });

  const resultDiv = document.createElement('div');
  resultDiv.className = 'alert alert-info mt-4';
  resultDiv.innerHTML = `<strong>🎲 Résultats du tirage :</strong><br>${gagnants.join('<br>')}`;
  tbody.insertAdjacentElement('afterend', resultDiv);
});

/* ─────────── EXPORT PDF  ─────────── */

document.getElementById('exportTiragePDF').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const gagnantsRows = Array.from(document.querySelectorAll('#gagnantsTable tbody tr'));

  if (gagnantsRows.length > 0) {
    // Exporter les gagnants
    const gagnantsData = gagnantsRows.map(row => {
      return Array.from(row.cells).map(cell => cell.textContent.trim());
    });

    doc.text('Liste des gagnants par tranche d’âge', 14, 15);
    doc.autoTable({
      startY: 25,
      head: [['Tranche d’âge', 'Prénom', 'Nom','Téléphone']],
      body: gagnantsData,
      theme: 'grid'
    });

    doc.save('gagnants_par_tranche.pdf');
  } else {
    // Exporter tous les participants
    const participantRows = Array.from(document.querySelectorAll('#dataTable tbody tr'));
    if (participantRows.length === 0) return alert("Aucun participant à exporter !");

    const participantData = participantRows.map(row => {
      return [
        row.cells[0].textContent.trim(), // Nom
        row.cells[1].textContent.trim(), // Prénom
        row.cells[2].textContent.trim(), // Âge
        row.cells[3].textContent.trim()  // Téléphone
      ];
    });

    doc.text('Liste des participants', 14, 15);
    doc.autoTable({
      startY: 25,
      head: [['Nom', 'Prénom', 'Âge', 'Téléphone']],
      body: participantData,
      theme: 'grid'
    });

    doc.save('participants.pdf');
  }
});
