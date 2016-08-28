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
        
    });
      
    //Evaluate the expression when the  user clicks on the equals operator.
    $('.equals').on('click',function(){
               
        var result=eval($('.equation').html());
        $('.result').text(result);
    })
})