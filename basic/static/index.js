document.getElementById("submit_btn").addEventListener("click", function() {
    var user_input = document.getElementById("user_input").value;
    
    if (user_input.trim() === "") {
        alert("請輸入問題！");
        return;
    }

    // 顯示使用者的問題
    var userMessage = document.createElement("div");
    userMessage.textContent = "你問: " + user_input;
    document.getElementById("messages").appendChild(userMessage);

    // 發送問題到後端
    fetch('/get_response', {
        method: 'POST',
        body: new URLSearchParams({
            'user_input': user_input
        })
    })
    .then(response => response.json())
    .then(data => {
        // 顯示 AI 回答
        var assistantMessage = document.createElement("div");
        if (data.response) {
            assistantMessage.textContent = "AI 回答: " + data.response;
        } else {
            assistantMessage.textContent = "AI 回答: 發生錯誤，請稍後再試。";
        }
        document.getElementById("messages").appendChild(assistantMessage);
    })
    .catch(error => {
        console.error("錯誤:", error);
        var assistantMessage = document.createElement("div");
        assistantMessage.textContent = "AI 回答: 發生錯誤，請稍後再試。";
        document.getElementById("messages").appendChild(assistantMessage);
    });
});
