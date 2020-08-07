const electron = require('electron');
const { app, BrowserWindow,Menu } = electron;
const path = require('path');
const url = require('url');

process.env.NODE_ENV = 'production';

let win;

function createWindow(){
	win = new BrowserWindow({
		width:1200,
		height:800,
		webPreferences:{
			nodeIntegration:true
		}
	});
	win.loadURL(url.format({
		pathname: path.join(__dirname,'public/index.html'),
		protocol:'file:',
		slashes:true
	}));
	win.on('closed',()=>{
		win = null;
	});

var mainMenu = [
	{
		label:'Menu',
		submenu:[
			{
				label:'Exit',
                accelerator : process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
			}
		]
	}
];
if(process.env.NODE_ENV !== 'production'){
        mainMenu.push({
            label:'Developer Tools',
            submenu:[
                {
                    label:'Toogle Dev Tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item,focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role:'reload'
                }
            ]
        })
    }

    var menu = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menu);
} 



app.on('ready',createWindow);
app.on('window-all-closed',()=>{
	if(process.platform !== 'darwin')
		app.quit();
});
app.on('activate',()=>{
	if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
});