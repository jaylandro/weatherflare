// fetch('https://api.weather.gov/points/38.8894,-77.0352', {
//     headers: {
//         'content-type': 'application/json;',
//         'redirect': 'follow',
//     }
// })
//     .then(response => response.json())
//     .then(data => console.log(data));

// function getUser() {
//     return (
//       fetch('https://randomuser.me/api/')
//         // ✅ call response.json() here
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//         })
//         .catch(err => {
//           console.log(err);
//         })
//     );
//   }

//   getUser();




try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const json = await res.json();
    console.log(json);

} catch (error) {
    console.error(error)
}


