	var Generator_ErrorMessage_ChosenLine;
function Generator_ErrorMessage_PrintTitle(){
		const request = new XMLHttpRequest();
		request.open("GET", "Assets/404_messages.txt", false);
		request.send();
		const messages = request.responseText.split("\n");
		console.log(messages);
		var Generator_ErrorMessage_RandomIndex = Math.floor(Math.random() * messages.length);
		Generator_ErrorMessage_ChosenLine = Generator_ErrorMessage_RandomIndex;
		var Generator_ErrorMessage_Line_WordByWord = messages[Generator_ErrorMessage_RandomIndex].split("");
		console.log(Generator_ErrorMessage_Line_WordByWord);
		var Generator_ErrorMessage_WordCount = 0;
		var Generator_ErrorMessage_WordCount_Max = Generator_ErrorMessage_Line_WordByWord.length;
		
		// Clear the existing text in the error title
		document.getElementById("pageElement_Error_Title").innerHTML = "";
		
		// Iterate through the words in the error message using a loop
		for (var i = 0; i != Generator_ErrorMessage_WordCount_Max; i++) {
			(function(wordIndex) {
				setTimeout(() => {
					Generator_ErrorMessage_Print_Word(wordIndex);
				}, 20 * wordIndex);
			})(i);
		}
		Generator_ErrorMessage_PrintSubtitle();
		function Generator_ErrorMessage_Print_Word(wordIndex) {
			document.getElementById("pageElement_Error_Title").innerHTML += Generator_ErrorMessage_Line_WordByWord[wordIndex];
			/* if (Generator_ErrorMessage_Line_WordByWord[wordIndex + 1] == " "){
				document.getElementById("pageElement_Error_Title").innerHTML += " ";
			} */
		}
		
	}
	function Generator_ErrorMessage_PrintSubtitle(){
		const request2 = new XMLHttpRequest();
		request2.open("GET", "Assets/404_messages_subtitle.txt", false);
		request2.send();
		const messages2 = request2.responseText.split("\n");
		console.log(messages2);
		var Generator_ErrorMessage_Subtitle_Index = Generator_ErrorMessage_ChosenLine;
		var Generator_ErrorMessage_Line_Subtitle_WordByWord = messages2[Generator_ErrorMessage_Subtitle_Index].split(" ");
		console.log(Generator_ErrorMessage_Line_Subtitle_WordByWord);
		var Generator_ErrorMessage_Subtitle_WordCount = 0;
		var Generator_ErrorMessage_Subtitle_WordCount_Max = Generator_ErrorMessage_Line_Subtitle_WordByWord.length;
		
		// Clear the existing text in the error title
		document.getElementById("pageElement_Error_Subtitle").innerHTML = "";
		
		// Iterate through the words in the error message using a loop
		for (var i = 0; i != Generator_ErrorMessage_Subtitle_WordCount_Max; i++) {
			(function(wordIndex) {
				setTimeout(() => {
					Generator_ErrorMessage_Print_Word_Subtitle(wordIndex);
				}, 50 * wordIndex);
			})(i);
		}
		
		function Generator_ErrorMessage_Print_Word_Subtitle(wordIndex) {
			document.getElementById("pageElement_Error_Subtitle").innerHTML += Generator_ErrorMessage_Line_Subtitle_WordByWord[wordIndex] + " ";
			/* if (Generator_ErrorMessage_Line_WordByWord[wordIndex + 1] == " "){
				document.getElementById("pageElement_Error_Title").innerHTML += " ";
			} */
		}
	}



