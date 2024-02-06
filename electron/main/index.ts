import { app, BrowserWindow, shell, ipcMain } from 'electron'
import Store from 'electron-store';
import { release } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express, { type Express } from "express";
import axios from 'axios';
import { getData, saveData } from '../services/DataService';
import { XCCData } from '../types/XCCTypes';
import https from 'https';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    width: 800,   // Set the width
    height: 650,  // Set the height
    resizable: false,  // Prevent resizing
    title: 'Main window',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.on('getXCCData', (event, data) => {
  let xccData : XCCData = getData();
  event.sender.send('returnXCCData', xccData);
});

ipcMain.on('saveXCCData', (event, data : XCCData) => {
  saveData(data);
});

// Proxy server for API calls
const exp : Express = express();
const expPort : number = 2075;

exp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

exp.use(express.json());

exp.all('/api/:host/*', (req, res) => {
    const apiUrl = 'https://' + req.params.host + req.url.replace(`/api/${req.params.host}`, ''); // Replace with the actual third-party API URL

    const options = {
        headers : {},
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
    };

    if (req.headers.authorization){
      options.headers.authorization = req.headers.authorization
    };

    console.log(apiUrl);

    axios[req.method.toLowerCase()](apiUrl, options)
    .then(response => {
        res.status(response.status).json(response.data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

exp.listen(expPort, () => {
    console.log(`Proxy server listening at http://localhost:${expPort}`);
});

const store = new Store({
  defaults: {
    "games" : []
  },
});

// Handle request to get dark mode setting
ipcMain.handle('get-games', (event) => {
  return store.get('games', []);
});

// Handle request to set dark mode setting
ipcMain.on('set-games', (event, value) => {
  store.set('games', value);
});