function toggleCalculator() {
  const type = document.getElementById("calculatorType").value;
  document.getElementById("valueCalc").style.display = type === "value" ? "block" : "none";
  document.getElementById("yieldCalc").style.display = type === "yield" ? "block" : "none";
}

function formatValue(input) {
  let raw = input.value.replace(/[^0-9.]/g, "");
  const parts = raw.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  input.value = parts[1] ? `${parts[0]}.${parts[1].slice(0,2)}` : parts[0];
}

function calculateValue() {
  const val = Number(document.getElementById("value").value.replace(/,/g, ""));
  const mtd = Number(document.getElementById("mtd").value) / 100;
  const ytd = Number(document.getElementById("ytd").value) / 100;
  const itd = Number(document.getElementById("itd").value) / 100;

  document.getElementById("newValue").innerText = (!isNaN(val) && !isNaN(mtd)) ? (val * (1 + mtd)).toFixed(2) : "-";
  document.getElementById("newYTD").innerText = (!isNaN(mtd) && !isNaN(ytd)) ? (((1 + ytd) * (1 + mtd) - 1) * 100).toFixed(2) : "-";
  document.getElementById("newITD").innerText = (!isNaN(mtd) && !isNaN(itd)) ? (((1 + itd) * (1 + mtd) - 1) * 100).toFixed(2) : "-";
}

function recalculateValue() {
  const newVal = document.getElementById("newValue").innerText;
  if (newVal !== "-") document.getElementById("value").value = Number(newVal).toLocaleString("en-US");

  const newYTD = document.getElementById("newYTD").innerText;
  if (newYTD !== "-") document.getElementById("ytd").value = newYTD;

  const newITD = document.getElementById("newITD").innerText;
  if (newITD !== "-") document.getElementById("itd").value = newITD;

  document.getElementById("newValue").innerText = "-";
  document.getElementById("newYTD").innerText = "-";
  document.getElementById("newITD").innerText = "-";

  calculateValue();
}

function calculateYield() {
  const open = Number(document.getElementById("openBal").value);
  const yearEnd = Number(document.getElementById("yearEndBal").value);
  const prev = Number(document.getElementById("prevBal").value);
  const curr = Number(document.getElementById("currBal").value);

  document.getElementById("yieldMTD").innerText = (!isNaN(prev) && !isNaN(curr) && prev !== 0) ? ((curr / prev - 1) * 100).toFixed(2) : "-";
  document.getElementById("yieldYTD").innerText = (!isNaN(yearEnd) && !isNaN(curr) && yearEnd !== 0) ? ((curr / yearEnd - 1) * 100).toFixed(2) : "-";
  document.getElementById("yieldITD").innerText = (!isNaN(open) && !isNaN(curr) && open !== 0) ? ((curr / open - 1) * 100).toFixed(2) : "-";
}

function copyToValue() {
  document.getElementById("calculatorType").value = "value";
  toggleCalculator();

  const mtdVal = document.getElementById("yieldMTD").innerText;
  const ytdVal = document.getElementById("yieldYTD").innerText;
  const itdVal = document.getElementById("yieldITD").innerText;

  if (mtdVal !== "-") document.getElementById("mtd").value = mtdVal;
  if (ytdVal !== "-") document.getElementById("ytd").value = ytdVal;
  if (itdVal !== "-") document.getElementById("itd").value = itdVal;

  const currVal = document.getElementById("currBal").value;
  if (currVal) document.getElementById("value").value = Number(currVal).toLocaleString("en-US");
}

function copyToYield() {
  document.getElementById("calculatorType").value = "yield";
  toggleCalculator();

  const mtdVal = document.getElementById("mtd").value;
  const newYTD = document.getElementById("newYTD").innerText;
  const newITD = document.getElementById("newITD").innerText;

  if (mtdVal) document.getElementById("yieldMTD").innerText = mtdVal;
  if (newYTD !== "-") document.getElementById("yieldYTD").innerText = newYTD;
  if (newITD !== "-") document.getElementById("yieldITD").innerText = newITD;

  const val = document.getElementById("value").value.replace(/,/g, "");
  if (val) document.getElementById("prevBal").value = val;
  const newVal = document.getElementById("newValue").innerText;
  if (newVal !== "-") document.getElementById("currBal").value = newVal;
}

// ===== COPY BUTTON =====
function copyValue(elementId, btn) {
  const text = document.getElementById(elementId).innerText;
  if (!text || text === "-") return;

  navigator.clipboard.writeText(text);

  const originalText = btn.innerText;
  btn.innerText = "Copied";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = originalText;
    btn.disabled = false;
  }, 1200);
}

function resetAll() {
  document.querySelectorAll("input").forEach(i => i.value = "");
  document.querySelectorAll(".results div").forEach(r => r.innerText = "-");
}
