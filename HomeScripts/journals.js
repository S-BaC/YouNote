export class Journals{
    constructor(){
        let journal = JSON.parse(localStorage.getItem('journal')) || {gratitude:'', notes:''}
        this.gjTxt = journal.gratitude;
        this.notesTxt = journal.notes;
        if(this.gjTxt!==''){
            $('#gjForm, #gjText').toggle();
            this.showGJ();
            this.listenGJText();
        }
        this.listenGJ();
        this.listennote(); //Misnote === CommonJ.
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
            notes : this.notesTxt
        }))
    }
    listennote(){
        $('#noteForm').submit(e=>{
            e.preventDefault();
        })

        //Saves and clears the field.
        $('#noteSave').mousedown((e)=>{
            this.notesTxt.push(
                $('textarea').val()
            );
            this.update();
            $('textarea').val('');
        })

        //Shows the misnoteournal texts saved.
        $('#noteView').mousedown((e)=>{
            $('textarea, #noteText').toggle();
            this.noteView();
        })

        //Clears all notes.
        $('#noteClear').mousedown((e)=>{
            this.notesTxt = [];
            this.update();
            $('#noteText').html('');
        })
    }
    deletenote(e){
        let noteArr = Array.from(document.getElementsByClassName('noteDeleteIcon'));
        let index = noteArr.indexOf(e.target);
        this.notesTxt = this.notesTxt.filter(note=>this.notesTxt.indexOf(note)!==index);
        this.update();
        this.noteView();
    }
    noteView(){
        $('#noteText').html('');
        this.notesTxt.forEach(txt=>{
            $('#noteText').append(
                `<li class='flex flexLi'>
                    <p>${txt}</p>
                    <img class="noteDeleteIcon icon" src="icons/bin.png" alt="bin">
                </li>`);
        })
        //Deletes a particular note as selected.
        $('.noteDeleteIcon').mousedown(e=>this.deletenote(e));
    }
}