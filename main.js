//аякс-запрос к бэкенду при загрузке страницы

var emailList = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', '/emails.json');
xhr.send(null);

xhr.onreadystatechange = function () {

  	if (xhr.readyState === 4) {
    	if (xhr.status === 200) {

      		var emailList = JSON.parse(xhr.responseText);

      		emailList.forEach(function(email) {
  				
  				var emailDiv = document.createElement("div");

        		emailDiv.innerHTML = "<span>"+email.subject+"</span><br><span>"+email.fromName+"</span>";

        		document.getElementById("sidebar").appendChild(emailDiv);
			});

    	} else {
      		console.log('Error: ' + xhr.status);
    	}
  	}
};