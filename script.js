// -------------------------------------------
// CREATE DEFAULT ACCOUNT VALUES IF NOT EXIST
// -------------------------------------------
// ---------------------------
// SIMPLE LOGIN REDIRECT
// ---------------------------
function login() {
    // Optional: basic input check
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (email.trim() === "" || pass.trim() === "") {
        alert("Please enter your email and password.");
        return;
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}


if (!localStorage.getItem("chequing")) {
    localStorage.setItem("chequing", "4320.55");
}
if (!localStorage.getItem("savings")) {
    localStorage.setItem("savings", "8900.00");
}
if (!localStorage.getItem("transactions")) {
    localStorage.setItem("transactions", JSON.stringify([]));
}

// -------------------------------------------
// LOAD DASHBOARD BALANCES
// -------------------------------------------
function loadDashboard() {
    const chequing = Number(localStorage.getItem("chequing"));
    const savings = Number(localStorage.getItem("savings"));

    document.getElementById("chequingBalance").innerHTML = "$" + chequing.toFixed(2);
    document.getElementById("savingsBalance").innerHTML = "$" + savings.toFixed(2);
}

// -------------------------------------------
// MAKE A TRANSFER
// -------------------------------------------
function makeTransfer() {

    const fromAccount = document.getElementById("fromAccount").value;
    const recipient = document.getElementById("recipient").value;
    const amount = Number(document.getElementById("amount").value);

    if (recipient.trim() === "" || amount <= 0) {
        alert("Enter a valid recipient and amount.");
        return;
    }

    let chequing = Number(localStorage.getItem("chequing"));
    let savings = Number(localStorage.getItem("savings"));

    if (fromAccount === "chequing") {
        if (amount > chequing) {
            alert("Not enough in Chequing!");
            return;
        }
        chequing -= amount;
        localStorage.setItem("chequing", chequing.toFixed(2));
    }

    if (fromAccount === "savings") {
        if (amount > savings) {
            alert("Not enough in Savings!");
            return;
        }
        savings -= amount;
        localStorage.setItem("savings", savings.toFixed(2));
    }

    // Save transaction
    let history = JSON.parse(localStorage.getItem("transactions"));
    history.push({
        date: new Date().toLocaleDateString(),
        recipient: recipient,
        amount: amount
    });
    localStorage.setItem("transactions", JSON.stringify(history));

    // Reset form
    document.getElementById("recipient").value = "";
    document.getElementById("amount").value = "";

    alert("Transfer successful!");
}

// -------------------------------------------
// LOAD TRANSACTION HISTORY
// -------------------------------------------
function loadTransactions() {
    const history = JSON.parse(localStorage.getItem("transactions"));
    const table = document.getElementById("historyTable");

    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Amount</th>
        </tr>
    `;

    history.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.recipient}</td>
                <td>-$${item.amount.toFixed(2)}</td>
            </tr>
        `;
    });
}
