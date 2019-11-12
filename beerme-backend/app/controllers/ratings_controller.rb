class RatingsController < ApplicationController

    def index
        ratings = Ratings.all 
        render json: ratings
    end


    def show
        render json: Rating.find(params["id"])
    end

    def create
        new_rating = Rating.create(rating_params)
        render json: new_rating
    end

    def update
        Rating.find(params["id"]).update(rating_params)
        render json: Rating.find(params["id"])
    end

    def destroy
        render json: Rating.find(params["id"]).destroy
    end

    private
    
    def rating_params
        params.require(:rating).permit(:stars, :user_id, :beer_id)
    end


end
