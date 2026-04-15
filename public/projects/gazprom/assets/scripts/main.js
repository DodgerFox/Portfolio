window.onload = function () {

isotopeInit()

}


function isotopeInit() {
  

var iso = new Isotope( '.team-members__items', {
  // options...
  itemSelector: '.team-members-item'
});



// bind filter button click
var filtersElem = document.querySelector('.team-members__tabs');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function

  iso.arrange({ filter: filterValue });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.team-members__tabs');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    buttonGroup.querySelector('.team-members__item_active').classList.remove('team-members__item_active');
    event.target.classList.add('team-members__item_active');
  });
}
}
