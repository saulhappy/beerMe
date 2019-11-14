class UserBeersController < ApplicationController

    def index
        user_beers = UserBeer.all 
        render json: user_beers 
    end


    def show
        render json: UserBeer.find(params["id"])
    end

    def create
        new_user_beer = UserBeer.create(user_beer_params)
        render json: new_user_beer
    end

    def update
        UserBeer.find(params["id"]).update(user_beer_params)
        render json: UserBeer.find(params["id"])
    end

    def destroy
        render json: UserBeer.find(params["id"]).destroy
    end

    private
    
    def user_beer_params
        params.require(:user_beer).permit(:user_id, :beer_id)
    end






end
