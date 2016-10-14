require 'active_record'
require 'pg'
require_relative '../../environment'

# adds tasks table
class CreateChampions < ActiveRecord::Migration[5.0]
  def up
    create_table :champions do |t|
      t.string :name
      t.string :title
      t.string :champ_class
      t.integer :health
      t.float :health_regen
      t.integer :magic
      t.float :magic_regen
      t.float :attack_damage
      t.float :attack_speed
      t.integer :attack_range
      t.float :armor
      t.float :magic_resist
      t.integer :movement
    end
  end

  def down
    drop_table :champions
  end
end

def main
  action = (ARGV[0] || :up).to_sym
  CreateChampions.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
