# frozen_string_literal: true

module Types
  class ProductType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :id, ID, null: false, description: 'Id of the product'
    field :cod, String, null: false, description: 'Cod of the product'
    field :name, String, null: false, description: 'Name of the product'
    field :price, Int, null: false, description: 'Price of the product'

  end
end
