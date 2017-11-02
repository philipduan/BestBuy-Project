export function displayProduct(ary){
    $('.bxslider').empty();
    for(let ari of ary){
        var obj = {'sku':ari.sku,'price':ari.salePrice};
        var desc = ari.name.split(' ').splice(2,ari.name.length).join(' ');
        var $img = $(`<div class="image"></div>`).css({'background':'url('+ari.largeImage+') no-repeat center',
                                                      'background-size':'contain',
                                                      'height':'200px',
                                                      'width':'100%'});
        var addToCartButton = $(`<button class="addToCart" data-value=${JSON.stringify(obj)}>add to cart</button>`);
        var child = $(`<li class="product"></li>`);
        child.append(`<p class="brand">${ari.manufacturer}</p>`)
             .append(`<p class = "specs">${desc}</p>`)
             .append($img)
             .append(`<p class="price">$${ari.salePrice}</p>`)
             .append(addToCartButton);
        $('.bxslider').append(child);

    }
}
