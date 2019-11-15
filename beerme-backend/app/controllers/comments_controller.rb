class CommentsController < ApplicationController

    def index
        comments = Comment.all 
        render json: comments.to_json(comment_serializer)

    end


    def show
        render json: Comment.find(params["id"]).to_json(comment_serializer)
    end

    def create
        new_comment = Comment.create(comment_params)
        render json: new_comment
    end

    def update
        comment = Comment.find(params["id"]).update(comment_params)
        render json: comment
    end

    def destroy
        render json: Comment.find(params["id"]).destroy
    end

    private
    
    def comment_params
        params.permit(:id, :comment_text, :beer_id, :user_id, {:user => []})
    end

    def comment_serializer
        {
            :only => [:id, :comment_text, :beer_id, :user_id],
            :include => {:beer => {
                :only => [:name]
            }},
            :include => {:user => {
                :only => [:username]
            }},
            :include => {:beer => {
                :only => [:name]
            }}
        }
    end


end
