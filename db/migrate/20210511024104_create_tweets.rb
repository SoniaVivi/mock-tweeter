class CreateTweets < ActiveRecord::Migration[6.1]
  def change
    create_table :tweets do |t|
      t.string :name
      t.string :display_name
      t.text :body
      t.datetime :posted_on
      t.integer :retweets
      t.integer :likes
      t.string :label

      t.timestamps
    end
  end
end
