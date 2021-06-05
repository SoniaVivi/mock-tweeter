class AddParentToTweets < ActiveRecord::Migration[6.1]
  def change
    add_reference :tweets, :parent, foreign_key: false
  end
end
