# frozen_string_literal: true

module Mutations
  class CreateProduct < Mutations::BaseMutation
    argument :product_input, Types::ProductInput, required: true
    # return
    field :errors, [String], null: false
    type Types::ProductType

    def resolve(product_input:)
      product = Product. new
      product.cod = product_input.cod
      product.name = product_input.name
      product.price = product_input.price
      product.save!
      product
    end
  end
end