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
  "click .accordion-upload-title": function(e) {
      // Grab current anchor value
      console.log("upload");
      var currentAttrValue = $(this).attr('href');

      if($(e.target).is('.active')) {
          $('.accordion .accordion-upload-title').removeClass('active');
          $('.accordion .accordion-upload-content').slideUp(300).removeClass('open');
      }else {
          $('.accordion .accordion-upload-title').addClass('active');
          $('.accordion .accordion-upload-content').slideDown(300).addClass('open');

          // Add active class to upload title
          $(this).addClass('active');
          // Open up the hidden content panel
          $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
      }

      e.preventDefault();
  },
  "click .accordion-directory-title": function() {
      // Grab current anchor value
      console.log("directory");
      var e = document.getElementById("newDirForm");
      var currentAttrValue = $(this).attr('href');
      if(e.style.display == 'block') {
          e.style.display = 'none';
          $('.accordion .accordion-directory-content').slideUp(300).removeClass('open');
      }
      else {
          e.style.display = 'block';
          console.log($('.accordion .accordion-directory-title'));
          $('.accordion .accordion-directory-content').slideDown(300).addClass('open');
      }

      e.preventDefault();
  },

  "click #download": function () {
    console.log("clicked download")
  },
  "click #trash": function() {
    console.log("clicked trash")
  }
});