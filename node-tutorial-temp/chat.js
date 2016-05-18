window.onload = function () {

	var textView   	= document.getElementById("text-view"),
		buttonSend 	= document.getElementById("send-button"),
		buttonStop 	= document.getElementById("stop-button"),
		label 		= document.getElementById("status-label");

	var socket = new WebSocket("ws://localhost:8888/");

	socket.onopen = function (event) {
		label.innertHtml = "Connection open";
	};

	socket.onmessage = function (event) {
		if (typeof event.data === "string") {
			label.innerHtml = label.innertHtml + "<br />Server says: <strong>" + event.data + "</strong>";
		}
	};

	socket.onclose = function () {
		var code 		= event.code;
		var reason 		= event.reason;
		var wasClean 	= event.wasClean;

		if (wasClean) {
			label.innertHtml = "Connection closed normally.";
		} else {
			label.innertHtml = "Connection closed with message: " + reason + " (Code: )" + code + ")";
		}
	};

	socket.onerror = function (event) {
		label.innertHtml = "Error: " + event;
	};

	buttonStop.onclick = function (event) {
		if (socket.readyState == WebSocket.OPEN) {
			socket.close();
		}
	};

	buttonSend.onclick = function (event) {
		sendMessage();
	};

	function sendMessage() {
		if (socket.readyState == WebSocket.OPEN) {
			socket.send(textView.value);
		}

		label.innertHtml = label.innertHtml + "<br />You say: " + textView.Value;
		textView.Value = "";
	};
}
