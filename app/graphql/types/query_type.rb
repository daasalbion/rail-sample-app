# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    # resolver query example
    field :product, resolver: Queries::ProductQuery
    field :products, [Types::ProductType], null: false, description: 'List of products'

    def products
      ::Product.all
    end
  end
end
