<template>
  <div>
    <div>
      <div class="text-gray-500 text-sm pb-5">
        <button @click="goBack()">
          <i class="bi bi-arrow-left" /> Change Wallet password
        </button>
      </div>
      <div>
        <h2 class="dark:text-gray-50 text-gray-800 pb-1 font-medium text-3xl text-center">
          Your Desmos wallet for @<span class="text-brand">{{ $store.state.RegisterModule.dtag }}</span>
        </h2>
      </div>
    </div>

    <InputMnemonic @onMnemonic="onMnemonic($event)" />

    <div v-if="isValidMnemonic">
      <button
        type="button"
        class="relative block w-full justify-center py-2 px-4 border border-transparent text-md rounded-md font-extrabold
               text-white bg-brand opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 dark:ring-offset-denim-900 focus:ring-offset-2 focus:ring-brand"
        @click="completeRegistration()"
      >
        Complete
        <span class="absolute right-0 inset-y-0 flex items-center pr-3">
          <i class="bi bi-arrow-right" />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./RegisterImportWallet.ts"/>
