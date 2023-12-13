const { app, BrowserWindow } = require('electron/main');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768
  })

  console.log(__dirname);
  win.loadFile(path.join(__dirname,"build/index.html"));
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})