const form = document.querySelector('.exp');
const expdate = document.querySelector('#doe');
const expname = document.querySelector('#name');
const expprice = document.querySelector('#price');
const expenses = document.querySelector('.expensedata');

let count = 0;

function updateTotalExpense() {
    let total = 0;

    expenses.querySelectorAll('tr').forEach(row => {
        const priceCell = row.querySelector('td:nth-child(3)');
        const price = parseFloat(priceCell.textContent);
        if (!isNaN(price)) {
            total += price;
        }
    });
    document.getElementById("totalexpense").innerHTML = ` Total Expense: &#8377 ${total}`;
}


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const date = expdate.value;
    const name = expname.value;
    const price = parseFloat(expprice.value);

    if (!date || !name || isNaN(price)) {
        alert('Please fill in all fields correctly.');
        return;
    }
    if (price < 0) {
        alert('Please add sensible Price.');
        return;
    }
    const cd = new Date();
    const gd = new Date(expdate.value);
    if (gd > cd) {
        alert('Future Date is not possible.');
        return;
    }
    count++;

    const newRow = document.createElement('tr');

    const countCell = document.createElement('td');
    const detailCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const optionCell = document.createElement('td');

    countCell.textContent = count;
    detailCell.textContent = name;
    priceCell.textContent = price.toFixed(1);
    dateCell.textContent = date;
    optionCell.innerHTML = `<button class="deletebtn" style="background:  rgb(0, 183, 255); color: black; border: 2px solid black; padding: 3px ; 
    border-radius: 5px;">Delete</button>`;

    newRow.appendChild(countCell);
    newRow.appendChild(detailCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(optionCell);

    expenses.appendChild(newRow);

    expdate.value = '';
    expname.value = '';
    expprice.value = '';
    updateTotalExpense();
});
expenses.addEventListener('click', function (event) {
    if (event.target.classList.contains('deletebtn')) {
        const row = event.target.closest('tr');
        row.remove();
    }
    updateTotalExpense();
});
updateTotalExpense();