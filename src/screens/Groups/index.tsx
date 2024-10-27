import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { Container } from './styles'
import { FlatList } from 'react-native';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
    const [group, setGroup] = useState<string[]>([]);

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList
        data={group}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={group.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
            <ListEmpty
                message='Que tal cadastrar a primeira turma?'
            />
        )}
      />

      <Button
        title='Criar nova turma'
      />
    </Container>
  );
}