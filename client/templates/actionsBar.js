Template.actionsBar.events({
  "click #upload": function () {
       var e = document.getElementById("uploadForm");
       console.log(e);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }
});