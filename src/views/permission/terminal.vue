<template>
<div class="app-container">
   <div class="content-container" >
   <aside><i class=""></i>系统终端</aside>
    <div id="xterm" class="xterm" />
</div>
</div>
</template>
<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'terminal',
  props: {
    socketURI: {
      type: String,
      default: 'ws://'+process.env.VUE_APP_WS_HOST,
    },
  },
  mounted() {

     this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById('xterm'));
      fitAddon.fit();
      term.focus();
      this.term = term
    },
    initSocket() {
      let token = getToken()
      let socketUrl = this.socketURI+'/webssh?api='+process.env.VUE_APP_HOST+'&token='+token

      this.socket = new WebSocket(socketUrl);
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        Message({
        message: 'SSH客户端链接失败[无权限]',
        type: 'error',
        duration: 5 * 1000
      })
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
      //     Message({
      //   message: 'ssh客户端[无权限]',
      //   type: 'warning',
      //   duration: 5 * 1000
      // })
      }
    }
  }
}
</script>

