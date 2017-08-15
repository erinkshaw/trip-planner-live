let map;

function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
        //PLACEHOLDER
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function () {
    initialize_gmaps();

    var $hotelChoices = $('#hotel-choices')

    hotels.forEach(function (hotelObj) {
        $hotelChoices.append(`<option data-lat=${hotelObj.place.location[0]} data-lng=${hotelObj.place.location[1]}>${hotelObj.name}</option>`)
    })

    var $restaurantChoices = $('#restaurant-choices')
    restaurants.forEach(function (restaurantObj) {
        $restaurantChoices.append(`<option data-lat=${restaurantObj.place.location[0]} data-lng=${restaurantObj.place.location[1]}>${restaurantObj.name}</option>`)
    })

    var $activityChoices = $('#activity-choices')
    activities.forEach(function (activityObj) {
        $activityChoices.append(`<option data-lat=${activityObj.place.location[0]} data-lng=${activityObj.place.location[1]}>${activityObj.name}</option>`)
    })

    $('.hotel-group button').on('click', function () {
        let $hotelSpan = $('#hotel-itinerary').has('span');
        let lat = $('#hotel-choices').find(':selected').data('lat');
        let lng = $('#hotel-choices').find(':selected').data('lng');


        var hotelMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title: $('#hotel-choices').val()
        });

        if ($hotelSpan.length) {
            $('#hotel-itinerary .title').text($('#hotel-choices').val());
            hotelMarker.setMap(null)
        }
        else {
            $('#hotel-itinerary').append(`<span class="title">${
                $('#hotel-choices').val()
            }</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>`)
        }
        hotelMarker.setMap(map)
    })

    $('.restaurant-group button').on('click', function () {
        let lat = $('#restaurant-choices').find(':selected').data('lat');
        let lng = $('#restaurant-choices').find(':selected').data('lng');

        var restaurantMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title: $('#restaurant-choices').val()
        });

        $('#restaurant-itinerary').append(`<span class="title">${
            $('#restaurant-choices').val()
            }</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>`)

        restaurantMarker.setMap(map)
    });

    $('.activity-group button').on('click', function () {
        let lat = $('#activity-choices').find(':selected').data('lat');
        let lng = $('#activity-choices').find(':selected').data('lng');

        var activityMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title: $('#activity-choices').val()
        });

        $('#activity-itinerary').append(`<span class="title">${
            $('#activity-choices').val()
            }</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>`)

        activityMarker.setMap(map)
    });

});
