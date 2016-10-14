require 'sinatra'
require 'active_record'
require 'yaml'
require 'json'
require 'pg'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

before do
  content_type :json
end

database_config = YAML::load(File.open('config/database.yml'))

after do
  ActiveRecord::Base.connection.close
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/api' do
  'Enter a champion.'
end

# ALL champions
get '/api/champions' do
  champions = Champion.all
  champions.to_json
end

# FIND CHAMPION
get '/api/champions/:id' do |id|
  champion = Champion.find_by(id: id)
  
end
