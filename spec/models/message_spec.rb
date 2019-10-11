require 'rails_helper'

RSpec.describe Message, type: :model do
  describe "#create" do
    context "can save" do
      it "is valid when text is presence" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "is valid when image is presence" do
        message = build(:message, text: nil)
        expect(message).to be_valid
      end

      it "is valid when both text and image are presence" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context "cannot save" do
      it "is invalid neither text nor image is presence" do
        message = build(:message,text: nil,image: nil)
        message.valid?
        expect(message.errors[:text_or_image]).to include("を入力してください")
      end

      it "is invalid w/o user_id" do
        message = build(:message,user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

      it "is invalid w/o group_id" do
        message = build(:message,group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
    end
  end
end
