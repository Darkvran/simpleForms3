const sendReqForLog = document.getElementById("sendReqForLog");
const logResult = document.getElementById("POSTresult");

sendReqForLog.onclick = async () => {
    let candidate = {
        email:`${document.getElementById("email").value}`,
        password:`${document.getElementById("password").value}`
    }

    try {
        const response = await fetch('../api/login', {
            method: "post",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(candidate)
        });
      
        const resStatus = response.status;
        if (resStatus == 200){
            logResult.innerHTML = "Вы успешно авторизовались!";
            logResult.className = "font-bold text-white";
        }
        else if(resStatus == 404){
            logResult.innerHTML = "Пользователь не найден.";
            logResult.className = "font-bold text-white";
        }
        
        else if(resStatus == 401){
            logResult.innerHTML = "Неправильный пароль.";
            logResult.className = "font-bold text-white";
        }
        
      } 
      catch (error) {
        console.log('Error: ' + error);
      }
    
}