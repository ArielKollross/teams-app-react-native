import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './playerStorageDTO';
import { playerGetByGroup } from './playerGetByGroup';

export async function playerGetByGroupAndTeam(group: string, team: string) {
    try {
        const storage = await playerGetByGroup(group);

        const players = storage.filter(p => p.team === team);

        return players;
    } catch (error) {
        throw error;
    }
}