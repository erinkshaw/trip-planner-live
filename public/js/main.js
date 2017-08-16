let map;
let markers = [];
let marker, markerId;
let counter = 0;

function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // initialize new google maps LatLng object
    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     title: "Hello World!"
    // });
    // Add the marker to the map by calling setMap()
//    marker.setMap(map);
}

$(document).ready(function () {
    initialize_gmaps();

    var $hotelChoices = $('#hotel-choices')
    hotels.forEach(function (hotelObj) {
        $hotelChoices.append(`<option data-markerid=${counter}>${hotelObj.name}</option>`);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(hotelObj.place.location[0], hotelObj.place.location[1]),
            title: hotelObj.name
       });
       markers.push(marker);
       counter++;
    });

    var $restaurantChoices = $('#restaurant-choices')
    restaurants.forEach(function (restaurantObj) {
        $restaurantChoices.append(`<option data-markerid=${counter}>${restaurantObj.name}</option>`);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(restaurantObj.place.location[0], restaurantObj.place.location[1]),
            title: restaurantObj.name
       });
       markers.push(marker);
       counter++;
    })

    var $activityChoices = $('#activity-choices')
    activities.forEach(function (activityObj) {
        $activityChoices.append(`<option data-markerid=${counter}>${activityObj.name}</option>`)
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(activityObj.place.location[0], activityObj.place.location[1]),
            title: activityObj.name
       });
       markers.push(marker);
       counter++;
    })

    $('.itinerary-item').on('click', 'button', function () {
        let removeMarkerId = $(this).data('markerid');
        $(this).prev().remove();
        $(this).remove();
        markers[removeMarkerId].setMap(null);
    })


    $('.hotel-group').on('click', '.btn-primary', function () {
        let $hotelSpan = $('#hotel-itinerary').has('span');
        markerId = $('#hotel-choices').find(':selected').data('markerid');
        if ($hotelSpan.length) {
            let prevMarkerId = $('#hotel-itinerary button').data('markerid');
            $('#hotel-itinerary span').replaceWith(`<span class="title">${$('#hotel-choices').val()}</span>`);
            $('#hotel-itinerary button').replaceWith(`<button class="btn btn-xs btn-danger remove btn-circle" data-markerid=${markerId}>x</button>`);
            markers[prevMarkerId].setMap(null);
        }
        else {
            $('#hotel-itinerary').append(`<span class="title">${$('#hotel-choices').val()}</span><button class="btn btn-xs btn-danger remove btn-circle" data-markerid=${markerId}>x</button>`)
        }
        markers[markerId].setMap(map);
    });

    $('.restaurant-group button').on('click', function () {
        markerId = $('#restaurant-choices').find(':selected').data('markerid');
        $('#restaurant-itinerary').append(`<span class="title">${$('#restaurant-choices').val()}</span><button class="btn btn-xs btn-danger remove btn-circle" data-markerid=${markerId}>x</button>`)

        markers[markerId].setMap(map);
    });


    $('.activity-group button').on('click', function () {
        markerId = $('#activity-choices').find(':selected').data('markerid');
        $('#activity-itinerary').append(`<span class="title">${$('#activity-choices').val()}</span><button class="btn btn-xs btn-danger remove btn-circle" data-markerid=${markerId}>x</button>`)

        markers[markerId].setMap(map);
    });

    var dayCounter = 1
    $('#day-add').on('click', function() {
        dayCounter++
       $(this).before(`<button class="btn btn-circle day-btn day-numbers">${dayCounter}</button>`)
    });

    $('.day-buttons').on('click', '.day-numbers', function(){
        var whichDay = $(this).text()
        $('.current-day').removeClass('current-day');
        $(this).addClass('current-day');
        $('#day-title span').text(`Day ${whichDay}`);
    })


});
