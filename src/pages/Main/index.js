import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main({navigation}) {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const getUsers = await AsyncStorage.getItem('users');
      if (getUsers) {
        setUsers(JSON.parse(getUsers));
      }
    };
    getData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const onSubmit = async () => {
    setLoad(true);
    const response = await api.get(`/users/${user}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    setUsers([...users, data]);
    setUser('');
    setLoad(false);
    Keyboard.dismiss();
  };

  const handleNavigate = (user) => {
    navigation.navigate('User', {user});
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={user}
          onChangeText={(text) => setUser(text)}
          returnKeyType="send"
          onSubmitEditing={onSubmit}
        />
        <SubmitButton loading={loading} onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{uri: item.avatar}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Main.navigationOptions = {
  title: 'Usuario',
};
