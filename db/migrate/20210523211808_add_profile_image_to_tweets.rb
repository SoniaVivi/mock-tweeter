class AddProfileImageToTweets < ActiveRecord::Migration[6.1]
  def change
    add_column :tweets, :profile_image, :string
  end
end
