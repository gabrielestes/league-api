var championList = $('.all-champions');
var typeButton = $('.type-search');
var assassinBox = $('.assassin-box input[type=checkbox]');
var fighterBox = $('.fighter-box input[type=checkbox]');
var mageBox = $('.mage-box input[type=checkbox]:checked');
var marksmanBox = $('.marksman-box input[type=checkbox]');
var supportBox = $('.support-box input[type=checkbox]');
var tankBox = $('.tank-box input[type=checkbox]');

function displayChampions(champion) {
  if($('ul.champion.name').length !== 0); {
    championList.append(
      "<h2>" + champion.name + ", " + champion.title + "</h2>" +
      "<ul class='list-group'>" +
        "<li class='list-group-item'>" + champion.champ_class + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Health: " + "</span>" +
        champion.health + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Health Regen: " + "</span>" +
        champion.health_regen + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Magic: " + "</span>" +
        champion.magic + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Magic Regen: " + "</span>" +
        champion.magic_regen + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Attack Damage: " + "</span>" +
        champion.attack_damage + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Attack Speed: " + "</span>" +
        champion.attack_speed + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Attack Range: " + "</span>" +
        champion.attack_range + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Armor: " + "</span>" +
        champion.armor + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Magic Resist: " + "</span>" +
        champion.magic_resist + "</li>" +
        "<li class='list-group-item'>" + "<span class='stat'>" + "Movement Speed: " + "</span>" +
        champion.movement + "</li>" +
      "</ul>"
    );

    displayChampionArt(champion.name);
    $('ul').addClass(champion.name);
  }
}

function displayChampionArt(name){
  var imageLink = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
      name + "_0.jpg";
    $('.champion-art').append(
      "<img src=" + imageLink + ">"
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
    $('.champion-art').empty();
    displayChampions(champion);
  }).fail(function(xhr, text, error) {
      console.error('failed to get champion: ' + text + ', ' + error);
    });
});

typeButton.click(function() {
  sortByType();
});
