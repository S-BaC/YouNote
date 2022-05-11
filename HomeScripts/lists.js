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
            $(this.domOutput).prepend(
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
export class Icons{
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
        location.reload(); //This works nicer:

    }
    tick(event){
        let title = event.target.parentElement.parentElement.querySelector('.itemHead').textContent;
        Progress.addProgress(title);
        Progress.showProgress();
        this.delete(event);
    }
}
export class TodoPanel extends Lists{
    constructor(){
        super('todoList', '.c1wrapper', '.card1Col button', 'todoItem');
    }
}
export class ProjectPanel extends Lists{
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