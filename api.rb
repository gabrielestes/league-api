require 'sinatra'
require 'active_record'
require 'yaml'
require 'json'
require_relative 'models/champion'
require 'pg'
# require 'BCrypt'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

before do
  content_type :json
end

database_config = YAML::load(File.open('config/database.example.yml'))

after do
  ActiveRecord::Base.connection.close
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/api' do
  'Enter a champion.'
end

get '/api/champions' do
  champions = Champion.all
  p champions.to_json
  champions.to_json
end

get '/api/champions/:name' do |name|
  champion = Champion.find_by(name: name)
  champion.to_json
end

# post '/api/login' do
