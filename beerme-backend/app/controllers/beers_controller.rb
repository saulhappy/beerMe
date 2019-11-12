class BeersController < ApplicationController

    def index
        beers = Beer.all 
        render json: beers
    end

    def show
        render json: Beer.find(params["id"]).to_json(beer_serializer)
    end


    def create 
        new_beer = Beer.create(beer_params)
        render json: new_beer
    end


    private

    def beer_serializer
        {
            :only => [:name, :tagline, :description, :image_url, :abv, :ibu, :ebc, :food_pairing]
        }
    end

    def beer_params
        params.require(:beer).permit(:id, :name, :tagline, :abv, :ibu, :ebc, :description, :image_url, :food_pairing => [])
    end
    
end
