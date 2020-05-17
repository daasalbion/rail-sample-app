# frozen_string_literal: true

module Types
  class InvoiceType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :id, ID, null: false, description: 'Id of the product'
    field :invoicenumber, String, null: false, description: 'Cod of the product'
    field :total, Int, null: false, description: 'Name of the product'

  end
end
