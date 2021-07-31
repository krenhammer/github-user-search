import { proxy } from 'valtio';
import { Octokit } from '@octokit/rest';
import type { Octokit as OctokitCore } from 'octokit'
// import { throttling } from '@octokit/plugin-throttling';
import * as Q from 'q';
import { useEffect } from 'react';

export type OctokitFull = Octokit & OctokitCore;

type APIClientStore = {
    client?: OctokitFull,
    clientDeferred: Q.Deferred<Octokit>,
    clientReady: boolean
};

const apiClientStore = proxy<APIClientStore>({
    clientDeferred: Q.defer<Octokit>(),
    clientReady: false
})

const initAPIClient = () => {
    const token = import.meta.env.VITE_GH_TOKEN as string;

    if(!!apiClientStore.client) {
        return;
    }

    const client = new Octokit({ auth: token }) as OctokitFull;

    apiClientStore.clientDeferred.resolve(client);
    apiClientStore.clientReady = true;

    apiClientStore.client = client;
}

export const useInitAPIClient = () => {
    useEffect(() => {
        initAPIClient();
    }, [])
}

export const useAPIClient = () => {
    return apiClientStore.client;
};