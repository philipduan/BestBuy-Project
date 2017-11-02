export function buy(obj) {

    if (sessionStorage.getItem(obj.sku) == null) {
        var item = { 'qty': 1, 'price': obj.price };
        sessionStorage.setItem(obj.sku, JSON.stringify(item));
    } else {
        var item = JSON.parse(sessionStorage.getItem(obj.sku));
        item.qty += 1;
        sessionStorage.setItem(obj.sku, JSON.stringify(item));
    }

};

export function checkout(parent, qtyText, totalText) {
    for (var i = 0; i < sessionStorage.length; i++) {
        var container = $(`<div class="pay"></div>`);
        var key = sessionStorage.key(i);
        var obj = JSON.parse(sessionStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        container.append(`<p id="sku">sku : ${key}</p>`)
            .append(`<p1>quantity : <input type="text" value="${obj.qty}"></p1>`)
            .append(`<p id="itemTotal">total : ${itemTotal.toFixed(2)}</p>`)
            .append(`<div class="duo"><button id="update">update</button><button id="remove">remove</button></div>`);
        parent.append(container);
    }
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());
};

export function delt(parent, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    sessionStorage.removeItem(sku);
    parent.remove();
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());
};

export function updt(parent, newVal, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    if (newVal==0) {
        sessionStorage.removeItem(sku);
        parent.remove();
    } else {
        var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
        var item = JSON.parse(sessionStorage.getItem(sku));
        item.qty = newVal;
        var itemTotal = item.price * newVal;
        parent.children('#itemTotal').text(`total : ${itemTotal.toFixed(2)}`);
        sessionStorage.setItem(sku, JSON.stringify(item));
    }
    qtyText.text(sessionStorage.length);
    totalText.text(calculateTotal());

};

function calculateTotal() {
    var total = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var obj = JSON.parse(sessionStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        total += itemTotal;
    };
    return total.toFixed(2);
}