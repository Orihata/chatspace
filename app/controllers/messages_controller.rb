class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = @group.messages
  end
end
