$(function(){
  function addNewCommentToBottom(message){
    let html = `
    <div class="rightside__chatbox__partial">
      <div class="rightside__chatbox__partial__wrapper">
        <p class="rightside__chatbox__partial__wrapper--text">
          ${message.user_name}
        </p>
        <p class="rightside__chatbox__partial__wrapper--date">
          ${message.created_at}
        </p>
      </div>

      <p class="rightside__chatbox__partial__message">
          ${message.text}
      </p>
      <img class="rightside__chatbox__partial__image" src="${message.image}" alt="">
    </div>
    `;
    return html;
  }

  function scrollToBottom(){
    let long = $(".rightside__chatbox")[0].scrollHeight;
    $(".rightside__chatbox").animate({scrollTop:long});
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    let formdata = new FormData(this);
    let url      = $(this).attr("action");
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })    
    .done(function(message){
      let html = addNewCommentToBottom(message);
      $(".rightside__chatbox").append(html);
      $("#message_text").val("");
      $("#message_image").val("");
      scrollToBottom();
    })
    .fail(function () {
      alert('ファイルの取得に失敗しました。');
    })
    .always(function(){
      $(".rightside__messageform__submit").removeAttr("disabled");
    })
  })
})