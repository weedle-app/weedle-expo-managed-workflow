import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'node-libs-react-native/globals.js';

import { ethers } from 'ethers';
import { useEffect, useState, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAsyncStorage } from './AsyncStorage';

const HandleWalletConnect = () => {
  const connector = useWalletConnect();

  const connectWallet = useCallback(() => {
    if (connector && !connector.connected) {
      return connector.connect();
    }
    return null;
  }, [connector?.connect]);

  return <Button title='Wallet connect' onPress={connectWallet} />;
};

export default function App() {
  const [] = useState();

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.StaticJsonRpcProvider(
          'https://eb50-50-66-132-160.ngrok.io/'
        );
        console.log(await provider.ready);
        const block = await provider.getBlockNumber();
        console.log({ block });
        const res = await provider.getBlock(block);
        console.log({ res });
        // setBlockNumber(JSON.stringify(res));
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <WalletConnectProvider
      redirectUrl={`wmw://app`}
      storageOptions={{
        asyncStorage: AsyncStorage as unknown as IAsyncStorage,
      }}
    >
      <View style={styles.container}>
        <HandleWalletConnect />
        <Text>Open up App.tsx to start working on your app!</Text>

        <StatusBar style='auto' />
      </View>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
