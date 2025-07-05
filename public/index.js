export const url = "https://trackmoney.countbites.tech";
const bank = document.getElementById("bank");
const bkash = document.getElementById("bkash");
const cash = document.getElementById("cash");
const form = document.getElementById("transaction");
async function information_get() {
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();

    const balances = {
      bank: 0,
      bkash: 0,
      cash: 0,
    };

    data.forEach((item) => {
      const { accntType, type, amount } = item;
      if (!balances.hasOwnProperty(accntType)) {
        return;
      }

      const value = parseInt(amount) || 0;

      if (type === "income") {
        balances[accntType] += value;
      } else if (type === "expense") {
        balances[accntType] -= value;
        // if (balances[accntType] < 0) {
        //   alert("Your expenses exceed your balance");
        // }
      }
    });

    bank.innerHTML = `৳${balances.bank}`;
    bkash.innerHTML = `৳${balances.bkash}`;
    cash.innerHTML = `৳${balances.cash}`;
    total.innerHTML = `৳${balances.bank + balances.bkash + balances.cash}`;
  } catch (error) {
    console.log(error);
  }
}
information_get();
