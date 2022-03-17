

function sleep(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  })
}

 function functionSelectDate(datePicks, columns){
  let isSelected = false;
  for(let i = 0; i < datePicks.length -1; i++){
    let element = datePicks[i]
    if(element.innerHTML == parseInt(columns[3].substring(3,5)) && element.getAttribute('class').indexOf('disabled') == -1){
      element.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
      isSelected = true;
      break;
    }
  }

  return isSelected;
}

(async function() {

  console.log('content first line')
  console.log("rows", rows); 
  let columns = rows.split(/\t/);
  console.log("columns", columns)
  let createNewCampaign = null;

  let campaignName = null;
  let campaignType = null;
  let compaignTypeNext = null;

  let listCampaignSelected = null;
  let campaignListNext = null;

  let designCompaign = null;
  let customDesignChoose = null;
  let customDesignContinue = null;
  let campaignDesignNext = null;

  let senderDetailFromName = null;
  let senderDetailEmail = null;
  let senderDetailSubject = null;
  let senderDetailContinue = null;

  let campaignMessage = null;
  let campaignMessageCheck = null;
  let campaignMessageNext = null;

  let campaignDate = null;
  let campaingDateDropdown = null;
  let campaignHour = null;
  let campaignMinute = null;
  let campaignScheduleToggle = null;
  let campaignSend = null;
 
let url =  window.location.href

if(url.indexOf('campaign_new') > 0 && url.indexOf('campaign_new_list') < 0 && url.indexOf('campaign_new_message') < 0
   && url.indexOf('campaign_new_summary') < 0 && url.indexOf('campaign_new_result') < 0)
{
  const typeCampaignProgress = new Promise(resolve => {
    let readyIntervalId = null;
    readyIntervalId = setInterval( () =>{

      campaignName = document.getElementById('campaign_name')
      let campaignTypeContainer = document.querySelector('.campaign-types-container camp-flex').children[0]
      campaignType = campaignTypeContainer.children[0]
      compaignTypeNext = document.querySelector('.ac_button.next.alt1.alt2')
      if(campaignName && campaignType){
        clearInterval(readyIntervalId)
        resolve(true)
      }
    },1000)

  })

  await typeCampaignProgress
  await sleep(2000)
  console.log('Type campain progress')
  console.log(rows)
  
  campaignName.value = columns[6]
  campaignName.dispatchEvent(new Event('change',{"bubbles": true, "cancelable": false}))
  await sleep(1000);

  campaignType.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  await sleep(1000)

  await sleep(2000)
  compaignTypeNext.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
 
}else if(url.indexOf('campaign_new_list') > 0){
   

  let listCampaignProgress = new Promise(resolve => {
    let readyIntervalId = null;
    readyIntervalId = setInterval(() => {
      listCampaignSelected = document.querySelectorAll('.ac_lists.new-campaign-lists .lists-selection-listing table tr')
      campaignListNext = document.querySelector('.ac_button.next.alt1.alt2') 
      if(listCampaignSelected && campaignListNext){
        clearInterval(readyIntervalId)
        resolve(true)
      }
    },1000)
  })

  await listCampaignProgress
  await sleep(2000)
  var inputCheckBox = listCampaignSelected[columns[0]].children[0].children[0]
  if(inputCheckBox.checked != true){
    inputCheckBox.click();
  }
  
  
  await sleep(1000)
  campaignListNext.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  
}else if(url.indexOf('layout') > 0){


  let designCampaignProgress = new Promise( resolve => {
    let readyIntervalId = null;
    readyIntervalId = setInterval( () => {
      designCompaign = document.querySelector('button.is-styled.css-teo77y')
      if(designCompaign){
        clearInterval(readyIntervalId)
        resolve(true)
      }
    },1000)
  })

  await designCampaignProgress
  await sleep(2000)

  designCompaign.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  

  let customDesignPopup = new Promise(resolve => {
    let readyIntervalId = null;
    readyIntervalId  = setInterval( () => {
      customDesignChoose = document.getElementsByClassName('c-Modal-body')[0].children[0].children
      customDesignContinue = document.querySelectorAll('.c-Modal-footer button')[1]
      if(customDesignChoose && customDesignContinue){
        clearInterval(readyIntervalId)
        resolve(true)
      }
      
    }, 1000)
  })

  await customDesignPopup
  await sleep(2000)

  for(let i = 0; i < customDesignChoose.length ; i++){
    if(customDesignChoose[i].getAttribute('data-testid').indexOf('option-html') == 0){
      customDesignChoose[i].dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
      console.log(customDesignChoose[i])
      console.log(customDesignChoose[i].getAttribute('data-testid'))
    }
  }
    await sleep(1000)

  customDesignContinue.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  await sleep(1000)


  let senderDetailsPopup = new Promise( resolve => {
    let readyIntervalId = null;
    readyIntervalId  = setInterval( () => {
      senderDetailFromName = document.querySelectorAll('.c-Modal-body input')[0]
      senderDetailEmail = document.querySelectorAll('.c-Modal-body input')[1]
      senderDetailSubject =  document.querySelectorAll('.c-Modal-body input')[2]
      senderDetailContinue = document.querySelectorAll('.c-Modal-footer button')[1]
      if(senderDetailContinue && senderDetailSubject && senderDetailEmail && senderDetailFromName){
        clearInterval(readyIntervalId)
        resolve(true)
      }
      
    },1000)
  })

  await senderDetailsPopup
  await sleep(2000)

  senderDetailFromName.value = columns[1]
  senderDetailFromName.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": false}))
  await sleep(1000)

  senderDetailEmail.value = columns[2]
  senderDetailEmail.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": false}))
   await sleep(1000)

  senderDetailSubject.value = columns[6]
  senderDetailSubject.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": false}))
  await sleep(1000)
  
  senderDetailContinue.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  await sleep(1000)
}else if(url.indexOf('campaign_new_message') > 0){
 
  let campaignMessageProgress = new Promise(resolve => {
    let readyIntervalId = null;
    readyIntervalId = setInterval( () => {
      campaignMessage = document.querySelector('textarea.ace_text-input')
      campaignMessageCheck = document.querySelectorAll('#messageEditorContainer .ace_layer.ace_text-layer .ace_line')
      campaignMessageNext = document.querySelector('.ac_button.next.alt1.alt2')
      if(campaignMessage && campaignMessageCheck && campaignMessageNext){
        clearInterval(readyIntervalId)
        resolve(true)
      }
    },1000)
  })

  await campaignMessageProgress
  await sleep(2000)
  
  if(INDEX == 0){
    campaignMessage.value = columns[7]
    campaignMessage.dispatchEvent(new Event('input', {"bubbles": true, "cancelable": false}))
    INDEX = INDEX+1;
    
  }

  campaignMessageNext.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  
}else if(url.indexOf('campaign_new_summary') > 0){
 
  let campaignSummaryProgress = new Promise( resolve =>{
    let readyIntervalId = null;
    readyIntervalId = setInterval(() => {

      campaignDate = document.getElementById('campaign_scheduledate');
      campaignHour = document.querySelectorAll('#campaign_schedulehour')
      campaignMinute = document.querySelectorAll('#campaign_scheduleminute')
      campaignSend = document.querySelector('.ac_button.next.alt1.alt2')
      campaignScheduleToggle = document.querySelector('#campaign_schedule_div .ac_toggle input')
      if(campaignScheduleToggle && campaignSend && campaignMinute && campaignHour && campaignDate){
        clearInterval(readyIntervalId)
        resolve(true)
      }
    },1000)
  })

  await campaignSummaryProgress
  await sleep(2000)

  if(campaignScheduleToggle.parentElement.getAttribute('class').indexOf('switch_off') >= 0){
    campaignScheduleToggle.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  }

  if(INDEX == 0){

    INDEX = INDEX+1
    campaignDate.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
    await sleep(1000)
    campaingDateDropdown = document.querySelector('#scheduledate_options')      
    campaingDateDropdown.children[3].children[0].click()
    await sleep(1000)

    let currentMonth = new Date().getMonth()
    let inputMonth = parseInt(columns[3].substring(0,2))
    let label = document.querySelector('.datepicker-days .datepicker-switch').innerHTML
    let next = document.querySelector('.datepicker-days .next')
    let prev = document.querySelector('.datepicker-days .prev')

    let datePicks = document.querySelectorAll('.datepicker-days tr td');

    let foundMonth = false;

    while(foundMonth == false){
      let selected = false;
      if(label.indexOf('January') != -1 && inputMonth == 1){
        selected = functionSelectDate(datePicks, columns)   
        foundMonth = true
      }else if(label.indexOf('February') != -1 && inputMonth == 2){
        selected = functionSelectDate(datePicks, columns)  
        foundMonth = true
      } else if(label.indexOf('March') != -1 && inputMonth == 3){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }else if(label.indexOf('April') != -1 && inputMonth == 4){
        selected = functionSelectDate(datePicks, columns)  
        foundMonth = true
      } else if(label.indexOf('May') != -1 && inputMonth == 5){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }else if(label.indexOf('June') != -1 && inputMonth == 6){
        selected = functionSelectDate(datePicks, columns)  
        foundMonth = true
      } else if(label.indexOf('July') != -1 && inputMonth == 7){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }else if(label.indexOf('August') != -1 && inputMonth == 8){
        selected = functionSelectDate(datePicks, columns)  
        foundMonth = true
      } else if(label.indexOf('September') != -1 && inputMonth == 9){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }else if(label.indexOf('October') != -1 && inputMonth == 10){
        selected = functionSelectDate(datePicks, columns)  
        foundMonth = true
      } else if(label.indexOf('November') != -1 && inputMonth == 11){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }else if(label.indexOf('December') != -1 && inputMonth == 12){
        selected = functionSelectDate(datePicks, columns)
        foundMonth = true
      }
      if(selected == false){
        next.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
        label = document.querySelector('.datepicker-days .datepicker-switch').innerHTML
        datePicks = document.querySelectorAll('.datepicker-days tr td');
      }
    }
  }
  await sleep(5000)
  

  //campaignDate.value = columns[3]
  //campaignDate.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": false}))

  console.log('column 4', columns[4])
  console.log('column 5', columns[5])

  campaignHour[0].children[0].dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  await sleep(2000)
  let hourDropDowns = campaignHour[0].children[1].children[0].children
  for(let i =0; i< hourDropDowns.length; i++){
    let element = hourDropDowns[i]
    if(element.value == columns[4]){
      element.children[0].dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
    }
  }
  await sleep(2000)

  campaignMinute[0].children[0].dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
  await sleep(2000)
  let minuteDropDowns =  campaignMinute[0].children[1].children[0].children
  for(let i =0; i< minuteDropDowns.length; i++){
    let element = minuteDropDowns[i]
    if(element.value == columns[5]){
      element.children[0].dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))
    }
  }

  await sleep(2000)

  campaignSend.dispatchEvent(new Event('click', {"bubbles": true, "cancelable": false}))

  await sleep(2000)
  
}else if(url.indexOf('campaign/') != -1 || url.indexOf('campaign_new_result') != -1){
  
  await sleep(6000)

  if(CONTINUE == 0){
    chrome.runtime.sendMessage("success");
    CONTINUE = CONTINUE + 1 
  }
}

})();
