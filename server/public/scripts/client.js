console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  $('#addButton' ).on( 'click', postKoala());
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

// function setupClickListeners() {
//   $( '#addButton' ).on( 'click', function(){
//     console.log( 'in addButton on click' );
//     // get user input and put in an object
//     // NOT WORKING YET :(
//     // using a test object 
//     // call saveKoala with the new obejct
//     saveKoala( koalaToSend );
//   }); 
// }

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
}).then( function( response ){
    console.log( 'back from get with:', response );
    // display on DOM
    let el = $( '#viewKoalas' );
    el.empty();
    for( let i=0; i<response.length; i++ ){
        el.append( `<tr><td>${response[i].name}</td>
        <td>${response[i].age}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].readyForTransfer}</td>
        <td>${response[i].notes}</td></tr>`)
    }
}).catch( function( err ){
    console.log( err );
    alert( 'oops!' );
})
} // end getKoalas

function postKoala(){
  let koalaToSend = {
    name: $('nameIn').val(),
    age: $('ageIn').val(),
    gender: $('genderIn').val(),
    readyForTransfer: $('readyForTransferIn').val(),
    notes: $('notesIn').val(),
  };
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
