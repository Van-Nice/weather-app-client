export async function getIp() {
    return await fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => console.log(data.ip))
                    .catch(error => console.log('Unable to get IP address', error));
}