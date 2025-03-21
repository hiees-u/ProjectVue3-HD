
import { defineStore } from "pinia";

export const useSpinnerStore = defineStore('spinner', {
    state: () => ({
        isVisible: false,
        isLocked: false,
    }),
    actions: {
        show() {
            console.log('quay');
            this.isVisible = true;
            this.isLocked = true;
            setTimeout(() => {
                this.isLocked = false;
                this.hide();
            }, 1000);
        },
        hide() {
            if (this.isLocked) {
                console.log('Không thể dừng, còn trong thời gian khóa.');
                return;
            }

            console.log('dừng');
            this.isVisible = false;
        },
    },
});