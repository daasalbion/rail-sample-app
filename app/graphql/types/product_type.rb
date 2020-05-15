module Types
  class ProductType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :id, ID, null: false, description: 'Id of the product'
    field :name, String, null: false, description: 'Name of the product'

  end
end
