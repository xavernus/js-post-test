//объект списка почтовых адресов

var EmailList = {

  	/*this.sortDateASC = function() {

  		var flag = true;

  		while(flag) {

  			this.emailList.forEach(function(email, index, list) {

  				if(typeof(list[index+1]) != 'undefined') {

  					if(list[index].dateReceived > list[index+1].dateReceived) {

  						flag = false;

  						var buffer = list[index+1];
  						list[index] = list[index+1];
  						list[index+1] = buffer;
  					}
  				}
  			});
  		}
  	}*/

  	this.showUnread = false;

  	this.switchUnread = function() {

  		console.log('switch unread');

  		this.showUnread = !this.showUnread;
  		this.renderList();
  	}

  	this.renderList = function() {

  		console.log('render list');

  		this.emailList.forEach(function(email) {

  			if(this.showUnread) {

  				if(!email.read) {

  					var emailDiv = document.createElement("div");
    				emailDiv.innerHTML = "<span>"+email.subject+"</span><br><span>"+email.fromName+"</span>";
    				document.getElementById("sidebar").appendChild(emailDiv);
  				}

  			} else {

  				var emailDiv = document.createElement("div");
    			emailDiv.innerHTML = "<span>"+email.subject+"</span><br><span>"+email.fromName+"</span>";
    			document.getElementById("sidebar").appendChild(emailDiv);
  			}
		});
  	};

  	this.loadList = function() {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/emails.json');
		xhr.send(null);

		xhr.onreadystatechange = function () {

		  	if (xhr.readyState === 4) {
		    	if (xhr.status === 200) {

		      		this.emailList = JSON.parse(xhr.responseText);
		      		this.renderList();
		      		
		    	} else {
		      		console.log('Error: ' + xhr.status);
		    	}
		  	}
		};
	}
}

//аякс-запрос к бэкенду при загрузке страницы

var myList = new EmailList();

myList.loadList();

//привязка событий

switchUnreadElement = document.getElementById("switchUnread");
switchUnreadElement.onclick = myList.switchUnread;