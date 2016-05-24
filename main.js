function formatDate(time) {

  var dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  var date = new Date(time*1000);
  var currentTime = new Date();

  if((currentTime.getTime() - date.getTime()) < 24*60*60*1000) {

    var dateString = 'сегодня';

  } else if((currentTime.getTime() - date.getTime()) < 24*60*60*1000*2) {

    var dateString = 'вчера';

  } else {

    var dateString = date.toLocaleString("ru", dateOptions);
  }

  return dateString;
}

//объект списка почтовых адресов

var emailList = {

  	showUnread: false,
  	sortDateOrder: false,

  	showMail: function(index) {

  		document.getElementById("email-content").innerHTML = this.emailList[index].content;
      document.getElementById("email-subject").innerHTML = this.emailList[index].subject;
      document.getElementById("email-fromName").innerHTML = this.emailList[index].fromName;
      document.getElementById("email-fromEmail").innerHTML = this.emailList[index].fromEmail;
      document.getElementById("email-dateReceived").innerHTML = formatDate(this.emailList[index].dateReceived);
  	},

    renderItem: function(email, index) {

      var emailDiv = document.createElement("div");
      emailDiv.className += "email-item";

      if(!email.read) {

        emailDiv.className += " unread";
      }

      emailDiv.innerHTML = "<h3>"+email.fromName+"</h3><span class='email-date'>"+formatDate(email.dateReceived)+"</span><br><span>"+email.subject+"</span>";

      emailDiv.onclick = function() { emailList.showMail(index); }
      document.getElementById("sidebar").appendChild(emailDiv);
    },

  	renderList: function() {

  		var showUnread = this.showUnread;

  		document.getElementById("sidebar").innerHTML = "";

      var that = this;

  		this.emailList.forEach(function(email, index) {

  			if(showUnread) {

  				if(!email.read) {

  			    that.renderItem(email, index);
  				}

  			} else {

          that.renderItem(email, index);
  			}
		  });
  	},

  	switchUnread: function() {

  		this.showUnread = !this.showUnread;
  		this.renderList();
  	},

  	sortDate: function() {

  		if(!this.sortDateOrder) {

  			this.emailList.sort(function(a, b) {
		    	return parseFloat(a.dateReceived) - parseFloat(b.dateReceived);
			  });
  		} else {

  			this.emailList.sort(function(a, b) {
		    	return parseFloat(b.dateReceived) - parseFloat(a.dateReceived);
			  });
  		}

  		this.sortDateOrder = !this.sortDateOrder;
  		this.renderList();
  	},

    sortDateDesc: function() {

      this.emailList.sort(function(a, b) {
        return parseFloat(b.dateReceived) - parseFloat(a.dateReceived);
      });
    }
}

//аякс-запрос к бэкенду при загрузке страницы

var xhr = new XMLHttpRequest();
xhr.open('GET', '/emails.json');
xhr.send(null);

xhr.onreadystatechange = function() {

  	if (xhr.readyState === 4) {
    	if (xhr.status === 200) {

      		emailList.emailList = JSON.parse(xhr.responseText);
      		emailList.sortDateDesc();
          emailList.renderList();
      		
    	} else {
      		console.log('Error: ' + xhr.status);
    	}
  	}
};
darte = new Date();
console.log(darte.getTime());

//привязка событий

switchUnreadElement = document.getElementById("switchUnread");
switchUnreadElement.onclick = function() { 

  if(!emailList.showUnread) {
    switchUnreadElement.innerHTML = 'Показать все';
  } else {
    switchUnreadElement.innerHTML = 'Показать непрочитанные';
  }

  emailList.switchUnread(); 
}

switchDateSort = document.getElementById("sortDate");
switchDateSort.onclick = function() { 

  if(!emailList.sortDateOrder) {
    switchDateSort.innerHTML = 'Сортировать по дате: по убыванию';
  } else {
    switchDateSort.innerHTML = 'Сортировать по дате: по возрастанию';
  }

  emailList.sortDate(); 
}