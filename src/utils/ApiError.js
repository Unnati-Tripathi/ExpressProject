class ApiError extends Error{
    constructor(message="something went wrong" , errors=[] , stack="" , statusCode=400){
        super(message);
        this.statusCode = statusCode;
        this.data=null ;
        this.message=message;
        this.success=false;
        this.error= errors

        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this , this.constructor);
        }

    }
}