class TweetsController < ApplicationController
  def new
    @tweet =
      Tweet.new.attributes.transform_keys(&->(key) { key.camelize(:lower) })
  end
  def create; end
end
