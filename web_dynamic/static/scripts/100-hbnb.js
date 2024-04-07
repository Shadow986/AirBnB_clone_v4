$(document).ready(function() {
  let amenities = {};
  let locations = {};

  $('input[type="checkbox"]').change(function() {
    let dataId = $(this).data('id');
    let dataName = $(this).data('name');
    let dataCategory = $(this).data('category');

    if (this.checked) {
      if (dataCategory === 'amenities') {
        amenities[dataId] = dataName;
      } else {
        locations[dataId] = dataName;
      }
    } else {
      if (dataCategory === 'amenities') {
        delete amenities[dataId];
      } else {
        delete locations[dataId];
      }
    }

    let amenityNames = Object.values(amenities);
    let locationNames = Object.values(locations);

    $('.amenities h4').text(amenityNames.join(', '));
    $('.locations h4').text(locationNames.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('button').click(function() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({amenities: Object.keys(amenities), locations: Object.keys(locations)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        for (let i = 0; i < data.length; i++) {
          $('.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest">' + data[i].max_guest + ' Guest(s)</div><div class="number_rooms">' + data[i].number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + data[i].description + '</div></article>');
        }
      }
    });
  });
});
