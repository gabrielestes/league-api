require 'HTTParty'
require 'pry'
require 'pg'
require 'active_record'
require_relative '../models/champion'

# all_data = (HTTParty.get('http://ddragon.leagueoflegends.com/cdn/6.20.1/data/en_US/champion.json'))['data']
# data = all_data['data']

# gathers and stores data into table
class ChampionData

  def initialize
    @data = (HTTParty.get('http://ddragon.leagueoflegends.com/cdn/6.20.1/data/en_US/champion.json'))['data']
  end

  def calc_attack_speed
    @data.each do |champ, values|
      offset = values['stats']['attackspeedoffset']
      attack_speed = (0.625 / (1 - offset)).round(2)
      values['stats']['attackspeedoffset'] = attack_speed
    end
  end

  def load_from_url
    # names = data.keys
    @data.each do |champ, values|
      stats = values['stats']
      name = values['name']
      title = values['title']
      champ_class = values['tags'].join(', ')
      health = stats['hp']
      health_regen = stats['hpregen']
      magic = stats['mp']
      magic_regen = stats['mpregen']
      attack_damage = stats['attackdamage']
      attack_speed = stats['attackspeedoffset']
      attack_range = stats['attackrange']
      armor = stats['armor']
      magic_resist = stats['spellblock']
      movement = stats['movespeed']
      img_slug = values['id']
      p attack_speed

      Champion.create(
        name: name,
        title: title,
        champ_class: champ_class,
        health: health,
        health_regen: health_regen,
        magic: magic,
        magic_regen: magic_regen,
        attack_damage: attack_damage,
        attack_speed: attack_speed,
        attack_range: attack_range,
        armor: armor,
        magic_resist: magic_resist,
        movement: movement,
        img_slug: img_slug
      )
    end
  end
end

def main
  champ = ChampionData.new
  champ.calc_attack_speed
  champ.load_from_url
end

main if __FILE__ == $PROGRAM_NAME

# <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/#{champ}_0.jpg"></img>
