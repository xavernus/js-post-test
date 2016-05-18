//объект списка почтовых адресов

var emailList = {

  	showUnread: false,
  	sortDateOrder: false,

  	showMail: function(index) {

  		document.getElementById("content").innerHTML = this.emailList[index].content;
  	},

  	renderList: function() {

  		var showUnread = this.showUnread;

  		document.getElementById("sidebar").innerHTML = "";

  		this.emailList.forEach(function(email, index) {

  			if(showUnread) {

  				if(!email.read) {

  					var emailDiv = document.createElement("div");
  					emailDiv.className += "email-item";
    				emailDiv.innerHTML = "<h3>"+email.fromName+"</h3><span>"+email.subject+"</span>";

    				emailDiv.onclick = function() { emailList.showMail(index); }

    				document.getElementById("sidebar").appendChild(emailDiv);
  				}

  			} else {

  				var emailDiv = document.createElement("div");
  				emailDiv.className += "email-item";
    			emailDiv.innerHTML = "<h3>"+email.fromName+"</h3><span>"+email.subject+"</span>";

    			emailDiv.onclick = function() { emailList.showMail(index); }

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

switchDateSort = document.getElementById("sortDate");
switchDateSort.onclick = function() { emailList.sortDate(); }