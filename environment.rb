require 'active_record'
require 'pg'

configure :development do
  ActiveRecord::Base.establish_connection(
    adapter:  'postgresql',
    host:     'localhost',
    database: 'league',
    username: 'Gabriel'
  )
end
