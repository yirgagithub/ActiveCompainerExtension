function onStart() {
  const port = chrome.runtime.connect({ name: "BrowserAction" });
  port.postMessage(rows);

  // port.onMessage.addListener(function(msg) {
  // 	console.log("message recieved" + msg);
  // });
}

// READ CLIPBOARD TEXT
const textArea = document.createElement('textarea'); //document.getElementById('textArea');
textArea.style.display = 'hidden';
textArea.style.position = 'fixed';
document.body.appendChild(textArea);
textArea.focus();
document.execCommand("paste");
const rows  = textArea.value.split(/\n/); //this is your clipboard data
document.body.removeChild(textArea);

const instructions = document.getElementById('instructions');
const emailTableBody = document.getElementById('emailTableBody');
const startButton = document.getElementById('startButton');

  instructions.style.display = 'none';

  emailTableBody.innerHTML = '';

  for (const line of rows) {
      
      var index = 0;
      var column = line.split(/\t/)
    
      const tr = document.createElement('tr');
      
      const td0 = document.createElement('td');
      td0.innerHTML =column[0];
      tr.appendChild(td0);

      const td1 = document.createElement('td');
      td1.innerHTML = column[1];
      tr.appendChild(td1);

      const td2 = document.createElement('td');
      td2.innerHTML = column[2];
      td2.w
      td2.width = '100px'
      tr.appendChild(td2);

      const td3 = document.createElement('td');
      td3.innerHTML = column[3];
      tr.appendChild(td3);

      const td4 = document.createElement('td');
      td4.innerHTML = column[4];
      tr.appendChild(td4);

      const td5= document.createElement('td');
      td5.innerHTML =column[5];
      tr.appendChild(td5);

      const td6 = document.createElement('td');
      td6.innerHTML = column[6];
      tr.appendChild(td6);

      const td7 = document.createElement('td');
      td7.innerHTML = column[7];
      tr.appendChild(td7);

      emailTableBody.appendChild(tr);
    
  }

  emailTable.style.display = 'block';

  startButton.style.display = 'block';
  startButton.addEventListener('click', onStart);
//}
/* else {
  instructions.style.display = 'block';
  emailTable.style.display = 'none';
  startButton.style.display = 'none';

  startButton.removeEventListener('click', onStart);
}
 */




// setInterval(function() {
// 	const timer = document.getElementById('timer');
// 	timer.innerHTML = new Number(timer.innerHTML) + 1;
//
// }, 1000);
