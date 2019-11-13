class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :beer
    serialize :user
end
