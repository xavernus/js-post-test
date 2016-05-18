//объект списка почтовых адресов

var emailList = {

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

  	showUnread: false,

  	renderList: function() {

  		var showUnread = this.showUnread;

  		console.log('render list');

  		document.getElementById("sidebar").innerHTML = "";

  		this.emailList.forEach(function(email) {

  			if(showUnread) {

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
  	},

  	switchUnread: function() {

  		this.showUnread = !this.showUnread;
  		this.renderList();
  	},
}

//аякс-запрос к бэкенду при загрузке страницы

var xhr = new XMLHttpRequest();
xhr.open('GET', '/emails.json');
xhr.send(null);

xhr.onreadystatechange = function() {

  	if (xhr.readyState === 4) {
    	if (xhr.status === 200) {

      		emailList.emailList = JSON.parse(xhr.responseText);
      		emailList.renderList();
      		
    	} else {
      		console.log('Error: ' + xhr.status);
    	}
  	}
};

//привязка событий

switchUnreadElement = document.getElementById("switchUnread");
switchUnreadElement.onclick = function() { emailList.switchUnread(); }