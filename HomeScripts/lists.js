import {Progress} from './progress.js';

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

    // For Panels
    show(){
        console.log("showing todoItems");
        // Displaying the items.
        $(this.domOutput).html('');
        this.listArr = JSON.parse(localStorage.getItem(this.listName));
        this.listArr.forEach(item=>{
            $(this.domOutput).prepend(
                `<div class="${this.itemType} card flex">
                    <p class="itemHead">${item.title}</p>
                    <p class="itemBody">${item.des}</p>
                    <div class="footer">
                        <img class="deleteIcon_${this.itemType} icon" src="icons/bin.png" alt="bin">
                        <img class="tickIcon_${this.itemType} icon" src="icons/check-mark.png" alt="tick">
                    </div>
                </div>`
            )
        })
        setTimeout(()=>this.setIcons(), 100)
    }
    listen(){
        // Adding new items.
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
                $('#addToList form').unbind(); //So that todoList and projects can share the same form.
                this.show();
            })
        })
    }

    //  For Icons: WAS A BAD IDEA, PROLLY.
    setIcons(){
        this.infoIconShown = false;
        $(`.infoIcon_${this.itemType}`).mousedown(e=>this.info(e));
        $(`.deleteIcon_${this.itemType}`).mousedown(e=>this.delete(e));
        $(`.tickIcon_${this.itemType}`).mousedown(e=>this.tick(e));
    }
    offIcons(){
        $('.infoIcon').mousedown(e=>{return false;});
        $('.deleteIcon').mousedown(e=>{return false;});
        $('.tickIcon').mousedown(e=>{return false;});
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
        console.log("deleting for ", this);
        const selectedItem = event.target.parentElement; //The footer in which the icon exists.

        let footerArr = Array.from(document.querySelectorAll('.footer'));
        // Since classlist is calculated top-down while the list is prepended bottom-up,
        //let index = (footerArr.length-1) - footerArr.indexOf(selectedItem); 
        let index = footerArr.indexOf(selectedItem);
        console.log("index to be deleted is: ", index);

        let todoArr = JSON.parse(localStorage.getItem('todoList'));

        console.log('todos: ', localStorage.getItem('todoList'));
        console.log('projects: ', localStorage.getItem('projects'));

        if(index<todoArr.length){
            // If it is a todo:
            index = todoArr.length-1 - index;
            todoArr = todoArr.filter(i => todoArr.indexOf(i) !== index);
            localStorage.setItem('todoList',JSON.stringify(todoArr));
            console.log("removing todoItem at ", index);
        } else{
            // If it is a project:
            index -= todoArr.length;
            let projArr = JSON.parse(localStorage.getItem('projects'));
            index = projArr.length-1 - index; // Because it's in reverse.
            projArr = projArr.filter(i=>projArr.indexOf(i) !== index);
            localStorage.setItem('projects', JSON.stringify(projArr));
            console.log("removing projItem at ", index);
        }
        this.show();
    }
    tick(event){
        let title = event.target.parentElement.parentElement.querySelector('.itemHead').textContent;
        Progress.addProgress(title);
        Progress.showProgress();
        console.log("ticked")
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
    // Project panel has more icons to show.
    show(){
        console.log("showing Projects");
        this.listArr = JSON.parse(localStorage.getItem(this.listName));
        $(this.domOutput).html('');
        this.listArr.forEach(item=>{
            $(this.domOutput).prepend(
                `<div class="${this.itemType} card flex">
                    <p class="itemHead">${item.title}</p>
                    <p class="itemBody">${item.des}</p>
                    <p class="itemTime">${item.createdAt}</p>
                    <div class="footer">
                        <img class="infoIcon_${this.itemType} icon" src="icons/info (1).png" alt="icon">
                        <img class="deleteIcon_${this.itemType} icon" src="icons/bin.png" alt="bin">
                        <img class="tickIcon_${this.itemType} icon" src="icons/check-mark.png" alt="tick">
                    </div>
                </div>`
            )
        })
        setTimeout(()=>this.setIcons(), 100)
    }
}