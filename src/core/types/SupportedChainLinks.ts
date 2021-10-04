import Blockchain from "./Blockchain";

export const supportedChainLinks: Blockchain[] = [
    new Blockchain("desmos", "Desmos", "dsm", "desmos-mainnet", "m/44'/852'/0'/0/0", "desmos"),
    new Blockchain("cosmos", "Cosmos", "atom", "cosmoshub-4", "m/44'/118'/0'/0/0", "cosmos"),
    new Blockchain("bitcoin", "Bitcoin", "btc", "", "m/44'/0'/0'/0/0", "bc1"),
    new Blockchain("ethereum", "Ethereum", "eth", "", "m/44'/60'/0'/0/0", "0x"),
    new Blockchain("dogecoin", "Dogecoin", "doge", "", "m/44'/3'/0'/0/0", "D"),
    new Blockchain("cardano", "Cardano", "ada", "", "m/44'/1815'/0'/0/0", "A"),
    new Blockchain("band", "Band Protocol", "band", "band-guanyu-mainnet", "m/44'/494'/0'/0/0", "band"),
    new Blockchain("osmosis", "Osmosis", "osmo", "osmosis-1", "m/44'/118'/0'/0/0", "osmo"),
    new Blockchain("akash", "Akash", "akt", "akashnet-2", "m/44'/118'/0'/0/0", "akash"),
    new Blockchain("crypto", "Crypto.org", "cro", "crypto-org-chain-mainnet-1", "m/44'/118'/0'/0/0", "cro"),
    new Blockchain("regen", "Regen", "regen", "regen-1", "m/44'/118'/0'/0/0", "regen"),
    new Blockchain("sentinel", "Sentinel", "dvpn", "sentinelhub-2", "m/44'/118'/0'/0/0", "sent"),
    new Blockchain("kava", "Kava", "kava", "kava-3", "m/44'/459'/0'/0/0", "kava"),
    new Blockchain("emoney", "e-Money", "ngm", "emoney-3", "m/44'/118'/0'/0/0", "emoney"),
];