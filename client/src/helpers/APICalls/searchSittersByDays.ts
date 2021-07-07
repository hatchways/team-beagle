import { FetchOptions } from '../../interface/FetchOptions';
import { SearchProfileApiData } from '../../interface/Profile';


export async function searchSittersByDays(search: string): Promise<SearchProfileApiData> {
    const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
    };
    return await fetch(`profile/day/${search}`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: 'Unable to connect to server. Please try again' },
        }));
}

export default searchSittersByDays;
