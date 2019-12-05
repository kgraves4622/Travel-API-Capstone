'use strict'

const countrycode = $('#js-select-country').val();

function fetchAdvisoryData() {
    $('#advisory-results-list').empty();


    var lclUrlString = "https://www.travel-advisory.info/api?countrycode=" + countrycode

    fetch(lclUrlString)
        .then(response => {
            if (response.ok) {
                return response.json();
         }
            throw new Error(response.statusText);
        }).then(responseJson => displayAdvisory(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })

}


function displayAdvisory(responseJson) {
    console.log(responseJson);

    $('#advisory-results-list').empty

    const countrycode = $('#js-select-country').val();
    
    $('#advisory-results-list').append(
        $(`<ol><h3>Country: ${responseJson.data[countrycode].name}</h3>
        <p>Continent: ${responseJson.data[countrycode].continent}</p>
        <p>Current Travel Advisory: ${responseJson.data[countrycode].advisory.score}</p> 
        </ol>`)
    )
}

function formatQueryParams(params) {
        const queryItems = Object.keys(params)
         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
  }

function displayDetailedResults(responseJson) {
        console.log(responseJson);

        $('#explore-results-list').empty();

        var results = responseJson 

        for (let i= 0; i < results.length & i<maxResults ; i++)
            $('#explore-results-list').append(
                `<li><h3><a href="${results.data[i].places}"></h3></li>`
            )
    }

    function fetchDetailedResults(query, limit=10) {
    
    const apiKey = "S2KGHr4Crb5cyB6342J0x8xKnIPfdtjcaBG9wjw3";

    const tripURL = "https://api.sygictravelapi.com/1.2/en";

    const params = {
        query: query,
        level: $('#js-search-level').val(),
        categories: $('#js-categories').val(), 
        limit: $('#js-max-results').val(),
    };

   /* const options = new Headers({
        "X-Api-Key": "apiKey",
    });*/


    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const queryString = formatQueryParams(params)
    const url = tripURL + '?' + queryString;

    console.log(url);
        
    fetch(proxyUrl + url)
        .then(blob => blob.json())
        .then(data => {
            console.table(data);
        document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
            return data;
  })
    .catch(e => {
        console.log(e);
        return e;
  });
}

    /*fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayDetailedResults (responseJson, limit))
        .catch(err => {
            $('#js-error-message').text('Something went wrong: ${err.message}');
        });*/





/*function controlForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchCountry = $('#js-select-contry').val();
        const searchTerm = $('#js-search-query').val();
        const limit = $('#js-max-results').val();
        fetchAdvisory(searchCountry)
        fetchDetailedResults(searchTerm, limit)
        });
}*/
        
//$(promiseData);




function pageManagement() {
    
    $('#advisorySubmit').click(function(){
        event.preventDefault();
        $('#advisory-results-screen').show();
        fetchAdvisoryData();
        $('#initial-search-screen').hide();
        $('#explore-place-screen').hide();
    });

    $('#new-search').click(function(){
        event.preventDefault();
        $('#initial-search-screen').show();
        $('#advisory-results-screen').hide();
        $('#explore-place-screen').hide();
    });

    $('#start-trip').click(function(){
        event.preventDefault();
        $('#explore-place-screen').show();
        $('#initial-search-screen').hide();
        $('#advisory-results-screen').hide();
    });


    $('#detailedSubmit').click(function(){
        event.preventDefault();
        $('#explore-place-results').show();
        const searchTerm = $('#js-search-query').val();
        const level = $('#js-search-level').val();
        const categories = $('#js-categories').val();
        const limit = $('#js-max-results').val();
        fetchDetailedResults(searchTerm, level, categories, limit);
        $('#initial-search-screen').hide();
        $('#advisory-results-screen').hide();
    });
}

$(pageManagement);