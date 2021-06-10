<template>
  <div class="app-container">
    <el-alert :title="message" :type="type" effect="dark"> </el-alert>
    <br />
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" icon="el-icon-top-right" @click="add"
            >链接终端</el-button
          >
          <el-button type="danger" icon="el-icon-unlock" @click="down"
            >关闭终端</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">
      <div id="xterm" class="xterm" />
    </div>
  </div>
</template>
<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import { getToken } from "@/utils/auth";
import { Message,Notification } from "element-ui";

export default {
  name: "terminal",
  data() {
    return {
      message: "系统终端 等待链接....",
      type: "info",
    };
  },
  props: {
    socketURI: {
      type: String,
      default: "ws://" + process.env.VUE_APP_WS_HOST,
    },
  },

  mounted() {
    // this.initSocket()
  },
  beforeDestroy() {
    this.socket.close();
    this.term.dispose();
  },
  methods: {
    down() {
      this.socket.close();
      this.term.dispose();
      this.message = "系统终端已关闭";
      this.type = "info";
    },
    add() {
      this.initSocket();
    },
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true,
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById("xterm"));
      fitAddon.fit();
      term.focus();
      this.term = term;
    },
    initSocket() {
      let token = getToken();
      let socketUrl =
        this.socketURI +
        "/webssh?api=" +
        process.env.VUE_APP_HOST +
        "&token=" +
        token;

      this.socket = new WebSocket(socketUrl);
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        this.initTerm();
        this.message = "系统终端连接成功";
        this.type = "success";
      };
    },
    socketOnClose() {
      this.socket.onclose = () => {};
      this.message = "系统终端已关闭";
      this.type = "info";
    },
    socketOnError() {
      this.socket.onerror = () => {
        Notification({
          message: "SSH客户端链接失败[无权限]",
          type: "error",
          duration: 5 * 1000,
        });
        this.message = "SSH客户端链接失败[无权限]";
        this.type = "error";
      };
    },
  },
};
</script>

