//объект списка почтовых адресов

var emailList = {

  	showUnread: false,
  	sortDateOrder: false,

  	renderList: function() {

  		var showUnread = this.showUnread;

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

  	sortDate: function() {

  		if(this.sortDateOrder) {

  			this.emailList.sort(function(a, b) {
		    	return parseFloat(a.dateReceived) - parseFloat(b.dateReceived);
			});
  		} else {

  			this.emailList.sort(function(a, b) {
		    	return parseFloat(a.dateReceived) + parseFloat(b.dateReceived);
			});
  		}

  		this.sortDateOrder = !this.sortDateOrder;
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

switchUnreadElement = document.getElementById("sortDate");
switchUnreadElement.onclick = function() { emailList.sortDate(); }