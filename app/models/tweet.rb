class Tweet < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?
  belongs_to :parent
  has_many :children, class_name: 'Tweet'

  private

  def set_defaults
    #prettier-ignore
    self.body =
      "Click on any text to bring up an editor.
       To add a reply, click on the \"...\".
       To change the profile pic, click then drag your image into the box."
                                                          .gsub(/[\t\n\r]/, " ")
                                                          .gsub(/ {2,}/, " ")
    self.name = 'EdmondCatès'
    self.display_name = 'The Cat of Monte Cristo'
    self.posted_on = DateTime.parse('9 May, 2021 9:47AM')
    self.label = 'Twitter Web App'
    self.retweets = 18
    self.likes = 722
    self.profile_image = '/assets/cat.jpg'
  end
end
