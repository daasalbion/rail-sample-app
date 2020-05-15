# frozen_string_literal: true

module Mutations
  class CreateProduct < BaseMutation
    argument :product_input, Types::ProductInput, required: true
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