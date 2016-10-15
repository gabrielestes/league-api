var championList = $('.all-champions');
var typeButton = $('.type-search');
var assassinBox = $('.assassin-box input[type=checkbox]');
var fighterBox = $('.fighter-box input[type=checkbox]');
var mageBox = $('.mage-box input[type=checkbox]:checked');
var marksmanBox = $('.marksman-box input[type=checkbox]');
var supportBox = $('.support-box input[type=checkbox]');
var tankBox = $('.tank-box input[type=checkbox]');

function displayChampions(champion) {
  championList.append(
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
  $('ul').addClass(champion.name);
  var classType = $("ul").attr("class");
  console.log(classType);
}

function displayByType(type) {
    console.log('display by type function begin');
    $.ajax({
      method: 'GET',
      url: '/api/champions',
      dataType: 'json',
      data: {}
    }).done(function(champions) {
      champions.forEach(function(champion){
        console.log(champion);
        if(champion.champ_class.includes(type)) {
          displayChampions(champion);
        }
      });
      }).fail(function(xhr, text, error) {
          console.error('failed to get champion: ' + text + ', ' + error);
        });
}

// SORTING BY TYPE
function sortByType() {
  if ($('input.assassin-box').is(':checked')) {
    displayByType('Assassin');
  }
  if ($('input.fighter-box').is(':checked')) {
    displayByType('Fighter');
  }
  if ($('input.mage-box').is(':checked')) {
    displayByType('Mage');
  }
  if ($('input.marksman-box').is(':checked')) {
    displayByType('Marksman');
  }
  if ($('input.support-box').is(':checked')) {
    displayByType('Support');
  }
  if ($('input.tank-box').is(':checked')) {
    displayByType('Tank');
  }
}

$('.search-button').click(function() {
  var name = $('.query').val();
  $('.query').val('');
  $.ajax({
    method: 'GET',
    url: '/api/champions/' + name + '',
    dataType: 'json',
    data: {}
  }).done(function(champion) {
    championList.empty();
    displayChampions(champion);
  }).fail(function(xhr, text, error) {
      console.error('failed to get champion: ' + text + ', ' + error);
    });
});

typeButton.click(function() {
  sortByType();
});
