class CreateInvoiceDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :invoice_details do |t|
      t.references :invoice, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :cod
      t.integer :cant
      t.decimal :price

      t.timestamps
    end
  end
end
