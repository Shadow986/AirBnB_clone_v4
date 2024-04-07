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
});
