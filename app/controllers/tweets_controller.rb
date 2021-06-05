class TweetsController < ApplicationController
  def new
    @tweet =
      Tweet
        .new
        .attributes
        .transform_keys(&->(key) { key.camelize(:lower) })
        .merge({ replies: 0 })
  end
  def create; end
end
