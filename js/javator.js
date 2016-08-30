$(document).ready(function () {
    var operand = false;
    var operatorCount = 0;

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
                checkOperand("-");
            }
            else {
                operatorCount = 0;
                $('.equation').append($(this).find('span').text());
            }
        }

        evaluateExpression();

    });

    $('.delete').on('click', function () {       
        operatorCount = 0;
        operand = false;
        $('.equation').html('').show();
        $('.result').html('').css('font-size','large');
    });

    //call the evaluateExpression function when the user clicks on the equals operator.
    $('.equals').on('click', function () {
        $('.equation').html("").hide();        
        $('.result').css('font-size','x-large');
    })

    //Function which does the magic of evaluating the expression the user types in
    function evaluateExpression() {

        try {
            var result = eval($('.equation').html());
            $('.result').text(result);
        } catch (e) {
            if (e instanceof SyntaxError) {
                $('.result').text("");
            }
        }

    }

})