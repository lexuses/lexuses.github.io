$(function(){
"use strict";

  	// Define Some Elements
  	var allWindow = $(window),
        body = $('body'),
        top = allWindow.scrollTop(),
        navBar = $(".nav-wrapper");

/*------------------------------------------------
  Javascript Function for The Preloader
--------------------------------------------------*/

    allWindow.on("load", function() {
        $('.loader-con').fadeOut('slow');
    });


/*-----------------------------------------------------
  Javascript Function To check Aniamtion support
-------------------------------------------------------*/

    var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }


/*-----------------------------------------------------
  Javascript Function For Smooth Mouse Scrolling
-------------------------------------------------------*/

    jQuery.scrollSpeed = function(step, speed) {
        
        var $document = $(document),
            $body = $('html, body'),
            option = 'default',
            root = top,
            scroll = false,
            scrollY,
            view;
            
        if (window.navigator.msPointerEnabled) {
            return false;
        }
            
        allWindow.on('mousewheel DOMMouseScroll', function(e) {
            
            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
                scrollY = $document.height() > allWindow.height();
                scroll = true;
            
            if (scrollY) {
                
                view = allWindow.height();
                    
                if (deltaY < 0 || detail > 0) {
                    root = (root + view) >= $document.height() ? root : root += step;
                }
                
                if (deltaY > 0 || detail < 0) {
                    root = root <= 0 ? 0 : root -= step;
                }
                
                $body.stop().animate({
                    scrollTop: root
                }, speed, option, function() {
                    scroll = false;
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            
            if (scrollY && !scroll) root = top;
            if (!scroll) root = allWindow.scrollTop();
            
        }).on('resize', function() {
            
            if (scrollY && !scroll) view = allWindow.height();
            
        });       
    };
    
    jQuery.easing.default = function (x,t,b,c,d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };

    // initialize Smooth Scrolling Only in Modern browsers
    if(animation) {
    	jQuery.scrollSpeed(100, 700);
    }


/*---------------------------------------------------------------------
  Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
----------------------------------------------------------------------*/

    // Define stikyNav Function
    function stikyNav() {

      top = allWindow.scrollTop();

      if ( top >= 100 ) {
        navBar.addClass("nav-sticky");

      } else {
        navBar.removeClass("nav-sticky");
      }

      // SHow Also Scroll up Button
      if ( top >= 1000 ) {
        $('.scroll-up').addClass("show-up-btn");
      } else {
        $('.scroll-up').removeClass("show-up-btn");
      }
    }

    // Select all links with hashes
    $('a.scroll').on('click', function(event) {
        // On-page links
        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
          // Figure out element to scroll to
          var target = $(this.hash),
              speed= $(this).data("speed") || 800;
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, speed);
          }
        }
    });

    $(".scroll-up").on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 900);
    });
    

/*---------------------------------------------------------------------
  Javascript Function for Hide Navbar Dropdown After Click On Links
-------------------------------------------------------------------*/

    var navLinks = navBar.find(".navbar-collapse ul li a");

    $.each( navLinks, function( i, val ) {

      var navLink = $(this);

        navLink.on('click', function (e) {
          navBar.find(".navbar-collapse").collapse('hide');
        });

    });


/*----------------------------------------------------------------
  Javascript Function For Change active Class on navigation bar
-----------------------------------------------------------------*/

    var sections = $('.one-page-section'),
        navList = navBar.find("ul.navbar-nav");

    // Define ChangeClass Function
    function ChangeClass() {

      top = allWindow.scrollTop();

        $.each(sections, function(i,val) {

          var section = $(this),
              section_top = section.offset().top,
              bottom = section_top + section.height();

            if (top >= section_top && top <= bottom) {

              var naItems = navList.find('li');

              $.each(naItems ,function(i,val) {
                var item = $(this);
                item.find("a").removeClass("active");
              });

              navList.find('li [href="#' + section.attr('id') + '"]').addClass('active');
            }

        });

    } // End of ChangeClass Function


/*---------------------------------------------------
  Javascript Function FOR PARALLAX EFFECT
---------------------------------------------------*/

    // create variables
    var backgrounds = $('.parallax');

    function parallax() {

      // for each of background parallax element
      $.each( backgrounds, function( i, val ) {

        var backgroundObj = $(this),
          backgroundObjTop = backgroundObj.offset().top,
          backgroundHeight = backgroundObj.height();

        // update positions
        top = allWindow.scrollTop();

          var yPos = ((top - backgroundObjTop))/2;

          if ( yPos <= backgroundHeight + backgroundObjTop ) {
            backgroundObj.css({
              backgroundPosition: '50% ' + yPos + 'px'
            });
          }

      });
    };


    function scrollFunctions() {
      stikyNav();
      ChangeClass();
      parallax();
    }

    // add Event listener to window
    allWindow.on('scroll', function() {
      scrollFunctions();
    });


/*------------------------------------------
  Javascript for initialize text Typer
--------------------------------------------*/

    // initialize text Typer Only in Modern browsers
    if (animation) {

      var text = $('#home .typer-title');

          if (!!$.prototype.typer) {
            text.typer([
              "I'm backend developer",
              "I'm full stack developer",
            ]);
          }
    }

/*------------------------------------------------------------------------
 Javascript Function for Validate and Submit the CONTACT Form Using AJAX
-------------------------------------------------------------------------*/

    // Get the form.
    var form = $('#contact-form'),
        reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
        inputs = $(".input-field");

    function validateForm() {

      if ($(this).is("#email")) {

          var email = $(this).val(),
              res = reg.test(email);

          if (res) {
            $(".email-error").html("");
          } else {
            $(".email-error").html("please enter a valid email.");
            return false;
          }

      } else {

          var target = ($(this).attr("id")),
              targetMessage = $("."+target+"-error");

          if ($(this).val() === "") {

            targetMessage.html("please enter a valid "+target+".");
            return false;

          } else { 
            targetMessage.html(" ");
          }

      }
    } // End ValidateForm Function

    $.each(inputs, function( i, val ) {
      $(this).on("blur", validateForm);
    });

    // Get the messages div.
    var formMessages = $('#form-message');

    // Set up an event listener for the contact form.
    $(form).on('submit',function(event) {

      // Stop the browser from submitting the form.
      event.preventDefault();

      // Submit the form using AJAX.
      $.ajax({
        url: 'https://formspree.io/lexuses@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
      }).done(function(response) {

        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass('error');
        formMessages.addClass('success');

        // Set the message text.
        formMessages.text('Thank You! Your message has been sent.');

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');

      }).fail(function(data) {

          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass('success');
          formMessages.addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
              formMessages.text(data.responseText);
          } else {
              formMessages.text('Sorry! An error occured and your message could not be sent.');
          }

      });
    });


});