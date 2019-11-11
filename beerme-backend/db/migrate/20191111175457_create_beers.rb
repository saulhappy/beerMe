class CreateBeers < ActiveRecord::Migration[6.0]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :tagline
      t.float :abv
      t.float :ibu
      t.float :ebc
      t.text :description
      t.string :food_pairing
      t.string :image_url
      t.timestamps
    end
  end
end
