$(function(){
  function addNewCommentToBottom(message){
    let html = `
    <div class="rightside__chatbox__partial" data-message-id="${message.id}">
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
      ${message.image ? `<img class="rightside__chatbox__partial__image" src="${message.image}">` : ""}
    </div>
    `;
    return html;
  }

  function scrollToBottom(){
    let long = $(".rightside__chatbox")[0].scrollHeight;
    $(".rightside__chatbox").animate({scrollTop:long});
  }

  function reloadMessages() {
    let last_message_id = $(".rightside__chatbox__partial:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        messages.forEach(function(message){
          let html = addNewCommentToBottom(message);
          $(".rightside__chatbox").append(html);
          scrollToBottom();
        })
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };

  if(document.URL.match("/messages")){
    setInterval(reloadMessages, 5000);
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    let formdata = new FormData(this);
    let url      = $(this).attr("action");
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
      $("#new_message")[0].reset();
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