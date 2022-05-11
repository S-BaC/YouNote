export class Theme{
    constructor(){
        this.panelActive = false;
        this.theme = JSON.parse(localStorage.getItem('theme')) || {title : '',des : ''};
        
        this.show();

        $('#themeBox').mousedown(()=>this.togglePanel());
        $('#themeEditIcon').mousedown((e)=>this.editTheme(e));
        $('#themeBox form').mousedown((e)=>e.stopPropagation());
    }
    togglePanel(){
        $('.bodyMid').toggle();
        $('.bodyRight').toggle();
        $('.journal').toggle();
        $('#themeBox ~ p').toggle();

        if(!this.panelActive){
            $('.bodyLeft').css('width', '100vw');
            $('#themeBox').addClass('themeBoxActive');
            $('#themeDes').css('font-size','1em');
            this.panelActive = true;
        }else{
            $('.bodyLeft').css('width', '15vw');
            $('#themeBox').removeClass('themeBoxActive');
            $('#themeDes').css('font-size','0.7em');
            this.panelActive = false;
        }
    }
    editTheme(e){
        e.stopPropagation();
        $('#themeBox div, #themeBox form').toggle();
        $('#themeBox form').submit(e=>{
            e.preventDefault();
            this.theme = {
                title : $('#themeBox form input[name="title"]').val(),
                des : $('#themeBox form input[name="des"]').val()
            }
            localStorage.setItem('theme', JSON.stringify(this.theme));
            $('#themeBox form').trigger('reset');
            this.show();
            $('#themeBox div, #themeBox form').toggle();
            $('#themeBox form').unbind();
            $('#themeBox form').mousedown((e)=>e.stopPropagation());
        });
    }
    show(){
        $('#themeTitle').html(this.theme.title);
        $('#themeDes').html(this.theme.des);
    }
}