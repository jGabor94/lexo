import SA_GetUserData from '@/lib/actions/user/getUserData';
import { Set } from '@/lib/database/queries/getSet';
import { FC } from 'react';
import AddToFavoriteClient from './FavoriteButtonClient';

const FavoriteButton: FC<{ set: Set }> = async ({ set }) => {

    const res = await SA_GetUserData()

    if (res.statusCode === 200) {
        return <AddToFavoriteClient {...{
            setid: set._id,
            favorite: res.payload.favoriteSets.includes(set._id) ? true : false
        }} />

    }

}

export default FavoriteButton