//объект списка почтовых адресов

function EmailList() {

  	/*this.sortDateASC = function() {

  		var flag = true;

  		while(flag) {

  			this.emailList.forEach(function(email) { 

  			});
  		}
  	}*/

  	this.renderList = function() {

  		console.log('render list');

  		this.emailList.forEach(function(email) {

			var emailDiv = document.createElement("div");
    		emailDiv.innerHTML = "<span>"+email.subject+"</span><br><span>"+email.fromName+"</span>";
    		document.getElementById("sidebar").appendChild(emailDiv);
		});
  	};
}

//аякс-запрос к бэкенду при загрузке страницы

var myList = new EmailList();

var xhr = new XMLHttpRequest();
xhr.open('GET', '/emails.json');
xhr.send(null);

xhr.onreadystatechange = function () {

  	if (xhr.readyState === 4) {
    	if (xhr.status === 200) {

      		myList.emailList = JSON.parse(xhr.responseText);
      		myList.renderList();
      		
    	} else {
      		console.log('Error: ' + xhr.status);
    	}
  	}
};