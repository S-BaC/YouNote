// import {User} from 'user';
import {Theme} from './HomeScripts/theme.js';
import {Journals} from './HomeScripts/journals.js';
import {Icons, TodoPanel, ProjectPanel} from './HomeScripts/lists.js';
import {Progress} from './HomeScripts/progress.js';

//Tabs on Navbar.
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

//  For 'Home' Screen:
$(document).ready(
   start()
)

function start(){
    new TodoPanel();
    new ProjectPanel();
    new Progress();
    new Icons();
    new Theme();
    new Journals();
    new Tabs();
    Tabs.openHomeTab();
}

