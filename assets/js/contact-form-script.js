(function ($) {
    "use strict"; 

    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        var form = $(this)[0];
        var formData = new FormData(form);

        $.ajax({
            url: "https://api.web3forms.com/submit",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, "حدث خطأ: " + response.message);
                }
            },
            error: function () {
                formError();
                submitMSG(false, "تعذر الاتصال بالخادم، حاول لاحقاً.");
            }
        });
    });

  function formSuccess() {
    $("#contactForm")[0].reset();

    // تحديد اللغة بناءً على مسار الصفحة
    var path = window.location.pathname;
    var isArabic = !path.includes("/en/");

    var msg = isArabic
        ? "✅ تم إرسال رسالتك بنجاح!"
        : "✅ Your message has been sent successfully!";

    submitMSG(true, msg);
}

function formError() {
    $("#contactForm").removeClass().addClass("shake animated").one("animationend", function () {
        $(this).removeClass("shake animated");
    });

    var path = window.location.pathname;
    var isArabic = !path.includes("/en/");

    var msg = isArabic
        ? "❌ حدث خطأ أثناء إرسال رسالتك، حاول مرة أخرى."
        : "❌ An error occurred while sending your message, please try again.";

    submitMSG(false, msg);
}

    function formError() {
        $("#contactForm").removeClass().addClass("shake animated").one("animationend", function () {
            $(this).removeClass("shake animated");
        });
    }

    function submitMSG(valid, msg) {
        var msgClasses = valid
            ? "h4 text-left tada animated text-success"
            : "h4 text-left text-danger";
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
})(jQuery);
