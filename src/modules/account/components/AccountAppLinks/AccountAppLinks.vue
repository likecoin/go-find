<template>
  <div class="p-4 md:pr-8">
    <Clipboard />
    <section v-if="
        $store.state.AccountModule.profileLoadingStatus == 0 ||
        $store.state.AccountModule.profileLoadingStatus
      ">
      <span v-if="$store.state.AccountModule.profileLoadingStatus">
        <div class="pt-2 pb-3 md:pt-6 px-2 bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl">
          <h1 class="pb-8 pl-4 text-5xl md:text-6xl text-brand font-extrabold">
            Social Networks
          </h1>
          <span v-if="
              $store.state.AccountModule.profile.applicationLinks &&
              $store.state.AccountModule.profile.applicationLinks.length > 0
            ">
            <div class="grid grid-cols-12">
              <div class="col-span-12 mx-4">
                <div class="pt-2 pb-3 md:pt-6 px-2 bg-gray-100 dark:bg-denim-900 dark:bg-gray-700 rounded-3xl shadow-xl">
                  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 text-center">
                    <div
                      v-for="applicationLink in $store.state.AccountModule.profile
                        .applicationLinks"
                      :key="applicationLink"
                      class="m-auto cursor-pointer"
                    >
                      <div class="bg-gray-200 dark:bg-gray-800 rounded-3xl w-16 h-16 md:w-20 md:h-20 m-auto hover:bg-gray-300 dark:hover:bg-gray-900 shadow-md">
                        <!-- Delete -->
                        <span class="absolute -mt-2 md:-mt-3">
                          <i
                            class="bi bi-dash-circle-fill text-gray-500 hover:text-red-600 text-2xl -ml-12 md:-ml-16"
                            @click="deleteApplicationLink(applicationLink)"
                          />
                        </span>

                        <!-- State indicators -->
                        <span class="absolute -mt-2 md:-mt-3 ml-5">
                          <!-- State Loading -->

                          <span
                            v-if="
                              applicationLink.state ===
                                'APPLICATION_LINK_STATE_VERIFICATION_STARTED' ||
                              applicationLink.state ===
                                'APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED' ||
                              applicationLink.state === 0
                            "
                            class="flex h-4 w-4 pt-1 md:pt-2 -ml-2 md:-ml-0"
                          >
                            <span class="animate-ping absolute h-4 w-4 inline-flex rounded-full bg-blue-400 opacity-75" />
                            <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-500" />
                          </span>

                          <!-- State Error -->
                          <i
                            v-if="
                              applicationLink.state ===
                                'APPLICATION_LINK_STATE_VERIFICATION_ERROR' ||
                              applicationLink.state ===
                                'APPLICATION_LINK_STATE_TIMED_OUT' ||
                              applicationLink.state === 'UNRECOGNIZED'
                            "
                            class="bi bi-exclamation-circle-fill text-red-500 text-2xl cursor-default"
                          />
                        </span>
                        <img
                          class="p-4 pointer-events-auto select-none mb-4"
                          :src="applicationLink.logo"
                          alt=""
                          @click="openApplicationLink(applicationLink)"
                        />
                      </div>
                      <h4 class="dark:text-white select-none pt-1 text-xl font-medium has-tooltip">
                        {{ applicationLink.displayName }}
                        <span
                          class="text-sm font-light text-white tooltip ml-0.5 py-0.5 text-left dark:bg-gray-800 bg-gray-500 px-2 rounded-xl shadow-md"
                          v-if="applicationLink.name!=='domain'"
                        >
                          {{applicationLink.username}}
                        </span>
                      </h4>
                    </div>
                    <div class="m-auto cursor-pointer">
                      <div
                        class="bg-gray-200 dark:bg-gray-800 rounded-3xl w-16 h-16 md:w-20 md:h-20 m-auto hover:bg-gray-300 dark:hover:bg-gray-900 shadow-md p-4"
                        @click="toggleApplicationLinkEditor()"
                      >
                        <div class="bg-brand rounded-full text-2xl md:text-4xl h-full font-bold text-white align-middle md:pt-1">
                          <i class="bi bi-plus align-middle h-full m-auto w-14" />
                        </div>
                      </div>
                      <h4 class="dark:text-white select-none pt-1 text-xl font-medium">
                        New
                      </h4>
                    </div>
                  </div>
                </div>

                <!-- State help guide -->
                <section class="pt-4 md:pl-4">
                  <h1 class="text-gray-500 font-semibold">Help:</h1>
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 md:col-span-6 xl:col-span-4 flex">
                      <span class="flex h-4 w-4 pt-1 md:pt-2 -ml-1 md:-ml-0">
                        <span class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-75" />
                        <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-500" />
                      </span>
                      <p class="pt-0.5 pl-2 text-gray-500">
                        Verification in progress, may take a few minutes
                      </p>
                    </div>

                    <div class="col-span-12 md:col-span-6 xl:col-span-4 flex">
                      <i class="bi bi-exclamation-circle-fill text-red-500 text-xl cursor-default -ml-1.5" />
                      <p class="pt-0.5 pl-2 text-gray-500">
                        Verification failed, delete the application and try again
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </span>
          <span v-else>
            <div class="px-2 w-full">
              <span>
                <h4 class="text-3xl text-center dark:text-white">Wow, such empty</h4>
                <h5 class="text-lg text-gray-700 dark:text-gray-300 text-center">
                  You don't have any Social Network connected to your profile
                </h5>
              </span>
            </div>
            <div class="w-full pt-5 px-2">
              <button
                class="bg-brand hover:bg-yellow-600 w-full rounded-xl py-3 text-xl font-bold text-white"
                @click="toggleApplicationLinkEditor()"
              >
                Connect a new Social Network
              </button>
            </div>
          </span>
        </div>
      </span>
      <span v-else>
        <!-- Loading -->
        <SkeletonLoader
          shape="rectangle"
          class="py-1 text-left w-full h-32 px-2"
        />
      </span>
    </section>

    <!-- Editor -->
    <Dialog
      :open="isApplicationLinkEditorOpen"
      @close="toggleApplicationLinkEditor()"
    >
      <div class="fixed inset-0 z-20 overflow-y-auto bg-opacity-50 bg-gray-500">
        <div class="min-h-screen px-4 text-center">
          <span class="inline-block h-screen align-middle"> &#8203; </span>

          <div class="inline-block px-3 sm:px-10 md:px-12 lg:px-14 w-full max-w-6xl p-6 pb-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
            <DialogTitle class="text-3xl font-bold leading-6 text-gray-900 dark:text-white">
              <span class="flex">
                <div class="flex text-brand text-4xl">Connect Social Networks</div>
                <div class="flex-auto text-right">
                  <button class="bg-gray-200 dark:bg-gray-800 rounded-full p-1 hover:text-red-500">
                    <i
                      class="bi bi-x h-12 w-12"
                      @click="toggleApplicationLinkEditor()"
                    />
                  </button>
                </div>
              </span>
            </DialogTitle>

            <section class="p-4">
              <!-- Blockchain Select -->
              <div
                v-if="selectedApplication === null || !hasUploadedProof"
                class="md:flex"
              >
                <div class="px-4">
                  <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 dark:bg-gray-700 text-blue-600">
                    1
                  </span>
                </div>
                <div class="w-full pb-4 md:pl-4">
                  <h3 class="mt-0 text-2xl font-bold dark:text-white">
                    Select the Social Network
                  </h3>
                  <div class="grid grid-cols-12">
                    <div
                      v-for="application of supportedApplicationLinks"
                      class="col-span-12 md:col-span-4 xl:col-span-3 m-1 rounded-3xl bg-gray-100 dark:bg-denim-900 dark:hover:bg-purple-800 hover:bg-purple-200 cursor-pointer"
                      @click="selectApplication(application)"
                    >
                      <div class="grid grid-cols-12">
                        <div class="col-span-4">
                          <img
                            class="p-4 pointer-events-none select-none h-16 w-auto"
                            :src="application.logo"
                            alt=""
                          />
                        </div>
                        <div class="col-span-5 my-auto">
                          <h5 class="dark:text-white text-2xl capitalize">
                            {{ application.displayName }}
                          </h5>
                        </div>
                        <div class="col-span-3 text-right my-auto pr-4">
                          <i
                            v-if="selectedApplication === application"
                            class="bi bi-check-circle text-xl text-seagreen-500"
                          />
                          <i
                            v-else
                            class="bi bi-circle text-xl dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Wallet Input for proof sign -->
              <div
                v-if="selectedApplication !== null && !hasUploadedProof"
                class="md:flex"
              >
                <div class="px-4 pt-2">
                  <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 dark:bg-gray-700 text-blue-600">
                    2
                  </span>
                </div>
                <div class="grid gird-cols-2 w-full px-3 lg:px-5">
                  <h3 class="mt-2 text-2xl font-bold dark:text-white">
                    Social Account
                  </h3>

                  <!-- Normal user signature -->
                  <div class="col-span-2 py-2">
                    <label
                      for="applicationUsername"
                      class="dark:text-white text-xl"
                    >
                      Your
                      <span class="capitalize text-brand">
                        {{ selectedApplication.displayName }}
                      </span>
                      <span v-if="selectedApplication.name!=='domain'">
                        username
                      </span>
                    </label>
                    <input
                      id="applicationUsername"
                      v-model="applicationUsername"
                      type="text"
                      class="rounded-lg border w-full py-3 px-4 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 placeholder-gray-400 dark:border-gray-700 shadow-sm text-base focus:outline-none"
                      name="applicationUsername"
                      :placeholder="selectedApplication.usernamePlaceholder"
                      @input="resetGeneratedProof()"
                    />
                    <div
                      class="py-1 text-red-500"
                      v-if="!this.isValidApplicationUsername"
                    >
                      {{this.selectedApplication.usernameRegExpError}}
                    </div>
                  </div>
                  <div
                    v-if="
                      !generatedProof &&
                      $store.state.AuthModule._account.isUsingKeplr === false &&
                      $store.state.AuthModule._account.isUsingWalletConnect === false
                    "
                    class="col-span-2 py-2"
                  >
                    <label
                      for="mPassword"
                      class="dark:text-white text-xl"
                    >
                      Wallet password
                    </label>
                    <input
                      id="mPassword"
                      v-model="mPassword"
                      type="password"
                      class="rounded-lg border w-full py-3 px-4 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 placeholder-gray-400 dark:border-gray-700 shadow-sm text-base focus:outline-none"
                      name="mPassword"
                      placeholder="Password"
                    />
                  </div>

                  <span
                    v-if="generateProofError"
                    class="text-red-700"
                  >
                    {{ generateProofError }}
                  </span>
                  <div
                    v-if="
                      ($store.state.AuthModule._account.isUsingKeplr === false &&
                        $store.state.AuthModule._account.isUsingWalletConnect === false &&
                        applicationUsername.length > 1 &&
                        mPassword.length > 0 &&
                        !generatedProof) ||
                      ($store.state.AuthModule._account.isUsingKeplr === true && applicationUsername.length > 1 ) ||
                      ($store.state.AuthModule._account.isUsingWalletConnect === true && applicationUsername.length > 1)
                    "
                    class="col-span-2 py-2"
                  >
                    <span v-if="!isGeneratingProof">
                      <button
                        type="button"
                        class="py-2 w-full px-4 bg-purple-600 hover:bg-purple-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        @click="generateProof()"
                      >
                        Continue
                      </button>
                    </span>
                    <span v-else>
                      <button
                        type="button"
                        disabled
                        class="py-2 w-full px-4 bg-gray-600 hover:bg-gray-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                      >
                        <span v-if="!$store.state.AuthModule._account.isUsingWalletConnect">
                          Generating...
                        </span>
                        <span v-else> Waiting DPM... </span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Social proof tutorial -->
              <div
                v-if="
                  selectedApplication !== '' &&
                  applicationUsername.length > 1 &&
                  generatedProof
                "
                class="pt-4"
              >
                <div class="text-center w-full text-5xl font-black pb-2 dark:text-white">
                  <div class="w-full mx-auto py-auto">
                    <img
                      class="p-4 pointer-events-none select-none h-24 w-auto mx-auto inline-block"
                      :src="selectedApplication?.logo"
                      alt=""
                    >
                    <span class="align-middle">
                      {{selectedApplication?.displayName}}
                    </span>
                  </div>
                </div>
                <div class="pb-4">
                  <AccountApplicationLinkTutorialDiscord
                    v-if="selectedApplication?.name === 'discord'"
                    :username="applicationUsername"
                    :proof="generatedProof"
                    @applicationLinkSent="onApplicationLinkSent"
                  />
                  <AccountApplicationLinkTutorialGithub
                    v-if="selectedApplication?.name === 'github'"
                    :username="applicationUsername"
                    :proof="generatedProof"
                    @applicationLinkSent="onApplicationLinkSent"
                  />
                  <AccountApplicationLinkTutorialTwitch
                    v-if="selectedApplication?.name === 'twitch'"
                    :username="applicationUsername"
                    :proof="generatedProof"
                    :proof-url="proofUrl"
                    @applicationLinkSent="onApplicationLinkSent"
                  />
                  <AccountApplicationLinkTutorialTwitter
                    v-if="selectedApplication?.name === 'twitter'"
                    :username="applicationUsername"
                    :proof="generatedProof"
                    :proof-url="proofUrl"
                    @applicationLinkSent="onApplicationLinkSent"
                  />
                  <AccountApplicationLinkTutorialDomain
                    v-if="selectedApplication?.name === 'domain'"
                    :username="applicationUsername"
                    :proof="generatedProof"
                    :proof-url="proofUrl"
                    @applicationLinkSent="onApplicationLinkSent"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Discord Verify -->
    <Dialog
      :open="this.isModalDiscordVerifyOpen"
      @close="this.toggleModalDiscordVerify()"
    >
      <div class="fixed inset-0 z-20 overflow-y-auto bg-opacity-50 bg-gray-500">
        <div class="min-h-screen px-4 text-center">
          <span class="inline-block h-screen align-middle"> &#8203; </span>

          <div class="inline-block px-3 sm:px-10 md:px-12 lg:px-14 w-full max-w-6xl p-6 pb-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
            <DialogTitle class="text-3xl font-bold leading-6 text-gray-900 dark:text-white">
              <span class="flex">
                <div class="flex text-brand text-4xl">Discord Verification</div>
                <div class="flex-auto text-right">
                  <button class="bg-gray-200 dark:bg-gray-800 rounded-full p-1 hover:text-red-500">
                    <i
                      class="bi bi-x h-12 w-12"
                      @click="toggleModalDiscordVerify()"
                    />
                  </button>
                </div>
              </span>
            </DialogTitle>

            <AccountApplicationLinkTutorialDiscordVerify :username="applicationUsername" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" src="./AccountAppLinks.ts" />
