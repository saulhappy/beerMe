class BeersController < ApplicationController

    def create 
        new_beer = Beer.create(name: params[:name],
        tagline: params[:tagline],
        abv: params[:abv],
        ibu: params[:ibu],
        ebc: params[:ebc],
        description: params[:description],
        food_pairing: params[:food_pairing],
        image_url: params[:image_url])

        render({json: new_beer})
        
    end

    def index

    end


end
