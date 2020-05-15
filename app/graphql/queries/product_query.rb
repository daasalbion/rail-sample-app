# frozen_string_literal: true

module Queries
  class ProductQuery < Queries::BaseQuery
    description 'Find a Product by ID'
    argument :id, ID, required: true
    type Types::ProductType, null: false

    def resolve(id:)
      ::Product.find(id)
    end
  end
end