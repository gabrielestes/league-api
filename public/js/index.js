var championList = $('.all-champions');
var typeButton = $('.type-search');
var assassinBox = $('.assassin-box input[type=checkbox]:checked');
var fighterBox = $('.fighter-box');
var mageBox = $('.mage-box');
var marksmanBox = $('.marksman-box');
var supportBox = $('.support-box');
var tankBox = $('.tank-box');

function displayChampions(champion) {
  championList.append(
    "<h2>" + champion.name + "</h2>" +
    "<ul class='${champion.name}'>" +
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
console.log('outside functions work');
if(assassinBox) {
  console.log('if statement works');
}

// SORTING BY TYPE
function sortByType() {
  console.log('sort by type function begin');
  if(assassinBox) {
    console.log('inside of if statement, before display funtion.');
    displayByType('Assassin');
    console.log('inside of if statement, after display by type');
  }
  // if(fighterBox.checked) {
  //   displayByType('Fighter');
  // }
  // if(mageBox.checked) {
  //   displayByType('Mage');
  // }
  // if(marksmanBox.checked) {
  //   displayByType('Marksman');
  // }
  // if(supportBox.checked) {
  //   displayByType('Support');
  // }
  // if(tankBox.checked) {
  //   displayByType('Tank');
  // }
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
