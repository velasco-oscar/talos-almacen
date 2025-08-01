const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Database operations
  database: {
    query: (sql, params) => ipcRenderer.invoke('database:query', sql, params),
    execute: (sql, params) => ipcRenderer.invoke('database:execute', sql, params),
  },
  
  // File system operations
  files: {
    selectFile: () => ipcRenderer.invoke('files:select'),
    selectFolder: () => ipcRenderer.invoke('files:selectFolder'),
    saveFile: (data, filename) => ipcRenderer.invoke('files:save', data, filename),
    readFile: (filepath) => ipcRenderer.invoke('files:read', filepath),
  },
  
  // Application operations
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    quit: () => ipcRenderer.invoke('app:quit'),
    minimize: () => ipcRenderer.invoke('app:minimize'),
    maximize: () => ipcRenderer.invoke('app:maximize'),
    close: () => ipcRenderer.invoke('app:close'),
  },
  
  // Print operations
  print: {
    print: (data) => ipcRenderer.invoke('print:print', data),
    printToPDF: (data) => ipcRenderer.invoke('print:printToPDF', data),
  },
  
  // Notifications
  notifications: {
    show: (title, body, icon) => ipcRenderer.invoke('notifications:show', title, body, icon),
  },
  
  // Event listeners
  on: (channel, callback) => {
    const validChannels = [
      'database:updated',
      'app:focus',
      'app:blur',
      'print:complete',
      'file:changed'
    ];
    
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }
  },
  
  // Remove event listeners
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
  
  // Remove all listeners for a channel
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Expose Node.js process information (read-only)
contextBridge.exposeInMainWorld('process', {
  platform: process.platform,
  arch: process.arch,
  versions: process.versions,
  env: {
    NODE_ENV: process.env.NODE_ENV
  }
});