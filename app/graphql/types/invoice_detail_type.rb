# frozen_string_literal: true

module Types
  class InvoiceDetailType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :id, ID, null: false, description: 'Id of the product'
    field :cant, Int, null: false, description: 'Name of the product'

  end
end
