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
class Tabs{
    constructor(){
        $('.tab1, .tab2, .tab3').mousedown(e=>{
            this.changeBgColor(e);
            $('#body').css('opacity', '0');
            $('#msg').css('display', 'flex');
        })
        $('.tab0').mousedown(e=>{
            Tabs.openHomeTab();
        })
    }
    changeBgColor(e){
        let bgColors = ['#eee', '#ef476f', '#ffd166', '#118ab2']
        
        let tabsArr = Array.from(document.getElementsByClassName('tab'));
        let index = tabsArr.indexOf(e.target.parentElement);
        $('body').css('backgroundColor', bgColors[index]);
    }
    static openHomeTab(){
        //$('#login').css('display','none');
        $('#msg').css('display', 'none');

        $('body').css('backgroundColor', '#eee');
        $('#body').css('opacity','1');
    }
}

class Theme{
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

class Journal{
    constructor(){
        let journal = JSON.parse(localStorage.getItem('journal')) || {gratitude:'', misc:''}
        this.gjTxt = journal.gratitude;
        this.miscTxt = journal.misc;
        if(this.gjTxt!==''){
            $('#gjForm, #gjText').toggle();
            this.showGJ();
            this.listenGJText();
        }
        this.listenGJ();
        this.listenMJ(); //MiscJ === CommonJ.
    }
    listenGJ(){
        $('#gjForm').submit(e=>{
            e.preventDefault();
            this.gjTxt = $('#gjForm input').val();
            this.update();
            this.showGJ();
            $('#gjForm, #gjText').toggle();
            this.listenGJText();
        })
    }
    listenGJText(){
        $('#gjText').mousedown(e=>{
            $('#gjForm, #gjText').toggle();
            $('#gjText').unbind();
        })
    }
    showGJ(){
        $('#gjText').html(this.gjTxt);
    }
    update(){
        localStorage.setItem('journal',JSON.stringify({
            gratitude : this.gjTxt,
            misc : this.miscTxt
        }))
    }
    listenMJ(){
        $('#cjForm').submit(e=>{
            e.preventDefault();
        })

        //Saves and clears the field.
        $('#cjSave').mousedown((e)=>{
            this.miscTxt.push(
                $('textarea').val()
            );
            this.update();
            $('textarea').val('');
        })

        //Shows the miscJournal texts saved.
        $('#cjView').mousedown((e)=>{
            $('textarea, #mjText').toggle();
            this.mjView();
        })

        //Clears all notes.
        $('#cjClear').mousedown((e)=>{
            this.miscTxt = [];
            this.update();
            $('#mjText').html('');
        })
    }
    deleteMJ(e){
        let noteArr = Array.from(document.getElementsByClassName('mjDeleteIcon'));
        let index = noteArr.indexOf(e.target);
        this.miscTxt = this.miscTxt.filter(note=>this.miscTxt.indexOf(note)!==index);
        this.update();
        this.mjView();
    }
    mjView(){
        $('#mjText').html('');
        this.miscTxt.forEach(txt=>{
            $('#mjText').append(
                `<li class='flex flexLi'>
                    <p>${txt}</p>
                    <img class="mjDeleteIcon icon" src="icons/bin.png" alt="bin">
                </li>`);
        })
        //Deletes a particular note as selected.
        $('.mjDeleteIcon').mousedown(e=>this.deleteMJ(e));
    }
}


//Parent class for Todos and Projects.
class Lists{
    constructor(listName, domOutput, domInput, itemType){
        this.domInput = domInput;
        this.domOutput = domOutput;
        this.itemType = itemType;
        this.listName = listName;

        this.listArr = JSON.parse(localStorage.getItem(this.listName)) || [];

        //Showing todos on the panel:
        this.show();
        //Listener for adding todos:
        this.listen();
    }
    show(){
        this.listArr.forEach(item=>{
            $(this.domOutput).append(
                `<div class="${this.itemType} card flex">
                    <p class="itemHead">${item.title}</p>
                    <p class="itemBody">${item.des}</p>
                    <div class="footer">
                        <img class="deleteIcon icon" src="icons/bin.png" alt="bin">
                        <img class="tickIcon icon" src="icons/check-mark.png" alt="tick">
                    </div>
                </div>`
            )
        })
    }
    listen(){
        $(this.domInput).mousedown(()=>{
            $('#body').css('opacity', '0');
            $('#addToList').css('display','flex');
            $('#addToList form').submit((e)=>{
                e.preventDefault();
                this.listArr.push(
                    {
                        title : $('#addToList form input[name="title"]').val(),
                        des : $('#addToList form input[name="des"]').val(),
                        createdAt: new Date().toLocaleDateString()
                    }
                )
                localStorage.setItem(this.listName,JSON.stringify(this.listArr));
                document.querySelector('#addToList form').reset();
                $('#body').css('opacity', '1');
                $('#addToList').css('display','none');
                
                //Updating lists on the screen:
                $('#addToList form').unbind();
                $(this.domOutput).html('');
                //this.show(this.itemType);
                location.reload(); //This works nicer:
            })
        })
    }
}
class Icons{
    constructor(){
        this.infoIconShown = false;
        $('.infoIcon').mousedown(e=>this.info(e));
        $('.deleteIcon').mousedown(e=>this.delete(e));
        $('.tickIcon').mousedown(e=>this.tick(e));
    }
    info(event){
        if(this.infoIconShown){
            this.infoIconShown = false;
            $('.itemTime').css('display', 'none');
        }
        else{
            this.infoIconShown = true;
            const selectedItem = event.target.parentElement.parentElement; //The card as a whole.
            let index = Array.from(document.querySelectorAll('.projItem')).indexOf(selectedItem);
            $('.itemTime').eq(index).css('display', 'block');
        }
    }
    delete(event){
        //DOM
        const selectedItem = event.target.parentElement; //The footer in which the icon exists.
        selectedItem.parentElement.style.display = 'none';

        //LocalStorage
        let index = Array.from(document.querySelectorAll('.footer')).indexOf(selectedItem);
        let todoArr = JSON.parse(localStorage.getItem('todoList'));
        if(index<todoArr.length){
            todoArr = todoArr.filter(i => todoArr.indexOf(i) !== index);
            localStorage.setItem('todoList',JSON.stringify(todoArr));
        } else{
            index = index-todoArr.length;
            let projArr = JSON.parse(localStorage.getItem('projects'));
            projArr = projArr.filter(i=>projArr.indexOf(i) !== index);
            localStorage.setItem('projects', JSON.stringify(projArr));
        }

    }
    tick(event){
        let title = event.target.parentElement.parentElement.querySelector('.itemHead').textContent;
        Progress.addProgress(title);
        Progress.showProgress();
        this.delete(event);
    }
}
class TodoPanel extends Lists{
    constructor(){
        super('todoList', '.c1wrapper', '.card1Col button', 'todoItem');
    }
}
class ProjectPanel extends Lists{
    constructor(){
        super('projects', '.c2wrapper', '.card2Col button', 'projItem');
    }
    show(){
        this.listArr.forEach(item=>{
            $(this.domOutput).append(
                `<div class="${this.itemType} card flex">
                    <p class="itemHead">${item.title}</p>
                    <p class="itemBody">${item.des}</p>
                    <p class="itemTime">${item.createdAt}</p>
                    <div class="footer">
                        <img class="infoIcon icon" src="icons/info (1).png" alt="icon">
                        <img class="deleteIcon icon" src="icons/bin.png" alt="bin">
                        <img class="tickIcon icon" src="icons/check-mark.png" alt="tick">
                    </div>
                </div>`
            )
        })
    }
}


class Progress{
    constructor(){
        Progress.showProgress();
        $('.bodyRight button').mousedown((e)=>this.clear());
    }
    clear(){
        console.log("clearing");
        localStorage.setItem('progress',JSON.stringify([]));
        $('.c3wrapper').html('');
    }
    static addProgress(title){
        let progressArr = JSON.parse(localStorage.getItem('progress')) || [];
        progressArr.push({
            title: title,
            time: new Date().toLocaleTimeString()
        })
        localStorage.setItem('progress', JSON.stringify(progressArr));
    }
    static showProgress(){
        $('.c3wrapper').html('');
        let progressArr = JSON.parse(localStorage.getItem('progress'));
        if(progressArr !== null){
            progressArr.forEach(item=>{
                $('.c3wrapper').append(
                    `<div class="status card flex">
                        <p>${item.title}</p>
                        <p><em>${item.time}</em></p>
                    </div>`
                )
            })
        }
    }
}


$(document).ready(
    //let user = new User();
   start()
)

function start(){
    new TodoPanel();
    new ProjectPanel();
    new Progress();
    new Icons();
    new Theme();
    new Journal();
    new Tabs();
    Tabs.openHomeTab();
}

