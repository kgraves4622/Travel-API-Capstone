'use strict'


function promiseData() {

const apiKey = "S2KGHr4Crb5cyB6342J0x8xKnIPfdtjcaBG9wjw3";


const options = {
    headers: new Headers({
        "x-api-key": apiKey})
};

const advisoryRequest = fetch('https://www.travel-advisory.info/api');
const detailedRequest = fetch((options),('https://api.sygictravelapi.com/1.2/en'));

Promise.all([advisoryRequest, detailedRequest])
.then(values => Promise.all(values.map(value => value.json())))
.then(responseJson => {
    if (response.ok) {
        return fetchAdvisory(advisoryRequest);
    }
    throw new Error (response.statusText);
    })
    .then(responseJson => displayDetailedResults(responseJson, limit))
    .then(finalVals => {
        $('form').submit(event => {
            let firstAPIResp = finalVals[0]
            let secondAPIResp = finalVals[1]
            controlForm(firstAPIResp, secondAPIResp);
            });
    })
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
    /*console.log(responseJson);
    let firstAPIResp = finalVals[0];
    let secondAPIResp = finalVals[1];
    displayAdvisory(firstAPIResp);
    displayDetailedResults(secondAPIResp);*/


function fetchAdvisory(responseJson) {
    $('#advisory-results-list').empty
    
    if (response.ok) {
        console.log(responseJson)
        .then(response => response.json())
        .then(responseJson => countryNotFound(responseJson))
    };
    //const countryCode = $('#js-select-country').val();

    //const advisoryURL = "https://www.travel-advisory.info/api";
}

function countryNotFound(responseJson) {
    console.log(responseJson);

    $('#advisory-results-list').empty

    var caughtError = responseJson.status

    if (caughtError === 'error') {
        alert (`Sorry: ${responseJson.message}`);
    } else {
        displayAdvisory(responseJson);
    }
}

function displayAdvisory(responseJson) {
    console.log(responseJson);

    $('#advisory-results-list').empty

    var results = responseJson.message
    
    $('#advisory-results-list').append(
    `<li><h3><a href="${'#advisory-results-list'}.html(results)}"></a></h3></li>`
    )
}


function fetchDetailedResults(query, limit=10) {

    /*const apiKey = "S2KGHr4Crb5cyB6342J0x8xKnIPfdtjcaBG9wjw3"

    const tripURL = "https://api.sygictravelapi.com/1.2/en"*/

    function formatQueryParams(params) {
        const queryItems = Object.keys(params)
         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
  }

    function displayDetailedResults(responseJson, limit) {
        console.log(responseJson);

        $('#explore-results-list').empty();

        var results = responseJson 

        for (let i= 0; i < results.length & i<maxResults ; i++)
            $('#explore-results-list').append(
                `<li><h3><a href="${results[i].list}"></h3></li>`
            )
    }
    const params = {
        query: query,
        levels: query,
        categories: query, 
        limit,
    };
    const queryString = formatQueryParams(params)
    const url = tripURL + '?' + queryString;

    console.log(url);

    /*const options = {
        headers: new Headers({
            "x-api-key": apiKey})
    };*/

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
}





function controlForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchCountry = $('#js-select-contry').val();
        const searchTerm = $('#js-search-query').val();
        const limit = $('#js-max-results').val();
        fetchAdvisory(searchCountry)
        fetchDetailedResults(searchTerm, limit)
        });
}
        
$(promiseData);




/*function pageManagement() {
    
    $('#advisorySubmit').click(function(){
        $('#advisory-results-screen').show();
        $('#initial-search-screen').hide();
        $('#explore-place-screen').hide();
    });

    $('#new-search').click(function(){
        $('#initial-search-screen').show();
        $('#advisory-results-screen').hide();
        $('#explore-place-screen').hide();
    });

    $('#search-trip').click(function(){
        $('#explore-place-screen').show();
        $('#initial-search-screen').hide();
        $('#advisory-results-screen').hide();
    });

    $('#detailedSubmit').click(function(){
        $('#explore-place-results').show();
        $('#initial-search-screen').hide();
        $('#advisory-results-screen').hide();
    });

}*/