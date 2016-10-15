
$('.search-button').click(function() {
  var name = $('.query').val();

  $('.query').val('');

  $.ajax({
    method: 'GET',
    url: '/api/champions/' + name + '',
    dataType: 'json',
    data: {}
  }).done(function(champion) {
      $('.all-champions').empty();

      $('.all-champions').append(
        "<h2>" + champion.name + "</h2>" +
        "<ul>" +
          "<li>" + champion.title + "</li>" +
          "<li>" + champion.champ_class + "</li>" +
          "<li>" + "<span class='stat'>" + "Health " + "</span>" +
          champion.health + "</li>" +
          "<li>" + "<span class='stat'>" + "Health Regen " + "</span>" +
          champion.health_regen + "</li>" +
          "<li>" + "<span class='stat'>" + "Magic " + "</span>" +
          champion.magic + "</li>" +
          "<li>" + "<span class='stat'>" + "Magic Regen " + "</span>" +
          champion.magic_regen + "</li>" +
          "<li>" + "<span class='stat'>" + "Attack Damage " + "</span>" +
          champion.attack_damage + "</li>" +
          "<li>" + "<span class='stat'>" + "Attack Speed " + "</span>" +
          champion.attack_speed + "</li>" +
          "<li>" + "<span class='stat'>" + "Attack Range " + "</span>" +
          champion.attack_range + "</li>" +
          "<li>" + "<span class='stat'>" + "Armor " + "</span>" +
          champion.armor + "</li>" +
          "<li>" + "<span class='stat'>" + "Magic Resist " + "</span>" +
          champion.magic_resist + "</li>" +
          "<li>" + "<span class='stat'>" + "Movement Speed " + "</span>" +
          champion.movement + "</li>" +
        "</ul>"
      );
    }).fail(function(xhr, text, error) {
        console.error('failed to get champion: ' + text + ', ' + error);
  });
});





// $.ajax({
//         method: 'GET',
//         url: '/api/champions',
//         data: {},
//         dataType: 'json'
//       }).done(function(champions) {
//         console.log(champions);
//
//         champions.forEach(function(champion) {
//           $('.all-champions').append(
//             "<h2>" + champion.name + "</h2>" +
//             "<ul>" +
//               "<li>" + champion.title + "</li>" +
//               "<li>" + champion.champ_class + "</li>" +
//               "<li>" + "<span class='stat'>" + "Health " + "</span>" +
//               champion.health + "</li>" +
//               "<li>" + "<span class='stat'>" + "Health Regen " + "</span>" +
//               champion.health_regen + "</li>" +
//               "<li>" + "<span class='stat'>" + "Magic " + "</span>" +
//               champion.magic + "</li>" +
//               "<li>" + "<span class='stat'>" + "Magic Regen " + "</span>" +
//               champion.magic_regen + "</li>" +
//               "<li>" + "<span class='stat'>" + "Attack Damage " + "</span>" +
//               champion.attack_damage + "</li>" +
//               "<li>" + "<span class='stat'>" + "Attack Speed " + "</span>" +
//               champion.attack_speed + "</li>" +
//               "<li>" + "<span class='stat'>" + "Attack Range " + "</span>" +
//               champion.attack_range + "</li>" +
//               "<li>" + "<span class='stat'>" + "Armor " + "</span>" +
//               champion.armor + "</li>" +
//               "<li>" + "<span class='stat'>" + "Magic Resist " + "</span>" +
//               champion.magic_resist + "</li>" +
//               "<li>" + "<span class='stat'>" + "Movement Speed " + "</span>" +
//               champion.movement + "</li>" +
//             "</ul>"
//           );
//           console.log(champion.title);
//
//         });
//       }).fail(function(xhr, text, error) {
//         console.error('failed to get champions: ' + text + ', ' + error);
//       });
