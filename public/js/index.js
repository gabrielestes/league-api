var championList = $('.all-champions-container');
var typeButton = $('.type-search');
var assassinBox = $('.assassin-box input[type=checkbox]');
var fighterBox = $('.fighter-box input[type=checkbox]');
var mageBox = $('.mage-box input[type=checkbox]:checked');
var marksmanBox = $('.marksman-box input[type=checkbox]');
var supportBox = $('.support-box input[type=checkbox]');
var tankBox = $('.tank-box input[type=checkbox]');

$('#wait').hide();

function displayChampions(champion) {
  var imageLink = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
    champion.img_slug + "_1.jpg";
  championList.hide().append(
    "<div class='single-champion'>" +
      "<h2 class='name'>" + champion.name + ", " + champion.title + "</h2>" +
      "<div class='champion-info col-sm-4'>" +
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
        "</ul>" +
      "</div>" +

      "<div class='champion-art'>" +
        "<span class='art'>" +
        "<img src=" + imageLink + ">" +
        "</span>" +
      "</div>" +
    "</div>"
  ).fadeIn(500);
    // displayChampionArt(champion.name);
    // $('ul').addClass(champion.name);
}

function displayChampionArt(name){
  var imageLink = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
      name + "_1.jpg";
    $('.champion-art').append(
      "<span class='art'>" +
      "<img src=" + imageLink + ">" +
      "</span>"
    );
}

function displayByType(types) {
  console.log('display by type function begin');
  console.log(types);
  championList.html('<img src="images/spin.svg" id="wait" alt="Loading" />');
  $.ajax({
    method: 'GET',
    url: '/api/champions',
    dataType: 'json',
    data: {}
  }).done(function(champions) {
    console.log(champions);
    champions.forEach(function(champion){
      var classes = champion.champ_class.split(', ');
      for(var i = 0; i < classes.length; i++){
        var k_class = classes[i];
        if(types.indexOf(k_class) !== -1) {
          $('#wait').remove();
          console.log(champion);
          displayChampions(champion);
          break;
        }
      }
    });
  }).fail(function(xhr, text, error) {
      console.error('failed to get champion: ' + text + ', ' + error);
    });
}

// SORTING BY TYPE
function sortByType() {
  var types = [];
  console.log('sort by type was called');
  if ($('input.assassin-box').is(':checked')) {
    types.push('Assassin');
  }
  if ($('input.fighter-box').is(':checked')) {
    types.push('Fighter');
  }
  if ($('input.mage-box').is(':checked')) {
    types.push('Mage');
  }
  if ($('input.marksman-box').is(':checked')) {
    types.push('Marksman');
  }
  if ($('input.support-box').is(':checked')) {
    types.push('Support');
  }
  if ($('input.tank-box').is(':checked')) {
    types.push('Tank');
  }
  console.log(types);
  displayByType(types);
}



$('.search-button').click(function() {
  championList.html('<img src="images/spin.svg" id="wait" alt="Loading" />');
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
  $('#wait').show();
  sortByType();
  // $('#wait').hide();
});
