function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    var map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
        //PLACEHOLDER
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();

    var $hotelChoices = $('#hotel-choices')

    hotels.forEach(function(hotelObj) {
        $hotelChoices.append(`<option>${hotelObj.name}</option>`)
    })

    var $restaurantChoices = $('#restaurant-choices')
        restaurants.forEach(function(restaurantObj) {
            $restaurantChoices.append(`<option>${restaurantObj.name}</option>`)
        })

    var $activityChoices = $('#activity-choices')
    activities.forEach(function(activityObj) {
        $activityChoices.append(`<option>${activityObj.name}</option>`)
    })

    $('.hotel-group button').on('click', function() {
        let $hotelSpan = $('#hotel-itinerary').has('span');
        if ($hotelSpan.length) {
            $('#hotel-itinerary .title').text($('#hotel-choices').val());
        }
        else {
            $('#hotel-itinerary').append(`<span class="title">${
                $('#hotel-choices').val()
            }</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>`)
        }
    })


});
