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

  "click #download": function () {
    console.log("clicked download")
  },
  "click #trash": function() {
    console.log("clicked trash")
  },
  "click #left": function () {
    var e = document.getElementById("uploadForm");
    var e2 = document.getElementById("newDirForm");
    e.style.display = 'none';
    e2.style.display = 'none';
  }
});

Template.newDirForm.events({
  "click #newdirSubmit": function(e) {
    val = $(".newdir-form input").val();
    dir_map = Session.get("cwd");
    Files.insert({"kFilesUserID": Session.get("uid"), "kFilesParent": dir_map, "kFilesName": val, "kFilesIsDir": 1});
  }
});
