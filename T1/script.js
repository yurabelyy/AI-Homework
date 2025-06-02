// Store expenses in an array
let expenses = [];

// Theme handling
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
initTheme();

// Add event listener for theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || !amount) {
        alert('Please fill in both category and amount!');
        return;
    }

    if (amount <= 0) {
        alert('Amount must be greater than 0!');
        return;
    }

    // Add expense to array
    expenses.push({ category, amount });

    // Clear input fields
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';

    // Update the table
    updateExpensesTable();
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesTable();
}

// Function to update the expenses table
function updateExpensesTable() {
    const tbody = document.getElementById('expensesList');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to calculate and display expense statistics
function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first!');
        return;
    }

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate average daily expense (assuming 30 days per month)
    const averageDaily = total / 30;

    // Get top 3 expenses
    const top3 = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Update the display
    document.getElementById('totalExpenses').textContent = 
        `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    document.getElementById('averageExpense').textContent = 
        `$${averageDaily.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = top3
        .map(expense => `
            <li>${expense.category}: $${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        `)
        .join('');
}

// Optional: Add sample data
function addSampleData() {
    const sampleData = [
        { category: 'Groceries', amount: 15000 },
        { category: 'Rent', amount: 40000 },
        { category: 'Transportation', amount: 5000 },
        { category: 'Entertainment', amount: 10000 },
        { category: 'Communication', amount: 2000 },
        { category: 'Gym', amount: 3000 }
    ];
    
    expenses = [...sampleData];
    updateExpensesTable();
}

// Optional: Uncomment the line below to load sample data automatically
// addSampleData(); 