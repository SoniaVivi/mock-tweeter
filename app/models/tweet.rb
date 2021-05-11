class Tweet < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?

  private

  def set_defaults
    #prettier-ignore
    self.body =
      "Lorem ipsum dolor sit amet, eos ex omnesque adipiscing. Dicat feugiat
      explicari sit no, in pro facilisis moderatius philosophia.".gsub(/[\t\n\r]/, " ")
                                                          .gsub(/ {2,}/, " ")
    self.name = 'EdmondDantès'
    self.display_name = 'The Count of Monte Cristo'
    self.posted_on = DateTime.parse('9 May, 2021 9:47AM')
    self.label = 'Twitter Web App'
    self.retweets = 18
    self.likes = 722
  end
end
