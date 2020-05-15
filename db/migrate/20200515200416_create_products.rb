class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :cod
      t.string :name
      t.decimal :price

      t.timestamps
    end
  end
end
