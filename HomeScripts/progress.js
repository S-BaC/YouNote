export class Progress{
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