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
        Comment.find(params["id"]).update(comment_params)
        render json: Comment.find(params["id"])
    end

    def destroy
        render json: Comment.find(params["id"]).destroy
    end

    private
    
    def comment_params
        params.permit(:comment_text, :comment, :beer_id, :user_id)
    end

    def comment_serializer
        {
            :only => [:comment_text, :beer_id, :user_id],
            :include => {:user => {
                :only => [:username]
            }}
        }
    end


end
