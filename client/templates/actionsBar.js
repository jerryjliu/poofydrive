Template.actionsBar.events({
  "click #upload": function () {
       var e = document.getElementById("uploadForm");
       var e2 = document.getElementById("newDirForm");
       console.log(e);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else {
          e.style.display = 'block';
          e2.style.display= 'none';
        }
    },
  "click #add": function () {
       var e = document.getElementById("newDirForm");
       var e2 = document.getElementById("uploadForm");
       console.log(e);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else {
          e.style.display = 'block';
          e2.style.display= 'none';
        }
    },

  "click #left": function () {
    var e = document.getElementById("uploadForm");
    var e2 = document.getElementById("newDirForm");
    e.style.display = 'none';
    e2.style.display = 'none';
  }
});