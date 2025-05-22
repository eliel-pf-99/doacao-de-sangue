const url = 'https://blood-donation-api-patm.onrender.com/times'

async function getIP(){
    let ip = await fetch('https://ipinfo.io/json')
        .then(res => res.json())
        .then(data => {return data.ip})
        .catch(err => console.error(err))
    return ip;
}

function saveTime(){
    let ip = getIP();
    ip.then(async ip => await fetch(url,{
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({'ip': ip}),
    }));
}

async function getTimes(){
    await fetch(url)
        .then(res => res.json().then(r => {
            document.querySelector("#counter").innerHTML = r;
        }))
        .catch(err => console.error(err));
}

saveTime();
getTimes();