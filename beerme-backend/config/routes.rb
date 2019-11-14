Rails.application.routes.draw do
  resources :beers

  resources :comments

  resources :users

  resources :user_beers

end
