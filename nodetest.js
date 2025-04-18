// const response = fetch('https://api.weather.gov/points/38.8894,-77.0352', {
//     headers: {
//         'content-type': 'application/json;',
//         'redirect': 'follow',
//     }
// });
(async () => {

    try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all');
        const json = await res.json();
        console.log(json);

    } catch (error) {
        console.error(error)
    }
})()
// console.log(response);