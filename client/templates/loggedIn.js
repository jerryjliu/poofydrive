Template.loggedIn.events({
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
  }
});