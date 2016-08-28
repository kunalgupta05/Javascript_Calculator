$(document).ready(function(){
    
    //Append the text to calculator_result_display except for delete and equals signs. 
    $('.operators').on('click',function(){
                
        if($(this).find('span').hasClass('multiply')){
            $('.equation').append("*");   
        }
        else if($(this).find('span').hasClass('divide')){
            $('.equation').append("/");
        }
        else{
            $('.equation').append($(this).find('span').text());         
        }       
        
        evaluateExpression();
        
    });
      
    $('.delete').on('click',function(){
        $('.equation').html('');
        $('.result').html(''); 
    });  
      
    //call the evaluateExpression function when the user clicks on the equals operator.
    $('.equals').on('click',function(){
        evaluateExpression();              
    })
    
    //Function which does the magic of evaluating the expression the user types in
    function evaluateExpression(){
        var result=eval($('.equation').html());
        $('.result').text(result); 
    }
    
})