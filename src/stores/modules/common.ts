import { defineStore } from 'pinia';
interface userMsg {
  userName: string;
  userAge: number;
  [key: string]: unknown;
}
export const comStore = defineStore('main', {
  state: () => ({
    userMsg: () => userMsg,
    demoCount: 0,
  }),
  getters: {
    doubleCount: (state) => state.demoCount * 2,
  },
  actions: {
    setUserMsg() {
      this.userMsg = {};
    },
  },
});
