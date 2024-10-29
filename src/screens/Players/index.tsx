import React, { useState, useEffect, useRef } from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from "@components/Header";
import { ButtonIcon } from "@components/ButtonIcon";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
    group: string
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState<string>('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerInputRef = useRef<TextInput>(null);

    async function handleAddNewPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'informe o nome da pessoa para adicionar');
        }

        const newPlayer: PlayerStorageDTO = {
            name: newPlayerName,
            team: team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            fetchPlayersByTeam();

            newPlayerInputRef.current?.blur();

            setNewPlayerName('');
            Keyboard.dismiss();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar');
                console.error(error);
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);

            const playersByTeam = await playerGetByGroupAndTeam(group, team);

            setPlayers(playersByTeam);
        } catch (error) {
            console.error(error);
            Alert.alert('Player', 'Nao foi possivel carregar as pessoas do time selecionado');
        } finally {
            setIsLoading(false);
        }
    }

    async function handlerRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);
            Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa');
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.error(error);
            Alert.alert('Remover grupo', 'Não foi possivel remover a turma');
        }
    }

    async function handlerGroupRemove() {
        try {
            Alert.alert(
                'Remover turma',
                'Deseja remover a turma?',
                [
                    { text: 'Não', style: 'cancel' },
                    { text: 'Sim', onPress: () => groupRemove() }
                ]
            )
        } catch (error) {
            console.error(error);
            Alert.alert('Remover turma', 'Não foi possivel remover a turma');
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Jogue com a sua turma"
            />

            <Form>
                <Input
                    inputRef={newPlayerInputRef}
                    onChangeText={setNewPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    value={newPlayerName}
                    onSubmitEditing={handleAddNewPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddNewPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                        />
                    )}

                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            { isLoading
                ? <Loading />
                : <FlatList
                    data={players}
                    keyExtractor={player => player.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlerRemovePlayer(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty
                            message="Não há pessoas nesse time"
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }

            <Button
                title="Remover turma"
                type="secondary"
                onPress={handlerGroupRemove}
            />
        </Container>
    );
}