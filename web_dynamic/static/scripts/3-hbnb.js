$(document).ready(function() {
  let amenities = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    let amenityNames = Object.values(amenities);
    $('.amenities h4').text(amenityNames.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      for (let i = 0; i < data.length; i++) {
        $('.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest">' + data[i].max_guest + ' Guest(s)</div><div class="number_rooms">' + data[i].number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + data[i].description + '</div></article>');
      }
    }
  });
});
