// Original: Balance Updater
const info = document.querySelectorAll(".info");
let names = {};
let bank = 0;
let total = 0;

info.forEach((info) => {
  const name = info.id;
  names[name] = info.innerHTML;
});
console.log(names);

async function getinfo() {
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();
  data.forEach((datas) => {
    if (datas.type == "income") {
      const accType = datas.accntType;
      names[accType] = parseInt(names[accType]) + parseInt(datas.amount);
      document.getElementById(accType).innerHTML = names[accType];
      total += parseInt(datas.amount);
      names["total"] = total;
      document.getElementById("total").innerHTML = names["total"];
    } else {
      const accType = datas.accntType;
      names[accType] = parseInt(names[accType]) - parseInt(datas.amount);
      document.getElementById(accType).innerHTML = names[accType];
      total -= parseInt(datas.amount);
      names["total"] = total;
      document.getElementById("total").innerHTML = names["total"];
    }
  });
  console.log(names);
}

function capitalizeFirst(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadTransactions() {
  try {
    const response = await fetch("http://localhost:3000/api/");
    const data = await response.json();

    const tbody = document.getElementById("statement-body");
    tbody.innerHTML = "";

    data.forEach((tx) => {
      const row = document.createElement("tr");

      const isIncome = tx.type.toLowerCase() === "income";
      const amount = isIncome
        ? `<td class="py-2 px-4 border-b text-green-600">+${tx.amount}</td>`
        : `<td class="py-2 px-4 border-b text-red-600">-${tx.amount}</td>`;

      row.innerHTML = `
        <td class="py-2 px-4 border-b">${tx.date}</td>
        <td class="py-2 px-4 border-b">${capitalizeFirst(tx.type)}</td>
        <td class="py-2 px-4 border-b">${capitalizeFirst(tx.accntType)}</td>
        ${amount}
        <td class="py-2 px-4 border-b">${capitalizeFirst(
          tx.description || ""
        )}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading transactions:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getinfo();
  loadTransactions();
});
