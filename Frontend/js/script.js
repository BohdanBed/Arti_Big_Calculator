$(document).ready(function(){


	$('.employees__period input').on("change" ,function(e){
		if ($(this).prop('checked') == true) {
			$(this).closest('.employees__period').find("input").prop("checked" ,false);
			$(this).prop("checked" , true);
			if ($(this).attr("data-state") == "Yes") {
				$(this).closest('.elem__quarter').find(".owners").removeClass("disabled");
				$(this).closest('.elem__quarter').find(".owners .error").removeClass('error');
				$(this).closest('.elem__quarter').find(".owners .required").removeClass("disabled");
			} else{
				$(this).closest('.elem__quarter').find(".owners .required").addClass("disabled");
				$(this).closest('.elem__quarter').find(".owners").addClass("disabled");			
				$(this).closest('.elem__quarter').find(".owners .error").removeClass('error')
			}
		} else{
			$(this).prop("checked" ,true);
		}
	});


	

	$('.droppable a').on("click" ,function(e){
		e.preventDefault();
		$(this).closest('.droppable').find("input").click();
	});


	$('.document__button>a').on('click' ,function(e){
		e.preventDefault();
		$(this).closest('.form__step').css("display" , "none")
																.next('.form__step').fadeIn(300);
	});


	var signature = false;
	function allowClaim(){
		if (signature == true && $('.check__refunds .elem__check.active').length != 0 && $('.refund__check input').prop('checked') == true) {
			$('.submit__refund button').removeClass("disabled");
		} else {
			$('.submit__refund button').addClass("disabled");
		}
	}



	$('.offer__modal>a').on('click' ,function(e){
		e.preventDefault();
		$(this).closest('.modal__wrapper').fadeOut(300);
		$('body,html').css('overflow-y' ,"initial");
	});

	$('.submit__refund button').on("click" , function(e){
		e.preventDefault();
		$('.offer__modal').closest('.modal__wrapper').fadeIn(300);
		$("body,html").css("overflow-y" ,"hidden");
	});
	$('.offer__modal .decline').on("click" ,function(e){
		e.preventDefault();
		$(this).closest(".modal__wrapper").fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});
	$('.offer__modal .submit').on("click" ,function(e){
		e.preventDefault();
		$('.refund__box').css("display" ,"none");
		$('.claim__info').fadeIn(300);
		$(this).closest(".modal__wrapper").fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});

	$('.refund__info').on("click" ,function(e){
		e.preventDefault();
		$('.service__agreement').closest('.modal__wrapper').fadeIn(300);
		$('body,html').css("overflow-y" ,"hidden");
	});
	$('.refund__check input').on("change" , function(e){
		if ($(this).prop('checked') == true) {
			$('.service__agreement').closest('.modal__wrapper').fadeIn(300);
			$('body,html').css("overflow-y" ,"hidden");
			allowClaim();
		} else {
			allowClaim();
		}
	});
	$('.service__agreement .confirm').on('click' ,function(e){
		e.preventDefault();
		
		$('.refund__check input').prop("checked" ,true);
		$(this).closest('.modal__wrapper').fadeOut(300);
		allowClaim();
		$('body,html').css("overflow-y" , "initial");
	});
	$('.service__agreement .decline').on('click' ,function(e){
		e.preventDefault();

		$(this).closest('.modal__wrapper').fadeOut(300);
		$('.refund__check input').prop("checked" ,false);
		allowClaim();
		$('body,html').css("overflow-y" , "initial");
	});

	if ($('.signature__box').length) {
		$(window).on("resize" ,function(){
			if ($(window).width() > 767) {
				var canvas = $('.signature__box').jqSignature({
					width:360,
					height:75
				});
			} else{
				var canvas = $('.signature__box').jqSignature({
					width:290,
					height:75
				});
			}
		});
		if ($(window).width() > 767) {
				var canvas = $('.signature__box').jqSignature({
					width:360,
					height:75
				});
			} else{
				var canvas = $('.signature__box').jqSignature({
						width:290,
						height:75
					});
			}
		$('.signature__box a').on("click" ,function(e){
			e.preventDefault();
			$(canvas).jqSignature('clearCanvas');
			signature = false;
		});
		$(canvas).on("jq.signature.changed" ,function(e){
			signature = true;
			allowClaim();
		});
	}

	function calculateValue(){
		let counter = 0;
		$('.check__refunds>.elem__check.active').each(function(index,elem){
			counter = +counter + +$(elem).attr("data-value");
		});
		return "$" +  counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}


	$('.check__refunds>.elem__check').on('click' ,function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$(this).find("input").prop('checked' ,true);
		} else{
			$(this).find("input").prop('checked' ,false);
		}
		$('.total span').text(calculateValue());
		allowClaim();
	});



	$('.agreement__box>a').on("click" ,function(e){
		e.preventDefault();
		if ($(".refund__check").length) {
			$('.refund__check input').prop("checked" ,false);
		}
		$(this).closest('.modal__wrapper').fadeOut(300);
		$('body,html').css("overflow-y" ,"initial");
	});


	function findButtonText(){
		let indexMain;
		
		$('.quarters__container>.elem__quarter:not(.non__index):not(.filled').each(function(index,elem){
			if ($(elem).hasClass("filling")) {
				indexMain = index;
			}
		});
		$('.quarters__container>.elem__quarter:not(.non__index):not(.filled').each(function(index,elem){
			console.log(elem);
			if (index == indexMain + 1) {
				let newText = $(elem).find(".left__desc>span").text();
				$('.controls__fill>.next__quarter>p>span').text(newText);
			}
		});
	}

	function checkQuarter(currentStep){
		var errors = 0;
		$(currentStep).find(".required").each(function(index,elem){
			if (!$(elem).hasClass("disabled")) {
				if ($(elem).hasClass('date__picker')) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('double__check')) {
				if ($(elem).find("input:checked").length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('value')) {
				if ($(elem).find("input").val().length < 3) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('employees')) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} else {
					if ($(elem).find('input').val() < 0 || $(elem).find("input").val()  > 9999) {
						$(elem).addClass("error");
						errors++;
						$(elem).find(">label").text('Value must be between 0 and 999');
					}
				}
			}
			if ($(elem).hasClass("check__box")) {
				if ($(elem).find('input:checked').length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass("regular")) {
				if ($(elem).find("input").val().length < 2) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} 
			}
			if ($(elem).hasClass("email")) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} else{
					if (!validateEmail($(elem).find("input").val())) {
						$(elem).removeClass('filled');
						$(elem).addClass("error");
						errors++;
						$(elem).find(">label").text('Please input valid email');
					}
				}
			}
			if ($(elem).hasClass("phone")) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} 
			}
			}
			
		});
		if (errors != 0) {
			return false;
		} else {
			return true;
		}
	}

	$('body').on("click" , ".elem__quarter.filled" ,function(e){
		e.preventDefault();
		if (!$(this).hasClass("filling")) {
			$('.container__quarters>.elem__quarter').css("display" , "none");
			$('.container__quarters>.elem__quarter.' + $(this).attr("data-elem")).fadeIn(300);
			if ($('.elem__quarter.filling').length) {
				if (checkQuarter($('.container__quarters>.elem__quarter.' + $('.elem__quarter.filling').attr('data-elem'))) == true) {
					$('.elem__quarter.filling').removeClass('filling')
																	  .addClass("filled")
																	  .find(".left__desc>p span").text('Submited');
				} else {
					$('.elem__quarter.filling').removeClass("filling")
																	  .addClass('will__filled')
																	  .find(".left__desc>p span").text('Will be filled in next step');
				}
			}
			$(this).removeClass("filled");
			$(this).addClass("filling");
			$(this).find(".left__desc>p span").text('You currently filling ...');
			
			if (counter == 0) {
				$('.controls__fill>.next__step').css('display'  , "inline-flex");
				$('.controls__fill>.next__quarter').css("display" ,"none");
			}
		}
		findButtonText();
	});
	$('.controls__fill>.next__quarter').on('click' ,function(e){
		e.preventDefault();
		if (checkQuarter($(".container__quarters>.elem__quarter." + $('.quarters__container>.filling').attr("data-elem"))) == true) {
			
				$('.quarters__container .filling').removeClass("filling")
																		  .addClass("filled")
																		  .find(".left__desc>p>span").text("Submited");
			    
			
			let result = 0;
			$('.quarters__container>.elem__quarter').each(function(index,elem){
				if (result == 0) {
					if (!$(elem).hasClass("non__index")) {
						if ($(elem).hasClass("will__filled")) {
							result = 1;
							$(elem).removeClass("will__filled")
										   .addClass("filling")
										   .find(".left__desc>p span").text("You currently filling ...")
						    $('.container__quarters>.elem__quarter').css("display" , "none");
						    $('.container__quarters>.elem__quarter.' + $('.quarters__container .filling').attr("data-elem")).fadeIn(150);
							$('.container__quarters>.elem__quarter.' + $('.quarters__container .filling').attr("data-elem")).find(".error").removeClass('error');
						    if ($('.quarters__container .filling').next().length == 0) {
						    	$('.controls__fill>.next__quarter').css("display" ,  'none');
						    	$('.controls__fill>.next__step').css("display" , "flex");
								}
							}
					}
				}
			});
			
		}
		findButtonText();
		$('html').animate({ 
	    	    scrollTop: $(".form__step:visible").offset().top 
	        },600
	        );
	});
	$('.controls__fill>.next__step').on("click" ,function(e){
		e.preventDefault();
		if (checkQuarter($(".container__quarters>.elem__quarter." + $('.quarters__container>.filling:not(.non__index)').attr("data-elem"))) == true) {
			$(this).closest('.form__step').css("display" ,"none")
																	.next(".form__step").fadeIn(300);
		}
	});

	$('.update__dropdown .dropdown__box input').on("change" ,function(){
		if ($(this).prop('checked') == false) {
			$('.quarters__container>.elem__quarter.' + $(this).attr("data-check")).css("display"  , "none")
																										.addClass("non__index");
			$('.container__quarters>.elem__quarter.' + $(this).attr("data-check")).css("display" , "none");
			$('.quarters__container>.elem__quarter.non__index.filling').each(function(index,elem){
				if (checkQuarter($(".container__quarters>.elem__quarter." + $(elem).attr("data-elem"))) == true) {
					$(elem).removeClass("filling")
								   .addClass('filled')
								   .find(".left__desc>p span").text("Submited")
				}
			})
		} else{

			$('.quarters__container>.elem__quarter:not(.non__index)').each(function(index,elem){
				if ($(elem).hasClass('filling')) {
					if (checkQuarter($(".container__quarters>.elem__quarter." + $('.quarters__container>.filling:not(.non__index)').attr("data-elem"))) == true) {
						$(elem).removeClass("filling")
									  .addClass("filled")
									  .find(".left__desc>p span").text("Submited");
						$('.container__quarters>.elem__quarter.'  + $(elem).attr('data-check')).css("display" ,"none");
					} else{
						$(elem).removeClass("filling")
									  .addClass('will__filled')
									  .find(".left__desc>p span").text('Will be filled in next step');
					  $('.container__quarters>.elem__quarter.'  + $(elem).attr('data-check')).find(".errors").removeClass('errors');
						$('.container__quarters>.elem__quarter.'  + $(elem).attr('data-check')).css("display" ,"none");
					}
				}
			});
			$('.container__quarters>.elem__quarter').css('display' ,'none');
			$('.quarters__container>.elem__quarter.' + $(this).attr("data-check")).css("display"  , "flex")
																									   .removeClass('non__index');
			$('.elem__quarter .error').removeClass('error');




		}
		if ($('.quarters__container>.elem__quarter.filling').length == 0) {
			$('.container__quarters>.elem__quarter').css('display' ,"none");
		}
		$('.elem__quarter .error').removeClass('error');
		let counter = 0;
		$('.update__dropdown .checkbox__wrapper').each(function(index,elem){
			if ($(elem).find("input").prop('checked') == false) {
				counter++;
			}
		});
		if (counter == $('.update__dropdown .checkbox__wrapper').length) {
			$('.quarters__container').css('display' ,"none");
			$('.container__quarters').css('margin-top' ,"45px");
		} else{
			$('.quarters__container').css('display' ,"grid");
			$('.container__quarters').css('margin-top' ,"90px");
		}
		
		let counterActiveEls = $(".quarters__container>.elem__quarter:not(.non__index)").length;
		if (counterActiveEls == $('.quarters__container>.elem__quarter.filled:not(.non__index)').length) {

			$(".quarters__container>.elem__quarter:not(.non__index)").each(function(index,elem){
				if (index + 1 == counterActiveEls) {
					$(elem).removeClass('filled')
								   .addClass("filling")
								   .find(".left__desc>p span").text("You currently filling ...");

					$('.container__quarters>.elem__quarter.' + $(elem).attr("data-elem")).fadeIn(300);
					$('.controls__fill>.next__quarter').css("display" ,'none');
					$('.controls__fill>.next__step').css("display"  ,  "flex");
				}
			});
		} else {
			let stopCounter = 0;
			$(".quarters__container>.elem__quarter:not(.non__index)").each(function(index,elem){
				if (stopCounter == 0) {
					if (!$(elem).hasClass("filled")) {
						if ($(elem).hasClass("filling") || $(elem).hasClass("will__filled")) {
							stopCounter = 1;
							$(elem).removeClass('will__filled')
								   .addClass("filling")
								   .find(".left__desc>p span").text("You currently filling ...");

							$('.container__quarters>.elem__quarter.' + $(elem).attr("data-elem")).fadeIn(300);
							
						}
					}
				}
			});
			if ($(".quarters__container>.elem__quarter.will__filled:not(.non__index)").length == 0) {
				$('.controls__fill>.next__quarter').css("display" ,'none');
				$('.controls__fill>.next__step').css("display"  ,  "flex");
			} else {
				$('.controls__fill>.next__quarter').css("display" ,'flex');
				$('.controls__fill>.next__step').css("display"  ,  "none");
			}
		}
		
		findButtonText();
	});


















	if ($("[data-toggle='datepicker']").length) {
		$('[data-toggle="datepicker"]').datepicker({
			autoHide:true
		});
	}


	


	$('.update__dropdown>a').on("click" ,function(e){
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass("active");
			$(this).closest('.update__dropdown').find('.dropdown__box').fadeOut(150);
		} else {
			$(this).closest('.update__dropdown').find('.dropdown__box').fadeIn(150);
			$(this).addClass("active");
		}
	});
	$(document).click(function(event) { 
	  var $target = $(event.target);
	  if(!$target.closest('.update__dropdown').length) {
	  	$('.update__dropdown>a').removeClass('active');
	  	$('.update__dropdown .dropdown__box').fadeOut(150);
	  }        
	});


	 function validateEmail($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}
	$('body').on("change"   , ".error input" ,function(){
		$(this).closest(".error").removeClass('error');
	});
	$('body').on("change"   , ".error .elem__checkbox input" ,function(){
		$(this).closest(".error").removeClass('error');
	});
	$('.phone>input').mask("99-9999999");
	$(document).on("input", ".numeric input", function() {
	    this.value = this.value.replace(/\D/g,'');
	});

	$('input.value').on("input" ,function(){
		 this.value = this.value.replace(/\D/g,'');
		if ($(this).val().indexOf("$") >= 0) {
			$(this).val("$" + $(this).val().substr(1));
		} else {
			$(this).val("$" + $(this).val());
		}
		if ($(this).closest(".ppp1").length) {
			if ($(this).val().substr(1) > 10000000) {
				$(this).val("$" + 10000000);
			}
		}
		if ($(this).closest(".ppp2").length) {
			if ($(this).val().substr(1) > 2000000) {
				$(this).val("$" + 2000000);
			}
		}

		$(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	});
	$('input.value').on("blur" ,function(e){
		if ($(this).val().length  == 1) {
			$(this).val("");
		}
	});
	

	$('.check__v--field .checkbox__wrapper input').on('change' ,function(){
		if ($(this).prop('checked') == true) {
			$(this).closest(".elem__checkbox").find(".group__input").fadeIn(150);
		} else{
			$(this).closest(".elem__checkbox").find(".group__input").fadeOut(150);
			let currentCheck = $(this).closest(".elem__checkbox");
			setTimeout(function(){
				$(currentCheck).find(".group__input>input").val("");
				$(currentCheck).find(".group__input").removeClass("error");
			}, 150);
		}
	});


	function checkValidation(currentStep){
		var errors = 0;
		$(currentStep).find(".required:visible").each(function(index,elem){
			if ($(elem).hasClass('date__picker')) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('double__check')) {
				if ($(elem).find("input:checked").length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('value')) {
				if ($(elem).find("input").val().length < 3) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass('employees')) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} else {
					if ($(elem).find('input').val() < 0 || $(elem).find("input").val()  > 9999) {
						$(elem).addClass("error");
						errors++;
						$(elem).find(">label").text('Value must be between 0 and 999');
					}
				}
			}
			if ($(elem).hasClass("check__box")) {
				if ($(elem).find('input:checked').length == 0) {
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				}
			}
			if ($(elem).hasClass("regular")) {
				if ($(elem).find("input").val().length < 2) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} 
			}
			if ($(elem).hasClass("email")) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} else{
					if (!validateEmail($(elem).find("input").val())) {
						$(elem).removeClass('filled');
						$(elem).addClass("error");
						errors++;
						$(elem).find(">label").text('Please input valid email');
					}
				}
			}
			if ($(elem).hasClass("phone")) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).removeClass('filled');
					$(elem).addClass("error");
					errors++;
					$(elem).find(">label").text('This field is required');
				} 
			}
		});
		if (errors != 0) {
			return false;
		} else {
			return true;
		}
	}

	$(".group__controls .submit__button").on("click" ,function(e){
		e.preventDefault();
		if (checkValidation($(this).closest('.form__step')) == true) {
			
		}
	});
	$('.group__controls .submit__details').on('click' , function(e){
		e.preventDefault();
		if (checkValidation($(this).closest('.form__step')) == true) {
				window.location.href = $(this).attr("href");
		}
	});
	$('.group__controls .next__buttons').on("click" ,function(e){
		e.preventDefault();
		if (checkValidation($(this).closest('.form__step')) == true) {
			$(this).closest('.form__step').css("display" ,"none")	
																.next('.form__step').fadeIn(300);
			$('html').animate({ 
	    	    scrollTop: $(".form__step:visible").offset().top 
	        },600
	        );
		}
	});


	$('.group__controls .redirect__button').on("click" ,function(e){
		e.preventDefault();
		if (checkValidation($(this).closest('.form__step')) == true) {
			window.location.href = $(this).attr("href");
		}
	});



	$('.group__controls .back__button>a').on("click" ,function(e){
		e.preventDefault();
		$(this).closest(".form__step").css("display" ,'none')
																 .prev(".form__step").fadeIn(300);
		$('html').animate({ 
	    	    scrollTop: $(".form__step:visible").offset().top 
	        },600
	        );
	});
});