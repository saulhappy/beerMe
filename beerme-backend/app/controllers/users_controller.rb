class UsersController < ApplicationController
   
    def create
        new_user = User.create(user_params)
        render json: new_user
    end

    def show
        render json: User.find(params["id"])
    end

    private
    
    def user_params
        params.require(:user).permit(:username)
    end

end
