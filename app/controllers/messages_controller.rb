class MessagesController < ApplicationController
before_action :set_group

  def index
    @messages = @group.messages.includes(:user)
    @new_message = Message.new
  end
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice:"メッセージを送信しました"}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      @new_message = Message.new
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

private
  def message_params
    params.require(:message).permit(:text,:image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
