const table = document.getElementById("transaction_table");
const divs = document.getElementById("div");
import { url } from "./index.js";
async function createTable() {
  const response = await fetch(`${url}/api`);
  const data = await response.json();
  console.log(data);
  data.forEach((info) => {
    if (info.type === "income") {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${info.date}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${info.type}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${info.accntType}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium"
                  >
                    +${info.amount}৳
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    ${info.description}
                  </td>`;
      table.appendChild(tr);
      const div = document.createElement("div");
      div.className = "border border-gray-200 rounded-lg p-4";
      div.innerHTML = `
                  <div class="grid grid-cols-2 gap-2">
                    <div class="text-sm font-medium text-gray-500">Date</div>
                    <div class="text-sm">${info.date}</div>
    
                    <div class="text-sm font-medium text-gray-500">Type</div>
                    <div class="text-sm">${info.type}</div>
    
                    <div class="text-sm font-medium text-gray-500">Account</div>
                    <div class="text-sm">${info.accntType}</div>
    
                    <div class="text-sm font-medium text-gray-500">Amount</div>
                    <div class="text-sm text-green-600 font-medium">+${info.amount}৳</div>
    
                    <div class="text-sm font-medium text-gray-500">Description</div>
                    <div class="text-sm">${info.description}</div>
                  </div>
                </div>`;
      divs.appendChild(div);
    } else {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${info.date}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${info.type}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${info.accntType}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium"
                  >
                    -${info.amount}৳
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    ${info.description}
                  </td>`;
      table.appendChild(tr);
      const div = document.createElement("div");
      div.className = "border border-gray-200 rounded-lg p-4";
      div.innerHTML = `
                  <div class="grid grid-cols-2 gap-2">
                    <div class="text-sm font-medium text-gray-500">Date</div>
                    <div class="text-sm">${info.date}</div>
    
                    <div class="text-sm font-medium text-gray-500">Type</div>
                    <div class="text-sm">${info.type}</div>
    
                    <div class="text-sm font-medium text-gray-500">Account</div>
                    <div class="text-sm">${info.accntType}</div>
    
                    <div class="text-sm font-medium text-gray-500">Amount</div>
                    <div class="text-sm text-red-600 font-medium">-${info.amount}৳</div>
    
                    <div class="text-sm font-medium text-gray-500">Description</div>
                    <div class="text-sm">${info.description}</div>
                  </div>
                </div>`;
      divs.appendChild(div);
    }
  });
}

createTable();
