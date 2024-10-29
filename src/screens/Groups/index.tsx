import { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles'
import { groupList } from '@storage/group/groupList';
import { Loading } from '@components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
	try {
      setIsLoading(true);

	  const data = await groupList();

	  setGroup(data);
	} catch (error) {
	  console.error(error);

      Alert.alert('Turmas', 'Não foi possivel carregar as turmas');
	} finally {
      setIsLoading(false);
    }
 }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
	fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      { isLoading ? <Loading /> : <FlatList
        data={group}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={group.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
            <ListEmpty
                message='Que tal cadastrar a primeira turma?'
            />
        )}
      />
      }

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}