
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready() {
    
/////* Removing product from cart*///////

var removeProduct = document.getElementsByClassName('closeBtn');

for(var i = 0; i < removeProduct.length; i++){
    var removeFromCart = removeProduct[i];
    removeFromCart.addEventListener('click', function(event){
        var removeBtn = event.target;
        removeBtn.parentElement.parentElement.remove();
    });
}

/////* Adding product to the cart*///////


/////  /////  /////  /////  /////   /////* I. CART FUNCTIONALITY *///////   /////  /////  /////  /////  /////  


 //* Event Listerners *//
var addToCartBtn = document.getElementsByClassName('cart-button');
for(var i = 0; i < addToCartBtn.length; i++){
    var addItem = addToCartBtn[i];
    addItem.addEventListener('click', showTheCart);
    addItem.addEventListener('click', addToCart);
}

/////* 1. Data controller*///////

function addToCart (event) {
    //* Get the info from the clicked itemr*//
    var buttonAdd = event.target;
    var shopItem = buttonAdd.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('description-item')[0].innerText;
    var price = shopItem.getElementsByClassName('itemPrice')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('eachImageProduct')[0].src;
    var discount = shopItem.getElementsByClassName('small-price')[0].innerText;

    var DOMvariables = {
        title: document.querySelector('.cart-item-product-title'),
        price: document.querySelector('.itemCartPrice'),
        imageSrc: document.querySelector('.cart-item-product-image'),
        discount: document.querySelector('.smallPriceCart'),
        subTotal: document.querySelector('.itemTotalPrice'),      
    }

    DOMvariables.title.innerHTML = title;
    DOMvariables.price.innerHTML = price;
    DOMvariables.subTotal.innerHTML = price;
    DOMvariables.discount.innerHTML =discount;
    DOMvariables.imageSrc.src = imageSrc;  
    storeItemToTheCart(title, price, imageSrc);
    updateTotalPrice ();
}
   function storeItemToTheCart (title, price, imageSrc) {
            var cartRow = document.createElement('div');
            var cartItems = document.getElementsByClassName('containerItem-smallCart')[0];
            var cartItemsNames = cartItems.getElementsByClassName('smallCart-title');
                console.log(cartItems.children);
                for(var i = 0; i < cartItemsNames.length; i++){
                    if(cartItemsNames[i].innerText == title){  
                        console.log("Title is the same");
                       
                     
                        
                     }else if(cartItemsNames[i].innerText) {
                          var cartContent;
                            cartContent = '<div class="containerItemSmallCart"><div class="container-image-smallCart"><img src="%images/trotineta-10.jpg%" alt="" class="image-smallCart"></div><div class="container-title-smallCart"><a href= "#" class="smallCart-title">%title%</a><div class="smallCart-quantity">1<span>buc.</span> </div> </div><div class="container-price-smallCart"><div class="smallCart-price">%1999%</div><p>lei</p></div><div class="smallCart-removeItem">x</div></div> ';
                            var cartContent = cartContent.replace('%title%', title);
                            var cartContent= cartContent.replace('%1999%', price);
                            var cartContent= cartContent.replace('%images/trotineta-10.jpg%',imageSrc);
                            cartRow.innerHTML = cartContent;
                            cartItems.append(cartRow);   
                            cartRow.getElementsByClassName('smallCart-removeItem')[0].addEventListener('click',removeItemSmallCart); 
                                      
                     }
                }          
                                                                                 
          } 
   
  


//* 2. Remove item from small cart

 var removeItemBtn = document.getElementsByClassName('smallCart-removeItem');

    for(var i = 0; i < removeItemBtn.length; i++){
        var removeItem = removeItemBtn[i]; 
        removeItem.addEventListener('click',removeItemSmallCart);          
    }
    function removeItemSmallCart(event){
        var removeBtnClicked = event.target;
        removeBtnClicked.parentElement.remove()
        updateTotalPrice();
}

           


/////* 3. Update total price *///////

  function updateTotalPrice (){
      var itemContainer = document.getElementsByClassName('containerItem-smallCart')[0];
      var itemRows = document.getElementsByClassName('containerItemSmallCart');
      var priceTotal = document.querySelector('.totalPrice');
      
      var total = 0;
      for(var i = 0; i < itemRows.length; i++){
          var itemRow = itemRows[i];
          var priceElement = itemRow.getElementsByClassName('smallCart-price')[0];
          var quantityElement = itemRow.getElementsByClassName('smallCart-quantity')[0];
          var priceValue = parseFloat(priceElement.innerText.replace(".",""));
          var quantityElement = parseFloat(quantityElement.innerText);
          total = total + (priceValue * quantityElement);   
      }
         total= Math.round(total * 100) / 100;
         priceTotal.innerHTML = total + " lei";
      
  }




/////* 4. UI controller *///////
    // * Open cart
 
function showTheCart(){
    var darkerMode = document.querySelector('.overLayEffect');
    var body = document.body;
    //* Show cart, turn the dark mode and hide scroll bar*//
    darkerMode.classList.remove('notActive');
    body.style.overflow = 'hidden';      
}
     // * Close open cart
var closeBtn = document.querySelector('.cart-btn-close-w');
var backBtn = document.querySelector('.cart-back-btn');
    closeBtn.addEventListener('click', closeCart);
    backBtn.addEventListener('click', closeCart);

function closeCart(){
    var darkerMode = document.querySelector('.overLayEffect');
    var body = document.body;
    darkerMode.classList.add('notActive');
    body.style.overflow = 'scroll'; 
}
    
    // * Cart event listener
    cartBtn.addEventListener('click',updateTotalPrice);

}


    ///////////////////* My account and cart menu*//////////

//*  My account*//
    var mainVar = document.getElementById('box-to-login');
    var myAccount = document.getElementById('my-account');
    var cartStyleBox = document.getElementById('cart-button');  

document.querySelector('#my-account').addEventListener( 'click', function(){
    mainVar.classList.toggle('notActive');
    mainVar.classList.toggle('active');
    mainVar.classList.toggle('bigBoxStyle');
    myAccount.classList.toggle('boxStyle');
    myAccount.classList.remove('border-account');
    cartStyleBox.classList.toggle('cartStyle');  
    //* Close cart menu if it is open//
    if(menuCart.classList.contains('active')){
        menuCart.classList.add('notActive');
        menuCart.classList.remove('active');
        menuCart.classList.remove('bigBoxStyle');
        cartBtn.classList.remove('boxStyle'); 
    }
});

//*  Cart menu*//

var cartBtn = document.getElementById('cart-button'); 
var menuCart = document.querySelector('.cartSmallBox');

cartBtn.addEventListener('click',function(){
    menuCart.classList.toggle('notActive');
    menuCart.classList.toggle('active');
    menuCart.classList.toggle('bigBoxStyle');
    cartBtn.classList.toggle('boxStyle');
    cartStyleBox.classList.toggle('cartStyle');
    myAccount.classList.toggle('noRadius');

    //* Close my account menu if it is open//
    if(mainVar.classList.contains('active')){
        mainVar.classList.add('notActive');
        mainVar.classList.remove('active');
        mainVar.classList.remove('bigBoxStyle');
        myAccount.classList.remove('boxStyle');
        cartStyleBox.classList.remove('cartStyle'); 
    }
});



//////////////////* Drop down menu*/////////////////
   
//* I. Appear the hidden menu*//

//* 1.1 Appear the hidden menu of Product*//
         var visibleMenu = document.querySelector('.productDropMenu');
         var productBtn  = document.querySelector('#bigPadding');
         var hiddenHover = document.querySelector('#bigPadding');
         var arrow = document.querySelector('.smallArrow');
         var rotateArrow = document.querySelector('.arrowO');
         var subMenuAll = document.querySelector('.subMenu1');
         var subMenuImages = document.querySelector('.displaySubMenu1');
         var styleBigBox= document.querySelector('.productBoxAfter');
         var arrowRotate = document.querySelector('.rightArrow');
         var hoverMainMenu = document.querySelector('.productDropMenu');
        

         
         productBtn.addEventListener('click', function(){
            //* Change the active status of menu*//
                   visibleMenu.classList.toggle('active');
                   productBtn.classList.toggle('hoverProduct');
                   subMenuAll.classList.toggle('active');
                   subMenuImages.classList.toggle('active');
             //* Change the style of menu*//
                   hiddenHover.classList.toggle('dropMenuStyle');
                   visibleMenu.classList.toggle('styleMainBox');
                   visibleMenu.classList.toggle('noBorderRadius');
                   visibleMenu.classList.toggle('hoverProductDropMenu');
             //* Change the borders of Product button*//
                   productBtn.classList.toggle('buttonProductStyle');
            //* Rotate arrow*//
                    arrow.classList.toggle('arrowEffect');
                    rotateArrow.classList.toggle('rotateDown');
             //* Remove previous menu*// This was the only solution that I found that  works to the problem of remaing active box when click on a previous box (the same problem to every type of )
              serviceMenu.classList.remove('active');
              serviceArrow.classList.remove('rotateDown');
              serviceArrC.classList.remove('arrowEffect');
              serviceBtn.classList.remove('dropMenuStyle');
              serviceBtn.classList.add('hoverProduct');
             //* Remove previous menu*//
              financeMenu.classList.remove('active');
              financeArrow.classList.remove('rotateDown');
              financeBtn.classList.remove('dropMenuStyle');
              financeBtn.classList.add('hoverProduct');
              financeArrC.classList.remove('arrowEffect');
             //* Remove previous menu*//
              mainVar.classList.add('notActive');
              mainVar.classList.remove('active');
              mainVar.classList.remove('bigBoxStyle');
              myAccount.classList.remove('boxStyle');
              cartStyleBox.classList.remove('cartStyle');
         });

//* 2. Appear the hidden menu of Service*//

        var serviceMenu  = document.querySelector('.serviceBox');
        var serviceBtn = document.querySelector('#serviceButton');
        var serviceArrow = document.querySelector('.arrowI');
        var serviceArrC = document.querySelector('.arrowC1');
        

        serviceBtn.addEventListener('click', function(e){
              serviceMenu.classList.toggle('active');
              serviceArrow.classList.toggle('rotateDown');
              serviceArrC.classList.toggle('arrowEffect');
              serviceBtn.classList.toggle('dropMenuStyle'); 
              serviceBtn.classList.toggle('hoverProduct');
            //* Remove previous menu*//
              financeMenu.classList.remove('active');
              financeArrow.classList.remove('rotateDown');
              financeBtn.classList.remove('dropMenuStyle'); 
              financeArrC.classList.remove('arrowEffect');
              financeBtn.classList.add('hoverProduct');
            //* Remove previous menu*//
              mainVar.classList.add('notActive');
              mainVar.classList.remove('active');
              mainVar.classList.remove('bigBoxStyle');
              myAccount.classList.remove('boxStyle');
              cartStyleBox.classList.remove('cartStyle');
            
        });
          
//* 3. Appear the hidden menu of Finance*//

        var financeMenu  = document.querySelector('.financeBox');
        var financeBtn = document.querySelector('#financeButton');
        var financeArrow = document.querySelector('.arrowII');
        var financeArrC = document.querySelector('.arrowC2');


        financeBtn.addEventListener('click', function(e){
              financeMenu.classList.toggle('active');
              financeArrow.classList.toggle('rotateDown');
              financeBtn.classList.toggle('dropMenuStyle'); 
              financeBtn.classList.toggle('hoverProduct');
              financeArrC.classList.toggle('arrowEffect');
           //* Remove previous menu*//
              serviceMenu.classList.remove('active');
              serviceArrow.classList.remove('rotateDown');
              serviceArrC.classList.remove('arrowEffect');
              serviceBtn.classList.remove('dropMenuStyle'); 
              serviceBtn.classList.add('hoverProduct');
            //* Remove previous menu*//
              mainVar.classList.add('notActive');
              mainVar.classList.remove('active');
              mainVar.classList.remove('bigBoxStyle');
              myAccount.classList.remove('boxStyle');
              cartStyleBox.classList.remove('cartStyle');
        });


/////* Close menu when clicked outside the active box*///////

    //* 1.3 Hide the menu when it is clicked outside 
            var serviceBtn = document.querySelector('#serviceButton');
            var serviceBox = document.querySelector('.serviceBox');
            var financeBtn = document.querySelector('#financeButton');
            var financeBox = document.querySelector('.financeBox');
            var removeBtnCart = document.getElementsByClassName('smallCart-removeItem');
             window.onclick = function(event) {
                 if (visibleMenu.classList.contains('active')) {
                        if(!visibleMenu.contains(event.target) && !productBtn.contains(event.target)){
                            visibleMenu.classList.remove('active');
                             //*Change CSS style
                             hiddenHover.classList.remove('dropMenuStyle');
                             productBtn.classList.remove('buttonProductStyle');
                             hiddenHover.classList.add('hoverProduct'); 
                              visibleMenu.classList.remove('hoverProductDropMenu');
                              //* Rotate arrow
                             arrow.classList.remove('arrowEffect');
                             rotateArrow.classList.remove('rotateDown');
                             arrowRotate.classList.remove('rightArrowRotate');  
                              //* Reset the open box
                              subMenuAll.classList.remove('styleMenus');
                             subMenuImages.classList.remove('styleMenus'); 
                            console.log('Product Menu is ON');
                        }else{
                            console.log('Product Menu is OFF');
                        }
                 }else if(serviceBox.classList.contains('active')) {
                     if(!serviceBox.contains(event.target) && !serviceBtn.contains(event.target)) {
                             serviceBox.classList.remove('active');
                             serviceArrow.classList.remove('rotateDown');
                             serviceArrC.classList.remove('arrowEffect');
                             serviceBtn.classList.remove('dropMenuStyle');
                              console.log('Service Menu is ON');
                     }else{
                            console.log('Service Menu is OFF');
                     }
                 }else if(financeBox.classList.contains('active')) {
                     if(!financeBox.contains(event.target) && !financeBtn.contains(event.target)) {
                           financeBox.classList.remove('active');
                           financeArrow.classList.remove('rotateDown');
                           financeArrC.classList.remove('arrowEffect');
                           financeBtn.classList.remove('dropMenuStyle');
                         console.log('Finance Menu is ON');
                     }else{
                         console.log('Finance Menu is OFF');
                     }                        
                 }else if(mainVar.classList.contains('active')) {
                        if(!mainVar.contains(event.target) && !myAccount.contains(event.target)){
                            mainVar.classList.toggle('notActive');
                            mainVar.classList.remove('active');
                            mainVar.classList.remove('bigBoxStyle');
                            myAccount.classList.remove('boxStyle');
                            cartStyleBox.classList.remove('cartStyle');
                        }
                 }           
             }
    //* 1.5 Add class active to a clicked item and remove class active from previous item
             //* Variables of Product Categories
    
    
          var phone = document.querySelector('.phoneButton');   
          var phoneMenu = document.querySelector('.menu0'); 
          var phoneArrow = document.querySelector('.arrow0');
         
          
          var laptop = document.querySelector('.laptopButton');    
          var laptopMenu = document.querySelector('.menu1');
          var laptopArrow = document.querySelector('.arrow1');
         

          var game = document.querySelector('.gameButton');    
          var gameMenu = document.querySelector('.menu2'); 
          var gameArrow = document.querySelector('.arrow2');
          

          var tv = document.querySelector('.tvButton');    
          var tvMenu = document.querySelector('.menu3'); 
          var tvArrow = document.querySelector('.arrow3');
        

          var clima = document.querySelector('.climaButton');    
          var climaMenu = document.querySelector('.menu4'); 
          var climaArrow = document.querySelector('.arrow4');

          var electro  = document.querySelector('.electroButton');    
          var electroMenu = document.querySelector('.menu5'); 
          var electroArrow = document.querySelector('.arrow5');

          var menaj = document.querySelector('.menajButton');    
          var menajMenu = document.querySelector('.menu6'); 
          var menajArrow = document.querySelector('.arrow6');

          var apa  = document.querySelector('.apaButton');    
          var apaMenu = document.querySelector('.menu7'); 
          var apaArrow = document.querySelector('.arrow7');

          var cosme  = document.querySelector('.cosmeButton');    
          var cosmeMenu = document.querySelector('.menu8'); 
          var cosmeArrow = document.querySelector('.arrow8');

          var bebe = document.querySelector('.bebeButton');    
          var bebeMenu = document.querySelector('.menu9'); 
          var bebeArrow = document.querySelector('.arrow9');

          var home = document.querySelector('.homeButton');    
          var homeMenu = document.querySelector('.menu10'); 
          var homeArrow = document.querySelector('.arrow10');
            
          var auto  = document.querySelector('.autoButton');    
          var autoMenu = document.querySelector('.menu11'); 
          var autoArrow = document.querySelector('.arrow11');

          var voiaj = document.querySelector('.voiajButton');    
          var voiajMenu = document.querySelector('.menu12'); 
          var voiajArrow = document.querySelector('.arrow12');

          var biro = document.querySelector('.biroButton');    
          var biroMenu = document.querySelector('.menu13'); 
          var biroArrow = document.querySelector('.arrow13');


            //* Function to select one of the items
          var item = document.querySelectorAll('.item');
          var allItems = Array.from(item); 

          for(var i = 0; i < allItems.length; i++) {
             allItems[i].addEventListener("click", displayMenu);      
         }
    
        function displayMenu(e) {
             //* Show/Hide for each category of the Product Menu 
            
            //*  phone           
               if(phone.contains(e.target)) {
                    console.log('It works!');
                    phoneMenu.classList.toggle('active');
                    phone.classList.toggle('itemColor');
                    phoneArrow.classList.toggle('rightArrowRotate');  
               }else {
                   phoneMenu.classList.remove('active');  
                   phoneArrow.classList.remove('rightArrowRotate');
                   phone.classList.remove('itemColor');
                   phoneMenu.classList.remove('active');   
               }  
            //*  laptop
                if(laptop.contains(e.target)) {
                    console.log('It works!');
                    laptopMenu.classList.toggle('active'); 
                    laptopArrow.classList.toggle('rightArrowRotate');
                    laptop.classList.toggle('itemColor');   
                }else{
                   laptopMenu.classList.remove('active'); 
                   laptopArrow.classList.remove('rightArrowRotate');
                   laptop.classList.remove('itemColor');
                   
               }
            
            //*  game
                if(game.contains(e.target)) {
                    console.log('It works!');
                    gameMenu.classList.toggle('active'); 
                    gameArrow.classList.toggle('rightArrowRotate');
                    game.classList.toggle('itemColor');   
                }else{
                   gameMenu.classList.remove('active'); 
                   gameArrow.classList.remove('rightArrowRotate');
                   game.classList.remove('itemColor');                 
               }           
            //*  tv
                   if(tv.contains(e.target)) {
                    console.log('It works!');
                    tvMenu.classList.toggle('active'); 
                    tvArrow.classList.toggle('rightArrowRotate');
                    tv.classList.toggle('itemColor');   
                }else{
                   tvMenu.classList.remove('active'); 
                   tvArrow.classList.remove('rightArrowRotate');
                   tv.classList.remove('itemColor');             
               }
                      
            //*  clima
                       if(clima.contains(e.target)) {
                    console.log('It works!');
                    climaMenu.classList.toggle('active'); 
                    climaArrow.classList.toggle('rightArrowRotate');
                    clima.classList.toggle('itemColor');   
                        } else{
                   climaMenu.classList.remove('active'); 
                   climaArrow.classList.remove('rightArrowRotate');
                   clima.classList.remove('itemColor');   
               }         
            //*  electro
                       if (electro.contains(e.target)) {
                    console.log('It works!');
                    electroMenu.classList.toggle('active'); 
                    electroArrow.classList.toggle('rightArrowRotate');
                    electro.classList.toggle('itemColor');   
                        } else{
                   electroMenu.classList.remove('active'); 
                   electroArrow.classList.remove('rightArrowRotate');
                   electro.classList.remove('itemColor');   
                       }            
            //*  menaj
                          if (menaj.contains(e.target)) {
                    console.log('It works!');
                    menajMenu.classList.toggle('active'); 
                    menajArrow.classList.toggle('rightArrowRotate');
                    menaj.classList.toggle('itemColor');   
                        } else{
                   menajMenu.classList.remove('active'); 
                   menajArrow.classList.remove('rightArrowRotate');
                   menaj.classList.remove('itemColor');   
                       }           
            //*  apa
                          if (apa.contains(e.target)) {
                    console.log('It works!');
                    apaMenu.classList.toggle('active'); 
                    apaArrow.classList.toggle('rightArrowRotate');
                    apa.classList.toggle('itemColor');   
                        } else{
                   apaMenu.classList.remove('active'); 
                   apaArrow.classList.remove('rightArrowRotate');
                   apa.classList.remove('itemColor');   
                       }            
            //*  cosme 
            
                          if (cosme.contains(e.target)) {
                    console.log('It works!');
                    cosmeMenu.classList.toggle('active'); 
                    cosmeArrow.classList.toggle('rightArrowRotate');
                    cosme.classList.toggle('itemColor');   
                        } else{
                   cosmeMenu.classList.remove('active'); 
                   cosmeArrow.classList.remove('rightArrowRotate');
                   cosme.classList.remove('itemColor');   
                       }           
            //*  bebe
                          if (bebe.contains(e.target)) {
                    console.log('It works!');
                    bebeMenu.classList.toggle('active'); 
                    bebeArrow.classList.toggle('rightArrowRotate');
                    bebe.classList.toggle('itemColor');   
                        } else{
                   bebeMenu.classList.remove('active'); 
                   bebeArrow.classList.remove('rightArrowRotate');
                   bebe.classList.remove('itemColor');   
                       }           
            //*  home
            
                          if (home.contains(e.target)) {
                    console.log('It works!');
                    homeMenu.classList.toggle('active'); 
                    homeArrow.classList.toggle('rightArrowRotate');
                    home.classList.toggle('itemColor');   
                        } else{
                   homeMenu.classList.remove('active'); 
                   homeArrow.classList.remove('rightArrowRotate');
                   home.classList.remove('itemColor');   
                       }            
            //*  auto            
                          if (auto.contains(e.target)) {
                    console.log('It works!');
                    autoMenu.classList.toggle('active'); 
                    autoArrow.classList.toggle('rightArrowRotate');
                    auto.classList.toggle('itemColor');   
                        } else{
                   autoMenu.classList.remove('active'); 
                   autoArrow.classList.remove('rightArrowRotate');
                   auto.classList.remove('itemColor');   
                       }
            
            //*  voiaj
                          if (voiaj.contains(e.target)) {
                    console.log('It works!');
                    voiajMenu.classList.toggle('active'); 
                    voiajArrow.classList.toggle('rightArrowRotate');
                    voiaj.classList.toggle('itemColor');   
                        } else{
                   voiajMenu.classList.remove('active'); 
                   voiajArrow.classList.remove('rightArrowRotate');
                   voiaj.classList.remove('itemColor');   
                       }           
            //*  biro
                          if (biro.contains(e.target)) {
                    console.log('It works!');
                    biroMenu.classList.toggle('active'); 
                    biroArrow.classList.toggle('rightArrowRotate');
                    biro.classList.toggle('itemColor');   
                        } else{
                   biroMenu.classList.remove('active'); 
                   biroArrow.classList.remove('rightArrowRotate');
                   biro.classList.remove('itemColor');   
                       }    
        }


                   


    




