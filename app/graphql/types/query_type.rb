# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    # resolver query example
    field :product, resolver: Queries::ProductQuery
    field :products, [Types::ProductType], null: false, description: 'List of products'
    field :clients, [Types::ClientType], null: false, description: 'List of clients'

    def products
      Product.order('id DESC').all
    end

    def clients
      ::Client.all
    end
  end
end
