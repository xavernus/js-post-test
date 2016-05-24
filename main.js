window.animationIntervals = [];

//анимация появления

function animationShow(id, time, callback) {

  clearInterval(window.animationIntervals[id]);

  var elem = document.getElementById(id);

  elem.style.opacity = 0;
  elem.style.display = 'block';

  time = time/100;

  window.animationIntervals[id] = setInterval(function() {
    
    elem.style.opacity = parseFloat(elem.style.opacity) + 0.01;

    if(elem.style.opacity == 1) {
      console.log('clear');
      clearInterval(window.animationIntervals[id]);

      callback();
    }
  }, time);
}

//анимация исчезновения

function animationHide(id, time, callback) {

  clearInterval(window.animationIntervals[id]);

  var elem = document.getElementById(id);

  time = time/100;

  window.animationIntervals[id] = setInterval(function() {
    elem = document.getElementById(id);
    elem.style.opacity = parseFloat(elem.style.opacity) - 0.01;

    if(elem.style.opacity == 0) {
      clearInterval(window.animationIntervals[id]);
      elem.style.display = 'none';

      callback();
    }
  }, time);
}

//форматирование даты

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

    //вывод письма подробно

  	showMail: function(index) {

      var that = this;

      animationHide('content', 1000, function() {

        document.getElementById("email-content").innerHTML = that.emailList[index].content;
        document.getElementById("email-subject").innerHTML = that.emailList[index].subject;
        document.getElementById("email-fromName").innerHTML = that.emailList[index].fromName;
        document.getElementById("email-fromEmail").innerHTML = that.emailList[index].fromEmail;
        document.getElementById("email-dateReceived").innerHTML = formatDate(that.emailList[index].dateReceived);

        animationShow('content', 1000);
      });
  	},

    //вывод одного письма в списке слева

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

    //вывод списка слева

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

    //переключение непрочитанные/все

  	switchUnread: function() {

  		this.showUnread = !this.showUnread;
  		this.renderList();
  	},

    //переключение осртировки по дате

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

    //начальная сортировка по дате

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

//привязка событий к кнопкам "Показать непрочитанные" и "Сортировка по дате""

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