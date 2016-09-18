(function ($) {
  $(document).ready(function () {
    $("#reg-card").validate({
      rules: {
        fname: "required",
        sname: "required",
        pname: "required",
        phone: {
					required: true,
					minlength: 10,
          digits: true,
				},
        email: {
					required: true,
					email: true,
				},
        card_num: {
					required: true,
          digits: true,
				},
        card_pin: {
					required: true,
          digits: true,
				},
        sms_code: {
					required: true,
          digits: true,
				},
        person_data_agreement: "required",
        rules_agreement: "required",
      },
      messages: {
        fname: "Введите Вашу фамилию",
        sname: "Введите Ваше имя",
        pname: "Введите Ваше отчество",
        phone: {
          required: "Введите номера телефона",
          digits: "Только цифры",
          minlength: "10 цифр",
        },
        card_num: {
          required: "Введите номер карты",
          digits: "Только цифры",
        },
        card_pin: {
          required: "Введите ПИН-код карты",
          digits: "Только цифры",
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
        console.log(element);
				if (element.is(":radio"))
					error.appendTo(element.parent().next().next());
				else if (element.is(":checkbox"))
					error.appendTo(element.next());
				else
          error.appendTo(element.parent());
			},
    });
  });
})(jQuery);