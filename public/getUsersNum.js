const result = document.getElementById("GETresult");

const getUsersNum = async ()  => {
        const res = await fetch ('../api/getUserNum');
        const usersNum = await res.json();
        result.innerHTML =  `Пользователей зарегестрировано: ${usersNum}`;
} 

window.onload = getUsersNum;