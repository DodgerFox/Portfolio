window.onload = function () {
  valForm()
  fixPlaceholders()
}

function fixPlaceholders() {
  var inputs = $('.maitre-field input')

  $(inputs[0]).attr('placeholder', 'Your name');
  $(inputs[1]).attr('placeholder', 'E-mail');
}

function valForm() {
  

    $("#maitre-form").validate({

       rules:{

            email:{
                required: true,
                email: true
            }
       },

    });
}


window.Maitre = { uuid: "MF1e480f13ef" };