var mailSubjectInputs = [];
var mailSendButtons = [];

// Event when HTML change:
document.removeEventListener('DOMNodeInserted', processHtmlChange, true);
document.addEventListener('DOMNodeInserted', processHtmlChange, true);

function processHtmlChange() {
  if (window.location.href.indexOf('compose=') == -1) {
    return;
  }

  mailSubjectInputs = Array.from(document.querySelectorAll('input')).filter(el => el.placeholder === 'Subject' || el.placeholder === 'Asunto');

  mailSubjectInputs.forEach(mailSubjectInput => {
    mailSubjectInput.removeEventListener('change', subjectOnChange, true);
    mailSubjectInput.addEventListener('change', subjectOnChange, true);

    mailSubjectInput.removeEventListener('keyup', subjectOnChange, true);
    mailSubjectInput.addEventListener('keyup', subjectOnChange, true);

    mailSubjectInput.removeEventListener('click', subjectOnChange, true);
    mailSubjectInput.addEventListener('click', subjectOnChange, true);

    mailSubjectInput.removeEventListener('mouseup', subjectOnChange, true);
    mailSubjectInput.addEventListener('mouseup', subjectOnChange, true);
  }
  );

  mailSendButtons = Array.from(document.querySelectorAll('div .dC'))
    .filter(el => el.textContent === 'Send' || el.textContent === 'Enviar');

  subjectOnChange();
}

function subjectOnChange() {
  mailSubjectInputs.forEach(x => {
    var i = mailSubjectInputs.indexOf(x);
    mailSendButtons[i].style.display = mailSubjectInputs[i].value.trim() != '' ? '' : 'none';
  })
}



// Event for ctrl+enter:
window.removeEventListener('keydown', keydownEvent, true);
window.addEventListener('keydown', keydownEvent, true);

function keydownEvent(event) {
  //if ctrl + enter,
  if (event.ctrlKey && event.keyCode == 13) {
    /*First, get the correct mail editor window. */
    /*Then, evaluate subject.*/

    //minimal mail editor: ~40 pixels when is minimized, else ~400 pixels:
    var activeMail = Array.from(document.querySelectorAll('.AD')).sort((a, b) => b.clientHeight - a.clientHeight)[0];
    if (!activeMail || activeMail.clientHeight < 100) {
      //expanded, centered mail editor; active, i.e.: non display=none:
      activeMail = document.querySelectorAll('.aVN:not([style*="display"])')[0];
    }

    if (activeMail) {//check subject
      var subjectText = Array.from(activeMail.querySelectorAll('input'))
        .filter(el => el.placeholder === 'Subject' || el.placeholder === 'Asunto')[0].value.trim();
      if (subjectText == '') {
        event.preventDefault();
        event.stopPropagation();
        alert('No subject =|');
      }
    }
  }
}