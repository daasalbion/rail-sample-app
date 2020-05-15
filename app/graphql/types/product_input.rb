# frozen_string_literal: true

module Types
  class ProductInput < GraphQL::Schema::InputObject
    description 'Create new Product'
    argument :cod, String, 'Cod', required: true
    argument :name, String, 'Name of the product', required: true
    argument :price, Int, 'Price of the product', required: true
  end
end
