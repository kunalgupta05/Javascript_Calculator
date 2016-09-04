$(document).ready(function () {
    var operand = false;
    var operatorCount = 0;
    var del = true;

    //Function to check if the user is not just entering the operator in the display without any operands
    function checkOperand(operator) {
        if (operand && operatorCount <= 1) {
            $('.equation').append(operator);
        }
        else {
            $('.equation').append("");
        }
    }

    //Append the text to calculator_result_display except for delete and equals signs. 
    $('.operators').on('click', function () {

        $('.equation').show();
        $('.result').css('font-size', 'medium');

        if ($(this).find('span').hasClass('multiply')) {
            operatorCount++;
            checkOperand("*");
        }
        else if ($(this).find('span').hasClass('divide')) {
            operatorCount++;
            checkOperand("/");
        }
        else if ($(this).find('span').hasClass('add')) {
            operatorCount++;
            checkOperand("+");
        }
        else {
            operand = true;
            if ($(this).find('span').hasClass('subtract')) {
                operatorCount++;
                checkOperand("-", true);
            }
            else {
                operatorCount = 0;
                $('.equation').append($(this).find('span').text());
            }
        }

        evaluateExpression();

    });


    //Function which accepts user input via keyboard
    $(document).keyup(function (e) {                        
        $('.equation').show();
        $('.result').css('font-size', 'medium');
                                       
        if (e.shiftKey) {
            if (e.which == 56) {
                operatorCount++;
                checkOperand("*");
            }
            if (e.which == 189) {
                operatorCount++;
                checkOperand("-");
            }
            if (e.which == 187) {
                operatorCount++;
                checkOperand("+");
            }
             if (e.which == 191) {
                operatorCount++;
                checkOperand("/");
            }
        }
        else if (e.which == 106) {
            operatorCount++;
            checkOperand("*");
        }
        else if (e.which == 111) {
            operatorCount++;
            checkOperand("/");
        }
        else if (e.which == 107) {
            operatorCount++;
            checkOperand("+");
        }
        else if (e.which == 13) {
            equals();
        }
        else if (e.which == 46) {
            deleted();
        }
        else {
            operand = true;
            if (e.which == 109) {
                operatorCount++;
                checkOperand("-");
            }
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
                operatorCount = 0;
                var character = String.fromCharCode(e.which > 57 ? e.which - 48 : e.which);
                $('.equation').append(character);
            }
        }

        evaluateExpression();

    });


    //When the user clicks on delete button call the deleted function
    $('.delete').on('click', function () {
        deleted();
    });

    //When the user clicks on the equals operator call the equals function.
    $('.equals').on('click', function () {
        equals();
    })

    //The function which does the magic of deleting the inputted character either entirely or char by char
    function deleted() {
        operatorCount = 0;
        operand = false;
        $('.equation').show();
        if (del == false) {
            $('.equation').html('');
            $('.result').html('');
            $('.delete').find('span').text('DEL');
            del = true;
        }
        else {
            var text = $('.equation').html().split('');
            text.pop();
            $('.equation').html('').append(text);
            if (text.length == 0) {
                $('.result').text('');
            }
            evaluateExpression();
        }

        $('.result').css('font-size', 'medium');
    }

    //This function does the magic of making the evaluated answer more prominent and hiding the equation forming display
    function equals() {
        if (!$('.equation').text() == "") {
            del = false;
            $('.delete').find('span').text('CLR');
            $('.equation').hide();
            $('.result').css('font-size', 'x-large');
        }
    }

    //Function which does the magic of evaluating the expression the user types in
    function evaluateExpression() {

        try {
            var result = eval($('.equation').html());
            $('.result').text(result);
        } catch (e) {
            if (e instanceof SyntaxError) {
                //$('.result').text("Syntax Error");
            }
        }

    }

})