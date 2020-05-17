# frozen_string_literal: true

module Mutations
  class DeleteProduct < Mutations::BaseMutation
    argument :id, ID, required: true
    # return
    field :errors, [String], null: false
    type Types::ProductType

    def resolve(id:)
      product = Product.find(id).destroy
      product
    end
  end
end