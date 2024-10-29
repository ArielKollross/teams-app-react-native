import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup() {
    const [group, setGroup] = useState('');
    const navitegation = useNavigation();

    async function handlerNewGroup() {
        if(group.trim().length === 0) {
            return Alert.alert('Novo Grupo', 'informe o nome da turma');
        }

        try {
            await groupCreate(group);
            navitegation.navigate('players', { group });
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message);
            } else {
                Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo');
                console.error(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight
                    title="Nova turma"
                    subtitle="crie uma turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handlerNewGroup}
                />
            </Content>
        </Container>
    )
}