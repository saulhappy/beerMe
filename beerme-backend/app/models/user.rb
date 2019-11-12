class User < ApplicationRecord
    has_many :comments
    has_many :user_beers
    has_many :ratings
    has_many :beers, through: :user_beers
    validates :username, presence: true, uniqueness: true
end
