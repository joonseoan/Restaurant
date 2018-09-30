/* export function scrollspy() {

    $('body').scrollspy({ target: '#nav-main' });

    // smooth scrolling
    $('#nav-main a').on('click', function(e) {
      //check for hash value
      if(this.hash !== '') {
        // prevent default behavior
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({

          scrollTop: $(hash).offset().top
        }, 900, function() {
          // add hash to URL after scroll
          window.location.hash = hash; 
        }
        
        );
      }

    });

} */