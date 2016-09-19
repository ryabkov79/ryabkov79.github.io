(function ($) {
  $(document).ready(function () {
    $("#datepicker_icon").click(function(){
      $("#bdate").datepicker( "show" );
    });
    $("#bdate").datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: "+0d",
      yearRange: "c-70:c+0"
    });

    $("#reg-card").validate({
      rules: {
        fname: {
          required: true,
          lettersAndSpace: true,
        },
        sname: {
          required: true,
          lettersAndSpace: true,
        },
        pname: {
          required: true,
          lettersAndSpace: true,
        },
        phone: {
					required: true,
					minlength: 10,
					maxlength: 10,
          digits: true,
				},
        email: {
					required: true,
					email: true,
				},
        card_num: {
					required: true,
          digits: true,
          minlength: 12,
          maxlength: 12,
				},
        card_pin: {
					required: true,
          digits: true,
          minlength: 4,
          maxlength: 4,
				},
        sms_code: {
					required: true,
          digits: true,
				},
        person_data_agreement: "required",
        rules_agreement: "required",
      },
      messages: {
        fname: {
          required: "Введите Вашу фамилию",
          lettersAndSpace: "Только буквы и пробел",
        },
        sname: {
          required: "Введите Ваше имя",
          lettersAndSpace: "Только буквы и пробел",
        },
        pname: {
          required: "Введите Ваше отчество",
          lettersAndSpace: "Только буквы и пробел",
        },
        phone: {
          required: "Введите номера телефона",
          digits: "Только цифры",
          minlength: "10 цифр",
          maxlength: "10 цифр",
        },
        card_num: {
          required: "Введите номер карты",
          digits: "Только цифры",
          minlength: "12 цифр",
          maxlength: "12 цифр",
        },
        card_pin: {
          required: "Введите ПИН-код карты",
          digits: "Только цифры",
          minlength: "4 цифры",
          maxlength: "4 цифры",
        },
        sms_code: {
          required: "Введите код активации из СМС",
          digits: "Только цифры",
        },
        email: "Введите адрес электронной почты",
        person_data_agreement: "Это поле обязательно",
        rules_agreement: "Это поле обязательно",
      },
      errorPlacement: function(error, element) {
        if (element.is(":checkbox"))
					error.appendTo(element.next());
				else
          error.appendTo(element.parent());
			},
    });
    $("#dialog-message").dialog({
      autoOpen: false,
      modal: true,
      width: 800,
      show: {
        effect: "fade",
        duration: 300
      },
      hide: {
        effect: "fade",
        duration: 300
      },
      buttons: [{
        text: "Закрыть",
        click: function() {
          $( this ).dialog( "close" );
        }
      }]
    });
    $( "#person_data_agreement" ).change(function() {
      if ($(this).is(":checked"))
      {
        $( "#dialog-message" ).dialog( "open" );
      }
    });
  });

  jQuery.validator.methods.lettersAndSpace = function( value, element ) {
    return this.optional( element ) || /^[а-яa-z\s]+$/.test( value );
  }
})(jQuery);