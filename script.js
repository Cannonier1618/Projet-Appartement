const INITIAL_DATA = {
  "rate": 0.9192,
  "savinRate": 14.5,
  "vatRate": 8.1,
  "savings": [
    {
      "month": "mai 2026",
      "date": "2026-05-25",
      "planned": 2250,
      "note": ""
    },
    {
      "month": "juin 2026",
      "date": "2026-06-25",
      "planned": 2000,
      "note": ""
    },
    {
      "month": "juillet 2026",
      "date": "2026-07-25",
      "planned": 2300,
      "note": ""
    },
    {
      "month": "août 2026",
      "date": "2026-08-25",
      "planned": 2000,
      "note": "Avec un loyer à 650"
    },
    {
      "month": "septembre 2026",
      "date": "2026-09-25",
      "planned": 2000,
      "note": "Avec un loyer à 650"
    },
    {
      "month": "octobre 2026",
      "date": "2026-10-25",
      "planned": 900,
      "note": ""
    }
  ],
  "expenses": [
    {
      "date": "2026-05-28",
      "label": "accompte Claustra",
      "amount": "",
      "currency": "CHF",
      "month": "mai 2026",
      "status": "todo"
    },
    {
      "date": "2026-05-31",
      "label": "DualSense Edge",
      "amount": 147.99,
      "currency": "CHF",
      "month": "mai 2026",
      "status": ""
    },
    {
      "date": "2026-06-01",
      "label": "Cadeau Sofiane",
      "amount": 46,
      "currency": "CHF",
      "month": "juin 2026",
      "status": ""
    },
    {
      "date": "2026-06-02",
      "label": "Voiture",
      "amount": 680,
      "currency": "CHF",
      "month": "juin 2026",
      "status": ""
    },
    {
      "date": "2026-07-03",
      "label": "RC/Menage La Mobilière",
      "amount": 135,
      "currency": "CHF",
      "month": "juillet 2026",
      "status": ""
    },
    {
      "date": "2026-07-03",
      "label": "Caution AXA",
      "amount": 174,
      "currency": "CHF",
      "month": "juillet 2026",
      "status": ""
    },
    {
      "date": "2026-07-15",
      "label": "PS5 Pro",
      "amount": 729,
      "currency": "CHF",
      "month": "juillet 2026",
      "status": ""
    },
    {
      "date": "2026-08-24",
      "label": "Loyer",
      "amount": 1690,
      "currency": "CHF",
      "month": "août 2026",
      "status": ""
    },
    {
      "date": "2026-09-24",
      "label": "Meuble TV+Table basse",
      "amount": 783.25,
      "currency": "EUR",
      "month": "septembre 2026",
      "status": ""
    },
    {
      "date": "2026-09-24",
      "label": "Tv Sony",
      "amount": 2000,
      "currency": "CHF",
      "month": "septembre 2026",
      "status": ""
    },
    {
      "date": "2026-10-02",
      "label": "HUE",
      "amount": 919,
      "currency": "CHF",
      "month": "octobre 2026",
      "status": ""
    },
    {
      "date": "2026-10-07",
      "label": "Table de bar",
      "amount": 1200,
      "currency": "CHF",
      "month": "octobre 2026",
      "status": ""
    },
    {
      "date": "2026-10-09",
      "label": "Drool",
      "amount": 516,
      "currency": "EUR",
      "month": "octobre 2026",
      "status": ""
    },
    {
      "date": "2026-10-12",
      "label": "Bibliotheque BILLY",
      "amount": 140,
      "currency": "CHF",
      "month": "octobre 2026",
      "status": ""
    },
    {
      "date": "2026-10-15",
      "label": "claustra total",
      "amount": "",
      "currency": "CHF",
      "month": "octobre 2026",
      "status": "todo"
    }
  ]
};

// V4 Supabase Sync — Projet Appartement
// Même projet Supabase que Mes Comptes. Clé publique uniquement.
const SUPABASE_URL = "https://fbefapylkbzvbncowjmf.supabase.co/rest/v1";
const SUPABASE_KEY = "sb_publishable_a8tU5B_VVCpOOdX6ekyTdA_WcK72wxi";

const STORAGE_KEY = "meubler-appartement-intelligent-v4-sync";

let state = loadState();
let editingExpenseIndex = null;
let editingSavingIndex = null;
let cloudReady = false;
let isHydrating = false;
let saveTimer = null;

const els = {
  rate: document.querySelector("#rate"),
  savinRate: document.querySelector("#savinRate"),
  vatRate: document.querySelector("#vatRate"),
  ratePreview: document.querySelector("#ratePreview"),
  rateCard: document.querySelector("#rateCard"),
  savingTotal: document.querySelector("#savingTotal"),
  spentTotal: document.querySelector("#spentTotal"),
  remainingTotal: document.querySelector("#remainingTotal"),
  spentPercent: document.querySelector("#spentPercent"),
  progressFill: document.querySelector("#progressFill"),
  timeline: document.querySelector("#timeline"),
  rows: document.querySelector("#rows"),
  itemCount: document.querySelector("#itemCount"),
  search: document.querySelector("#search"),
  monthFilter: document.querySelector("#monthFilter"),
  currencyFilter: document.querySelector("#currencyFilter"),
  sortBy: document.querySelector("#sortBy"),
  addExpense: document.querySelector("#addExpense"),
  addSaving: document.querySelector("#addSaving"),
  exportCsv: document.querySelector("#exportCsv"),
  themeToggle: document.querySelector("#themeToggle"),
  expenseDialog: document.querySelector("#expenseDialog"),
  expenseDialogTitle: document.querySelector("#expenseDialogTitle"),
  modalDate: document.querySelector("#modalDate"),
  modalLabel: document.querySelector("#modalLabel"),
  modalAmount: document.querySelector("#modalAmount"),
  modalCurrency: document.querySelector("#modalCurrency"),
  modalMonth: document.querySelector("#modalMonth"),
  modalStatus: document.querySelector("#modalStatus"),
  euroDetails: document.querySelector("#euroDetails"),
  detailConverted: document.querySelector("#detailConverted"),
  detailSavin: document.querySelector("#detailSavin"),
  detailVat: document.querySelector("#detailVat"),
  detailNet: document.querySelector("#detailNet"),
  saveExpense: document.querySelector("#saveExpense"),
  savingDialog: document.querySelector("#savingDialog"),
  savingDialogTitle: document.querySelector("#savingDialogTitle"),
  savingMonth: document.querySelector("#savingMonth"),
  savingDate: document.querySelector("#savingDate"),
  savingAmount: document.querySelector("#savingAmount"),
  savingNote: document.querySelector("#savingNote"),
  saveSaving: document.querySelector("#saveSaving")
};

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    ...extra
  };
}

async function supa(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: supabaseHeaders(options.headers || {})
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Supabase ${response.status} ${path} ${text}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function loadState(){
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return migrateState(JSON.parse(saved));
  } catch(e) {}
  return migrateState(structuredClone(INITIAL_DATA));
}

function migrateState(data){
  data.rate = Number(data.rate || 0);
  data.savinRate = Number(data.savinRate ?? 14.5);
  data.vatRate = Number(data.vatRate ?? 8.1);
  data.savings = (data.savings || []).map((s, i) => ({
    id: s.id ?? null,
    month: s.month || "",
    date: s.date || "",
    planned: s.planned === "" || s.planned == null ? "" : Number(s.planned),
    note: s.note || "",
    position: Number(s.position ?? i)
  }));
  data.expenses = (data.expenses || []).map((e, i) => ({
    id: e.id ?? null,
    date: e.date || "",
    label: e.label || "",
    amount: e.amount === "" || e.amount == null ? "" : Number(e.amount),
    currency: e.currency === "EUR" || e.currency === "€" ? "EUR" : "CHF",
    month: normalizeMonth(e.month || ""),
    status: e.status === "todo" ? "todo" : "",
    position: Number(e.position ?? i)
  }));
  return data;
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (cloudReady && !isHydrating) scheduleCloudSave();
}

function scheduleCloudSave(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveCloud().catch(console.error), 500);
}

async function loadCloud(){
  try {
    const [settings, savings, expenses] = await Promise.all([
      supa("/apartment_settings?select=*&id=eq.1"),
      supa("/apartment_savings?select=*&order=position.asc,id.asc"),
      supa("/apartment_expenses?select=*&order=position.asc,id.asc")
    ]);

    if (!settings.length && !savings.length && !expenses.length) {
      cloudReady = true;
      await saveCloud();
      return;
    }

    isHydrating = true;
    state = migrateState({
      rate: settings[0]?.rate ?? INITIAL_DATA.rate,
      savinRate: settings[0]?.savin_rate ?? INITIAL_DATA.savinRate,
      vatRate: settings[0]?.vat_rate ?? INITIAL_DATA.vatRate,
      savings: savings.map(row => ({
        id: row.id,
        month: row.month,
        date: row.date,
        planned: row.planned,
        note: row.note,
        position: row.position
      })),
      expenses: expenses.map(row => ({
        id: row.id,
        date: row.date,
        label: row.label,
        amount: row.amount,
        currency: row.currency,
        month: row.month,
        status: row.status,
        position: row.position
      }))
    });
    render();
    isHydrating = false;
    cloudReady = true;
  } catch (error) {
    console.error(error);
    cloudReady = false;
  }
}

async function saveCloud(){
  const current = migrateState(state);

  await supa("/apartment_settings?on_conflict=id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{
      id: 1,
      rate: current.rate,
      savin_rate: current.savinRate,
      vat_rate: current.vatRate
    }])
  });

  await supa("/apartment_savings?id=not.is.null", {
    method: "DELETE",
    headers: { Prefer: "return=minimal" }
  });
  if (current.savings.length) {
    await supa("/apartment_savings", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(current.savings.map((s, i) => ({
        month: s.month,
        date: s.date || null,
        planned: s.planned === "" ? null : s.planned,
        note: s.note || null,
        position: i
      })))
    });
  }

  await supa("/apartment_expenses?id=not.is.null", {
    method: "DELETE",
    headers: { Prefer: "return=minimal" }
  });
  if (current.expenses.length) {
    await supa("/apartment_expenses", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(current.expenses.map((e, i) => ({
        date: e.date || null,
        label: e.label,
        amount: e.amount === "" ? null : e.amount,
        currency: e.currency,
        month: e.month,
        status: e.status || null,
        position: i
      })))
    });
  }
}

function normalizeMonth(value){
  return String(value || "").trim().toLowerCase();
}

function money(value){
  const n = Number(value || 0);
  return new Intl.NumberFormat("fr-CH", {minimumFractionDigits:2, maximumFractionDigits:2}).format(n) + " CHF";
}
function moneyRound(value){
  const n = Math.round(Number(value || 0));
  return new Intl.NumberFormat("fr-CH", {maximumFractionDigits:0}).format(n) + " CHF";
}
function smartCHF(value){
  const n = Number(value || 0);
  const isInt = Math.abs(n - Math.round(n)) < 0.000001;
  return new Intl.NumberFormat("fr-CH", {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: isInt ? 0 : 2
  }).format(n) + " CHF";
}
function moneyCHF(value){
  if (value === "" || value == null) return "";
  return new Intl.NumberFormat("fr-CH", {minimumFractionDigits:2, maximumFractionDigits:2}).format(Number(value || 0)) + " CHF";
}
function moneyEUR(value){
  if (value === "" || value == null) return "";
  return new Intl.NumberFormat("fr-CH", {minimumFractionDigits:2, maximumFractionDigits:2}).format(Number(value || 0)) + " EUR";
}
function escapeHtml(value){
  return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}
function formatDate(value){
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("fr-CH", {day:"2-digit", month:"2-digit", year:"numeric"});
}
function dateValue(value){
  const d = new Date((value || "") + "T00:00:00");
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}
function euroDetails(amount){
  const converted = Number(amount || 0) * Number(state.rate || 0);
  const savin = converted * Number(state.savinRate || 0) / 100;
  const vat = converted * Number(state.vatRate || 0) / 100;
  const net = converted - savin + vat;
  return {converted, savin, vat, net};
}
function costCHF(expense){
  const amount = Number(expense.amount || 0);
  if (!amount) return 0;
  if (expense.currency === "EUR") return euroDetails(amount).net;
  return amount;
}
function roundedCostCHF(expense){
  const cost = costCHF(expense);
  return cost ? Math.round(cost) : 0;
}

// Montant utilisé par le Plan épargne du Google Sheet.
// Le plan additionne les montants saisis bruts : CHF en CHF, EUR en valeur EUR brute.
function planAmount(expense){
  return Number(expense.amount || 0);
}
function totals(){
  const savingTotal = state.savings.reduce((sum, s) => sum + Number(s.planned || 0), 0);
  const spentTotal = state.expenses.reduce((sum, e) => sum + planAmount(e), 0);
  return {savingTotal, spentTotal, remaining: savingTotal - spentTotal};
}
function savingsUntilDate(date){
  const target = dateValue(date);
  return state.savings
    .filter(s => !s.date || dateValue(s.date) <= target)
    .reduce((sum, s) => sum + Number(s.planned || 0), 0);
}

function refreshSelects(){
  const months = state.savings.map(s => normalizeMonth(s.month)).filter(Boolean);
  const currentFilter = els.monthFilter.value || "all";
  els.monthFilter.innerHTML = '<option value="all">Tous les mois</option>' + months.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join("");
  els.monthFilter.value = months.includes(currentFilter) ? currentFilter : "all";
  const currentModal = els.modalMonth.value;
  els.modalMonth.innerHTML = months.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join("");
  if (months.includes(currentModal)) els.modalMonth.value = currentModal;
}

function getVisibleExpenses(){
  const q = els.search.value.trim().toLowerCase();
  const month = els.monthFilter.value;
  const currency = els.currencyFilter.value;
  let items = state.expenses.map((expense, index) => ({...expense, index}));
  if (q) {
    items = items.filter(e => [e.date, e.label, e.amount, e.currency, e.month, roundedCostCHF(e)]
      .join(" ").toLowerCase().includes(q));
  }
  if (month !== "all") items = items.filter(e => normalizeMonth(e.month) === month);
  if (currency !== "all") items = items.filter(e => e.currency === currency);
  if (els.sortBy.value === "date") items.sort((a,b) => dateValue(a.date) - dateValue(b.date));
  if (els.sortBy.value === "amountDesc") items.sort((a,b) => roundedCostCHF(b) - roundedCostCHF(a));
  if (els.sortBy.value === "amountAsc") items.sort((a,b) => roundedCostCHF(a) - roundedCostCHF(b));
  return items;
}

function render(){
  state = migrateState(state);
  refreshSelects();
  els.rate.value = state.rate;
  els.savinRate.value = state.savinRate;
  els.vatRate.value = state.vatRate;
  els.ratePreview.textContent = Number(state.rate || 0).toFixed(4);
  els.rateCard.textContent = Number(state.rate || 0).toFixed(4);

  const t = totals();
  const percent = t.savingTotal ? Math.min(100, Math.max(0, t.spentTotal / t.savingTotal * 100)) : 0;
  els.savingTotal.textContent = smartCHF(t.savingTotal);
  els.spentTotal.textContent = smartCHF(t.spentTotal);
  els.remainingTotal.textContent = smartCHF(t.remaining);
  els.spentPercent.textContent = percent.toFixed(1) + "%";
  els.progressFill.style.width = percent + "%";
  const itemCount = state.expenses.filter(e => e.label || e.amount || e.date).length;
  els.itemCount.textContent = itemCount + (itemCount > 1 ? " achats" : " achat");

  renderTimeline();
  renderExpenses();
  saveState();
}

function renderTimeline(){
  let cumulativeSaving = 0;
  let cumulativeExpenses = 0;
  const totalSaving = state.savings.reduce((s, m) => s + Number(m.planned || 0), 0);
  els.timeline.innerHTML = "";

  state.savings.forEach((s, index) => {
    cumulativeSaving += Number(s.planned || 0);

    const monthKey = normalizeMonth(s.month);

    // Identique au Google Sheet :
    // dépenses du mois = somme brute des montants de ce mois.
    // dépenses cumulées = somme des dépenses brutes depuis le début.
    const monthExpenses = state.expenses
      .filter(e => normalizeMonth(e.month) === monthKey)
      .reduce((sum, e) => sum + planAmount(e), 0);

    cumulativeExpenses += monthExpenses;

    const remaining = cumulativeSaving - cumulativeExpenses;
    const width = totalSaving ? Math.min(100, cumulativeSaving / totalSaving * 100) : 0;

    const div = document.createElement("article");
    div.className = "monthCard";
    div.innerHTML = `
      <h4>${escapeHtml(s.month)}</h4>
      <div class="row"><span>Épargne</span><strong>${smartCHF(s.planned)}</strong></div>
      <div class="row"><span>Dépenses du mois</span><strong>${smartCHF(monthExpenses)}</strong></div>
      <div class="row"><span>Solde cumulé</span><strong class="${remaining < 0 ? "negative" : "positive"}">${money(remaining)}</strong></div>
      <div class="bar"><div style="width:${width}%"></div></div>
      ${s.note ? `<div class="note">${escapeHtml(s.note)}</div>` : ""}
      <div class="monthActions">
        <button class="iconBtn" data-type="saving" data-action="edit" data-index="${index}" title="Modifier">✎</button>
        <button class="iconBtn" data-type="saving" data-action="delete" data-index="${index}" title="Supprimer">×</button>
      </div>`;
    els.timeline.appendChild(div);
  });
}

function renderExpenses(){
  const visible = getVisibleExpenses();
  let runningSpent = 0;
  const allSorted = state.expenses.map((e, index) => ({...e, index})).sort((a,b) => dateValue(a.date) - dateValue(b.date));
  const runningByIndex = new Map();
  allSorted.forEach(e => {
    runningSpent += planAmount(e);
    runningByIndex.set(e.index, savingsUntilDate(e.date) - runningSpent);
  });

  els.rows.innerHTML = "";
  visible.forEach(e => {
    const cost = roundedCostCHF(e);
    const active = e.status === "todo";
    const convertedDisplay = e.currency === "EUR" && cost ? smartCHF(cost) : "";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="statusCell">
        <button class="cornerMarker ${active ? "active" : ""}" data-type="expense" data-action="status" data-index="${e.index}" title="À définir" aria-label="À définir">
          ${active ? '<span class="simpleTip">À définir</span>' : ""}
        </button>
      </td>
      <td class="mobileDate"><span class="readCell">${escapeHtml(formatDate(e.date))}</span></td>
      <td class="mobileLabel"><span class="readCell">${escapeHtml(e.label)}</span></td>
      <td data-label="Mois"><span class="readCell">${escapeHtml(e.month)}</span></td>
      <td data-label="CHF" class="${e.currency === "CHF" && e.amount !== "" ? "" : "emptyMobile"}"><span class="readCell">${e.currency === "CHF" && e.amount !== "" ? moneyCHF(e.amount) : ""}</span></td>
      <td data-label="EUR" class="${e.currency === "EUR" && e.amount !== "" ? "" : "emptyMobile"}"><span class="readCell">${e.currency === "EUR" && e.amount !== "" ? moneyEUR(e.amount) : ""}</span></td>
      <td data-label="Coût net" class="${e.currency === "EUR" && cost ? "" : "emptyMobile"}"><span class="readCell">${convertedDisplay}</span></td>
      <td data-label="Solde" class="${(runningByIndex.get(e.index) || 0) < 0 ? "negative" : "positive"}"><span class="readCell">${money(runningByIndex.get(e.index) || 0)}</span></td>
      <td><div class="rowActions">
        <button class="iconBtn" data-type="expense" data-action="edit" data-index="${e.index}" title="Modifier">✎</button>
        <button class="iconBtn" data-type="expense" data-action="delete" data-index="${e.index}" title="Supprimer">×</button>
      </div></td>`;
    els.rows.appendChild(tr);
  });
  if (!visible.length) {
    els.rows.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:32px">Aucun achat trouvé.</td></tr>`;
  }
}

function openExpenseModal(index = null){
  editingExpenseIndex = index;
  const e = index === null ? {date:"", label:"", amount:"", currency:"CHF", month: state.savings[0]?.month || "", status:""} : state.expenses[index];
  els.expenseDialogTitle.textContent = index === null ? "Ajouter un achat" : "Modifier l’achat";
  els.modalDate.value = e.date || "";
  els.modalLabel.value = e.label || "";
  els.modalAmount.value = e.amount || "";
  els.modalCurrency.value = e.currency || "CHF";
  refreshSelects();
  els.modalMonth.value = normalizeMonth(e.month || state.savings[0]?.month || "");
  els.modalStatus.checked = e.status === "todo";
  updateEuroDetails();
  els.expenseDialog.showModal();
}

function saveExpenseModal(){
  const item = {
    date: els.modalDate.value,
    label: els.modalLabel.value.trim(),
    amount: els.modalAmount.value === "" ? "" : Number(els.modalAmount.value),
    currency: els.modalCurrency.value,
    month: normalizeMonth(els.modalMonth.value),
    status: els.modalStatus.checked ? "todo" : ""
  };
  if (editingExpenseIndex === null) state.expenses.push(item);
  else state.expenses[editingExpenseIndex] = item;
  render();
}

function updateEuroDetails(){
  const amount = Number(els.modalAmount.value || 0);
  const isEuro = els.modalCurrency.value === "EUR" && amount;
  els.euroDetails.classList.toggle("active", !!isEuro);
  const d = euroDetails(amount);
  els.detailConverted.textContent = money(d.converted);
  els.detailSavin.textContent = money(d.savin);
  els.detailVat.textContent = money(d.vat);
  els.detailNet.textContent = money(d.net);
}

function openSavingModal(index = null){
  editingSavingIndex = index;
  const s = index === null ? {month:"", date:"", planned:"", note:""} : state.savings[index];
  els.savingDialogTitle.textContent = index === null ? "Ajouter un mois" : "Modifier le mois";
  els.savingMonth.value = s.month || "";
  els.savingDate.value = s.date || "";
  els.savingAmount.value = s.planned || "";
  els.savingNote.value = s.note || "";
  els.savingDialog.showModal();
}

function saveSavingModal(){
  const item = {
    month: normalizeMonth(els.savingMonth.value),
    date: els.savingDate.value,
    planned: els.savingAmount.value === "" ? "" : Number(els.savingAmount.value),
    note: els.savingNote.value.trim()
  };
  if (editingSavingIndex === null) state.savings.push(item);
  else state.savings[editingSavingIndex] = item;
  render();
}

[els.rate, els.savinRate, els.vatRate].forEach(el => {
  el.addEventListener("input", () => {
    state.rate = Number(els.rate.value || 0);
    state.savinRate = Number(els.savinRate.value || 0);
    state.vatRate = Number(els.vatRate.value || 0);
    render();
  });
});
[els.search, els.monthFilter, els.currencyFilter, els.sortBy].forEach(el => el.addEventListener("input", render));
[els.modalAmount, els.modalCurrency].forEach(el => el.addEventListener("input", updateEuroDetails));
els.addExpense.addEventListener("click", () => openExpenseModal());
els.saveExpense.addEventListener("click", saveExpenseModal);
els.addSaving.addEventListener("click", () => openSavingModal());
els.saveSaving.addEventListener("click", saveSavingModal);

document.addEventListener("click", event => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  const index = Number(btn.dataset.index);
  if (btn.dataset.type === "expense") {
    if (btn.dataset.action === "status") {
      state.expenses[index].status = state.expenses[index].status === "todo" ? "" : "todo";
      render();
    }
    if (btn.dataset.action === "edit") openExpenseModal(index);
    if (btn.dataset.action === "delete" && confirm("Supprimer cet achat ?")) {
      state.expenses.splice(index, 1);
      render();
    }
  }
  if (btn.dataset.type === "saving") {
    if (btn.dataset.action === "edit") openSavingModal(index);
    if (btn.dataset.action === "delete" && confirm("Supprimer ce mois ?")) {
      state.savings.splice(index, 1);
      render();
    }
  }
});

els.exportCsv.addEventListener("click", () => {
  const header = ["Date","Description","Mois","CHF","EUR","Coût net CHF","Solde après achat","À définir"];
  let runningSpent = 0;
  const allSorted = state.expenses.map((e, index) => ({...e, index})).sort((a,b) => dateValue(a.date) - dateValue(b.date));
  const lines = [header];
  allSorted.forEach(e => {
    runningSpent += planAmount(e);
    const solde = savingsUntilDate(e.date) - runningSpent;
    lines.push([formatDate(e.date), e.label, e.month, e.currency === "CHF" ? e.amount : "", e.currency === "EUR" ? e.amount : "", e.currency === "EUR" ? roundedCostCHF(e) : "", solde.toFixed(2), e.status === "todo" ? "Oui" : ""]);
  });
  const csv = lines.map(row => row.map(cell => `"${String(cell ?? "").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "meubler-mon-appartement.csv"; a.click();
  URL.revokeObjectURL(url);
});

els.themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("meubler-appartement-theme", mode);
  els.themeToggle.textContent = mode === "dark" ? "☀️" : "🌙";
});

if (localStorage.getItem("meubler-appartement-theme") === "dark") {
  document.documentElement.classList.add("dark");
  els.themeToggle.textContent = "☀️";
}

render();
loadCloud();
window.addEventListener("focus", () => loadCloud());
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) loadCloud();
});
setInterval(() => {
  if (!document.hidden) loadCloud();
}, 15000);
