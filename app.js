// ===== SELECT ELEMENTS =====
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");

// ===== OPEN SIDEBAR =====
navBtn.addEventListener("click", () => {
  sidebar.classList.add("show-sidebar");
  document.body.style.overflow = "hidden"; });

// ===== CLOSE SIDEBAR =====
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
  document.body.style.overflow = ""; 
});

/********* */
let cart = [];


function showQuantitySection() {
    const pizzaSelect = document.getElementById('pizzaName');
    const qtyContainer = document.getElementById('quantityContainer');
    
    if (pizzaSelect.value !== "") {
        qtyContainer.style.display = 'block';
        showAddButton();     }
}

function showAddButton() {
    document.getElementById('addBtn').style.display = 'block';
}

function addToCart() {
    const pizzaSelect = document.getElementById('pizzaName');
    const pizzaName = pizzaSelect.value;
    const price = parseFloat(pizzaSelect.options[pizzaSelect.selectedIndex].getAttribute('data-price'));
    const qty = parseInt(document.getElementById('quantity').value);
    
  
    cart.push({
        name: pizzaName,
        price: price,
        qty: qty,
        total: price * qty
    });

    updateInvoice();
}


function updateInvoice() {
    const invoiceArea = document.getElementById('invoiceArea');
    const finalBtn = document.getElementById('finalOrderBtn');
    
    if (cart.length === 0) return;

    let html = `<h3>Il Tuo Ordine:</h3><table class="invoice-table">`;
    let grandTotal = 0;

    cart.forEach((item, index) => {
        html += `<tr>
            <td>${item.name} x ${item.qty}</td>
            <td>€${item.total.toFixed(2)}</td>
        </tr>`;
        grandTotal += item.total;
    });

    html += `<tr class="total-row"><td>Totale:</td><td>€${grandTotal.toFixed(2)}</td></tr></table>`;
    
    invoiceArea.innerHTML = html;
    finalBtn.style.display = 'block'; 
}


function sendOrder() {
    const nome = document.getElementById('nome').value;
    if(!nome) { alert("Per favore inserisci il tuo nome"); return; }
    alert("Grazie " + nome + "! Il tuo ordine è stato inviato.");
    
}

