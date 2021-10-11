console.log( 'js' );

$(document).ready(OnReady);
  
function OnReady(){
  $('#addButton').on( 'click', postKoala);
  $('#viewKoalas').on( 'click', '.transferButton', transfer);
  $('#viewKoalas').on( 'click', '.sendHomeButton', sendHome);
 
  getKoalas();

} // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
}).then( function( response ){
    console.log( 'back from get with:', response );
    // display on DOM
    let ready = ""
    let transferButton = ''
    let el = $( '#viewKoalas' );
    el.empty();
    for( let i=0; i<response.length; i++ ){
      console.log("WTF:", response[i].readyfortransfer)
      if(response[i].readyfortransfer === true ){
        ready = "Yes"
        transferButton = ''
      }else{
        ready = "No"
        transferButton = '<button class = "transferButton" data-id='+response[i].id+'>Ready for transfer</button>'
      }
        el.append( `<tr><td>${response[i].name}</td>
        <td>${response[i].age}</td>
        <td>${response[i].gender}</td>
        <td>${ready}</td>
        <td>${response[i].notes}</td>
        <td data-id="${ response[i].id }">${transferButton}</td>
        <td data-id="${ response[i].id }"><button class = "sendHomeButton" data-id='+ ${response[i].id} +'>Send home</button></td></tr>`)
    }
}).catch( function( err ){
    console.log( err );
    alert( 'oops!' );
})
} // end getKoalas



function postKoala(){
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyfortransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  };
console.log('post input:', koalaToSend);
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koalaToSend
}).then( function( response ){
    console.log( 'back from POST:', response );
    getKoalas();
}).catch( function( err ){
    alert( 'error adding item' );
    console.log( err );
})
//empty fields
$('#nameIn').val('');
$('#ageIn').val('');
$('#genderIn').val('');
$('#readyForTransferIn').val('Ready to transfer?');
$('#notesIn').val('');

}// end postKoala

function transfer(){
  console.log('in transfer');
  console.log($(this).data('id'));
  $.ajax({
    method: 'PUT',
    url: '/koalas?id=' + $(this).data('id'),
    }) .then(function(response){
    console.log('updating to:', response);
    getKoalas()

  }).catch(function(err){
    console.log(err);
    
  })



} // end transfer


function sendHome (){
  console.log('in sendHome');
  //sweet alert 2
  swal.fire({
    title: 'Are you sure?',
    text: 'Once removed from database, you cannot recover this koala',
    icon: 'warning',
    dangermode: true,
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonText: 'No'
  })

  .then((results)=>{
    if (results.isConfirmed){
  $.ajax({
    method: 'DELETE',
    url: '/koalas?id=' + $(this).data('id'),
    }).then(function(response){
      swal.fire("I'm so glad our furry friend found their forever home <3",{
        icon: "success",
      });

  }).catch(function(err){
    console.log(err);
    alert(`error deleting koala - see console`);
    
  })
} else {
  swal.fire("Your koala is remaining here! They will find their home soon!",{
    icon: "error"
  });
}
})
}// end sendHome




