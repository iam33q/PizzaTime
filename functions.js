// 'pizza' refers to the pizza names. These are passed as the id attributes on the pizza containers and part of the id attributes of other elements within the pizza containers.
var prices = {
    "Margherita"        :7.99,
    "Ham&Pineapple"     :9.99,
    "New-Yorker"        :10.99,
    "HotNSpicy"         :9.99,
    "Meateor"           :12.99,
    "Meatfielder"       :12.99,
    "Meatilicious"      :13.99,
    "MightyMeaty"       :14.99,
    "Chicken-Feast"     :13.99,
    "Cheeseburger"      :12.99,
    "SpicyAmerican"     :12.99,
    "Hawaiian"          :12.49,
    "Margherita(Vegan)" :8.99,
    "VegiSupreme"       :14.99,
    "Vegi-Volcano"      :14.99,
    "Vegi-Pesto"        :15.99
}
var list = { 
    "Margherita"        :0,
    "Ham&Pineapple"     :0,
    "New-Yorker"        :0,
    "HotNSpicy"         :0,
    "Meateor"           :0,
    "Meatfielder"       :0,
    "Meatilicious"      :0,
    "MightyMeaty"       :0,
    "Chicken-Feast"     :0,
    "Cheeseburger"      :0,
    "SpicyAmerican"     :0,
    "Hawaiian"          :0,
    "Margherita(Vegan)" :0,
    "VegiSupreme"       :0,
    "Vegi-Volcano"      :0,
    "Vegi-Pesto"        :0
}
var loaded=false;
//Front page functions
function localDataInit(){ // Initialises data structures in localStorage.
    localStorage.setItem("loaded",true);
    localStorage.setItem("basketnumber",0);
    localStorage.setItem("basket",JSON.stringify(new Object())); 
    localStorage.setItem("itemList",JSON.stringify(list));  // Mostly useless terms but
    localStorage.setItem("total",0);                        // Bad things happen if I remove them 
}
function init(){ // Initialise Title and Price labels. 
    (!localStorage.getItem("loaded")) ? localDataInit() : loaded = true;
    var pizzas = document.querySelectorAll(".pizza");
    for(let i=0;i<pizzas.length;i++){       // Injecting HTML into each menu item container. 
        let pizza= pizzas[i].id;            // I know it looks a bit tacky but
        pizzas[i].innerHTML += (            // This way is more visual and intuitive 
            "<h2>"+pizza+"</h2>" +
            "<h2 style='color: brown'>\u00A3"+ prices[pizza]+"</h2>" +
            "<div id='"+pizza+"_optioncontainer'>"+
                "<div id='"+pizza+"_ordersize'"+"style='display:none'>"+
                    "<select id='"+pizza+"_activeorder1'>"+
                        "<option          id='"+pizza+"_sizeoption1' value='Small'        >Small (8\")         </option>"+
                        "<option          id='"+pizza+"_sizeoption2' value='Medium'       >Medium (10\")       </option>"+
                        "<option selected id='"+pizza+"_sizeoption3' value='Large'        >Large (12\")        </option>"+
                        "<option          id='"+pizza+"_sizeoption4' value='Pizzanormous' >Pizzanormous (16\") </option>"+
                    "</select>"+
                    "<select id='"+pizza+"_activeorder2'>"+
                        "<option selected value='ThinItalianBase'                 >Thin Italian Base          </option>"+
                        "<option          value='StoneCrustBase'                  >Stone Crust Base           </option>"+
                        "<option          value='CheeseStuffedCrustBase'         >Cheese Stuffed Crust Base  </option>"+
                        "<option          value='VeganBase'                        >Vegan Base                 </option>"+
                        "<option          value='GlutenFreeBase'                  >Gluten Free Base           </option>"+
                    "</select>"+
                    "<select id='"+pizza+"_activeorder3'>"+
                        "<option selected value='Salad'                 >Salad                  </option>"+
                        "<option          value='GarlicBread'          >Garlic Bread           </option>"+
                        "<option          value='CheeseGarlicBread'   >Cheese Garlic Bread    </option>"+
                        "<option          value='Coleslaw'              >Coleslaw               </option>"+
                        "<option          value='ChickenWings'         >Chicken Wings          </option>"+
                    "</select>"+
                    "<select id='"+pizza+"_activeorder4'>"+
                        "<option selected value='Water'                 >Water      </option>"+
                        "<option          value='PepsiMax'             >Pepsi Max  </option>"+
                        "<option          value='DrPepper'             >Dr Pepper  </option>"+
                        "<option          value='7-Up'                  >7-Up       </option>"+
                        "<option          value='TangoOrange'                 >Tango      </option>"+
                    "</select>"+
                    "<button id='submitbutton' onclick = addToBasket("+
                        "'"+pizza+"',"+
                        "document.getElementById('"+pizza+"_activeorder1').value,"+
                        "prices['"+pizza+"'],"+
                        "document.getElementById('"+pizza+"_activeorder2').value,"+
                        "document.getElementById('"+pizza+"_activeorder3').value,"+
                        "document.getElementById('"+pizza+"_activeorder4').value,"+
                        ")>Submit Order"+
                    "</button>"+
                "</div>"+
            "</div>"
            +"<button id="+pizza+"_button onclick=selectSize('"+pizza+"') ><h2 style='color:rgb(80, 80, 0)'>Select</h2></button>"
        );
    };
    console.log("Ready.");
}
function showIngredients(){ // Injects totally real pizza ingredients
    var pizzas = document.querySelectorAll(".pizza");
    pizzas.forEach(function(pizza){
        pizza.innerHTML += (
            "<div id='overlay'>"+
                "<h2>Ingredients:</h2>"+
                "<ul>"+
                    "<li>Ingredient 1</li>"+
                    "<li>Ingredient 2</li>"+
                    "<li>Ingredient 3</li>"+
                "</ul>"+
            "</div>"
            )
        }
    )
    var button = document.querySelector(".menubutton");
    button.firstChild.innerHTML="Hide Ingredients"
    button.setAttribute("onclick","hideIngredients()")
}
function hideIngredients(){ // Hmm I wonder what this does
    var covers = document.querySelectorAll("#overlay");
    covers.forEach(function(cover){
        cover.remove();
    });
    var button = document.querySelector(".menubutton");
    button.setAttribute("onclick","showIngredients()")
    button.firstChild.innerHTML="Show Ingredients"
}
function selectSize(pizza){ // Opens choices menu
    var container = document.getElementById(pizza+"_ordersize");
    var button = document.getElementById(pizza+"_button");
    container.setAttribute("style","display:block");
    button.setAttribute("style","display:none")
}
function addToBasket(title,size,price,base,side,drink){ // Adds order to storage
    //Fetching localStorage data
        var itemlist = JSON.parse(localStorage.getItem("itemList"));
        var basket = JSON.parse(localStorage.getItem("basket"));
        var numberOfItems = parseInt(localStorage.getItem("basketnumber"));
        var cashmoney = parseFloat(localStorage.getItem("total"));
    //Performing necessary operations
        var pizzavalue=price;
        itemlist[title]++;
        switch(size){
            case "Small": pizzavalue-=3;break;
            case "Medium":pizzavalue-=1.5;break;
            case "Pizzanormous":pizzavalue+=3;break;
        }
        switch(base){
            case "ThinItalianBase":break;
            case "StoneCrustBase": pizzavalue+=0.5;break;
            case "CheeseStuffedCrustBase": pizzavalue+=3;break;
            case "VeganBase": pizzavalue+=1;break;
            case "GlutenFreeBase": pizzavalue+=1;break;
        }
        switch(side){
            case "Salad":pizzavalue+=2;break;
            case "GarlicBread":pizzavalue+=2.5;break;
            case "CheeseGarlicBread":pizzavalue+=3.5;break;
            case "Coleslaw":pizzavalue+=1;break;
            case "ChickenWings":pizzavalue+=5;break;
        }
        switch(drink){
            case "Water":pizzavalue+=0.5;break;
            case "PepsiMax":pizzavalue+=0.5;break;
            case "DrPepper":pizzavalue+=0.5;break;
            case "7-Up":pizzavalue+=0.5;break;
            case "TangoOrange":pizzavalue+=0.5;break;
        }
        basket[numberOfItems]=[numberOfItems,title,size,pizzavalue,base,side,drink];
        cashmoney+=pizzavalue;
        numberOfItems++;
    //Placing altered data back into localStorage
        localStorage.setItem("itemList",JSON.stringify(itemlist));
        localStorage.setItem("basket",JSON.stringify(basket));
        localStorage.setItem("total",cashmoney);
        localStorage.setItem("basketnumber",numberOfItems);
        alert(title+" added to basket!\nTo select size, go to Basket.");    
        document.getElementById(title+"_ordersize").setAttribute("style","display:none")
        document.getElementById(title+"_button").setAttribute("style","display:blick")
}
// Basket functions
function goToBasket(){ // Initialises basket content from localStorage
    var basket = JSON.parse(localStorage.getItem("basket"));
    var basketcontainer = document.getElementById("basket");
    basketcontainer.innerHTML += ("<button id='combiner' onclick='combinePizzas()'>Combine Pizzas</button><br>"        )
    for(var item in basket){
        var    id=item;
        var title=basket[item][1].toString();
        var size =basket[item][2].toString();
        var price=basket[item][3].toString();
        var base =basket[item][4].toString();
        var side =basket[item][5].toString();
        var drink=basket[item][6].toString();
        var n = parseInt(id)+parseInt(1);
        basketcontainer.innerHTML += ( //This looks amazing and beautiful and most importantly it works. Good luck following along though.
            "<div id='basketItem_"+id+"'>"+
                "<div style='display:flex; flex-direction:column'><h4>"+n+") "+title+"</h4>"+
                "<p>"+size+" - "+base+" - "+side+" - "+drink+" - &pound;"+price+"</p></div>"+
                "<div id='"+title+"_ordersize'"+"style='display:flex;'>"+
                    "<select id='"+title+"_activeorder1'>"+
                        "<option          value='Small'        >Small (8\")         </option>"+
                        "<option          value='Medium'       >Medium (12\")       </option>"+
                        "<option selected value='Large'        >Large (16\")        </option>"+
                        "<option          value='Pizzanormous' >Pizzanormous (20\") </option>"+
                    "</select>"+
                    "<select id='"+title+"_activeorder2'>"+
                        "<option selected value='ThinItalianBase'       >Thin Italian Base          </option>"+
                        "<option          value='StoneCrustBase'        >Stone Crust Base           </option>"+
                        "<option          value='CheeseStuffedCrustBase'>Cheese Stuffed Crust Base  </option>"+
                        "<option          value='VeganBase'             >Vegan Base                 </option>"+
                        "<option          value='GlutenFreeBase'        >Gluten Free Base           </option>"+
                    "</select>"+
                    "<select id='"+title+"_activeorder3'>"+
                        "<option selected value='Salad'                 >Salad                  </option>"+
                        "<option          value='GarlicBread'           >Garlic Bread           </option>"+
                        "<option          value='CheeseGarlicBread'     >Cheese Garlic Bread    </option>"+
                        "<option          value='Coleslaw'              >Coleslaw               </option>"+
                        "<option          value='ChickenWings'          >Chicken Wings          </option>"+
                    "</select>"+
                    "<select id='"+title+"_activeorder4'>"+
                        "<option selected value='Water'                 >Water       </option>"+
                        "<option          value='PepsiMax'              >Pepsi Max   </option>"+
                        "<option          value='DrPepper'              >Dr Pepper   </option>"+
                        "<option          value='7-Up'                  >7-Up        </option>"+
                        "<option          value='TangoOrange'           >Tango Orange</option>"+
                    "</select><br>"+
                    "<button id='editor' onclick = 'editBasketItem("+id+", `"+
                            title+"`, "+
                            "document.getElementById(`"+title+"_activeorder1`).value, "+
                            "prices[`"+title+"`], "+
                            "document.getElementById(`"+title+"_activeorder2`).value, "+
                            "document.getElementById(`"+title+"_activeorder3`).value, "+
                            "document.getElementById(`"+title+"_activeorder4`).value)'"+
                        ">Submit Edit"+
                    "</button>"+
                "<button id='deleter' onclick='removeFromBasket("+id+")'>Delete</button>"+
                "</div>"+
            "</div><br>"
        )         
    }
}
function checkBasketContent(){ //Might implement this later
    var total = JSON.parse(localStorage.getItem("total"));
    var basket = JSON.parse(localStorage.getItem("basket"));
    var actualsum = 0;
    for(var item in basket){
        actualsum += basket[item][3]
    };
    if (total === actualsum){
        localDataInit();
        alert("Something went wrong. Basket cleared.")
    }
}
function editBasketItem(id,title,size,price,base,side,drink){
    var basket = JSON.parse(localStorage.getItem("basket"));
    var total = JSON.parse(localStorage.getItem("total"));
    var pizzavalue=prices[title];
    switch(size){
        case "Small": pizzavalue-=3;break;
        case "Medium":pizzavalue-=1.5;break;
        case "Large":break;
        case "Pizzanormous":pizzavalue+=3;break;
    }
    switch(base){
        case "ThinItalianBase":break;
        case "StoneCrustBase": pizzavalue+=0.5;break;
        case "CheeseStuffedCrustBase": pizzavalue+=3;break;
        case "VeganBase": pizzavalue+=1;break;
        case "GlutenFreeBase": pizzavalue+=1;break;
    }
    switch(side){
        case "Salad":pizzavalue+=2;break;
        case "GarlicBread":pizzavalue+=2.5;break;
        case "CheeseGarlicBread":pizzavalue+=3.5;break;
        case "Coleslaw":pizzavalue+=1;break;
        case "ChickenWings":pizzavalue+=5;break;
    }
    switch(drink){
        case "Water":pizzavalue+=0.5;break;
        case "PepsiMax":pizzavalue+=0.5;break;
        case "DrPepper":pizzavalue+=0.5;break;
        case "7-Up":pizzavalue+=0.5;break;
        case "TangoOrange":pizzavalue+=0.5;break;
    }
    total = total - basket[id][3] + pizzavalue;
    basket[id][2]=size;
    basket[id][3]=pizzavalue;
    basket[id][4]=base;
    basket[id][5]=side;
    basket[id][6]=drink;
    localStorage.setItem("basket",JSON.stringify(basket));
    alert(title+" changed size to "+size+"."); 
    document.getElementById("basket").innerHTML="";
    goToBasket();
}
function removeFromBasket(id){ // This works in the console just fine. When I make a button run it, JS has a meltdown.
    var basket = JSON.parse(localStorage.getItem("basket"));
    alert(basket[id][2]+" Removed from Basket.");    
    delete basket[id];
    localStorage.setItem("basket",JSON.stringify(basket));
    document.getElementById("basket").innerHTML="";
    goToBasket();   
}
function combinePizzas(){ 
    var basket = JSON.parse(localStorage.getItem("basket"));
    var opt1 = parseInt(document.getElementById("option1").value)-1;
    var opt2 = parseInt(document.getElementById("option2").value)-1;
    var pizza1 = basket[opt1];
    var pizza2 = basket[opt2];
    pizza1[1]="Combination of "+pizza1[1]+" and "+pizza2[1];
    pizza1[2]!==pizza2[2] ? pizza1[2] = "Mixed Size" : pizza1[2]=pizza1[2];
    delete basket[opt2];
    localStorage.setItem("basket",JSON.stringify(basket));
    alert("Combination successful!");
    goToBasket();
}
// Checkout functions
function goToShipping(){ // Initialises checkout page information
    var basket = JSON.parse(localStorage.getItem("basket"));
    var checkoutpage=document.getElementById("ordersummary");
    for(var item in basket){
        checkoutpage.innerHTML += (
            "<p>"+basket[item][1]+" - "+basket[item][2]+" - "+basket[item][4]+" - "+basket[item][5]+" - "+basket[item][6]+" - &pound;"+basket[item][3]+"</p>"
        );
    }
}
function receipt(){ // OPTIONAL: Produce Receipt for purchase
    alert("Thank you for your order! Your pizza is currently underway...")
    document.getElementById("checkoutpage").innerHTML= "<img src='/images/pizza-time-sexy.gif'  alt='PIZZA' style='width:100%' ><br><p>I'm coming...</p>";
}