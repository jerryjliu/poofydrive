Template.actionsBar.events({
  "click #upload": function () {
     var e = document.getElementById("uploadForm");
     console.log(e);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  },
  "click #add": function () {
    var e = document.getElementById("newDirForm");
     console.log(e);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  },

  "click #download": function () {
    console.log("clicked download")
  },
  "click #trash": function() {
    console.log("clicked trash")
  }
});