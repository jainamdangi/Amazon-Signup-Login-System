document.getElementById("resetPasswordForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
  
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("rePassword").value;
    const msErr = document.getElementById("rePasswordError");
    if(newPassword !== confirmPassword){
      msErr.textContent = "your pass is not same";
      return;
    }else if(confirmPassword === ""){
      msErr.textContent = "enter the password";
    }
    const res = await fetch("/forget",{
      method : "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({newPassword,confirmPassword}),
  });

  const data = await res.json();

  if(data.success){
    window.location.href = "/pass";
    alert("Now Your password has updated and saved");
  }else{
    msErr.textContent = data.ms;

  }

});