class User{
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

class TodoPanel{
    constructor(user){
        this.todoList = localStorage.getItem(user.todoList);
    }
}


//let user = new User();
start();

function start(){
    $('body').css('backgroundColor', '#eee');
    $('#login').css('display','none');
    $('#body').css('opacity','1');
    //new TodoPanel(user);
}