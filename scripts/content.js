window.onload = function () {
  this.changeMainView()

  this.createBackgroundList();

  this.fixMenu();

  this.alertMessage();  

  this.scaleModalDialogView();

  // this.addLinks();

};
function changeMainView(){
  view = document.getElementById("viewport");
  view.style.width = "50%";
  view.style.margin = "0 auto";
  view.style.opacity = "95%";

  header = document.getElementById("header");
  header.style.position = "fixed";
  header.style.top = "0";
  header.style.width = "50%";
  header.style.backgroundColor = "black";

  rootContainer = document.getElementById("rootcontainer");

  backNavBar = document.getElementById("MBackNavBar");
  backNavBar.style.backgroundColor = "black";
  positionRoot = () => {
    if(backNavBar.classList.contains("show")){
      rootContainer.style.paddingTop = "44px";
    }
    else{
      rootContainer.style.paddingTop = "81px";
    }
  }
  positionRoot();
  observer = new MutationObserver(() => {
    positionRoot();
  });
  observer.observe(backNavBar, {attributes: true, childList: true, subtree: true});
}

function fixMenu() {
  bookmarkFlyout = document.getElementById("bookmarks_flyout");
  observer = new MutationObserver(function () {
    menu = document.getElementsByClassName("popover_visible");
    if (menu.length != 0) {
      rootcontainer = document.getElementById("rootcontainer");
      rootcontainer.appendChild(menu[0]);
    }
  });
  observer.observe(bookmarkFlyout, { attributes: true });
}
function alertMessage() {
  messages = document.getElementById("messages_jewel_light");
  label = messages.getElementsByClassName("_59tg")[0];
  title = document.head.getElementsByTagName("title")[0];
  requestsJewel = document.getElementById("requests_jewel");

  changeTitle = () => {
    numMessages = label.innerText;
    if (numMessages != "0") {
      title.innerHTML = "(" + numMessages + ") Facebook";
    } else {
      title.innerHTML = "Facebook";
    }
  }
  changeTitle();
  observer = new MutationObserver(function () {
    changeTitle();
  });
  observer.observe(label, {
    childList: true,
  });
  observer.observe(requestsJewel, {
    attributes: true
  });
}

function scaleModalDialogView(){
  // modalDialogView = document.getElementById("modalDialogView");
  // mDialogHeader = document.getElementById("mDiaglofHeader");
  // observer = new MutationObserver(function(){
  //   if(modalDialogView.childElementCount === 1){
  //     modalDialogView.style.width = "50%";
  //     modalDialogView.style.margin = "0 auto";
  //     modalDialogView.style.opacity = "95%";
  //     mDialogHeader.style.width = "50%";
  //     mDialogHeader.style.position = "fixed";
  //   }

  // })
  // observer.observe(modalDialogView, {childList: true});
}

function addLinks(){
  links = document.createElement("div");
  google = createLinkElement("Google", "https://www.google.com/");
  links.appendChild(google);
  document.body.appendChild(google);

}
function createLinkElement(innerHTML, href){
  a = document.createElement("a");
  a.innerHTML = innerHTML;
  a.href = href;
  a.style.position = "fixed";
  a.style.top = "0";
  a.target = "_blank";
  return a;
}


function createBackgroundList(){
  form = document.createElement("form");
  form.name = "bg-list"
  
  form.style.position = "fixed";
  form.style.top = "0";
  form.style.backgroundColor = "rgba(0,0,0,0.65)";
  form.style.color = "white";
  form.style.opacity = "95%";
  form.style.borderRadius = "10px";
  form.style.padding = "10px";

  //changeBackgroundStyle();
  changeBackgroundStyle();
  createBackgroundSelection(form, "bg-selector", "ami1", "ami1.jpeg", "Ami 1", "radio");
  createBackgroundSelection(form, "bg-selector", "ami2", "ami2.jpg", "Ami 2", "radio");
  createBackgroundSelection(form, "bg-selector", "ami3", "ami3.jpg", "Ami 3", "radio");
  createBackgroundSelection(form, "bg-selector", "minako1", "minako1.jpg", "Minako 1", "radio");
  other = createBackgroundSelection(form, "bg-selector", "other", "other", "Custom (link):", "radio")
  createBackgroundSelection(other, "bg-selector", "other-text", "", "")
  p = document.createElement("p");
  p.innerHTML = "Blank = remove background <br><br> Choose a fit:";
  other.appendChild(p)

  document.body.appendChild(form);
  createBackgroundSelection(form, "bg-position", "fill", "cover", "Fill", "radio");
  createBackgroundSelection(form, "bg-position", "fit", "contain", "Fit", "radio");
  createBackgroundSelection(form, "bg-position", "stretch", "100% 100%", "Stretch", "radio");

  var radios = document.forms["bg-list"].elements["bg-selector"];
  for(radio in radios){
    radios[radio].onclick = function(){
      if(this.id != "other" && this.id != "other-text"){
        var imgURL = chrome.runtime.getURL("img/" + this.value);
        bodyStyle.backgroundImage = 'url("' + imgURL + '")';
      }
      else if(this.id == "other"){
        var imgURL = document.getElementById("other-text").value;
        bodyStyle.backgroundImage = 'url("' + imgURL + '")';

      }
      
      // alert(this.value);
    }
  }
  var bgPosRadios = document.forms["bg-list"].elements["bg-position"];
  for(r in bgPosRadios){
    bgPosRadios[r].onclick = function(){
      document.body.style.backgroundSize = this.value;
    }
  }
  
  
}

function changeBackgroundStyle(){
  bodyStyle = document.body.style;
  bodyStyle.backgroundRepeat = "no-repeat";
  bodyStyle.backgroundAttachment = "fixed";
  bodyStyle.backgroundPosition = "center";
  bodyStyle.backgroundSize = "contain";  
}

function createBackgroundSelection(parent, name, id, value, label, type="text"){
  r = document.createElement("input");
  r.type = type;
  r.name = name;
  r.id = id;
  r.value = value;

  l = document.createElement("label");
  l.for = id;
  l.innerHTML = label;

  d = document.createElement("div");
  d.appendChild(r);
  d.appendChild(l);
  parent.appendChild(d);
  return d;

}