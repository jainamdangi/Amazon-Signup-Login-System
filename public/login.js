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


document.getElementById("login-form").addEventListener("submit",async(e)=>{
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const error = document.getElementById("email-error");
  error.textContent = "";
  if (!/@gmail\.com$/i.test(email)) {
  error.textContent = "Only Gmail addresses are allowed";
  return;
}
  const res = await fetch("/",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({email}),
  });

  const data = await res.json();
  console.log(data);

  if(data.success){
    window.location.href = "/pass";
  }else if(data.redirect){
    window.location.href = "/create";
  }else{
    email.textContent = data.message;
  }
})