 export class User{
    username;
    password;
    email;
    constructor(){
        //Profie tab is in selection.
        $('body').css('backgroundColor', '#118ab2');
        $('#login>form').submit((e)=>{
            e.preventDefault();
            this.username = $('#login input[type="text"]').val();
            this.password = $('#login input[type="password"]').val();
            this.email = $('#login input[type="email"]').val();
            this.login();
        })
    }
    login(){
        //Authenication logic:
        if(true){
            start();
        }
    }
    getInfo(){
        return [this.username, this.password, this.email];
    }
}