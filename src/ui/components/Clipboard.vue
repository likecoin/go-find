<template>
  <section>
    <div
      v-if="$store.state.ClipboardModule.isVisible"
      class="transition duration-700 ease-in-out z-50 fixed top-0 w-full pt-7"
    >
      <span v-if="$store.state.ClipboardModule.canCopy">
        <div class="mx-auto w-72 border bg-white border-gray-100 dark:border-denim-900 dark:bg-gray-900 rounded-lg shadow-xl">
          <div class="dark:text-white text-xl font-semibold p-4 text-center ">
            <i class="bi bi-clipboard-check text-green-500 text-left pr-2" />
            Text copied!
          </div>
        </div>
      </span>

      <span v-else>
        <div class="p-2 mx-auto w-2/3 md:w-1/2 lg:w-1/3 border bg-white border-gray-100 dark:border-denim-900 dark:bg-gray-900 rounded-lg shadow-xl">
          <div class="flex">
            <div class="flex-auto dark:text-white text-xl font-semibold p-3 pt-1">
              Text to copy:
            </div>
            <div class="flex-1 text-right">
              <i
                class="bi bi-x cursor-pointer text-3xl dark:text-white"
                @click="close()"
              />
            </div>
          </div>
          <div class=" p-3 bg-black rounded-xl text-sm">
            <div class="p-3 overflow-x-auto text-white">
              {{ $store.state.ClipboardModule.valueToCopy }}
            </div>
          </div>
        </div>
      </span>
    </div>
  </section>
</template>



<script>
import { defineComponent } from "vue";
import { getModule } from "vuex-module-decorators";
import ClipboardModule from "@/store/modules/ClipboardModule";
const clipboardModule = getModule(ClipboardModule);

export default defineComponent({
  components: {},
  data() {
    return {};
  },
  methods: {
    close() {
      clipboardModule.close();
    },
  },
});
</script>

<style lang="scss" scoped></style>