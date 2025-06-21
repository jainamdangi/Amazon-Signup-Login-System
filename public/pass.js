document.getElementById("pass-form").addEventListener("submit", async(e)=>{
    e.preventDefault()

    
    const password = document.getElementById("password-input").value;

    const res = await fetch("/pass",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({password}),
    });
    const data = await res.json();
    document.getElementById("email").textContent = data.ms;
    if(data.success){
        window.location.href = "/home";
    }else{
        document.getElementById("err-ms").textContent = data.message;
    }
});