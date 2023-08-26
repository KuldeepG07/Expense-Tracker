const form2 = document.querySelector('.inc');
const incdate = document.querySelector('#doi');
const incname = document.querySelector('#source');
const incprice = document.querySelector('#amount');
const incomes = document.querySelector('.incomedata');

let count2 = 0;

function updateTotalIncome() {
    let total2 = 0;

    incomes.querySelectorAll('tr').forEach(row => {
        const amountCell = row.querySelector('td:nth-child(3)');
        const amount = parseFloat(amountCell.textContent);
        if (!isNaN(amount)) {
            total2 += amount;
        }
    });
    document.getElementById("totalincome").innerHTML = ` Total Income: &#8377 ${total2}`;
}


form2.addEventListener('submit', function (event2) {
    event2.preventDefault();

    const date2 = incdate.value;
    const name2 = incname.value;
    const price2 = parseFloat(incprice.value);

    if (!date2 || !name2 || isNaN(price2)) {
        alert('Please fill in all fields correctly.');
        return;
    }
    if (price2 < 0) {
        alert('Please add sensible Price.');
        return;
    }
    const cd2 = new Date();
    const gd2 = new Date(incdate.value);
    if (gd2 > cd2) {
        alert('Future Date is not possible.');
        return;
    }
    count2++;

    const newRow2 = document.createElement('tr');

    const countCell2 = document.createElement('td');
    const detailCell2 = document.createElement('td');
    const priceCell2 = document.createElement('td');
    const dateCell2 = document.createElement('td');
    const optionCell2 = document.createElement('td');

    countCell2.textContent = count2;
    detailCell2.textContent = name2;
    priceCell2.textContent = price2.toFixed(1);
    dateCell2.textContent = date2;
    optionCell2.innerHTML = `<button class="deletebtn" style="background:  rgb(0, 183, 255); color: black; border: 2px solid black; padding: 3px ; 
    border-radius: 5px;">Delete</button>`;

    newRow2.appendChild(countCell2);
    newRow2.appendChild(detailCell2);
    newRow2.appendChild(priceCell2);
    newRow2.appendChild(dateCell2);
    newRow2.appendChild(optionCell2);

    incomes.appendChild(newRow2);

    incdate.value = '';
    incname.value = '';
    incprice.value = '';
    updateTotalIncome();
});
incomes.addEventListener('click', function (event) {
    if (event.target.classList.contains('deletebtn')) {
        const row = event.target.closest('tr');
        row.remove();
    }
    updateTotalIncome();
});
updateTotalIncome();