Template.actionsBar.events({
  /*"click #upload": function () {
       var e = document.getElementById("uploadForm");
       console.log(e);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    },
  "click #upload": function () {
    $( "#upload" ).accordion();
  },*/
  "click .accordion-section-title": function(e) {
      // Grab current anchor value
      var currentAttrValue = $(this).attr('href');

      if($(e.target).is('.active')) {
          $('.accordion .accordion-section-title').removeClass('active');
          $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
      }else {
          $('.accordion .accordion-section-title').removeClass('active');
          $('.accordion .accordion-section-content').slideUp(300).removeClass('open');

          // Add active class to section title
          $(this).addClass('active');
          // Open up the hidden content panel
          $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
      }

      e.preventDefault();
  },

  "click #download": function () {
    console.log("clicked download")
  },
  "click #trash": function() {
    console.log("clicked trash")
  },
});

Template.newDirForm.events({
  "click #newdirSubmit": function(e) {
    val = $(".newdir-form input").val();
    dir_map = Session.get("cwd");
      Files.insert({"kFilesUserID": Session.get("uid"), "kFilesParent": dir_map, "kFilesName": val, "kFilesIsDir": 1});
  }
});
