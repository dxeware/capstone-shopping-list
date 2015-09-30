$(document).ready(function() {

  // Remove list item if 'Delete' is clicked
  $( '#shopping-list' ).on('click', '.delete', function( event ) {
    //console.log( 'clicked DELETE' );
    $(this).closest('li').remove();
  });

  // Show 'Delete' div on mouseenter
  $( '#shopping-list' ).on('mouseenter', '.listitem', function( event ) {
    //console.log( 'MOUSE ENTER' );
    $(this).children('.delete-div').show();
    //$(this).addClass('text-strikethrough');
  })
  // Hide 'Delete' div on mouseleave
  .on( 'mouseleave', '.listitem', function( event ) {
    //console.log( 'MOUSE LEAVE' );
    $(this).children( '.delete-div' ).hide();
  });

  // Add item to list if the 'Submit' button is pressed
  // 1) use after() if list not EMPTY
  // 2) use append() if list EMPTY
  $( 'button' ).click( function() {
    var input = document.getElementById("item");
    var text = input.value;
    if ($.trim(text).length > 0) {
      var newItem = $('<li class="listitem"><input type="checkbox">' + text + '<div class="delete-div"><span class="delete">Delete</span></div>');
      $( 'ul' ).append(newItem);
    } else {
      alert('Please enter some text');
    }
    input.value = '';
  });

  $("#item").keyup(function(event){
    if(event.keyCode == 13){
        $("#add").click();
        $("#item").clear();
    }
  });

  // Bring input in focus on mouseenter, blue on mouseout
  $( '#item' ).on( 'mouseenter', function( event ) {
    //console.log( 'MOUSE ENTER INPUT' );
    $(this).focus();
  })
  .on( 'mouseout', function( event ) {
    //console.log( 'MOUSE OUT INPUT' );
    $(this).blur();
  });

  // Handle line-through when checkbox CHECKED or NOT
  $( '#shopping-list' ).on('click', '.listitem', function( event ) {
    if ($(this).children('input').is(':checked')) {
      console.log('Check box checked');
      $(this).closest('li').css('text-decoration', 'line-through');
    } else {
      console.log('Check box UNchecked');
      $(this).closest('li').css('text-decoration', 'none');
    }
  });

});
