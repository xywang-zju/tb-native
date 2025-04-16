// 导入Electron模块
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

// 定义创建窗口的函数
function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 800, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      nodeIntegration: true, // 是否启用Node.js集成
      contextIsolation: false // 是否启用上下文隔离
    }
  });

  // 加载index.html文件到窗口中
  win.loadFile('index.html');

  // 打开开发者工具（调试用，可根据需要移除）
  // win.webContents.openDevTools();
}

// 当Electron完成初始化并准备创建窗口时调用createWindow函数
app.whenReady().then(() => {
  createWindow();
  // 检查更新
  autoUpdater.checkForUpdatesAndNotify();
});

// 自动更新相关事件
autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: '发现新版本',
    message: '发现新版本，是否立即更新？',
    buttons: ['是', '否']
  }).then(({ response }) => {
    if (response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: '更新下载完成',
    message: '新版本已下载完成，是否立即安装？',
    buttons: ['是', '否']
  }).then(({ response }) => {
    if (response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on('error', (err) => {
  dialog.showMessageBox({
    type: 'error',
    title: '更新错误',
    message: '更新过程中发生错误：' + err.message
  });
});

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  // 对于macOS，通常应用在所有窗口关闭后仍然保持活动状态
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 对于macOS，当点击Dock图标并且没有其他窗口打开时，重新创建一个窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});