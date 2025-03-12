import {create} from "zustand";
import {AccessTokenInfo} from "@/constants/interfaces/access-token.interface";
import {User} from "@/constants/interfaces/user.interface";

const SUCCESS = true;
const FAILURE = false;

type FetchStore = {
    accessToken: AccessTokenInfo | null;
    user: User | null;
    fetchAccessToken: () => Promise<boolean>,
    searchUser: (login: string) => Promise<number | false>
}

async function fetchApi(url: string, init: RequestInit): Promise<Response> {
    return await fetch(url, init);
}

function buildRequestBody(uid: string, secret: string): string {
    return new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: uid,
        client_secret: secret,
    }).toString();
}

function handleResponseErrorStatus(prefixMessage: string, errorStatus: number): void {
    let errorMeaning: string;
    switch (errorStatus) {
        case 400: {
            errorMeaning = "The request is malformed";
            break;
        }
        case 401: {
            errorMeaning = "Unauthorized";
            break;
        }
        case 403: {
            errorMeaning = "Forbidden";
            break;
        }
        case 404: {
            errorMeaning = "Page or resource is not found";
            break;
        }
        case 422: {
            errorMeaning = "Unprocessable entity";
            break;
        }
        case 500: {
            errorMeaning = "We have a problem with our server. Please try again later.";
            break;
        }
        default: {
            errorMeaning = "Unknown reason"
            break
        }
    }
    console.debug(prefixMessage, `: ${errorStatus} - ${errorMeaning}`);
}

const useFetchStore = create<FetchStore>((set, get) => {
    const url = process.env.EXPO_PUBLIC_API_ACCESS_TOKEN ?? null;
    const uid = process.env.EXPO_PUBLIC_API_UID ?? null;
    const secret = process.env.EXPO_PUBLIC_API_SECRET ?? null;
    const isEnvLoaded = url && uid && secret;

    if (!isEnvLoaded) {
        console.debug('Unable to retrieve environment variables');
    }

    return {
        accessToken: null,
        user: null,
        fetchAccessToken: async () => {
            if (!isEnvLoaded) {
                console.debug('Environment variables not loaded');
                return FAILURE;
            }

            try {
                const init = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: buildRequestBody(uid, secret)
                };

                const res = await fetchApi(url, init);

                if (res.ok) {
                    set({accessToken: await res.json()});
                    console.debug('Successfully fetched access token');
                    return SUCCESS
                } else {
                    handleResponseErrorStatus('Error while fetching token', res.status);
                    return FAILURE;
                }
            } catch (err) {
                console.debug("Unable to fetch token:", err);
                return FAILURE;
            }
        },
        searchUser: async (login: string) => {
            if (login.length === 0) {
                return FAILURE;
            }
            if (!isEnvLoaded) {
                console.debug('Environment variables not loaded');
                return FAILURE;
            }

            if (!get().accessToken) {
                const res = await get().fetchAccessToken();
                if (res !== SUCCESS) {
                    return FAILURE;
                }
            }

            set({user: null});

            const url = `https://api.intra.42.fr/v2/users/${login}`;
            try {
                const init = {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${get().accessToken?.access_token}`,
                    },
                };

                const res = await fetchApi(url, init);

                if (res.ok) {
                    set({user: await res.json()});
                    console.debug(`Successfully fetched the user '${login}'`);
                    return res.status;
                } else {
                    if(res.status === 401) {
                        await get().fetchAccessToken();
                        return await get().searchUser(login);
                    }
                    handleResponseErrorStatus(login, res.status);
                    return res.status;
                }
            } catch (err) {
                console.debug(`Error while fetching data from /v2/users/${login}:`, err);
                return FAILURE;
            }
        }
    }
})

export default useFetchStore;
