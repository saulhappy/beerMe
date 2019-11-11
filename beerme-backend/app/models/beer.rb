class Beer < ApplicationRecord
    has_many :user_beers
    has_many :comments
    has_many :ratings
    has_many :users, through: :user_beers

    def serialized
        self.to_json({
                include: {only: [:name, :tagline, :description, :image_url, :abv, :ibu, :ebc, :food_pairing]}
            })
      end
end
