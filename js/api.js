
var button = document.querySelector('.button');
var inputValue = document.querySelector('.search');
var desc = document.querySelector('.description');
var temp = document.querySelector('.temp');
var hum = document.querySelector('.humidity');

button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=32c56184d540fb9b3e7be2c3e1f1ec18')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['city'];
            var tempValue = data['main']['temp'];
            var humValue = data['main']['humidity'];
            var descValue = data['weather'][0]['description'];

            name.innerHTML = nameValue;
            temp.innerHTML = Math.floor(tempValue - 273.15);
            hum.innerHTML = humValue;
            desc.innerHTML = descValue;
        })
        .catch(err => ("verkeerde stadnaam"))
})

$(document).ready(function () {
    let api_key = "563492ad6f91700001000001799634c115164b51815cfcde0245227b"
    let image = ''

    $("#form").submit(function (event) {
        event.preventDefault()

        let search = $("#search").val()

        searchImage(search)
    })

    function searchImage(search) {
        $.ajax({
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", api_key);
            },
            url:"https://api.pexels.com/v1/search?query=" + search + "&per_page=1&page=1",
            success: function (data) {
                console.log(data)
                data.photos.forEach(photo => {
                    image = `
                        <img src="${photo.src.original}" alt="city" witdh="300" height="200" />
                    `
                    $("#images").append(image)
                });
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
})
