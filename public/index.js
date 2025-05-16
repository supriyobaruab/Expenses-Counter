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
getinfo();
