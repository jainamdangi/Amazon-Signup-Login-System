let btnNeed = document.querySelector(".need");
let div = document.querySelector("body");
let downArrow = document.querySelector("#arrow");
let upArrow = document.querySelector("#arrow");
let rowExpend_N = document.querySelector(".row-expend");
let exp = document.createElement("div");
exp.innerHTML ='<div class="combain-div"><div class="outerdiv"><a class="a3">Forgot Password</a></div><div class="outerdiv"><a class="a3">Other issues with Sign-in</a></div> </div>';
let combodiv = document.querySelector(".combain-div");
let outerdivs = document.querySelectorAll(".outerdiv");
let a2s = document.querySelectorAll(".a3");



btnNeed.addEventListener("click", function (event) {
  btnNeed.classList.add("btnnh1");
  
  event.stopPropagation();

  if (downArrow.style.transform === "rotate(180deg)") {
    downArrow.style.transform = "rotate(0deg)";
    rowExpend_N.style = "none";
   
    exp.remove();
  } else {
    downArrow.style.transform = "rotate(180deg)";
    btnNeed.append(exp);
    rowExpend_N.style.height = "68px";
    combodiv.style.height = "44px";
    combodiv.style.width = "100%";
    outerdivs.style.height = "16px";
    outerdivs.style.width = "2000px";
    outerdivs.style.marginTop = "4px";
    outerdivs.style.backgroundColor = "pink";
    
    
  }
  
});

div.addEventListener("click", function () {
  btnNeed.classList.remove("btnnh1");
});

